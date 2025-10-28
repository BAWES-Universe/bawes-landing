"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  const { language, dir } = useLanguage()
  const t = translations[language]
  const containerRef = useRef<HTMLDivElement>(null)
  const [glProgram, setGlProgram] = useState<WebGLProgram | null>(null)
  const [glTimeUniform, setGlTimeUniform] = useState<WebGLUniformLocation | null>(null)
  const [glResolutionUniform, setGlResolutionUniform] = useState<WebGLUniformLocation | null>(null)
  const [time, setTime] = useState(0)
  const [canvasWidth, setCanvasWidth] = useState(0)
  const [canvasHeight, setCanvasHeight] = useState(0)
  const [gl, setGl] = useState<WebGLRenderingContext | null>(null)

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  // Smooth spring physics for parallax
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 })

  // WebGL background effect
  useEffect(() => {
    const canvas = document.getElementById("hero-canvas") as HTMLCanvasElement
    if (!canvas) return

    const _gl = canvas.getContext("webgl")
    if (!_gl) return

    setGl(_gl)

    const vertexShader = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `

    const fragmentShader = `
      precision mediump float;
      uniform float time;
      uniform vec2 resolution;
      
      float noise(vec3 p) {
        vec3 i = floor(p);
        vec4 a = dot(i, vec3(1., 57., 21.)) + vec4(0., 57., 21., 78.);
        vec3 f = cos((p-i)*acos(-1.))*(-.5)+.5;
        a = mix(sin(cos(a)*a),sin(cos(1.+a)*(1.+a)), f.x);
        a.xy = mix(a.xz, a.yw, f.y);
        return mix(a.x, a.y, f.z);
      }
      
      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        vec3 color = vec3(0.0);
        float t = time * 0.2;
        
        // Create a cosmic, nebula-like effect
        for(float i = 0.0; i < 3.0; i++) {
          vec2 p = uv;
          p.x += noise(vec3(uv * 2.0, t + i * 20.0)) * 0.1;
          p.y += noise(vec3(uv * 2.0, t + i * 20.0 + 10.0)) * 0.1;
          
          float brightness = length(p) * 2.0;
          brightness = 0.1 / brightness;
          
          vec3 col = vec3(0.1, 0.3, 0.6);
          if (i == 1.0) col = vec3(0.5, 0.2, 0.8);
          if (i == 2.0) col = vec3(0.2, 0.5, 0.8);
          
          color += col * brightness;
        }
        
        // Add stars
        float stars = pow(noise(vec3(uv * 500.0, t * 0.5)), 20.0) * 0.8;
        color += vec3(stars);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `

    // Compile shaders
    const vs = _gl.createShader(_gl.VERTEX_SHADER)!
    _gl.shaderSource(vs, vertexShader)
    _gl.compileShader(vs)

    const fs = _gl.createShader(_gl.FRAGMENT_SHADER)!
    _gl.shaderSource(fs, fragmentShader)
    _gl.compileShader(fs)

    // Create program
    const program = _gl.createProgram()!
    _gl.attachShader(program, vs)
    _gl.attachShader(program, fs)
    _gl.linkProgram(program)

    // Set program to state
    setGlProgram(program)

    // Create buffer
    const buffer = _gl.createBuffer()
    _gl.bindBuffer(_gl.ARRAY_BUFFER, buffer)
    _gl.bufferData(_gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), _gl.STATIC_DRAW)

    // Set up attributes and uniforms
    const position = _gl.getAttribLocation(program, "position")
    _gl.enableVertexAttribArray(position)
    _gl.vertexAttribPointer(position, 2, _gl.FLOAT, false, 0, 0)

    const timeUniform = _gl.getUniformLocation(program, "time")
    const resolutionUniform = _gl.getUniformLocation(program, "resolution")

    setGlTimeUniform(timeUniform)
    setGlResolutionUniform(resolutionUniform)

    // Animation loop
    const startTime = Date.now()
    let animationFrame: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      setCanvasWidth(window.innerWidth)
      setCanvasHeight(window.innerHeight)
      _gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const render = () => {
      const currentTime = (Date.now() - startTime) / 1000
      setTime(currentTime)

      _gl.clearColor(0, 0, 0, 1)
      _gl.clear(_gl.COLOR_BUFFER_BIT)

      animationFrame = requestAnimationFrame(render)
    }

    window.addEventListener("resize", resize)
    resize()
    render()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  useEffect(() => {
    if (!glProgram || !glTimeUniform || !glResolutionUniform || !gl) return

    gl.useProgram(glProgram)
    gl.uniform1f(glTimeUniform, time)
    gl.uniform2f(glResolutionUniform, canvasWidth, canvasHeight)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }, [time, glProgram, glTimeUniform, glResolutionUniform, canvasWidth, canvasHeight, gl])

  return (
    <section ref={containerRef} className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* WebGL Background */}
      <canvas id="hero-canvas" className="absolute inset-0 w-full h-full -z-10" aria-hidden="true" />

      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <motion.div
          style={{
            y: smoothY,
            opacity: smoothOpacity,
            scale: smoothScale,
          }}
          className="max-w-4xl mx-auto"
          dir={dir}
        >
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <h1
                className={cn(
                  "text-6xl md:text-8xl font-bold mb-6 tracking-tight",
                  "bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400",
                )}
              >
                {t.heroTitle}
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">{t.heroSubtitle}</p>
              <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto">{t.heroDescription}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="group relative overflow-hidden bg-white text-black hover:bg-white/90 text-lg px-8 h-14"
              >
                <span className="relative z-10 flex items-center gap-2">
                  👉 {t.launchUniverse}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 text-lg h-14"
                >
                  {t.tryOurAI}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 text-lg h-14"
                >
                  {t.joinEcosystem}
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white/80 rounded-full mt-2"
            animate={{
              y: [0, 15, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}
