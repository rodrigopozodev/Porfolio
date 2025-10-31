import { HeroSection } from "@/components/hero-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { ContactSection } from "@/components/contact-section"
import { PageNavigation } from "@/components/page-navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { HandednessToggle } from "@/components/handedness-toggle"

export default function Home() {
  return (
    <main className="snap-container">
      <HeroSection />
      <PortfolioSection />
      <ContactSection />
      <PageNavigation />
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        <HandednessToggle />
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </main>
  )
}
