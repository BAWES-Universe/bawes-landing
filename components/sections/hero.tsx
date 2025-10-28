"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"
import { ArrowRight } from "lucide-react"
import { useAnalytics } from "@/hooks/use-analytics"
import * as THREE from "three"

export default function Hero() {
  const { language, dir } = useLanguage()
  const t = translations[language]
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { trackEvent } = useAnalytics()
  const [isMounted, setIsMounted] = useState(false)

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const handleEnterUniverseClick = () => {
    trackEvent("enter_universe_clicked", { section: "hero", language })
    window.open("https://discord.gg/QnYt5AFGxS", "_blank")
  }

  const handleJoinEcosystemClick = () => {
    trackEvent("join_ecosystem_clicked", { section: "hero", language })
    window.open("https://discord.gg/QnYt5AFGxS", "_blank")
  }

  // WebGL effect
  useEffect(() => {
    if (!canvasRef.current) return
    setIsMounted(true)

    const canvas = canvasRef.current
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    })

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // Create a galaxy of particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 5000
    const posArray = new Float32Array(particlesCount * 3)
    const colors = new Float32Array(particlesCount * 3)

    // Gold color: rgb(159, 126, 47)
    const goldColor = new THREE.Color(0x9f7e2f)
    // Red color: rgb(240, 62, 47)
    const redColor = new THREE.Color(0xf03e2f)
    // Orange color: rgb(247, 148, 29)
    const orangeColor = new THREE.Color(0xf7941d)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      // Create a spiral galaxy shape
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 4 + 0.5
      const spiralOffset = Math.random() * 0.5

      posArray[i] = Math.cos(angle) * radius + (Math.random() - 0.5) * spiralOffset
      posArray[i + 1] = Math.sin(angle) * radius + (Math.random() - 0.5) * spiralOffset
      posArray[i + 2] = (Math.random() - 0.5) * 2

      // Color - blend between gold, red, and orange
      const colorChoice = Math.random()
      let color

      if (colorChoice < 0.33) {
        color = goldColor
      } else if (colorChoice < 0.66) {
        color = redColor
      } else {
        color = orangeColor
      }

      // Add some randomness to the colors
      colors[i] = color.r + (Math.random() - 0.5) * 0.1
      colors[i + 1] = color.g + (Math.random() - 0.5) * 0.1
      colors[i + 2] = color.b + (Math.random() - 0.5) * 0.1
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Animation
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0
    const windowHalfX = window.innerWidth / 2
    const windowHalfY = window.innerHeight / 2

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) / 100
      mouseY = (event.clientY - windowHalfY) / 100
    }

    document.addEventListener("mousemove", handleMouseMove)

    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Smooth follow for mouse movement
      targetX = mouseX * 0.3
      targetY = mouseY * 0.3

      // Rotate the entire particle system
      particlesMesh.rotation.y = elapsedTime * 0.05 + targetX
      particlesMesh.rotation.x = targetY

      // Add a subtle pulsing effect
      particlesMesh.scale.set(
        1 + Math.sin(elapsedTime * 0.5) * 0.05,
        1 + Math.sin(elapsedTime * 0.5) * 0.05,
        1 + Math.sin(elapsedTime * 0.5) * 0.05,
      )

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("mousemove", handleMouseMove)
      renderer.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
    }
  }, [isMounted])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* WebGL Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/80 -z-10" />

      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <motion.div
          style={{
            y,
            opacity,
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
              {/* Logo animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: 0.5,
                }}
                className="relative w-24 h-24 mb-6 flex items-center justify-center"
              >
                <motion.div
                  className="absolute w-full h-full rounded-full bg-gradient-to-r from-bawes-gold via-bawes-red to-bawes-orange opacity-30"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute w-[90%] h-[90%] rounded-full bg-gradient-to-r from-bawes-gold via-bawes-red to-bawes-orange opacity-20"
                  animate={{
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
                <motion.div className="relative w-16 h-16 z-10">
                  <motion.img
                    src="/images/bawes-logo.png"
                    alt="BAWES"
                    className="w-full h-full object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                </motion.div>
              </motion.div>

              <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight text-white">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80"
                >
                  BAWES
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="block bg-clip-text text-transparent bg-gradient-to-r from-bawes-gold via-bawes-red to-bawes-orange"
                >
                  Universe
                </motion.span>
              </h1>

              <motion.p
                className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                {t.heroSubtitle}
              </motion.p>

              <motion.p
                className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                {t.heroDescription}
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-bawes-gold via-bawes-red to-bawes-orange text-white hover:opacity-90 text-lg px-8 h-14"
                onClick={handleEnterUniverseClick}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t.enterUniverse}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 text-lg h-14 backdrop-blur-sm bg-transparent"
                onClick={handleJoinEcosystemClick}
              >
                {t.joinEcosystem}
              </Button>
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
          delay: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center">
          <motion.div
            className="w-1 h-3 bg-gradient-to-b from-bawes-gold to-bawes-red rounded-full mt-2"
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
