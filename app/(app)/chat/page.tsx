"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Send, 
  Paperclip, 
  Mic, 
  Image as ImageIcon,
  StopCircle,
  Sparkles,
  Bot
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatMessage } from "@/components/chat-message"
import { ModelSelector } from "@/components/model-selector"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  type: "text" | "image" | "video" | "audio"
  images?: string[]
  timestamp: Date
}

const mockMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Привет! Я ваш AI-ассистент. Выберите модель в боковом меню и начните общение. Я могу помочь вам с текстом, изображениями, видео и многим другим!",
    type: "text",
    timestamp: new Date(Date.now() - 60000)
  },
  {
    id: "2", 
    role: "user",
    content: "Сгенерируй мне красивое изображение космического корабля в стиле киберпанк",
    type: "text",
    timestamp: new Date(Date.now() - 50000)
  },
  {
    id: "3",
    role: "assistant",
    content: "Конечно! Вот сгенерированные изображения космического корабля в стиле киберпанк:",
    type: "image",
    images: [
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop",
    ],
    timestamp: new Date(Date.now() - 40000)
  },
  {
    id: "4",
    role: "user",
    content: "Отлично! Теперь напиши описание для этого корабля",
    type: "text",
    timestamp: new Date(Date.now() - 30000)
  },
  {
    id: "5",
    role: "assistant",
    content: "**Название:** «Теневой Странник» (Shadow Wanderer)\n\n**Описание:**\nМассивный межзвёздный крейсер класса «Омега», созданный корпорацией NeuroCorp в 2187 году. Корпус корабля покрыт адаптивной наноброней, которая переливается неоновыми оттенками фиолетового и голубого при активации маскировочных систем.\n\n**Характеристики:**\n- Длина: 847 метров\n- Экипаж: 1,200 человек\n- Двигатель: Квантовый варп-привод MK-VII\n- Вооружение: 24 плазменные турели, 6 торпедных установок\n\nКорабль способен совершать гиперпространственные прыжки на расстояния до 500 световых лет и оснащён передовым искусственным интеллектом «ARIA», контролирующим все системы судна.",
    type: "text",
    timestamp: new Date(Date.now() - 20000)
  }
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [selectedModel, setSelectedModel] = useState("gemini")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  const handleSend = () => {
    if (!input.trim()) return
    
    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      type: "text",
      timestamp: new Date()
    }
    
    setMessages([...messages, newMessage])
    setInput("")
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Это демонстрационный ответ от AI. В реальном приложении здесь будет ответ от выбранной модели (" + selectedModel + ").",
        type: "text",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }
  
  return (
    <div className="flex flex-col h-full">
      {/* Model Selector */}
      <div className="p-4 border-b border-border">
        <ModelSelector 
          selectedModel={selectedModel} 
          onSelectModel={setSelectedModel} 
        />
      </div>
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <div className="p-4 border-t border-border">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass rounded-2xl border border-primary/20 p-3"
        >
          <div className="flex items-end gap-3">
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-primary/10"
              >
                <Paperclip className="w-5 h-5 text-muted-foreground" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-primary/10"
              >
                <ImageIcon className="w-5 h-5 text-muted-foreground" />
              </Button>
            </div>
            
            <div className="flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder="Введите сообщение..."
                className="w-full bg-transparent border-0 resize-none text-foreground placeholder:text-muted-foreground focus:outline-none min-h-[24px] max-h-32"
                rows={1}
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full transition-colors ${isRecording ? "bg-red-500/20 text-red-500" : "hover:bg-primary/10"}`}
                onClick={() => setIsRecording(!isRecording)}
              >
                {isRecording ? (
                  <StopCircle className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5 text-muted-foreground" />
                )}
              </Button>
              
              <Button
                onClick={handleSend}
                disabled={!input.trim()}
                className="rounded-full bg-primary hover:bg-primary/90 px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
        
        <p className="text-xs text-muted-foreground text-center mt-3">
          <Sparkles className="w-3 h-3 inline mr-1" />
          Модель: <span className="text-primary">{selectedModel.toUpperCase()}</span> • Стоимость: 1 токен/запрос
        </p>
      </div>
    </div>
  )
}
