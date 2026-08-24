import { vaccinationScope } from '../data/content'
import './VaccinationScope.css'

export default function VaccinationScope() {
  return (
    <section id="vacunacion" className="scope">
      <div className="container scope__grid">
        <div>
          <span className="eyebrow">{vaccinationScope.eyebrow}</span>
          <h2 className="scope__title">{vaccinationScope.title}</h2>

          <ul className="scope__list">
            {vaccinationScope.items.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </div>

        <aside className="scope__docs">
          <p className="scope__docs-title">{vaccinationScope.documents.title}</p>
          <ul>
            {vaccinationScope.documents.links.map((doc) => (
              <li key={doc.href}>
                <a href={doc.href} target="_blank" rel="noreferrer">
                  {doc.label}
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}
