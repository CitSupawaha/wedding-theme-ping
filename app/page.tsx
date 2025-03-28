import Link from "next/link"
import { ArrowDown, Gift, Heart } from "lucide-react"
import { AudioPlayer } from "@/components/audio-player"
import { CountdownTimer } from "@/components/countdown-timer"
import { EventDetails } from "@/components/event-details"
import { FloatingHearts } from "@/components/floating-hearts"
import { Gallery } from "@/components/gallery"
import { HeroSection } from "@/components/hero-section"
import { OurStory } from "@/components/our-story"
import { RsvpForm } from "@/components/rsvp-form"
import { VideoSection } from "@/components/video-section"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <FloatingHearts />
      <AudioPlayer songTitle="รักนานๆ - โอม จรุวัฒน์" />

      <HeroSection />

      <section id="countdown" className="w-full py-20 flex flex-col items-center justify-center bg-primary-lightest">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl  mb-8 text-[#E5989B]">นับถอยหลังสู่ความรักนิรันดร์</h2>
          <CountdownTimer targetDate="2025-06-15T16:00:00" />
          <div className="mt-12 animate-bounce">
            <ArrowDown className="mx-auto h-6 w-6 text-primary opacity-70" />
          </div>
        </div>
      </section>

      <OurStory />
      <VideoSection />
      <EventDetails />
      <Gallery />

      <section id="rsvp" className="w-full py-20 bg-primary-light">
        <div className="container px-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif mb-2 text-center text-[#E5989B]">ตอบรับเข้าร่วมงาน</h2>
          <p className="text-center mb-10 text-muted-foreground">เรารอคอยที่จะได้ฉลองความสุขร่วมกับคุณ</p>
          <RsvpForm />
        </div>
      </section>

      <section id="registry" className="w-full py-20 bg-primary-lightest">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-4 text-[#E5989B]">ของขวัญแต่งงาน</h2>
          <p className="mb-10 text-muted-foreground max-w-2xl mx-auto">
            การมาร่วมงานของคุณคือของขวัญที่ล้ำค่าที่สุดสำหรับเรา แต่หากคุณต้องการมอบของขวัญให้เรา เราได้ลงทะเบียนไว้ที่ร้านค้าต่อไปนี้
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: "เซ็นทรัล", url: "#" },
              { name: "โรบินสัน", url: "#" },
              { name: "เพาเวอร์บาย", url: "#" },
            ].map((store) => (
              <Link
                key={store.name}
                href={store.url}
                className="p-6 border border-primary rounded-lg hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center gap-4 group bg-white"
              >
                <Gift className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">{store.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="w-full py-10 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Heart className="h-5 w-5 fill-current animate-pulse" />
            <h3 className="text-xl font-serif">Sosi & Keng</h3>
            <Heart className="h-5 w-5 fill-current animate-pulse" />
          </div>
          <p className="text-sm opacity-80">ด้วยความรักและความกตัญญู เราตั้งตารอที่จะได้ฉลองร่วมกับคุณ!</p>
          <p className="text-sm mt-6 opacity-70">© {new Date().getFullYear()} • งานแต่งงาน Sophia & James</p>
        </div>
      </footer>
    </main>
  )
}

