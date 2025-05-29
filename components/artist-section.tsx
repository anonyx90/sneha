"use client"

import { useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
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

// Animation variants for better performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

// Add this after the slideInRight animation variant
// CSS animation for signature drawing effect
const signatureAnimation = `
@keyframes draw {
  from {
    stroke-dashoffset: 1;
  }
  to {
    stroke-dashoffset: 0;
  }
}
.animate-draw {
  animation: draw 2s ease-in-out forwards;
}
`

export default function ArtistSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  const isInView = useInView(containerRef, {
    once: true,
    margin: "-100px",
    amount: 0.3,
  })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const floatingBadgeY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])

  return (
    <section
      id="artist"
      ref={containerRef}
      className="py-20 md:py-32 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
      aria-labelledby="artist-heading"
    >
      <style jsx>{signatureAnimation}</style>
      {/* Enhanced background elements with parallax */}
      <motion.div
        className="absolute top-40 right-10 w-24 h-24 bg-gradient-to-br from-pink-500/10 to-purple-500/5 rounded-full blur-2xl"
        style={{ y: backgroundY }}
      />
      <motion.div
        className="absolute bottom-40 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-full blur-2xl"
        style={{ y: backgroundY }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-40 h-40 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        style={{ y: backgroundY }}
      />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Left side - Enhanced image section */}
          <motion.div className="relative" variants={slideInLeft}>
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Main artist image with loading state */}
              <motion.div
                ref={imageRef}
                className="relative h-[500px] sm:h-[600px] w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-2xl overflow-hidden shadow-2xl">
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                  <Image
                    src="https://www.vets4pets.com/siteassets/species/cat/two-cats-on-wall-in-sun.jpg"
                    alt="Elena Rodriguez, contemporary visual artist portrait"
                    fill
                    className={`object-cover transition-opacity duration-500 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Decorative frame */}
                <div className="absolute -inset-4 bg-gradient-to-br from-pink-500/20 to-blue-500/20 rounded-3xl -z-10 blur-xl" />
              </motion.div>

              {/* Enhanced floating credential badge */}
              <motion.div
                className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm z-10 shadow-xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                transition={{ duration: 0.8, delay: 0.6, type: "spring", bounce: 0.4 }}
                whileHover={{
                  scale: 1.1,
                  rotate: 15,
                  boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)",
                }}
                style={{ y: floatingBadgeY }}
                aria-label="Yale MFA Credential"
              >
                <div className="text-center">
                  <div className="text-xs opacity-90">YALE</div>
                  <div className="text-lg font-bold">MFA</div>
                </div>
              </motion.div>

              {/* Enhanced accent element */}
              <motion.div
                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs z-10 shadow-xl"
                initial={{ scale: 0, rotate: 180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: 180 }}
                transition={{ duration: 0.8, delay: 0.8, type: "spring", bounce: 0.4 }}
                whileHover={{
                  scale: 1.1,
                  rotate: -15,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                }}
                aria-label="10 years experience"
              >
                <div className="text-center">
                  <div className="text-[10px] opacity-90">10+</div>
                  <div className="text-xs font-bold">YRS</div>
                </div>
              </motion.div>
            </div>

            {/* Add decorative elements and additional content below the image */}
            <motion.div
              className="mt-12 space-y-6 max-w-md mx-auto lg:mx-0"
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.9 }}
            >
              {/* Artist signature */}
              <motion.div className="flex justify-center" whileHover={{ scale: 1.05 }}>
                <svg
                  className="h-16 w-auto text-pink-500 dark:text-pink-400"
                  viewBox="0 0 200 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10,25 C30,5 50,45 70,25 C90,5 110,45 130,25 C150,5 170,45 190,25"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    pathLength="1"
                    strokeDasharray="1"
                    strokeDashoffset="0"
                    className="animate-draw"
                  />
                </svg>
              </motion.div>

              {/* Social presence and online platforms */}
              <div className="pt-4">
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                  Find My Work
                </p>
                <div className="flex flex-wrap justify-center gap-6 opacity-70">
                  <motion.div
                    className="h-6 flex items-center text-gray-400 dark:text-gray-500 font-medium text-sm"
                    whileHover={{ scale: 1.1, color: "#ec4899" }}
                  >
                    Instagram
                  </motion.div>
                  <motion.div
                    className="h-6 flex items-center text-gray-400 dark:text-gray-500 font-medium text-sm"
                    whileHover={{ scale: 1.1, color: "#ec4899" }}
                  >
                    Etsy
                  </motion.div>
                  <motion.div
                    className="h-6 flex items-center text-gray-400 dark:text-gray-500 font-medium text-sm"
                    whileHover={{ scale: 1.1, color: "#ec4899" }}
                  >
                    Local Gallery
                  </motion.div>
                </div>

                {/* Add follower count or engagement stats */}
                <div className="flex justify-center gap-8 mt-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">12.5K</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Followers</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">450+</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Pieces Sold</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">25</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Shows</div>
                  </div>
                </div>
              </div>

              {/* Decorative pattern */}
              <motion.div
                className="absolute -bottom-12 -left-12 w-48 h-48 opacity-10 dark:opacity-5 -z-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <div className="w-full h-full border-2 border-pink-500 rounded-full" />
                <div className="absolute inset-4 border-2 border-blue-500 rounded-full" />
                <div className="absolute inset-8 border-2 border-purple-500 rounded-full" />
                <div className="absolute inset-12 border-2 border-pink-500 rounded-full" />
                <div className="absolute inset-16 border-2 border-blue-500 rounded-full" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right side - Enhanced content */}
          <motion.div className="space-y-8 lg:space-y-12" variants={slideInRight}>
            {/* Header */}
            <header>
              <motion.div
                className="text-sm font-light text-gray-500 dark:text-gray-400 mb-4 tracking-wider uppercase"
                variants={itemVariants}
              >
                The Artist
              </motion.div>

              <motion.h2
                id="artist-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-gray-900 dark:text-white mb-6 tracking-tight leading-tight"
                variants={itemVariants}
              >
                Elena
                <span className="block italic text-gray-500 dark:text-gray-400 text-3xl sm:text-4xl lg:text-5xl">
                  Rodriguez
                </span>
              </motion.h2>
            </header>

            {/* Enhanced bio */}
            <motion.div
              className="space-y-4 lg:space-y-6 text-base lg:text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed"
              variants={itemVariants}
            >
              <p>
                Elena Rodriguez is a contemporary visual artist whose work explores the intersection of{" "}
                <span className="text-pink-500 font-medium hover:text-pink-600 transition-colors">
                  digital innovation
                </span>{" "}
                and{" "}
                <span className="text-blue-500 font-medium hover:text-blue-600 transition-colors">
                  traditional craftsmanship
                </span>
                . Based between New York and Barcelona, her practice spans multiple mediums including digital art, mixed
                media installations, and experimental painting.
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

            {/* Enhanced credentials */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-serif font-medium text-gray-900 dark:text-white mb-6">
                Education & Background
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {credentials.map((credential, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-400 group cursor-default"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      className="w-1.5 h-1.5 bg-pink-500 rounded-full flex-shrink-0 group-hover:bg-pink-600 transition-colors"
                      whileHover={{ scale: 1.5 }}
                    />
                    <span className="font-light group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                      {credential}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Enhanced achievements */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-serif font-medium text-gray-900 dark:text-white mb-6">Recent Recognition</h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                    whileHover={{ x: 5, backgroundColor: "rgba(0,0,0,0.02)" }}
                    className="flex items-start gap-4 lg:gap-6 pb-4 border-b border-gray-200 dark:border-gray-800 last:border-b-0 group cursor-default hover:bg-gray-50/50 dark:hover:bg-gray-800/50 -mx-4 px-4 rounded-lg transition-all duration-200"
                  >
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400 w-12 flex-shrink-0 pt-1 group-hover:text-pink-500 transition-colors">
                      {achievement.year}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white mb-1 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                        {achievement.title}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-light">{achievement.venue}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Call to action */}
            <motion.div variants={itemVariants} className="pt-4">
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="View Elena's portfolio"
              >
                View Portfolio
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
