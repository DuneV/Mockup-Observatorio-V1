import { viewer } from '../data/content'
import './Visor.css'

export default function Visor() {
  return (
    <section id="visor" className="visor">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{viewer.eyebrow}</span>
          <h2>{viewer.title}</h2>
        </div>

        <div className="visor__frame">
          <iframe
            title="visor_lite_actualizado"
            src={viewer.embedUrl}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
