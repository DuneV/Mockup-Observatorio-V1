import { hero } from '../data/content'
import heroBanner from '../assets/banner.jpg'
import heroVideo from '../assets/hero-bg.mp4'
import './Hero.css'

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <video
        className="hero__bg"
        src={heroVideo}
        poster={heroBanner}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <span className="hero__overlay" aria-hidden="true" />

      <div className="container hero__row">
        <div className="hero__copy">
          <span className="eyebrow eyebrow--on-dark">{hero.eyebrow}</span>
          <h1 className="hero__title">{hero.title}</h1>
          <p className="hero__lead">{hero.lead}</p>
          <div className="hero__actions">
            <a className="btn btn-primary" href={hero.ctaPrimary.href}>
              {hero.ctaPrimary.label}
            </a>
            <a className="btn btn-ghost btn-ghost--on-dark" href={hero.ctaSecondary.href}>
              {hero.ctaSecondary.label}
            </a>
          </div>
        </div>

        <div className="hero__panel">
          <div className="hero__panel-head">
            <span className="hero__panel-label">{hero.panel.label}</span>
          </div>
          <ul className="hero__panel-list">
            {hero.panel.items.map((item) => (
              <li key={item}>
                <span className="dot" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
