import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Team from './components/Team'
import Dashboard from './components/Dashboard'
import Objectives from './components/Objectives'
import VaccinationScope from './components/VaccinationScope'
import Bulletins from './components/Bulletins'
import Contact from './components/Contact'
import Footer from './components/Footer'
import RoleGate from './components/RoleGate'
import { RoleProvider, useRole } from './context/RoleContext'
import { DashboardDataProvider } from './context/DashboardDataContext'

function Site() {
  const { role } = useRole()

  if (!role) {
    return <RoleGate />
  }

  return (
    <DashboardDataProvider>
      <Header />
      <main>
        <Hero />
        <About />
        <Team />
        <Dashboard />
        <Objectives />
        <VaccinationScope />
        <Bulletins />
        <Contact />
      </main>
      <Footer />
    </DashboardDataProvider>
  )
}

export default function App() {
  return (
    <RoleProvider>
      <Site />
    </RoleProvider>
  )
}
