"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Ticket,
  ChevronLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"

const adminLinks = [
  { href: "/admin", icon: LayoutDashboard, label: "Дашборд" },
  { href: "/admin/users", icon: Users, label: "Пользователи" },
  { href: "/admin/pricing", icon: Settings, label: "Цены" },
  { href: "/admin/tickets", icon: Ticket, label: "Тикеты" },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  return (
    <div className="flex flex-col h-full">
      {/* Admin Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/chat">
                <ChevronLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Админ-панель</h1>
              <p className="text-sm text-muted-foreground">Управление платформой</p>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                pathname === link.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
              )}
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
