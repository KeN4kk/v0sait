import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-inter'
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space'
})

export const metadata: Metadata = {
  title: 'KeN4kk App | AI-платформа нового поколения',
  description: 'Премиум AI-платформа для генерации текста, изображений, видео и озвучки. Работайте с лучшими нейросетями: GPT, Claude, Gemini, DeepSeek и другими.',
  generator: 'KeN4kk',
  keywords: ['AI', 'нейросети', 'GPT', 'Claude', 'генерация изображений', 'TTS', 'ИИ'],
  authors: [{ name: 'KeN4kk Team' }],
  openGraph: {
    title: 'KeN4kk App | AI-платформа',
    description: 'Премиум AI-платформа для работы с нейросетями',
    url: 'https://ken4kk-app.ru',
    siteName: 'KeN4kk App',
    locale: 'ru_RU',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0515',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
