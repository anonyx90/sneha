"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

const achievements = [
  { year: "2024", title: "Featured Artist", venue: "MoMA Contemporary" },
  { year: "2023", title: "Solo Exhibition", venue: "Tate Modern Gallery" },
  { year: "2022", title: "Digital Art Prize", venue: "Venice Biennale" },
  { year: "2021", title: "Emerging Artist Award", venue: "Whitney Museum" },
]

const credentials = [
  "MFA Fine Arts, Yale School of Art",
  "BFA Digital Media, Parsons School of Design",
  "Resident Artist, Banff Centre for Arts",
  "Guest Lecturer, RISD",
]

export default function ArtistSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section id="artist" ref={containerRef} className="py-32 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Minimal background elements */}
      <div className="absolute top-40 right-10 w-24 h-24 bg-pink-500/5 rounded-full blur-2xl" />
      <div className="absolute bottom-40 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left side - Image and geometric elements */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Main artist image */}
              <div className="relative h-[600px] w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden">
                  <Image
                  src="https://www.vets4pets.com/siteassets/species/cat/two-cats-on-wall-in-sun.jpg"
                  alt="Artist portrait"
                  fill
                  className="object-cover"
                  />
                </div>
              </div>

              {/* Floating credential badge */}
              <motion.div
                className="absolute -top-8 -right-8 w-32 h-32 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm z-10"
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.1, rotate: 15 }}
              >
                <div className="text-center">
                  <div className="text-xs">YALE</div>
                  <div className="text-lg">MFA</div>
                </div>
              </motion.div>

              {/* Small accent element */}
              <motion.div
                className="absolute -bottom-6 -left-6 w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs z-10"
                initial={{ scale: 0, rotate: 180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: 180 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                whileHover={{ scale: 1.1, rotate: -15 }}
              >
                10+ YRS
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header */}
            <div>
              <motion.div
                className="text-sm font-light text-gray-500 dark:text-gray-400 mb-4 tracking-wider uppercase"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                The Artist
              </motion.div>

              <motion.h2
                className="text-5xl md:text-6xl font-serif font-light text-gray-900 dark:text-white mb-6 tracking-tight leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Elena
                <span className="block italic text-gray-500 dark:text-gray-400">Rodriguez</span>
              </motion.h2>
            </div>

            {/* Bio */}
            <motion.div
              className="space-y-6 text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p>
                Elena Rodriguez is a contemporary visual artist whose work explores the intersection of{" "}
                <span className="text-pink-500 font-medium">digital innovation</span> and{" "}
                <span className="text-blue-500 font-medium">traditional craftsmanship</span>. Based between New York and
                Barcelona, her practice spans multiple mediums including digital art, mixed media installations, and
                experimental painting.
              </p>

              <p>
                With over a decade of experience, Elena has developed a distinctive visual language that challenges
                conventional boundaries between the physical and digital realms. Her work has been featured in major
                galleries worldwide and collected by prominent institutions.
              </p>

              <p>
                Elena holds an MFA from Yale School of Art and has been recognized with numerous awards for her
                innovative approach to contemporary art practice.
              </p>
            </motion.div>

            {/* Credentials */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3 className="text-xl font-serif font-medium text-gray-900 dark:text-white mb-6">
                Education & Background
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {credentials.map((credential, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-400"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  >
                    <div className="w-1.5 h-1.5 bg-pink-500 rounded-full flex-shrink-0" />
                    <span className="font-light">{credential}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <h3 className="text-xl font-serif font-medium text-gray-900 dark:text-white mb-6">Recent Recognition</h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-6 pb-4 border-b border-gray-200 dark:border-gray-800 last:border-b-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400 w-12 flex-shrink-0 pt-1">
                      {achievement.year}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white mb-1">{achievement.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-light">{achievement.venue}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
