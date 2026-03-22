"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Gift, 
  Users, 
  Copy, 
  Check,
  Star,
  TrendingUp,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const referrals = [
  { id: 1, name: "Мария К.", date: "20 марта 2024", bonus: 100, avatar: "МК" },
  { id: 2, name: "Дмитрий П.", date: "18 марта 2024", bonus: 100, avatar: "ДП" },
  { id: 3, name: "Анна С.", date: "15 марта 2024", bonus: 100, avatar: "АС" },
]

export default function ReferralPage() {
  const [copied, setCopied] = useState(false)
  const referralLink = "https://ken4kk-app.ru/ref/alexey123"
  const invitedCount = 3
  const targetCount = 5
  const progress = (invitedCount / targetCount) * 100
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Реферальная программа</h1>
          <p className="text-muted-foreground">Приглашайте друзей и получайте бонусы</p>
        </motion.div>
        
        {/* Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass border-primary/20 glow-border overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
            <CardContent className="relative p-6">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Progress Circle */}
                <div className="relative">
                  <div className="w-40 h-40 rounded-full border-8 border-primary/20 flex items-center justify-center">
                    <div 
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(hsl(var(--primary)) ${progress}%, transparent ${progress}%)`,
                        mask: 'radial-gradient(farthest-side, transparent calc(100% - 8px), #fff calc(100% - 8px))',
                        WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 8px), #fff calc(100% - 8px))',
                      }}
                    />
                    <div className="text-center">
                      <p className="text-4xl font-bold text-foreground">{invitedCount}</p>
                      <p className="text-sm text-muted-foreground">из {targetCount}</p>
                    </div>
                  </div>
                </div>
                
                {/* Info */}
                <div className="flex-1 text-center lg:text-left">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Приглашено друзей: {invitedCount} / {targetCount}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Пригласите ещё {targetCount - invitedCount} друга, чтобы получить награду!
                  </p>
                  <Progress value={progress} className="h-3 mb-4" />
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm text-muted-foreground">
                      +100 токенов за каждого приглашённого друга
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Reward Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass border-yellow-500/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-orange-500/10" />
            <CardContent className="relative p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center animate-pulse-glow">
                  <Gift className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    Получи подарок в Telegram!
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    За 5 приглашённых друзей вы получите <span className="text-yellow-400 font-semibold">15 звёзд</span> в Telegram
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-muted-foreground/30" />
                    <Star className="w-5 h-5 text-muted-foreground/30" />
                    <span className="ml-2 text-sm text-muted-foreground">{invitedCount}/5 выполнено</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Referral Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Ваша реферальная ссылка
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 glass rounded-xl border border-primary/20 px-4 py-3">
                  <p className="text-sm text-foreground font-mono truncate">{referralLink}</p>
                </div>
                <Button 
                  onClick={handleCopy}
                  className="rounded-xl bg-primary hover:bg-primary/90 gap-2 min-w-[140px]"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Скопировано!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Скопировать
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <Card className="glass border-primary/20 glow-border-hover transition-all duration-300">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-sm text-muted-foreground">Приглашённых</p>
            </CardContent>
          </Card>
          <Card className="glass border-primary/20 glow-border-hover transition-all duration-300">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">300</p>
              <p className="text-sm text-muted-foreground">Токенов получено</p>
            </CardContent>
          </Card>
          <Card className="glass border-primary/20 glow-border-hover transition-all duration-300">
            <CardContent className="p-4 text-center">
              <Gift className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">1</p>
              <p className="text-sm text-muted-foreground">Наград получено</p>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Referral List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass border-primary/20">
            <CardHeader>
              <CardTitle>Приглашённые друзья</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {referrals.map((ref) => (
                  <div 
                    key={ref.id}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                        <span className="text-sm font-medium text-foreground">{ref.avatar}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{ref.name}</p>
                        <p className="text-xs text-muted-foreground">{ref.date}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-green-400">+{ref.bonus} токенов</span>
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
