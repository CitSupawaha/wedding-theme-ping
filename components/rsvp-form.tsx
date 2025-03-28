"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function RsvpForm() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: "",
    guests: "0",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send this data to your server
    console.log(formData)
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-primary/10 shadow-md bg-white">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-primary-lightest rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-serif text-primary mb-2">ขอบคุณ!</h3>
            <p className="text-muted-foreground mb-6">เราได้รับการตอบรับของคุณแล้ว เรารอคอยที่จะได้ฉลองร่วมกับคุณ!</p>
            <Button
              variant="outline"
              onClick={() => setSubmitted(false)}
              className="border-primary hover:bg-primary-lightest"
            >
              ส่งการตอบรับอีกครั้ง
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="border-primary/10 shadow-md bg-white">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">ชื่อ-นามสกุล</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="ชื่อของคุณ"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="border-primary focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">อีเมล</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="อีเมลของคุณ"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="border-primary focus-visible:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>คุณจะมาร่วมงานหรือไม่?</Label>
              <RadioGroup
                name="attending"
                required
                value={formData.attending}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, attending: value }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="attending-yes" />
                  <Label htmlFor="attending-yes">ยินดีมาร่วมงาน</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="attending-no" />
                  <Label htmlFor="attending-no">เสียใจที่ไม่สามารถมาร่วมงานได้</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="guests">จำนวนผู้ร่วมงาน</Label>
              <Select
                value={formData.guests}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, guests: value }))}
              >
                <SelectTrigger id="guests" className="border-primary focus:ring-primary">
                  <SelectValue placeholder="เลือกจำนวนผู้ร่วมงาน" />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num === 0 ? "เฉพาะฉัน" : num === 1 ? "ฉัน + 1 ท่าน" : `ฉัน + ${num} ท่าน`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">ข้อความถึงคู่บ่าวสาว (ไม่บังคับ)</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="แบ่งปันคำอวยพรหรือแจ้งข้อจำกัดด้านอาหาร"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="border-primary focus-visible:ring-primary"
              />
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              ส่งการตอบรับ
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

