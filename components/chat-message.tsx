"use client"

import { motion } from "framer-motion"
import { Bot, User, Download, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  type: "text" | "image" | "video" | "audio"
  images?: string[]
  videoUrl?: string
  audioUrl?: string
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === "assistant"
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "flex gap-3",
        !isAssistant && "flex-row-reverse"
      )}
    >
      {/* Avatar */}
      <div className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
        isAssistant 
          ? "bg-gradient-to-br from-primary/30 to-accent/30 border border-primary/20" 
          : "bg-gradient-to-br from-blue-500/30 to-cyan-500/30 border border-blue-500/20"
      )}>
        {isAssistant ? (
          <Bot className="w-5 h-5 text-primary" />
        ) : (
          <User className="w-5 h-5 text-blue-400" />
        )}
      </div>
      
      {/* Message Content */}
      <div className={cn(
        "flex-1 max-w-[80%]",
        !isAssistant && "flex flex-col items-end"
      )}>
        <div className={cn(
          "rounded-2xl px-4 py-3",
          isAssistant 
            ? "glass border border-primary/10" 
            : "bg-primary/20 border border-primary/30"
        )}>
          {/* Text Content */}
          {message.content && (
            <div className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
              {message.content.split('\n').map((line, i) => {
                // Handle bold text
                const parts = line.split(/(\*\*.*?\*\*)/g)
                return (
                  <span key={i}>
                    {parts.map((part, j) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={j}>{part.slice(2, -2)}</strong>
                      }
                      return part
                    })}
                    {i < message.content.split('\n').length - 1 && <br />}
                  </span>
                )
              })}
            </div>
          )}
          
          {/* Image Grid */}
          {message.type === "image" && message.images && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {message.images.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group aspect-square rounded-xl overflow-hidden border border-primary/10"
                >
                  <Image
                    src={img}
                    alt={`Generated image ${index + 1}`}
                    fill
                    className="object-cover"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
                    <Button size="sm" variant="secondary" className="rounded-full gap-2">
                      <Download className="w-4 h-4" />
                      Скачать
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {/* Video Player */}
          {message.type === "video" && message.videoUrl && (
            <div className="mt-3 relative aspect-video rounded-xl overflow-hidden border border-primary/10 bg-muted">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="lg" variant="secondary" className="rounded-full gap-2">
                  <Play className="w-5 h-5" />
                  Воспроизвести
                </Button>
              </div>
            </div>
          )}
          
          {/* Audio Player */}
          {message.type === "audio" && message.audioUrl && (
            <div className="mt-3 glass rounded-xl p-4 border border-primary/10">
              <div className="flex items-center gap-4">
                <Button size="icon" variant="secondary" className="rounded-full">
                  <Play className="w-5 h-5" />
                </Button>
                <div className="flex-1">
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-primary rounded-full" />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">0:15</span>
                    <span className="text-xs text-muted-foreground">0:45</span>
                  </div>
                </div>
                <Button size="icon" variant="ghost" className="rounded-full">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Timestamp */}
        <span className="text-xs text-muted-foreground mt-1 px-2">
          {message.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  )
}
