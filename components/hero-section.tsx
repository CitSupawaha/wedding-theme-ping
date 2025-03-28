"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/wed3.jpg')",
          filter: "brightness(0.7)",
        }}
      />

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 text-center text-white px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="text-lg md:text-xl mb-4 font-light">เรากำลังจะแต่งงานกัน</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl  mb-6 text-[#f8e1d4]">
            Sosi <span className="inline-block mx-2">&</span> Keng
          </h1>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-[1px] w-12 bg-white/70" />
            <Heart className="h-5 w-5 fill-white animate-pulse" />
            <div className="h-[1px] w-12 bg-white/70" />
          </div>

          <p className="text-xl md:text-2xl mb-10">15 มิถุนายน 2568 • กรุงเทพมหานคร, ประเทศไทย</p>

          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20 text-white"
            onClick={() => {
              document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            ตอบรับเข้าร่วมงาน
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 1.2,
          y: {
            duration: 0.8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        }}
        onClick={() => {
          document.getElementById("countdown")?.scrollIntoView({ behavior: "smooth" })
        }}
      >
        <Button variant="ghost" size="icon" className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-down"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Button>
      </motion.div>
    </section>
  )
}

