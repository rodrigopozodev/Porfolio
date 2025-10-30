import { HeroSection } from "@/components/hero-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { ContactSection } from "@/components/contact-section"
import { PageNavigation } from "@/components/page-navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"

export default function Home() {
  return (
    <main className="snap-container">
      <HeroSection />
      <PortfolioSection />
      <ContactSection />
      <PageNavigation />
      <ThemeToggle />
      <LanguageToggle />
    </main>
  )
}
