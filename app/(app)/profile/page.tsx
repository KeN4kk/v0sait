"use client"

import { motion } from "framer-motion"
import { 
  User, 
  Wallet, 
  MessageSquare, 
  Image, 
  Video, 
  Mic2,
  TrendingUp,
  Calendar,
  Star,
  ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  { label: "Текстовых запросов", value: "1,247", icon: MessageSquare, color: "text-blue-400" },
  { label: "Изображений создано", value: "89", icon: Image, color: "text-pink-400" },
  { label: "Видео сгенерировано", value: "12", icon: Video, color: "text-purple-400" },
  { label: "Озвучек создано", value: "34", icon: Mic2, color: "text-yellow-400" },
]

const transactions = [
  { id: 1, type: "purchase", amount: 500, date: "Сегодня, 14:32", description: "Пополнение баланса" },
  { id: 2, type: "spend", amount: -10, date: "Сегодня, 13:15", description: "GPT-4 запрос" },
  { id: 3, type: "spend", amount: -25, date: "Сегодня, 12:40", description: "Генерация изображения" },
  { id: 4, type: "bonus", amount: 100, date: "Вчера, 18:00", description: "Бонус за приглашение" },
  { id: 5, type: "spend", amount: -50, date: "Вчера, 15:22", description: "Генерация видео" },
]

export default function ProfilePage() {
  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl border border-primary/20 p-6 glow-border"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-3xl font-bold text-primary-foreground">АИ</span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-[#0088cc] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z"/>
                </svg>
              </div>
            </div>
            
            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-foreground">Алексей Иванов</h1>
              <p className="text-muted-foreground">@alexey_ivanov</p>
              <div className="flex items-center justify-center sm:justify-start gap-4 mt-3">
                <div className="flex items-center gap-1 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">С нами с 15 марта 2024</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-foreground">Premium</span>
                </div>
              </div>
            </div>
            
            {/* Edit Button */}
            <Button variant="outline" className="rounded-full border-primary/30 gap-2">
              <ExternalLink className="w-4 h-4" />
              Открыть в Telegram
            </Button>
          </div>
        </motion.div>
        
        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass border-primary/20 glow-border overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-primary" />
                Баланс
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-5xl font-bold text-foreground text-glow">1,250</p>
                  <p className="text-muted-foreground">токенов доступно</p>
                </div>
                <div className="flex gap-3">
                  <Button className="rounded-full bg-primary hover:bg-primary/90">
                    Пополнить
                  </Button>
                  <Button variant="outline" className="rounded-full border-primary/30">
                    История
                  </Button>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-primary/10">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-sm text-muted-foreground">За этот месяц</p>
                    <p className="text-lg font-semibold text-foreground">+750 токенов</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-red-400 rotate-180" />
                  <div>
                    <p className="text-sm text-muted-foreground">Потрачено</p>
                    <p className="text-lg font-semibold text-foreground">-485 токенов</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Usage Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="glass border-primary/20 glow-border-hover transition-all duration-300">
              <CardContent className="p-4">
                <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
        
        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass border-primary/20">
            <CardHeader>
              <CardTitle>Последние операции</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div 
                    key={tx.id}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        tx.type === "purchase" ? "bg-green-500/20" :
                        tx.type === "bonus" ? "bg-yellow-500/20" :
                        "bg-red-500/20"
                      }`}>
                        {tx.type === "purchase" && <TrendingUp className="w-5 h-5 text-green-400" />}
                        {tx.type === "bonus" && <Star className="w-5 h-5 text-yellow-400" />}
                        {tx.type === "spend" && <TrendingUp className="w-5 h-5 text-red-400 rotate-180" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{tx.description}</p>
                        <p className="text-xs text-muted-foreground">{tx.date}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold ${
                      tx.amount > 0 ? "text-green-400" : "text-red-400"
                    }`}>
                      {tx.amount > 0 ? "+" : ""}{tx.amount}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
