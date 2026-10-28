import Hero from './components/Hero'
import About from './components/About'
import Team from './components/Team'
import Visor from './components/Visor'
import Objectives from './components/Objectives'
import VaccinationScope from './components/VaccinationScope'
import Bulletins from './components/Bulletins'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Team />
        <Visor />
        <Objectives />
        <VaccinationScope />
        <Bulletins />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
