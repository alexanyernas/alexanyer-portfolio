import { useState } from 'react'
import { AnimatePresence, MotionConfig } from 'motion/react'
import Header from './components/Header'
import Preloader from './components/Preloader'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Footer from './components/Footer'

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {!ready && <Preloader onDone={() => setReady(true)} />}
      </AnimatePresence>
      <Header />
      <main>
        <Hero start={ready} />
        <About />
        <Experience />
        <Projects />
      </main>
      <Footer />
    </MotionConfig>
  )
}
