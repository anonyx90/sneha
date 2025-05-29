"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Lens } from "./magicui/lens"

// Sample artwork data
const artworks = [
  {
    id: 1,
    title: "Ethereal Dreams",
    category: "Paintings",
    year: 2023,
    image: "https://picsum.photos/600/800?grayscale&random=6",
    description: "Oil on canvas exploring themes of consciousness and dreams.",
  },
  {
    id: 2,
    title: "Urban Fragments",
    category: "Digital",
    year: 2022,
    image: "https://picsum.photos/600/800?grayscale&random=7",
    description: "Digital collage representing urban life and its complexities.",
  },
  {
    id: 3,
    title: "Harmony in Bronze",
    category: "Sculptures",
    year: 2023,
    image: "https://picsum.photos/600/800?grayscale&random=8",
    description: "Bronze sculpture exploring balance and harmony in form.",
  },
  {
    id: 4,
    title: "Reflections",
    category: "Paintings",
    year: 2021,
    image: "https://picsum.photos/600/800?grayscale&random=9",
    description: "Acrylic on canvas depicting reflections on water surfaces.",
  },
  {
    id: 5,
    title: "Digital Dystopia",
    category: "Digital",
    year: 2022,
    image: "https://picsum.photos/600/800?grayscale&random=10",
    description: "Digital art exploring themes of technology and society.",
  },
  {
    id: 6,
    title: "Spatial Concept",
    category: "Installations",
    year: 2023,
    image: "https://picsum.photos/600/800?grayscale&random=11",
    description: "Mixed media installation examining space and perception.",
  },
  {
    id: 7,
    title: "Chromatic Fusion",
    category: "Paintings",
    year: 2021,
    image: "https://picsum.photos/600/800?grayscale&random=12",
    description: "Oil on canvas exploring color theory and emotional response.",
  },
  {
    id: 8,
    title: "Geometric Harmony",
    category: "Sculptures",
    year: 2022,
    image: "https://picsum.photos/600/800?grayscale&random=13",
    description: "Marble sculpture focusing on geometric patterns and forms.",
  },
  {
    id: 9,
    title: "Virtual Landscapes",
    category: "Digital",
    year: 2023,
    image: "https://picsum.photos/600/800?grayscale&random=14",
    description: "Digital artwork creating imaginary landscapes and environments.",
  },
  {
    id: 10,
    title: "Temporal Shift",
    category: "Installations",
    year: 2021,
    image: "https://picsum.photos/600/800?grayscale&random=15",
    description: "Interactive installation exploring concepts of time and change.",
  },
  {
    id: 11,
    title: "Abstract Emotions",
    category: "Paintings",
    year: 2022,
    image: "https://picsum.photos/600/800?grayscale&random=16",
    description: "Abstract expressionist painting capturing raw emotional states.",
  },
  {
    id: 12,
    title: "Digital Metamorphosis",
    category: "Digital",
    year: 2023,
    image: "https://picsum.photos/600/800?grayscale&random=17",
    description: "Digital artwork exploring transformation and evolution.",
  },
]

interface GalleryGridProps {
  category?: string
  limit?: number
}

export default function GalleryGrid({ category = "All", limit }: GalleryGridProps) {
  const [selectedArtwork, setSelectedArtwork] = useState<(typeof artworks)[0] | null>(null)

  const filteredArtworks = category === "All" ? artworks : artworks.filter((artwork) => artwork.category === category)
  const displayedArtworks = limit ? filteredArtworks.slice(0, limit) : filteredArtworks

  return (
    <>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        {displayedArtworks.map((artwork, index) => (
          <motion.div
            key={artwork.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => setSelectedArtwork(artwork)}
          >
            <div className="relative overflow-hidden rounded-lg">
              <div className="aspect-square overflow-hidden">
                <Lens zoomFactor={1.6}>
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    width={800}
                    height={800}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                </Lens>
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white text-xl font-bold">{artwork.title}</h3>
                <p className="text-white/80 text-sm">
                  {artwork.category}, {artwork.year}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Dialog open={!!selectedArtwork} onOpenChange={() => setSelectedArtwork(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedArtwork && (
            <>
              <DialogHeader className="px-6 pt-6">
                <DialogTitle>{selectedArtwork.title}</DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative aspect-square">
                  <Image
                    src={selectedArtwork.image}
                    alt={selectedArtwork.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col">
                  <p className="text-muted-foreground mb-4">
                    {selectedArtwork.category}, {selectedArtwork.year}
                  </p>
                  <p className="mb-6">{selectedArtwork.description}</p>
                  <div className="mt-auto">
                    <p className="text-sm text-muted-foreground">
                      Interested in this piece?{" "}
                      <a href="/contact" className="text-primary hover:underline">
                        Contact for pricing
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}