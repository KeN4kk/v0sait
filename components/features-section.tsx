"use client"

import { motion } from "framer-motion"
import { FeatureCard } from "./feature-card"
import { 
  MessageSquare, 
  Image, 
  Video, 
  Mic2, 
  Download,
  Sparkles
} from "lucide-react"

const features = [
  {
    icon: MessageSquare,
    title: "Текстовые нейросети",
    description: "GPT-4, Claude, Gemini, DeepSeek и другие топовые модели для генерации текста, кода и анализа данных."
  },
  {
    icon: Image,
    title: "Генерация изображений",
    description: "Создавайте уникальные изображения с помощью Nano Banana и других передовых моделей."
  },
  {
    icon: Video,
    title: "Генерация видео",
    description: "Превращайте текст в видео с WAN 2.5 — передовой моделью для создания видеоконтента."
  },
  {
    icon: Mic2,
    title: "Озвучка TTS",
    description: "Профессиональная озвучка текста голосами высочайшего качества на любом языке."
  },
  {
    icon: Download,
    title: "TikTok Downloader",
    description: "Скачивайте видео из TikTok без водяных знаков в один клик."
  },
  {
    icon: Sparkles,
    title: "Поиск в интернете",
    description: "AI с доступом к актуальной информации из интернета в реальном времени."
  }
]

export function FeaturesSection() {
  return (
    <section className="relative py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Все возможности AI
            <br />
            <span className="text-glow bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              в одном месте
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Единый интерфейс для работы с лучшими нейросетями мира
          </p>
        </motion.div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
