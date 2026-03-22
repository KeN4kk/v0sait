"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative py-16 px-4 border-t border-primary/10"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-lg font-bold text-primary-foreground">K</span>
              </div>
              <span className="text-xl font-semibold text-foreground">KeN4kk App</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Премиум AI-платформа для работы с нейросетями нового поколения. Создавайте контент будущего уже сегодня.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Продукт</h4>
            <ul className="space-y-3">
              {["Текстовые AI", "Генерация фото", "Генерация видео", "Озвучка TTS"].map((item) => (
                <li key={item}>
                  <Link href="/chat" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Поддержка</h4>
            <ul className="space-y-3">
              {["Telegram бот", "Документация", "FAQ", "Контакты"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 KeN4kk App. Все права защищены.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
