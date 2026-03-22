"use client"

import { motion } from "framer-motion"
import { 
  Users, 
  DollarSign, 
  Ticket,
  TrendingUp,
  MessageSquare,
  Image,
  Video,
  Activity
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  { 
    label: "Всего пользователей", 
    value: "12,847", 
    change: "+12%", 
    changeType: "positive",
    icon: Users 
  },
  { 
    label: "Доход за месяц", 
    value: "₽847,500", 
    change: "+23%", 
    changeType: "positive",
    icon: DollarSign 
  },
  { 
    label: "Активных тикетов", 
    value: "24", 
    change: "-5", 
    changeType: "negative",
    icon: Ticket 
  },
  { 
    label: "Запросов сегодня", 
    value: "45,621", 
    change: "+8%", 
    changeType: "positive",
    icon: Activity 
  },
]

const recentActivity = [
  { id: 1, user: "Алексей И.", action: "Пополнил баланс", amount: "₽500", time: "2 мин назад" },
  { id: 2, user: "Мария К.", action: "Создала тикет", amount: null, time: "5 мин назад" },
  { id: 3, user: "Дмитрий П.", action: "GPT-4 запрос", amount: "-10 токенов", time: "7 мин назад" },
  { id: 4, user: "Анна С.", action: "Генерация видео", amount: "-50 токенов", time: "12 мин назад" },
  { id: 5, user: "Иван М.", action: "Регистрация", amount: null, time: "15 мин назад" },
]

const modelUsage = [
  { model: "GPT-4", requests: 15420, percentage: 35, icon: MessageSquare, color: "bg-emerald-500" },
  { model: "Claude 3.5", requests: 12350, percentage: 28, icon: MessageSquare, color: "bg-orange-500" },
  { model: "Gemini Pro", requests: 8940, percentage: 20, icon: MessageSquare, color: "bg-blue-500" },
  { model: "Nano Banana", requests: 4520, percentage: 10, icon: Image, color: "bg-pink-500" },
  { model: "WAN 2.5", requests: 3120, percentage: 7, icon: Video, color: "bg-purple-500" },
]

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass border-primary/20 glow-border-hover transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    <p className={`text-sm mt-1 ${
                      stat.changeType === "positive" ? "text-green-400" : "text-red-400"
                    }`}>
                      {stat.change} за месяц
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Usage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass border-primary/20">
            <CardHeader>
              <CardTitle>Использование моделей</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {modelUsage.map((model, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <model.icon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">{model.model}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {model.requests.toLocaleString()} запросов
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${model.percentage}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                        className={`h-full ${model.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass border-primary/20">
            <CardHeader>
              <CardTitle>Последняя активность</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div 
                    key={activity.id}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                        <span className="text-xs font-medium text-foreground">
                          {activity.user.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{activity.user}</p>
                        <p className="text-xs text-muted-foreground">{activity.action}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {activity.amount && (
                        <p className={`text-sm font-medium ${
                          activity.amount.startsWith('-') ? 'text-red-400' : 'text-green-400'
                        }`}>
                          {activity.amount}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
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
