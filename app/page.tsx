import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SocialSidebar } from "@/components/layout/social-sidebar"
import { ScrollToTop } from "@/components/ui/scroll-to-top"
import { HeroSection } from "@/components/home/hero-section"
import { StatsSection } from "@/components/home/stats-section"
import { AboutPreview } from "@/components/home/about-preview"
import { FeaturedProductsSection } from "@/components/home/featured-products-section"
import { FeaturesSection } from "@/components/home/features-section"
import { ShowcaseSection } from "@/components/home/showcase-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <Header />
      <SocialSidebar />
      <ScrollToTop />
      <main>
        <HeroSection />
        <StatsSection />
        <AboutPreview />
        <FeaturedProductsSection />
        <FeaturesSection />
        <ShowcaseSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
