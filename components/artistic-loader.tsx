"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ArtisticLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-fuchsia-600 via-violet-700 to-indigo-800"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative w-64 h-64">
            {/* Animated shapes */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                initial={{ rotate: 0, scale: 1 }}
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <div
                  className="w-full h-full rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 opacity-30 blur-xl"
                  style={{
                    transform: `rotate(${i * 45}deg) translateX(${i * 10}px)`,
                  }}
                />
              </motion.div>
            ))}

            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center">
                <motion.div
                  className="mb-6 text-5xl md:text-6xl font-serif font-bold text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  ARTFOLIO
                </motion.div>

                <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
