"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const images = [
    "/images/wed1.jpg?height=600&width=400",
    "/images/wed2.jpg?height=400&width=600",
    "/images/wed3.jpg?height=600&width=400",
    "/images/wed4.jpg?height=400&width=600",
    "/images/wed5.jpg?height=600&width=400",
    "/images/wed6.jpg?height=400&width=600",
  ]

  return (
    <section id="gallery" className="w-full py-20 bg-primary-lightest">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif mb-4 text-[#E5989B]">แกลเลอรีของเรา</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">ช่วงเวลาที่เราแบ่งปันร่วมกันในการเดินทางสู่ความรักนิรันดร์</p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="aspect-[4/5] relative overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`ภาพแกลเลอรี ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl max-h-[80vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image src={selectedImage || "/placeholder.svg"} alt="ภาพแกลเลอรี" fill className="object-contain" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      )}
    </section>
  )
}

