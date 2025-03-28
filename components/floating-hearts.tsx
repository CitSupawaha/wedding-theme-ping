"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"

interface FloatingHeart {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
  rotate: number
  color: string
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Create initial hearts
    const initialHearts = Array.from({ length: 15 }, (_, i) => createHeart(i))
    setHearts(initialHearts)

    // Add more hearts periodically
    const interval = setInterval(() => {
      setHearts((prev) => {
        if (prev.length > 25) {
          // Remove oldest hearts if there are too many
          const newHearts = [...prev.slice(5)]
          return [...newHearts, createHeart(prev.length)]
        }
        return [...prev, createHeart(prev.length)]
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const createHeart = (id: number): FloatingHeart => {
    // Array of colors from our palette
    const colors = [
      "#FFD1D1", // Light pink
      "#FFE3E1", // Very light pink/peach
      "#F9F5F6", // Off-white/very light pink
    ]

    return {
      id,
      x: Math.random() * 100, // random position across screen width (%)
      y: 110 + Math.random() * 10, // start below the screen
      size: 10 + Math.random() * 30, // random size between 10px and 40px
      duration: 5 + Math.random() * 10, // random duration between 5s and 15s
      delay: Math.random() * 2, // random delay up to 2s
      opacity: 0.3 + Math.random() * 0.7, // random opacity between 0.3 and 1
      rotate: -20 + Math.random() * 40, // random rotation between -20deg and 20deg
      color: colors[Math.floor(Math.random() * colors.length)], // random color from our palette
    }
  }

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{
              x: `${heart.x}vw`,
              y: `${heart.y}vh`,
              opacity: 0,
              rotate: heart.rotate,
            }}
            animate={{
              y: "-20vh",
              opacity: heart.opacity,
              rotate: heart.rotate,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              ease: "easeOut",
            }}
            style={{
              position: "absolute",
              width: heart.size,
              height: heart.size,
              color: heart.color,
            }}
          >
            <Heart className="w-full h-full fill-current" style={{ opacity: heart.opacity }} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

