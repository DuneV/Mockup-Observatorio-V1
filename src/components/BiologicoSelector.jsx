import { biologicos } from '../data/dashboardData'
import './BiologicoSelector.css'

export default function BiologicoSelector({ selectedId, onChange }) {
  return (
    <div className="bio-selector" role="tablist" aria-label="Filtrar por biológico">
      {biologicos.map((bio) => {
        const active = bio.id === selectedId
        return (
          <button
            key={bio.id}
            role="tab"
            aria-selected={active}
            className={`bio-selector__tab ${active ? 'is-active' : ''}`}
            style={active ? { background: bio.color, borderColor: bio.color } : undefined}
            onClick={() => onChange(bio.id)}
          >
            <span
              className="bio-selector__dot"
              style={{ background: active ? 'rgba(255,255,255,0.85)' : bio.color }}
            />
            {bio.label}
          </button>
        )
      })}
    </div>
  )
}
