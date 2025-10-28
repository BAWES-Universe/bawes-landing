"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cursorOuterRef = useRef<HTMLDivElement>(null)
  const cursorInnerRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number | null>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseenter", onMouseEnter)
      document.addEventListener("mouseleave", onMouseLeave)
      document.addEventListener("mousedown", onMouseDown)
      document.addEventListener("mouseup", onMouseUp)
    }

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const onMouseDown = () => {
      setClicked(true)
    }

    const onMouseUp = () => {
      setClicked(false)
    }

    const onMouseLeave = () => {
      setHidden(true)
    }

    const onMouseEnter = () => {
      setHidden(false)
    }

    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, select').forEach((el) => {
        el.addEventListener("mouseenter", () => setLinkHovered(true))
        el.addEventListener("mouseleave", () => setLinkHovered(false))
      })
    }

    addEventListeners()
    handleLinkHoverEvents()

    return () => {
      removeEventListeners()
    }
  }, [])

  return (
    <>
      <motion.div
        ref={cursorOuterRef}
        className={cn(
          "fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference",
          hidden || !isVisible ? "opacity-0" : "opacity-100",
        )}
        animate={{
          x: position.x - (linkHovered ? 16 : 16),
          y: position.y - (linkHovered ? 16 : 16),
          scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <motion.div
          className="w-full h-full rounded-full bg-white"
          animate={{
            scale: clicked ? 0.8 : 1,
          }}
        />
      </motion.div>

      <motion.div
        ref={cursorInnerRef}
        className={cn(
          "fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference",
          hidden || !isVisible ? "opacity-0" : "opacity-100",
        )}
        animate={{
          x: position.x - 1,
          y: position.y - 1,
        }}
        transition={{
          type: "spring",
          stiffness: 2000,
          damping: 50,
          mass: 0.1,
        }}
      />

      {/* Cursor trail */}
      {isVisible &&
        Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="fixed top-0 left-0 w-1 h-1 rounded-full bg-white pointer-events-none z-[9998] mix-blend-difference opacity-50"
            animate={{
              x: position.x,
              y: position.y,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              mass: 0.1,
              delay: i * 0.02,
            }}
          />
        ))}
    </>
  )
}
