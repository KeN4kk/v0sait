import { AnimatedBackground } from "@/components/animated-background"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <AnimatedBackground />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </main>
  )
}
