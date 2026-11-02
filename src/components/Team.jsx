import { useEffect, useState } from 'react'
import { team } from '../data/content'
import './Team.css'

const images = import.meta.glob('../assets/*.{jpeg,jpg,png}', { eager: true, import: 'default' })

function resolveImage(filename) {
  return filename ? images[`../assets/${filename}`] : undefined
}

function initials(name) {
  return name
    .split(' ')
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
}

function Photo({ member, className }) {
  const src = resolveImage(member.image)
  if (!src) {
    return (
      <div className={`${className} team__placeholder`} role="img" aria-label={member.name}>
        {initials(member.name)}
      </div>
    )
  }
  return <img className={className} src={src} alt={member.name} style={photoStyle(member)} />
}

function photoStyle(member) {
  return {
    objectPosition: member.focus,
    transform: member.zoom && member.zoom !== 1 ? `scale(${member.zoom})` : undefined,
    transformOrigin: member.focus,
  }
}

export default function Team() {
  const [activeMember, setActiveMember] = useState(null)

  useEffect(() => {
    if (!activeMember) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActiveMember(null)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [activeMember])

  return (
    <section id="equipo" className="team">
      <span className="team__shape team__shape--circle" aria-hidden="true" />
      <span className="team__shape team__shape--triangle" aria-hidden="true" />

      <div className="container team__row">
        <div className="team__label">
          <span className="eyebrow">{team.eyebrow}</span>
        </div>
        <div className="team__content">
          <h2>{team.title}</h2>
          <div className="team__grid">
            {team.members.map((member) => (
              <button
                type="button"
                className="team__card"
                key={member.name}
                onClick={() => setActiveMember(member)}
              >
                <div className="team__photo-frame">
                  <Photo member={member} className="team__photo" />
                  <span className="team__photo-cue">Ver perfil</span>
                </div>
                <p className="team__name">{member.name}</p>
                <p className="team__role">{member.role}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeMember && (
        <div className="team-modal" role="presentation" onClick={() => setActiveMember(null)}>
          <div
            className="team-modal__box"
            role="dialog"
            aria-modal="true"
            aria-label={activeMember.name}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="team-modal__close"
              onClick={() => setActiveMember(null)}
              aria-label="Cerrar"
            >
              ✕
            </button>
            <div className="team-modal__photo-frame">
              <Photo member={activeMember} className="team-modal__photo" />
            </div>
            <div className="team-modal__body">
              <p className="team-modal__name">{activeMember.name}</p>
              <p className="team-modal__role">{activeMember.position ?? activeMember.role}</p>
              {activeMember.education && (
                <>
                  <h4 className="team-modal__label">Formación</h4>
                  <p className="team-modal__text">{activeMember.education}</p>
                </>
              )}
              {activeMember.areas && (
                <>
                  <h4 className="team-modal__label">Áreas de trabajo</h4>
                  <p className="team-modal__text">{activeMember.areas}</p>
                </>
              )}
              {activeMember.contact && (
                <p className="team-modal__text">
                  <a href={`mailto:${activeMember.contact}`}>{activeMember.contact}</a>
                </p>
              )}
              <p className="team-modal__bio">{activeMember.bio}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
