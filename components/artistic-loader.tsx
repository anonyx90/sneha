"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function RevampedArtisticLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const timeoutRefs = useRef<NodeJS.Timeout[]>([])

  const phases = ["INITIALIZING", "LOADING ASSETS", "CRAFTING EXPERIENCE", "ALMOST READY", "WELCOME"]

  // Clear all timeouts on unmount
  const clearAllTimeouts = () => {
    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout))
    timeoutRefs.current = []
  }

  useEffect(() => {
    // Mark as mounted
    setIsMounted(true)

    // Small delay to ensure component is fully mounted
    const startDelay = setTimeout(() => {
      let progressValue = 0
      let phaseIndex = 0

      // Progress animation
      const progressInterval = setInterval(() => {
        progressValue += Math.random() * 4 + 2

        if (progressValue >= 100) {
          progressValue = 100
          clearInterval(progressInterval)
        }

        setProgress(Math.min(progressValue, 100))
      }, 60)

      // Phase progression
      const phaseInterval = setInterval(() => {
        if (phaseIndex < phases.length - 1) {
          phaseIndex++
          setCurrentPhase(phaseIndex)
        }
      }, 600)

      // Force completion after 3 seconds
      const completionTimeout = setTimeout(() => {
        clearInterval(progressInterval)
        clearInterval(phaseInterval)

        setProgress(100)
        setCurrentPhase(phases.length - 1)

        // Exit after brief delay
        const exitTimeout = setTimeout(() => {
          setIsLoading(false)
        }, 400)

        timeoutRefs.current.push(exitTimeout)
      }, 3000)

      timeoutRefs.current.push(completionTimeout)

      // Cleanup function
      return () => {
        clearInterval(progressInterval)
        clearInterval(phaseInterval)
        clearTimeout(completionTimeout)
      }
    }, 100) // 100ms delay to ensure proper mounting

    timeoutRefs.current.push(startDelay)

    return () => {
      clearTimeout(startDelay)
      clearAllTimeouts()
    }
  }, [])

  // Don't render until mounted (prevents SSR issues)
  if (!isMounted) {
    return null
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          }}
          exit={{
            y: "-100%",
            transition: {
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
        >
          {/* Animated background */}
          <div className="absolute inset-0">
            {/* Gradient orbs */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`orb-${i}`}
                className="absolute rounded-full mix-blend-screen filter blur-xl opacity-40"
                style={{
                  background: `radial-gradient(circle, ${
                    ["#ff006e", "#8338ec", "#3a86ff", "#06ffa5", "#ffbe0b", "#fb5607"][i]
                  } 0%, transparent 70%)`,
                  width: `${200 + i * 50}px`,
                  height: `${200 + i * 50}px`,
                  left: `${10 + i * 15}%`,
                  top: `${10 + i * 10}%`,
                }}
                animate={{
                  x: [0, 100, -50, 0],
                  y: [0, -80, 60, 0],
                  scale: [1, 1.2, 0.8, 1],
                }}
                transition={{
                  duration: 15 + i * 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Subtle floating particles */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, -100, -20],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 4,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 flex items-center justify-center min-h-screen">
            <div className="text-center">
              {/* Logo/Title */}
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.h1
                  className="text-7xl md:text-9xl font-bold text-white mb-4"
                  style={{
                    background: "linear-gradient(45deg, #ff006e, #8338ec, #3a86ff)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundSize: "200% 200%",
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  ARTFOLIO
                </motion.h1>
              </motion.div>

              {/* Progress section */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {/* Progress bar */}
                <div className="w-80 h-1 bg-white/15 rounded-full mx-auto mb-6 overflow-hidden backdrop-blur-sm">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #ff006e, #8338ec, #3a86ff)",
                      width: `${progress}%`,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>

                {/* Progress percentage */}
                <motion.div
                  className="text-2xl font-light text-white/90 mb-4"
                  key={`progress-${Math.round(progress)}`}
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 1 }}
                >
                  {Math.round(progress)}%
                </motion.div>

                {/* Phase text */}
                <motion.div
                  className="text-sm text-white/70 tracking-[0.3em] font-light"
                  key={`phase-${currentPhase}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {phases[currentPhase]}
                </motion.div>
              </motion.div>

              {/* Animated dots */}
              <motion.div
                className="flex justify-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`dot-${i}`}
                    className="w-3 h-3 bg-white/50 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/30"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          />
          <motion.div
            className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-white/30"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          />
          <motion.div
            className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-white/30"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/30"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
