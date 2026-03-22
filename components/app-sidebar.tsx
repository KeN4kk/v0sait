"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  MessageSquare, 
  Image, 
  Video, 
  Mic2, 
  Download,
  Search,
  User,
  Gift,
  Settings,
  Shield,
  ChevronRight,
  Sparkles,
  Music,
  Home
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose?: () => void
}

const aiModels = [
  { 
    category: "Текстовые модели",
    items: [
      { id: "gemini", name: "Gemini", icon: Sparkles, color: "text-blue-400" },
      { id: "claude", name: "Claude", icon: MessageSquare, color: "text-orange-400" },
      { id: "deepseek", name: "DeepSeek", icon: Search, color: "text-green-400" },
      { id: "gpt", name: "GPT-4", icon: MessageSquare, color: "text-emerald-400" },
      { id: "search", name: "Поиск в сети", icon: Search, color: "text-cyan-400" },
    ]
  },
  {
    category: "Генерация медиа",
    items: [
      { id: "nano-banana", name: "Nano Banana", icon: Image, color: "text-pink-400" },
      { id: "wan25", name: "WAN 2.5", icon: Video, color: "text-purple-400" },
      { id: "tts", name: "Озвучка TTS", icon: Mic2, color: "text-yellow-400" },
    ]
  },
  {
    category: "Инструменты",
    items: [
      { id: "music", name: "Распознавание музыки", icon: Music, color: "text-rose-400" },
      { id: "tiktok", name: "TikTok Downloader", icon: Download, color: "text-red-400" },
    ]
  }
]

const navLinks = [
  { href: "/", icon: Home, label: "Главная" },
  { href: "/profile", icon: User, label: "Профиль" },
  { href: "/referral", icon: Gift, label: "Рефералы" },
  { href: "/settings", icon: Settings, label: "Настройки" },
]

export function AppSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={cn(
          "fixed left-0 top-0 h-full w-72 bg-sidebar border-r border-sidebar-border z-50",
          "lg:translate-x-0 lg:static lg:z-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-lg font-bold text-primary-foreground">K</span>
              </div>
              <div>
                <span className="text-lg font-semibold text-sidebar-foreground">KeN4kk App</span>
                <p className="text-xs text-muted-foreground">AI Platform</p>
              </div>
            </Link>
          </div>
          
          {/* AI Models */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {aiModels.map((category) => (
              <div key={category.category}>
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-2">
                  {category.category}
                </h3>
                <div className="space-y-1">
                  {category.items.map((model) => (
                    <Link
                      key={model.id}
                      href={`/chat?model=${model.id}`}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                        "hover:bg-sidebar-accent group",
                        pathname === `/chat` && "bg-sidebar-accent"
                      )}
                    >
                      <model.icon className={cn("w-5 h-5", model.color)} />
                      <span className="text-sm text-sidebar-foreground">{model.name}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Links */}
          <div className="p-4 border-t border-sidebar-border space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                  "hover:bg-sidebar-accent",
                  pathname === link.href && "bg-sidebar-accent"
                )}
              >
                <link.icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-sidebar-foreground">{link.label}</span>
              </Link>
            ))}
            
            {/* Admin Link */}
            <Link
              href="/admin"
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                "hover:bg-sidebar-accent",
                pathname === "/admin" && "bg-sidebar-accent"
              )}
            >
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm text-sidebar-foreground">Админ-панель</span>
            </Link>
          </div>
          
          {/* User Info */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center">
                <span className="text-sm font-medium text-foreground">АИ</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">Алексей Иванов</p>
                <p className="text-xs text-muted-foreground">1,250 токенов</p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
