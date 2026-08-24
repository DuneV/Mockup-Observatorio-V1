import { hero } from '../data/content'
import './Hero.css'

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <span className="hero__shape hero__shape--circle" aria-hidden="true" />
      <span className="hero__shape hero__shape--triangle" aria-hidden="true" />

      <div className="container hero__row">
        <div className="hero__copy">
          <span className="eyebrow">{hero.eyebrow}</span>
          <h1 className="hero__title">{hero.title}</h1>
          <p className="hero__lead">{hero.lead}</p>
          <div className="hero__actions">
            <a className="btn btn-primary" href={hero.ctaPrimary.href}>
              {hero.ctaPrimary.label}
            </a>
            <a className="btn btn-ghost" href={hero.ctaSecondary.href}>
              {hero.ctaSecondary.label}
            </a>
          </div>
        </div>

        <div className="hero__panel" aria-hidden="true">
          <div className="hero__panel-head">
            <span className="hero__panel-label">Estado de cobertura</span>
          </div>
          <ul className="hero__panel-list">
            <li>
              <span className="dot dot-green" />
              Influenza — meta cumplida
            </li>
            <li>
              <span className="dot dot-amber" />
              Frontera — en seguimiento
            </li>
            <li>
              <span className="dot dot-red" />
              Virus respiratorios — alerta
            </li>
          </ul>
          <div className="hero__panel-foot">
            Actualizado con datos del Ministerio de Salud y territorios
          </div>
        </div>
      </div>
    </section>
  )
}
