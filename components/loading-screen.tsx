"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [hasShown, setHasShown] = useState(false)
  const progressRef = useRef(0)
  const timerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // Check if we've already shown the loading screen in this session
    const sessionShown = sessionStorage.getItem("loadingShown")

    // Check if document is already loaded
    const isDocumentReady = document.readyState === "complete"

    if (sessionShown === "true" || isDocumentReady) {
      setIsLoading(false)
      setHasShown(true)
      return
    }

    // Start progress animation
    const startProgress = () => {
      timerRef.current = setInterval(() => {
        progressRef.current += Math.random() * 8 + 2

        if (progressRef.current >= 95) {
          progressRef.current = 95
          clearInterval(timerRef.current!)
        }

        setProgress(Math.min(progressRef.current, 95))
      }, 80)
    }

    // Handle window load event
    const handleLoad = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }

      // Complete the progress
      progressRef.current = 100
      setProgress(100)

      // Hide loading screen after a brief delay
      setTimeout(() => {
        setIsLoading(false)
        setHasShown(true)
        sessionStorage.setItem("loadingShown", "true")
      }, 600)
    }

    // Handle document ready state changes
    const handleReadyStateChange = () => {
      if (document.readyState === "interactive") {
        progressRef.current = Math.max(progressRef.current, 60)
        setProgress(progressRef.current)
      } else if (document.readyState === "complete") {
        handleLoad()
      }
    }

    // Start progress immediately
    startProgress()

    // Add event listeners
    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
      document.addEventListener("readystatechange", handleReadyStateChange)
    }

    // Fallback timeout to ensure loading doesn't hang
    const fallbackTimeout = setTimeout(() => {
      handleLoad()
    }, 5000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      window.removeEventListener("load", handleLoad)
      document.removeEventListener("readystatechange", handleReadyStateChange)
      clearTimeout(fallbackTimeout)
    }
  }, [])

  // Don't render anything if we've already shown the loading screen
  if (hasShown && !isLoading) {
    return null
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
        >
          <div className="text-center">
            <motion.div
              className="mb-8 text-6xl md:text-8xl font-bold text-white tracking-wider"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              FRAMER
            </motion.div>

            <motion.div
              className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-white to-gray-300 rounded-full origin-left"
                style={{ width: `${progress}%` }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
              />
            </motion.div>

            <motion.div
              className="mt-6 text-white/60 font-mono text-sm tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {Math.round(progress)}%
            </motion.div>

            {/* Optional: Add a subtle loading indicator */}
            <motion.div
              className="mt-8 flex justify-center space-x-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-white/40 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 1, 0.4],
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}
