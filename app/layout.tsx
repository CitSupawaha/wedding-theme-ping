import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, IBM_Plex_Sans_Thai } from "next/font/google"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-thai",
})

export const metadata: Metadata = {
  title: "Sophia & James Wedding | งานแต่งงาน",
  description: "เชิญร่วมเฉลิมฉลองวันพิเศษของเรา",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th">
      <body className={`${playfair.variable} ${ibmPlexSansThai.variable} font-thai`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'