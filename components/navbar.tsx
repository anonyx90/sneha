"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

const navItems = [
  { name: "Home", href: "/" },
    { name: "Artist", href: "#artist" },
  { name: "Gallery", href: "#gallery" },
  { name: "Process", href: "#process" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  // Scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      if (isHomePage) {
        const offsets = navItems
          .filter((item) => item.href.startsWith("#"))
          .map((item) => {
            const id = item.href.replace("#", "")
            const el = document.getElementById(id)
            if (!el) return null
            return {
              id,
              offsetTop: el.getBoundingClientRect().top,
            }
          })
          .filter(Boolean)

        let current = ""
        for (const section of offsets) {
          if (section!.offsetTop < window.innerHeight / 2) {
            current = section!.id
          }
        }
        setActiveSection(current)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHomePage])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    if (href.startsWith("#") && isHomePage) {
      return activeSection === href.replace("#", "")
    }
    return pathname === href
  }

  const currentNavItems = navItems.map((item) =>
    !isHomePage && item.href.startsWith("#")
      ? { ...item, href: `/${item.href}` }
      : item
  )

  const navItemVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
  }

  const mobileNavItemVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  }

  return (
    <motion.header
      className={`fixed top-0 w-full z-40 transition-all duration-500 ${
        scrolled || !isHomePage
          ? "bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="font-serif text-2xl font-light">
          <motion.span
            className="text-gray-900 dark:text-white"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            ARTFOLIO
          </motion.span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {currentNavItems.map((item, index) => (
            <motion.div
              key={item.name}
              variants={navItemVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
            >
              <Link
                href={item.href}
                className={`relative group text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-light ${
                  isActive(item.href) ? "font-semibold text-gray-900 dark:text-white" : ""
                }`}
              >
                {item.name}
                <span
                  className={`block absolute -bottom-1 left-0 h-px bg-gray-900 dark:bg-white transition-all duration-300 ${
                    isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 1.0 }}
          >
            <ModeToggle />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 1.1 }}
          >
            <Button className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 rounded-full px-6 font-light">
              Let's Work
            </Button>
          </motion.div>
        </nav>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-4">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(true)}
            className="text-gray-900 dark:text-white"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white dark:bg-gray-950 z-50 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-end p-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-gray-900 dark:text-white"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col items-center justify-center h-[calc(100vh-100px)] gap-8">
              {currentNavItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  variants={mobileNavItemVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`text-4xl font-serif font-light text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors ${
                      isActive(item.href) ? "underline" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
