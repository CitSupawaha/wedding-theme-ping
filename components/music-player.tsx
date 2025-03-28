"use client"

import { useEffect, useRef, useState } from "react"
import { Music, Pause, Play, Volume2, VolumeX } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [showControls, setShowControls] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create the audio element
    const audio = new Audio("/audio/wedding-music.mp3")
    audio.loop = true
    audio.volume = volume

    // Set the audio ref
    audioRef.current = audio

    // Add error handling
    audio.addEventListener("error", (e) => {
      console.error("Audio error:", e)
      console.error("Audio error code:", audio.error?.code)
      console.error("Audio error message:", audio.error?.message)
    })

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error)
        setIsPlaying(false)
      })
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    if (!audioRef.current) return

    audioRef.current.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (!isPlaying) {
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
          })
          .catch((error) => {
            console.error("Audio playback failed:", error)
            // Try loading the audio again
            audioRef.current = new Audio("/audio/wedding-music.mp3")
            audioRef.current.volume = isMuted ? 0 : volume
            audioRef.current.loop = true
          })
      }
    } else {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    if (value[0] > 0 && isMuted) {
      setIsMuted(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white"
          onClick={() => setShowControls(!showControls)}
        >
          <Music className="h-5 w-5 text-primary" />
        </Button>

        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 right-12 bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-3 flex items-center gap-2"
            >
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={togglePlay}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>

              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleMute}>
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>

              <div className="w-24">
                <Slider value={[volume]} min={0} max={1} step={0.01} onValueChange={handleVolumeChange} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

