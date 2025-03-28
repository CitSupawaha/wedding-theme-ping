"use client"

import { useEffect, useState } from "react"
import YouTube from "react-youtube"
import { Music, Pause, Play, Volume2, VolumeX } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"

interface AudioPlayerProps {
  songTitle?: string
}

export function AudioPlayer({ songTitle = "รักนานๆ - โอม จรุวัฒน์" }: AudioPlayerProps) {
  const [player, setPlayer] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(true) // ให้เริ่มเล่นอัตโนมัติ
  const [isMuted, setIsMuted] = useState(true) // เริ่มต้นแบบปิดเสียง
  const [showControls, setShowControls] = useState(false)

  const onReady = (event: any) => {
    const ytPlayer = event.target
    setPlayer(ytPlayer)
    ytPlayer.mute() // ปิดเสียงก่อน เพื่อให้ autoplay ทำงาน
    ytPlayer.playVideo() // เล่นอัตโนมัติ
  }

  const togglePlay = () => {
    if (!player) return
    if (isPlaying) {
      player.pauseVideo()
    } else {
      player.playVideo()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!player) return
    if (isMuted) {
      player.unMute()
    } else {
      player.mute()
    }
    setIsMuted(!isMuted)
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
              className="absolute bottom-0 right-12 bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-3 flex flex-col gap-2"
            >
              <div className="text-sm font-medium text-center mb-1 text-primary">{songTitle}</div>
              <YouTube
                videoId="EiafYKXJdWA" // เปลี่ยนเป็น ID ของเพลง "รักนานๆ - โอม จรุวัฒน์"
                opts={{
                  playerVars: {
                    autoplay: 1, // ให้เล่นอัตโนมัติ
                    mute: 1, // ปิดเสียงเริ่มต้น (จำเป็นเพื่อให้ autoplay ทำงาน)
                    loop: 1,
                    playlist: "EiafYKXJdWA",
                  },
                }}
                onReady={onReady}
              />
              <div className="flex items-center gap-2 mt-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={togglePlay}>
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>

                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleMute}>
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
