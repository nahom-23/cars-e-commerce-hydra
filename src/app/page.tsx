import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Introduction from '@/components/Introduction'
import About from '@/components/About'
import Services from '@/components/Services'
import Technologies from '@/components/Technologies'
import Process from '@/components/Process'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Navigation />
      <Hero />
      <Introduction />
      <About />
      <Services />
      <Technologies />
      <Process />
      <Contact />
      <Footer />
    </main>
  )
}