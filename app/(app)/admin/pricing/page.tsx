"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  MessageSquare, 
  Image, 
  Video, 
  Mic2,
  Search,
  Music,
  Download,
  Save,
  Sparkles
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const initialPricing = [
  { id: "gemini", name: "Gemini Pro", icon: Sparkles, price: 1, category: "text" },
  { id: "claude", name: "Claude 3.5", icon: MessageSquare, price: 2, category: "text" },
  { id: "deepseek", name: "DeepSeek", icon: Search, price: 1, category: "text" },
  { id: "gpt", name: "GPT-4 Turbo", icon: MessageSquare, price: 3, category: "text" },
  { id: "search", name: "Поиск в сети", icon: Search, price: 2, category: "text" },
  { id: "nano-banana", name: "Nano Banana", icon: Image, price: 25, category: "image" },
  { id: "wan25", name: "WAN 2.5", icon: Video, price: 50, category: "video" },
  { id: "tts", name: "Озвучка TTS", icon: Mic2, price: 5, category: "audio" },
  { id: "music", name: "Распознавание музыки", icon: Music, price: 3, category: "tool" },
  { id: "tiktok", name: "TikTok Downloader", icon: Download, price: 1, category: "tool" },
]

export default function PricingPage() {
  const [pricing, setPricing] = useState(initialPricing)
  const [hasChanges, setHasChanges] = useState(false)
  
  const updatePrice = (id: string, newPrice: number) => {
    setPricing(pricing.map(item => 
      item.id === id ? { ...item, price: newPrice } : item
    ))
    setHasChanges(true)
  }
  
  const handleSave = () => {
    setHasChanges(false)
    // Save logic here
  }
  
  const categories = [
    { id: "text", label: "Текстовые модели" },
    { id: "image", label: "Генерация изображений" },
    { id: "video", label: "Генерация видео" },
    { id: "audio", label: "Аудио" },
    { id: "tool", label: "Инструменты" },
  ]
  
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-foreground">Настройка цен</h2>
          <p className="text-muted-foreground">Установите стоимость запросов для каждой модели</p>
        </div>
        {hasChanges && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Button onClick={handleSave} className="gap-2 bg-green-500 hover:bg-green-600">
              <Save className="w-4 h-4" />
              Сохранить изменения
            </Button>
          </motion.div>
        )}
      </motion.div>
      
      {/* Pricing Cards */}
      {categories.map((category, categoryIndex) => {
        const categoryItems = pricing.filter(item => item.category === category.id)
        if (categoryItems.length === 0) return null
        
        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <Card className="glass border-primary/20">
              <CardHeader>
                <CardTitle>{category.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryItems.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center gap-4 p-4 rounded-xl border border-primary/10 hover:border-primary/30 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">ID: {item.id}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={item.price}
                          onChange={(e) => updatePrice(item.id, parseInt(e.target.value) || 0)}
                          className="w-20 text-center glass border-primary/20"
                        />
                        <span className="text-sm text-muted-foreground">токенов</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
      
      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="glass border-yellow-500/20 bg-yellow-500/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Подсказка</p>
                <p className="text-sm text-muted-foreground">
                  Изменения цен вступят в силу немедленно после сохранения. 
                  Рекомендуем уведомить пользователей о изменениях через Telegram-бота.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
