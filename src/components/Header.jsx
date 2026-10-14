import { useEffect, useState } from 'react'
import { nav } from '../data/content'
import { useRole } from '../context/RoleContext'
import obsLogo from '../assets/logo_.png'
import './Header.css'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isAdmin, switchRole } = useRole()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container site-header__row">
        <a className="site-header__brand" href="#inicio">
          <img
            className="site-header__logo"
            src={`${import.meta.env.BASE_URL}uniandes-medicina.png`}
            alt="Universidad de los Andes — Facultad de Medicina"
            width="184"
            height="40"
          />
          <span className="site-header__divider" aria-hidden="true" />
          <img
            className="site-header__obs-logo"
            src={obsLogo}
            alt="Observatorio de Salud Pública y Epidemiología"
          />
        </a>

        <nav className="site-header__nav" aria-label="Navegación principal">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-header__role">
          <span className={`site-header__role-pill ${isAdmin ? 'is-admin' : ''}`}>
            {isAdmin ? 'Administrador' : 'Invitado'}
          </span>
          <button type="button" className="site-header__role-switch" onClick={switchRole}>
            Cambiar
          </button>
        </div>

        <button
          className="site-header__toggle"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Abrir menú"
        >
          <span />
          <span />
        </button>
      </div>

      {open && (
        <nav className="site-header__mobile" aria-label="Navegación móvil">
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <div className="site-header__mobile-role">
            <span className={`site-header__role-pill ${isAdmin ? 'is-admin' : ''}`}>
              {isAdmin ? 'Administrador' : 'Invitado'}
            </span>
            <button type="button" className="site-header__role-switch" onClick={switchRole}>
              Cambiar rol
            </button>
          </div>
        </nav>
      )}
    </header>
  )
}
