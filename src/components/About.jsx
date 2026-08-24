import { about } from '../data/content'
import './About.css'

export default function About() {
  return (
    <section id="que-es" className="about">
      <div className="container about__row">
        <div className="about__label">
          <span className="eyebrow">{about.eyebrow}</span>
        </div>
        <div className="about__content">
          <h2>{about.title}</h2>
          <p>{about.body}</p>
        </div>
      </div>
    </section>
  )
}
