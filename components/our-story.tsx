"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Heart } from "lucide-react"

export function OurStory() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const storyEvents = [
    {
      title: "พบกันครั้งแรก",
      date: "พฤษภาคม 2563",
      description: "เราพบกันครั้งแรกที่งานวันเกิดของเพื่อน เก่งทำเครื่องดื่มหกใส่ชุดของสิ และนั่นคือจุดเริ่มต้นของบทสนทนาของเรา",
      image: "/images/wed3.jpg??height=400&width=400",
    },
    {
      title: "เดทครั้งแรก",
      date: "มิถุนายน 2563",
      description: "เดทแรกของเราคือที่คาเฟ่เล็กๆ ริมแม่น้ำ เราคุยกันเป็นชั่วโมงและรู้ว่ามีบางสิ่งที่พิเศษระหว่างเรา",
      image: "/images/wed4.jpg??height=400&width=400",
    },
    {
      title: "การขอแต่งงาน",
      date: "ธันวาคม 2566",
      description: "เจมส์ขอสิแต่งงานระหว่างทริปที่ภูเก็ต เป็นช่วงพระอาทิตย์ตกที่ชายหาด พร้อมแหวนสวยงามและน้ำตาแห่งความสุข",
      image: "/images/wed2.jpg??height=400&width=400",
    },
  ]

  return (
    <section id="our-story" className="w-full py-20 bg-white">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4 text-[#E5989B]">เรื่องราวความรักของเรา</h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[1px] w-12 bg-primary/30" />
            <Heart className="h-5 w-5 text-primary" />
            <div className="h-[1px] w-12 bg-primary/30" />
          </div>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            ทุกเรื่องราวความรักล้วนสวยงาม แต่เรื่องราวของเราคือเรื่องโปรดของเรา นี่คือจุดเริ่มต้นของการเดินทางของเรา
          </p>
        </div>

        <div ref={ref} className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />

          {storyEvents.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 mb-16 relative`}
            >
              <div className="flex-1 flex justify-center">
                <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary-light">
                  <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <div
                  className={`bg-primary-lightest p-6 rounded-lg shadow-md relative ${index % 2 === 0 ? "md:mr-6" : "md:ml-6"}`}
                >
                  <div
                    className="absolute top-6 hidden md:block 
                    ${index % 2 === 0 ? 'left-[-12px] border-r-primary-lightest' : 'right-[-12px] border-l-primary-lightest'} 
                    border-t-transparent border-b-transparent 
                    ${index % 2 === 0 ? 'border-r-[12px]' : 'border-l-[12px]'} border-t-[12px] border-b-[12px]"
                  />
                  <h3 className="text-xl font-serif text-[#E5989B] mb-1">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{event.date}</p>
                  <p>{event.description}</p>
                </div>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                  <Heart className="h-5 w-5 fill-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

