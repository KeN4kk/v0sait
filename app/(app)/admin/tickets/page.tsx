"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  X
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const tickets = [
  { 
    id: 1, 
    user: "Алексей Иванов", 
    username: "@alexey_ivanov",
    subject: "Ошибка при генерации изображений",
    message: "Добрый день! При попытке сгенерировать изображение через Nano Banana получаю ошибку 'Rate limit exceeded'. Баланс на месте, раньше всё работало.",
    status: "open",
    priority: "high",
    created: "2 часа назад"
  },
  { 
    id: 2, 
    user: "Мария Козлова", 
    username: "@maria_k",
    subject: "Вопрос по тарифам",
    message: "Здравствуйте! Подскажите, есть ли скидки на большие объёмы токенов?",
    status: "pending",
    priority: "low",
    created: "5 часов назад"
  },
  { 
    id: 3, 
    user: "Дмитрий Петров", 
    username: "@dmitry_p",
    subject: "Не работает TTS",
    message: "Озвучка текста не работает уже второй день. Токены списываются, но аудио не генерируется.",
    status: "open",
    priority: "medium",
    created: "1 день назад"
  },
  { 
    id: 4, 
    user: "Анна Сидорова", 
    username: "@anna_s",
    subject: "Благодарность",
    message: "Отличный сервис! Пользуюсь каждый день, очень доволен качеством. Спасибо команде!",
    status: "closed",
    priority: "low",
    created: "2 дня назад"
  },
]

const statusColors = {
  open: "bg-yellow-500/20 text-yellow-400",
  pending: "bg-blue-500/20 text-blue-400",
  closed: "bg-green-500/20 text-green-400",
}

const statusLabels = {
  open: "Открыт",
  pending: "В работе",
  closed: "Закрыт",
}

const priorityColors = {
  high: "border-red-500/50",
  medium: "border-yellow-500/50",
  low: "border-green-500/50",
}

export default function TicketsPage() {
  const [selectedTicket, setSelectedTicket] = useState<typeof tickets[0] | null>(null)
  const [reply, setReply] = useState("")
  const [filter, setFilter] = useState<"all" | "open" | "pending" | "closed">("all")
  
  const filteredTickets = tickets.filter(ticket => 
    filter === "all" ? true : ticket.status === filter
  )
  
  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-2 flex-wrap"
      >
        {[
          { id: "all", label: "Все", count: tickets.length },
          { id: "open", label: "Открытые", count: tickets.filter(t => t.status === "open").length },
          { id: "pending", label: "В работе", count: tickets.filter(t => t.status === "pending").length },
          { id: "closed", label: "Закрытые", count: tickets.filter(t => t.status === "closed").length },
        ].map((f) => (
          <Button
            key={f.id}
            variant={filter === f.id ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(f.id as typeof filter)}
            className={cn(
              "gap-2",
              filter === f.id ? "bg-primary" : "border-primary/20"
            )}
          >
            {f.label}
            <span className="bg-background/20 px-1.5 py-0.5 rounded text-xs">{f.count}</span>
          </Button>
        ))}
      </motion.div>
      
      {/* Tickets Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        {filteredTickets.map((ticket, index) => (
          <motion.div
            key={ticket.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card 
              className={cn(
                "glass border-l-4 cursor-pointer hover:bg-primary/5 transition-colors",
                priorityColors[ticket.priority as keyof typeof priorityColors]
              )}
              onClick={() => setSelectedTicket(ticket)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-medium",
                        statusColors[ticket.status as keyof typeof statusColors]
                      )}>
                        {statusLabels[ticket.status as keyof typeof statusLabels]}
                      </span>
                      <span className="text-xs text-muted-foreground">{ticket.created}</span>
                    </div>
                    <h3 className="font-medium text-foreground truncate">{ticket.subject}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{ticket.message}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs">{ticket.user.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{ticket.user}</span>
                    </div>
                  </div>
                  <MessageSquare className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Ticket Detail Dialog */}
      <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
        <DialogContent className="glass border-primary/20 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedTicket?.subject}</span>
              <span className={cn(
                "px-2 py-0.5 rounded-full text-xs font-medium",
                selectedTicket && statusColors[selectedTicket.status as keyof typeof statusColors]
              )}>
                {selectedTicket && statusLabels[selectedTicket.status as keyof typeof statusLabels]}
              </span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* User Info */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <span className="text-sm">{selectedTicket?.user.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <div>
                <p className="font-medium text-foreground">{selectedTicket?.user}</p>
                <p className="text-xs text-muted-foreground">{selectedTicket?.username}</p>
              </div>
              <span className="ml-auto text-xs text-muted-foreground">{selectedTicket?.created}</span>
            </div>
            
            {/* Message */}
            <div className="p-4 rounded-xl bg-muted/50">
              <p className="text-sm text-foreground">{selectedTicket?.message}</p>
            </div>
            
            {/* Reply */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Ответ</label>
              <div className="flex gap-2">
                <Input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Введите ответ..."
                  className="glass border-primary/20"
                />
                <Button className="gap-2">
                  <Send className="w-4 h-4" />
                  Отправить
                </Button>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t border-primary/10">
              <Button variant="outline" className="flex-1 gap-2 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10">
                <Clock className="w-4 h-4" />
                В работу
              </Button>
              <Button variant="outline" className="flex-1 gap-2 border-green-500/30 text-green-400 hover:bg-green-500/10">
                <CheckCircle className="w-4 h-4" />
                Закрыть
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
