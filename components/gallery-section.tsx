"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import ArtworkCard from "@/components/artwork-card"

// Sample artwork data with updated aesthetic
const artworks = [
  {
    id: 1,
    title: "Chromatic Dreams",
    category: "Digital Art",
    image: "https://picsum.photos/600/800?grayscale&random=1",
    color: "#FF1493",
  },
  {
    id: 2,
    title: "Fluid Emotions",
    category: "Painting",
    image: "https://picsum.photos/600/800?grayscale&random=2",
    color: "#00BFFF",
  },
  {
    id: 3,
    title: "Geometric Soul",
    category: "Mixed Media",
    image: "https://picsum.photos/600/800?grayscale&random=3",
    color: "#32CD32",
  },
  {
    id: 4,
    title: "Neon Wilderness",
    category: "Digital Art",
    image: "https://picsum.photos/600/800?grayscale&random=4",
    color: "#FFD700",
  },
  {
    id: 5,
    title: "Abstract Thoughts",
    category: "Painting",
    image: "https://picsum.photos/600/800?grayscale&random=5",
    color: "#8A2BE2",
  },
  {
    id: 6,
    title: "Vibrant Chaos",
    category: "Mixed Media",
    image: "https://picsum.photos/600/800?grayscale&random=6",
    color: "#FF5757",
  }
]

export default function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const categories = ["All", "Digital Art", "Painting", "Mixed Media", "Illustration"]

  return (
    <section id="gallery" ref={containerRef} className="py-32 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Minimal background elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-pink-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl" />

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
            <span className="block italic text-gray-500 dark:text-gray-400">Works</span>
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
            <Button
              key={category}
              variant="outline"
              className="rounded-full border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-light"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
            >
              <ArtworkCard artwork={artwork} />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <Link href="/gallery">
            <Button
              size="lg"
              className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-full px-8 py-4 font-medium group"
            >
              View All Work
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
