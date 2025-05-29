"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Lens } from "@/components/magicui/lens"

// Sample artwork data with updated aesthetic
const artworks = [
  {
    id: 1,
    title: "Chromatic Dreams",
    category: "Digital Art",
    image: "https://picsum.photos/600/800?grayscale&random=1",
    color: "#FF1493",
    description:
      "A vibrant exploration of color theory and digital manipulation, creating dreamlike landscapes that blur the line between reality and imagination.",
    year: 2023,
    medium: "Digital Art",
    dimensions: "3840 × 2160 px",
  },
  {
    id: 2,
    title: "Fluid Emotions",
    category: "Painting",
    image: "https://picsum.photos/600/800?grayscale&random=2",
    color: "#00BFFF",
    description:
      "An abstract expressionist piece that captures the fluidity of human emotions through bold brushstrokes and dynamic color transitions.",
    year: 2023,
    medium: "Acrylic on Canvas",
    dimensions: "48 × 36 inches",
  },
  {
    id: 3,
    title: "Geometric Soul",
    category: "Mixed Media",
    image: "https://picsum.photos/600/800?grayscale&random=3",
    color: "#32CD32",
    description:
      "A harmonious blend of geometric precision and organic forms, exploring the intersection of mathematics and spirituality.",
    year: 2022,
    medium: "Mixed Media",
    dimensions: "24 × 24 inches",
  },
  {
    id: 4,
    title: "Neon Wilderness",
    category: "Digital Art",
    image: "https://picsum.photos/600/800?grayscale&random=4",
    color: "#FFD700",
    description:
      "A cyberpunk-inspired landscape that reimagines nature through the lens of technology and artificial illumination.",
    year: 2023,
    medium: "Digital Art",
    dimensions: "4096 × 2048 px",
  },
  {
    id: 5,
    title: "Abstract Thoughts",
    category: "Painting",
    image: "https://picsum.photos/600/800?grayscale&random=5",
    color: "#8A2BE2",
    description:
      "A contemplative piece that visualizes the complexity of human consciousness through layered textures and ethereal forms.",
    year: 2022,
    medium: "Oil on Canvas",
    dimensions: "36 × 48 inches",
  },
  {
    id: 6,
    title: "Vibrant Chaos",
    category: "Mixed Media",
    image: "https://picsum.photos/600/800?grayscale&random=6",
    color: "#FF5757",
    description:
      "An energetic composition that finds beauty in disorder, celebrating the unpredictable nature of creative expression.",
    year: 2023,
    medium: "Mixed Media",
    dimensions: "30 × 40 inches",
  },
]

interface Artwork {
  id: number
  title: string
  category: string
  image: string
  color: string
  description: string
  year: number
  medium: string
  dimensions: string
}

export default function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState("All")

  const categories = ["All", "Digital Art", "Painting", "Mixed Media", "Illustration"]

  const filteredArtworks =
    activeCategory === "All" ? artworks : artworks.filter((artwork) => artwork.category === activeCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const cardHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  }

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="py-32 bg-white dark:bg-gray-950 relative overflow-hidden"
      aria-labelledby="gallery-section-title"
    >
      {/* Hidden accessible title for screen readers */}
      <h2 id="gallery-section-title" className="sr-only">
        Gallery Section: Selected Works
      </h2>

      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 bg-pink-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-6xl md:text-7xl font-serif font-light text-gray-900 dark:text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Selected
            <motion.span
              className="block italic text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Works
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A curated collection of my most impactful pieces, each crafted with intention and artistic vision.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={activeCategory === category ? "default" : "outline"}
                className="rounded-full border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-light transition-all duration-300"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <AnimatePresence mode="wait">
            {filteredArtworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                variants={itemVariants}
                layout
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="cursor-pointer"
              >
                <motion.div
                  className="group relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800"
                  variants={cardHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <Lens zoomFactor={1.6}>
                      <Image
                        src={artwork.image || "/placeholder.svg"}
                        alt={artwork.title}
                        width={600}
                        height={800}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </Lens>
                  </div>

                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.h3
                      className="text-white text-2xl font-bold mb-2"
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {artwork.title}
                    </motion.h3>
                    <motion.p
                      className="text-white/80 text-sm"
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {artwork.category}, {artwork.year}
                    </motion.p>
                  </motion.div>

                  {/* Color accent */}
                  <div
                    className="absolute top-4 right-4 w-4 h-4 rounded-full opacity-80"
                    style={{ backgroundColor: artwork.color }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <Link href="/gallery">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-full px-8 py-4 font-medium group"
              >
                View All Work
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
