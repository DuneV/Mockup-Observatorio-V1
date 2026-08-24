import { bulletins, memorias } from '../data/content'
import './Bulletins.css'

export default function Bulletins() {
  return (
    <section id="boletines" className="bulletins">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{bulletins.eyebrow}</span>
          <h2>{bulletins.title}</h2>
        </div>

        <div className="bulletins__layout">
          <ul className="bulletins__list">
            {bulletins.items.map((item) => (
              <li key={item.href} className={item.featured ? 'is-featured' : ''}>
                <a href={item.href} target="_blank" rel="noreferrer">
                  <span className="bulletins__date">{item.date}</span>
                  <span className="bulletins__label">{item.label}</span>
                  <span className="bulletins__cta" aria-hidden="true">
                    PDF ↓
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <aside className="bulletins__memorias">
            <span className="eyebrow">{memorias.eyebrow}</span>
            <h3>{memorias.title}</h3>
            <ul>
              {memorias.links.map((doc) => (
                <li key={doc.href}>
                  <a href={doc.href} target="_blank" rel="noreferrer">
                    {doc.label}
                  </a>
                </li>
              ))}
            </ul>
            <a className="bulletins__related" href={memorias.related.href}>
              {memorias.related.label} →
            </a>
          </aside>
        </div>
      </div>
    </section>
  )
}
