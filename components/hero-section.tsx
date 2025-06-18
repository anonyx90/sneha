"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { ArrowDown } from 'lucide-react'
import Link from "next/link"
import ParticleBackground from "./particleBg"
import { client } from "@/sanity/lib/client"
import { galleryQuery } from "@/sanity/lib/queries"

const geometricElements = [
  { id: 1, size: 120, color: "#FF1493", position: { top: "15%", left: "8%" }, delay: 0, content: "CREATIVE" },
  { id: 2, size: 80, color: "#00BFFF", position: { top: "25%", right: "12%" }, delay: 0.2, content: "2024" },
  { id: 3, size: 100, color: "#32CD32", position: { bottom: "30%", left: "15%" }, delay: 0.4, content: "ART" },
  { id: 4, size: 90, color: "#FFD700", position: { bottom: "20%", right: "20%" }, delay: 0.6, content: "STUDIO" },
  { id: 5, size: 60, color: "#8A2BE2", position: { top: "45%", left: "5%" }, delay: 0.8, content: "★" },
]

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [loadingComplete, setLoadingComplete] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: (e.clientY / window.innerHeight) * 2 - 1,
    })
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  useEffect(() => {
    // Check if loading screen has completed - reduced delay
    const timer = setTimeout(() => {
      setLoadingComplete(true)
    }, 1200) // Slightly after loading screen (3s + 200ms buffer)

    return () => clearTimeout(timer)
  }, [])

   type GalleryImage = {
     _id: string
     imageUrl: string
     title: string
     category: string
   }
   const [images, setImages] = useState<GalleryImage[]>([])

  useEffect(() => {
    client.fetch(galleryQuery).then((data) => {
      setImages(data)
       console.log("Fetched images:", images )
    })
   
  }, [])
      
  return (
    <section
      ref={containerRef}
      aria-label="Hero section"
      className="relative h-screen flex pt-44 items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-950"
    >
      <ParticleBackground />

      {/* Floating Elements */}
      {geometricElements.map(({ id, size, color, position, delay, content }) => (
        <motion.div
          key={id}
          className="absolute rounded-full flex items-center justify-center text-white font-bold z-10"
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            ...position,
          }}
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={
            loadingComplete
              ? {
                  scale: 1,
                  rotate: 0,
                  opacity: 1,
                  y: prefersReducedMotion ? 0 : [0, -10, 0],
                  x: mousePosition.x * (id * 2),
                }
              : { scale: 0, rotate: -180, opacity: 0 }
          }
          transition={{
            scale: { duration: 0.8, delay: 0.2 + delay },
            rotate: { duration: 0.8, delay: 0.2 + delay },
            opacity: { duration: 0.8, delay: 0.2 + delay },
            y: prefersReducedMotion
              ? undefined
              : { duration: 3 + id, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            x: { duration: 0.3 },
          }}
          whileHover={!prefersReducedMotion ? { scale: 1.1, rotate: 15 } : undefined}
        >
          <span className="text-xs md:text-sm font-bold">{content}</span>
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="container relative z-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={loadingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-16"
          >
            <motion.h1
              className="text-6xl md:text-6xl lg:text-[12rem] font-serif font-light leading-none tracking-tight"
              style={{ y }}
            >
              <span className="block text-blue-900 dark:text-blue">BORING</span>
                <span className="block text-pink-400 dark:text-gray-600 italic text-4xl md:text-4xl lg:text-6xl">IS BAD</span>
              <span className="relative text-yellow-500 dark:text-yellow-400">
                For ART
                <svg
                  viewBox="0 0 286 73"
                  fill="none"
                  className="absolute -left-2 -right-2 -top-2 bottom-0 translate-y-1"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={loadingComplete ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{
                      duration: 1.25,
                      ease: "easeInOut",
                      delay: 1.0,
                    }}
                    d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
                    stroke="#FACC15"
                    strokeWidth="3"
                  />
                </svg>
              </span>
            </motion.h1>
          </motion.div>

          <motion.p
            className="max-w-2xl mx-auto mb-12 text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={loadingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            A creative, disruptive, and innovative artist dedicated to challenging boundaries through{" "}
            <span className="text-pink-500 font-medium">color</span>,
            <span className="text-blue-500 font-medium"> form</span>, and
            <span className="text-purple-500 font-medium"> emotion</span>.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={loadingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Link href="#gallery">
              <motion.button type="button" className="btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                View Portfolio
              </motion.button>
            </Link>
            <Link href="#contact">
              <motion.button
                type="button"
                className="relative flex items-center px-8 py-4 overflow-hidden font-medium text-lg transition-all bg-indigo-500 rounded-md group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute top-0 right-0 w-5 h-5 transition-all duration-500 bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                  <span className="absolute top-0 right-0 w-6 h-6 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                </span>
                <span className="absolute bottom-0 left-0 w-5 h-5 rotate-180 transition-all duration-500 bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4">
                  <span className="absolute top-0 right-0 w-6 h-6 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                </span>
                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0" />
                <span className="relative w-full text-left text-white transition-colors duration-200 group-hover:text-white">
                  Stay In Touch
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 right-12 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={loadingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{ opacity }}
      >
        <motion.div
          className="flex flex-col items-center gap-4 text-gray-600 dark:text-gray-400"
          animate={loadingComplete ? { y: [0, 8, 0] } : { y: 0 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <span className="text-sm font-medium tracking-wider uppercase">Scroll</span>
          <motion.div
            className="w-px h-16 bg-gradient-to-b from-gray-400 to-transparent"
            initial={{ scaleY: 0 }}
            animate={loadingComplete ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1, delay: 2.0 }}
          />
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>

      {/* Decorative dots */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-pink-500 rounded-full" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-500 rounded-full" />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-500 rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-green-500 rounded-full" />
      </div>
       <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {images.map((img) => (
        <div key={img._id} className="border p-2 rounded shadow">
          <img
            src={img.imageUrl}
            alt={img.title}
            className="w-full h-auto rounded"
          />
          <h2 className="mt-2 font-semibold">{img.title}</h2>
          <p className="text-sm text-gray-500">{img.category}</p>
        </div>
      ))}
    </div>
    </section>
  )
}
