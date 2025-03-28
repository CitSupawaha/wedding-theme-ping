"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export function VideoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [volume, setVolume] = useState(0.5)

  const togglePlay = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play().catch((error) => {
        console.error("Video playback failed:", error)
      })
    }

    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!videoRef.current) return

    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (value: number[]) => {
    if (!videoRef.current) return

    videoRef.current.volume = value[0]
    setVolume(value[0])

    if (value[0] > 0 && isMuted) {
      videoRef.current.muted = false
      setIsMuted(false)
    }
  }

  return (
    <section id="video" className="w-full py-20 bg-gradient-to-b from-primary-light to-white">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-4 text-[#E5989B]">เรื่องราวความรักของเรา</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">ชมการเดินทางร่วมกันของเราในวิดีโอสุดพิเศษนี้</p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative rounded-xl overflow-hidden shadow-xl"
        >
          <div className="aspect-video relative">
            <video
              ref={videoRef}
              src="/videos/wedding-video.mp4"
              className="w-full h-full object-cover"
              poster="/images/hero-bg.png"
              muted
              playsInline
              onClick={togglePlay}
              onError={(e) => {
                console.error("Video error:", e)
                // Provide a fallback image if video fails to load
                if (videoRef.current) {
                  videoRef.current.poster = "/images/hero-bg.png"
                }
              }}
            />

            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-100 transition-opacity duration-300 hover:opacity-100">
              <Button
                variant="outline"
                size="icon"
                className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm border-white/40 hover:bg-white/30 text-white"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
              </Button>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleMute}>
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>

            <div className="w-24">
              <Slider
                value={[volume]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="[&_[role=slider]]:bg-white"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

