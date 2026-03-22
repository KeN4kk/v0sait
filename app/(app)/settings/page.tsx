"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Globe, 
  Bell,
  Moon,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
  const [language, setLanguage] = useState<"ru" | "en">("ru")
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  
  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Настройки</h1>
          <p className="text-muted-foreground">Управление вашим аккаунтом</p>
        </motion.div>
        
        {/* Language Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Язык интерфейса
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <button
                  onClick={() => setLanguage("ru")}
                  className={cn(
                    "flex-1 p-4 rounded-xl border-2 transition-all duration-200",
                    language === "ru" 
                      ? "border-primary bg-primary/10" 
                      : "border-primary/20 hover:border-primary/40"
                  )}
                >
                  <div className="text-2xl mb-2">🇷🇺</div>
                  <p className="font-medium text-foreground">Русский</p>
                  <p className="text-xs text-muted-foreground">Russian</p>
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={cn(
                    "flex-1 p-4 rounded-xl border-2 transition-all duration-200",
                    language === "en" 
                      ? "border-primary bg-primary/10" 
                      : "border-primary/20 hover:border-primary/40"
                  )}
                >
                  <div className="text-2xl mb-2">🇺🇸</div>
                  <p className="font-medium text-foreground">English</p>
                  <p className="text-xs text-muted-foreground">Английский</p>
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Toggles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass border-primary/20">
            <CardContent className="p-0">
              {/* Notifications */}
              <div className="flex items-center justify-between p-4 border-b border-primary/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Уведомления</p>
                    <p className="text-sm text-muted-foreground">Push-уведомления в браузере</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications} 
                  onCheckedChange={setNotifications}
                />
              </div>
              
              {/* Dark Mode */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Moon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Тёмная тема</p>
                    <p className="text-sm text-muted-foreground">Использовать тёмное оформление</p>
                  </div>
                </div>
                <Switch 
                  checked={darkMode} 
                  onCheckedChange={setDarkMode}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass border-primary/20">
            <CardContent className="p-0">
              <button className="w-full flex items-center justify-between p-4 border-b border-primary/10 hover:bg-primary/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">Безопасность</p>
                    <p className="text-sm text-muted-foreground">Управление доступом</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              
              <button className="w-full flex items-center justify-between p-4 hover:bg-primary/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">Помощь</p>
                    <p className="text-sm text-muted-foreground">FAQ и поддержка</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button 
            variant="outline" 
            className="w-full rounded-xl border-red-500/30 text-red-500 hover:bg-red-500/10 hover:text-red-400 gap-2"
          >
            <LogOut className="w-4 h-4" />
            Выйти из аккаунта
          </Button>
        </motion.div>
        
        {/* Version */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-xs text-muted-foreground">
            KeN4kk App v1.0.0 • © 2024
          </p>
        </motion.div>
      </div>
    </div>
  )
}
