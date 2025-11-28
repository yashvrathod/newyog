"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Instagram, Facebook, Linkedin, MessageCircle } from "lucide-react"

const socialLinks = [
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "WhatsApp", href: "#", icon: MessageCircle },
]

export function SocialSidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4"
    >
      {socialLinks.map((item, index) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 + index * 0.1 }}
        >
          <Link
            href={item.href}
            className="p-2 rounded-full bg-muted hover:bg-foreground hover:text-background transition-all duration-300 flex items-center justify-center"
            aria-label={item.name}
          >
            <item.icon className="h-5 w-5" />
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
