"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowDown } from "lucide-react"
import Link from "next/link"
import ParticleBackground from "./particleBg"


export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Mouse tracking for subtle parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Geometric elements data
  const geometricElements = [
    {
      id: 1,
      size: 120,
      color: "#FF1493",
      position: { top: "15%", left: "8%" },
      delay: 0,
      content: "CREATIVE",
    },
    {
      id: 2,
      size: 80,
      color: "#00BFFF",
      position: { top: "25%", right: "12%" },
      delay: 0.2,
      content: "2024",
    },
    {
      id: 3,
      size: 100,
      color: "#32CD32",
      position: { bottom: "30%", left: "15%" },
      delay: 0.4,
      content: "ART",
    },
    {
      id: 4,
      size: 90,
      color: "#FFD700",
      position: { bottom: "20%", right: "20%" },
      delay: 0.6,
      content: "STUDIO",
    },
    {
      id: 5,
      size: 60,
      color: "#8A2BE2",
      position: { top: "45%", left: "5%" },
      delay: 0.8,
      content: "★",
    },
  ]

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-950"
    >
      {/* Added Particle Background */}
      <ParticleBackground />

      {/* Geometric floating elements */}
      {geometricElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full flex items-center justify-center text-white font-bold z-10"
          style={{
            width: element.size,
            height: element.size,
            backgroundColor: element.color,
            ...element.position,
          }}
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{
            scale: 1,
            rotate: 0,
            opacity: 1,
            y: [0, -10, 0],
            x: mousePosition.x * (element.id * 2),
          }}
          transition={{
            scale: { duration: 0.8, delay: element.delay },
            rotate: { duration: 0.8, delay: element.delay },
            opacity: { duration: 0.8, delay: element.delay },
            y: { duration: 3 + element.id, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            x: { duration: 0.3 },
          }}
          whileHover={{ scale: 1.1, rotate: 15 }}
        >
          <span className="text-xs md:text-sm font-bold">{element.content}</span>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="container relative z-20">
        <div className="max-w-6xl mx-auto">
          {/* Main heading */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.h1
              className="text-7xl md:text-9xl lg:text-[12rem] font-serif font-light leading-none tracking-tight"
              style={{ y }}
            >
              <span className="block text-gray-900 dark:text-white">BORING</span>
              <span className="block text-gray-400 dark:text-gray-600 italic">IS BAD</span>
              <motion.span
                className="block bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent font-normal italic"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              >
                For Art
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Subtitle and description */}
          <motion.div
            className="max-w-2xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-light leading-relaxed">
              A creative, disruptive, and innovative artist dedicated to challenging boundaries through{" "}
              <span className="text-pink-500 font-medium">color</span>,
              <span className="text-blue-500 font-medium"> form</span>, and
              <span className="text-purple-500 font-medium"> emotion</span>.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Link href="#gallery">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-full px-8 py-6 text-lg font-medium group"
                >
                  View Portfolio
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </Link>

            <Link href="#contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full px-8 py-6 text-lg font-medium"
                >
                  Start Project
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{ opacity }}
      >
        <motion.div
          className="flex flex-col items-center gap-4 text-gray-600 dark:text-gray-400"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <span className="text-sm font-medium tracking-wider uppercase">Scroll</span>
          <motion.div
            className="w-px h-16 bg-gradient-to-b from-gray-400 to-transparent"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 2 }}
          />
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>

      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-pink-500 rounded-full" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-500 rounded-full" />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-500 rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-green-500 rounded-full" />
      </div>
    </section>
  )
}
