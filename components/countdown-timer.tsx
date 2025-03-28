"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (!mounted) return null

  const thaiUnits = {
    days: "วัน",
    hours: "ชั่วโมง",
    minutes: "นาที",
    seconds: "วินาที",
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <motion.div
          key={unit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: ["days", "hours", "minutes", "seconds"].indexOf(unit) * 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-lg shadow-md flex items-center justify-center mb-2">
            <span className="text-3xl md:text-4xl font-bold text-primary">{value.toString().padStart(2, "0")}</span>
          </div>
          <span className="text-sm uppercase tracking-wider text-muted-foreground">
            {thaiUnits[unit as keyof typeof thaiUnits]}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

