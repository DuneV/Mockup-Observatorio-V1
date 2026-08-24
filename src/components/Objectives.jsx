import { objectives } from '../data/content'
import './Objectives.css'

export default function Objectives() {
  return (
    <section id="objetivos" className="objectives">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{objectives.eyebrow}</span>
          <h2>{objectives.title}</h2>
        </div>

        <ol className="objectives__list">
          {objectives.items.map((text, i) => (
            <li key={text}>
              <span className="objectives__index">{String(i + 1).padStart(2, '0')}</span>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
