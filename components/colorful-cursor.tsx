"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useTheme } from "next-themes"

export default function ColorfulCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [cursorColor, setCursorColor] = useState("#FF5757")
  const { theme } = useTheme()

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // Array of vibrant colors
  const colors = [
    "#FF5757", // Red
    "#FF8C00", // Orange
    "#FFD700", // Yellow
    "#32CD32", // Lime Green
    "#00BFFF", // Deep Sky Blue
    "#8A2BE2", // Blue Violet
    "#FF1493", // Deep Pink
  ]

  useEffect(() => {
    // Only enable custom cursor on desktop
    if (window.innerWidth < 768) {
      return
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      setIsVisible(true)
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    // Change cursor color randomly every 2 seconds
    const colorInterval = setInterval(() => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      setCursorColor(randomColor)
    }, 2000)

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, textarea')

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseenter", () => setIsVisible(true))
    window.addEventListener("mouseleave", () => setIsVisible(false))

    return () => {
      clearInterval(colorInterval)
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseenter", () => setIsVisible(true))
      window.removeEventListener("mouseleave", () => setIsVisible(false))

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [cursorX, cursorY, colors])

  // Only show custom cursor on desktop
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          backgroundColor: cursorColor,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: { duration: 0.2 },
          opacity: { duration: 0.2 },
        }}
      />

      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-50 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          backgroundColor: theme === "dark" ? "white" : "black",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          opacity: { duration: 0.2 },
        }}
      />
    </>
  )
}
