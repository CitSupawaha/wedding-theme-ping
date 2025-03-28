"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Calendar, Clock, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function EventDetails() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const events = [
    {
      title: "พิธีแต่งงาน",
      time: "16:00 น. - 17:30 น.",
      date: "15 มิถุนายน 2568",
      location: "โบสถ์เซนต์แมรี่",
      address: "123 ถนนเวดดิ้ง, กรุงเทพฯ",
      mapUrl: "https://maps.google.com",
      icon: Calendar,
    },
    {
      title: "ค็อกเทลรับรอง",
      time: "17:30 น. - 18:30 น.",
      date: "15 มิถุนายน 2568",
      location: "ระเบียงแกรนด์บอลรูม",
      address: "123 ถนนเวดดิ้ง, กรุงเทพฯ",
      mapUrl: "https://maps.google.com",
      icon: Clock,
    },
    {
      title: "งานเลี้ยงฉลอง & อาหารค่ำ",
      time: "18:30 น. - 23:00 น.",
      date: "15 มิถุนายน 2568",
      location: "แกรนด์บอลรูม",
      address: "123 ถนนเวดดิ้ง, กรุงเทพฯ",
      mapUrl: "https://maps.google.com",
      icon: MapPin,
    },
  ]

  return (
    <section id="events" className="w-full py-20 bg-gradient-to-b from-white to-primary-light">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif mb-4 text-[#E5989B]">กำหนดการงานแต่งงาน</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">ร่วมเฉลิมฉลองวันพิเศษของเรา นี่คือรายละเอียดงาน</p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="h-full border-primary/10 hover:shadow-md transition-shadow duration-300 bg-white">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary-lightest flex items-center justify-center mb-4">
                    <event.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-serif text-[#E5989B]">{event.title}</h3>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm font-medium">{event.date}</p>
                  <p className="text-sm">{event.time}</p>
                  <p className="font-medium mt-4">{event.location}</p>
                  <p className="text-sm text-muted-foreground">{event.address}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-primary hover:bg-primary-lightest"
                    asChild
                  >
                    <a href={event.mapUrl} target="_blank" rel="noopener noreferrer">
                      <MapPin className="mr-2 h-4 w-4" />
                      ดูแผนที่
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

