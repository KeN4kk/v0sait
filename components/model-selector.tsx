"use client"

import { motion } from "framer-motion"
import { 
  MessageSquare, 
  Image, 
  Video, 
  Mic2, 
  Download,
  Search,
  Music,
  Sparkles,
  ChevronDown
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const models = [
  { id: "gemini", name: "Gemini Pro", icon: Sparkles, color: "text-blue-400", category: "text" },
  { id: "claude", name: "Claude 3.5", icon: MessageSquare, color: "text-orange-400", category: "text" },
  { id: "deepseek", name: "DeepSeek", icon: Search, color: "text-green-400", category: "text" },
  { id: "gpt", name: "GPT-4 Turbo", icon: MessageSquare, color: "text-emerald-400", category: "text" },
  { id: "search", name: "Поиск в сети", icon: Search, color: "text-cyan-400", category: "text" },
  { id: "nano-banana", name: "Nano Banana", icon: Image, color: "text-pink-400", category: "image" },
  { id: "wan25", name: "WAN 2.5", icon: Video, color: "text-purple-400", category: "video" },
  { id: "tts", name: "Озвучка TTS", icon: Mic2, color: "text-yellow-400", category: "audio" },
  { id: "music", name: "Распознавание музыки", icon: Music, color: "text-rose-400", category: "tool" },
  { id: "tiktok", name: "TikTok Downloader", icon: Download, color: "text-red-400", category: "tool" },
]

interface ModelSelectorProps {
  selectedModel: string
  onSelectModel: (model: string) => void
}

export function ModelSelector({ selectedModel, onSelectModel }: ModelSelectorProps) {
  const currentModel = models.find(m => m.id === selectedModel) || models[0]
  const Icon = currentModel.icon
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="glass border-primary/20 hover:bg-primary/10 gap-3 h-auto py-2.5 px-4"
        >
          <div className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center",
            "bg-gradient-to-br from-primary/20 to-accent/20"
          )}>
            <Icon className={cn("w-4 h-4", currentModel.color)} />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-foreground">{currentModel.name}</p>
            <p className="text-xs text-muted-foreground">
              {currentModel.category === "text" && "Текстовая модель"}
              {currentModel.category === "image" && "Генерация изображений"}
              {currentModel.category === "video" && "Генерация видео"}
              {currentModel.category === "audio" && "Озвучка текста"}
              {currentModel.category === "tool" && "Инструмент"}
            </p>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="start" className="w-64 glass border-primary/20">
        <DropdownMenuLabel className="text-xs text-muted-foreground">Текстовые модели</DropdownMenuLabel>
        {models.filter(m => m.category === "text").map((model) => (
          <DropdownMenuItem
            key={model.id}
            onClick={() => onSelectModel(model.id)}
            className={cn(
              "gap-3 cursor-pointer",
              selectedModel === model.id && "bg-primary/10"
            )}
          >
            <model.icon className={cn("w-4 h-4", model.color)} />
            <span>{model.name}</span>
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator className="bg-primary/10" />
        <DropdownMenuLabel className="text-xs text-muted-foreground">Генерация медиа</DropdownMenuLabel>
        {models.filter(m => ["image", "video", "audio"].includes(m.category)).map((model) => (
          <DropdownMenuItem
            key={model.id}
            onClick={() => onSelectModel(model.id)}
            className={cn(
              "gap-3 cursor-pointer",
              selectedModel === model.id && "bg-primary/10"
            )}
          >
            <model.icon className={cn("w-4 h-4", model.color)} />
            <span>{model.name}</span>
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator className="bg-primary/10" />
        <DropdownMenuLabel className="text-xs text-muted-foreground">Инструменты</DropdownMenuLabel>
        {models.filter(m => m.category === "tool").map((model) => (
          <DropdownMenuItem
            key={model.id}
            onClick={() => onSelectModel(model.id)}
            className={cn(
              "gap-3 cursor-pointer",
              selectedModel === model.id && "bg-primary/10"
            )}
          >
            <model.icon className={cn("w-4 h-4", model.color)} />
            <span>{model.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
