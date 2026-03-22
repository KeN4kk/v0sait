"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/", label: "Главная" },
  { href: "/chat", label: "Чат" },
  { href: "/profile", label: "Профиль" },
  { href: "/referral", label: "Рефералы" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="glass-strong rounded-full border border-primary/20 px-2 py-2 glow-border">
          <div className="flex items-center gap-1">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 px-4 py-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">K</span>
              </div>
              <span className="font-semibold text-foreground hidden sm:block">KeN4kk</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-primary/10"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            {/* CTA Button */}
            <Button 
              className="ml-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground hidden sm:flex"
              asChild
            >
              <Link href="/chat">Начать</Link>
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-24 left-4 right-4 z-40 glass-strong rounded-2xl border border-primary/20 p-4 md:hidden"
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-xl hover:bg-primary/10"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button 
              className="mt-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
              asChild
            >
              <Link href="/chat" onClick={() => setIsOpen(false)}>Начать работу</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </>
  )
}
