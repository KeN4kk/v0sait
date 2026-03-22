"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Bot, Copy, Check, Download, ArrowLeft, Sparkles, Clock } from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ResponseData {
  id: string
  content: string
  model: string
  created_at: string
  user_id?: number
  username?: string
}

export default function ResponsePage() {
  const params = useParams()
  const [response, setResponse] = useState<ResponseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const res = await fetch(`/api/response/${params.id}`)
        if (!res.ok) {
          throw new Error("Ответ не найден")
        }
        const data = await res.json()
        setResponse(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка загрузки")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchResponse()
    }
  }, [params.id])

  const copyToClipboard = async () => {
    if (response?.content) {
      await navigator.clipboard.writeText(response.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const downloadAsFile = () => {
    if (response?.content) {
      const blob = new Blob([response.content], { type: "text/plain;charset=utf-8" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `response-${params.id}.txt`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const formatContent = (content: string) => {
    // Handle code blocks
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
    const parts: { type: "text" | "code"; content: string; language?: string }[] = []
    let lastIndex = 0
    let match

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: "text", content: content.slice(lastIndex, match.index) })
      }
      parts.push({ type: "code", content: match[2], language: match[1] })
      lastIndex = match.index + match[0].length
    }

    if (lastIndex < content.length) {
      parts.push({ type: "text", content: content.slice(lastIndex) })
    }

    return parts
  }

  const formatText = (text: string) => {
    // Handle bold, italic, and inline code
    return text.split('\n').map((line, i) => {
      const parts = line.split(/(\*\*.*?\*\*|`.*?`|_.*?_)/g)
      return (
        <span key={i}>
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j} className="text-primary font-semibold">{part.slice(2, -2)}</strong>
            }
            if (part.startsWith('`') && part.endsWith('`')) {
              return <code key={j} className="px-1.5 py-0.5 bg-primary/10 border border-primary/20 rounded text-sm font-mono text-primary">{part.slice(1, -1)}</code>
            }
            if (part.startsWith('_') && part.endsWith('_')) {
              return <em key={j}>{part.slice(1, -1)}</em>
            }
            return part
          })}
          {i < text.split('\n').length - 1 && <br />}
        </span>
      )
    })
  }

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-primary/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">KeN4kk AI</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="gap-2 border-primary/30 hover:bg-primary/10"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Скопировано" : "Копировать"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadAsFile}
              className="gap-2 border-primary/30 hover:bg-primary/10"
            >
              <Download className="w-4 h-4" />
              Скачать
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        {loading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <motion.div
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 border border-primary/20 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Bot className="w-8 h-8 text-primary" />
            </motion.div>
            <p className="text-muted-foreground">Загрузка ответа...</p>
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center min-h-[60vh] gap-4"
          >
            <div className="w-20 h-20 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center">
              <span className="text-4xl">404</span>
            </div>
            <h2 className="text-2xl font-bold">Ответ не найден</h2>
            <p className="text-muted-foreground">Возможно, ссылка устарела или ответ был удален</p>
            <Link href="/">
              <Button variant="outline" className="gap-2 mt-4">
                <ArrowLeft className="w-4 h-4" />
                На главную
              </Button>
            </Link>
          </motion.div>
        )}

        {response && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            {/* Response Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 border border-primary/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Ответ от KeN4kk AI</h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {response.model || "AI Model"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(response.created_at).toLocaleString("ru-RU")}
                  </span>
                </div>
              </div>
            </div>

            {/* Response Content */}
            <div className="glass rounded-2xl border border-primary/10 glow-border overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="prose prose-invert prose-purple max-w-none">
                  {formatContent(response.content).map((part, index) => {
                    if (part.type === "code") {
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="my-4"
                        >
                          <div className="flex items-center justify-between px-4 py-2 bg-background/50 border-b border-primary/10 rounded-t-xl">
                            <span className="text-xs text-muted-foreground font-mono">
                              {part.language || "code"}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                navigator.clipboard.writeText(part.content)
                              }}
                              className="h-6 px-2 text-xs"
                            >
                              <Copy className="w-3 h-3 mr-1" />
                              Copy
                            </Button>
                          </div>
                          <pre className="bg-background/30 p-4 rounded-b-xl overflow-x-auto border border-t-0 border-primary/10">
                            <code className="text-sm font-mono text-foreground/90">
                              {part.content}
                            </code>
                          </pre>
                        </motion.div>
                      )
                    }
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="text-foreground/90 leading-relaxed whitespace-pre-wrap"
                      >
                        {formatText(part.content)}
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-background/30 border-t border-primary/10 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  ID: {response.id}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    className="gap-1 text-xs"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? "Скопировано" : "Копировать всё"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Back to Telegram hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center"
            >
              <p className="text-sm text-muted-foreground">
                Вернитесь в Telegram бот для продолжения диалога
              </p>
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  )
}
