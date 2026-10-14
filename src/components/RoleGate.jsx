import { useState } from 'react'
import { useRole } from '../context/RoleContext'
import obsLogo from '../assets/logo_.png'
import './RoleGate.css'

export default function RoleGate() {
  const { chooseGuest, chooseAdmin } = useRole()
  const [showPasscode, setShowPasscode] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState('')

  function handleAdminSubmit(e) {
    e.preventDefault()
    const ok = chooseAdmin(passcode.trim())
    if (!ok) {
      setError('Código incorrecto. Verifica con el equipo del Observatorio.')
    }
  }

  return (
    <div className="role-gate">
      <span className="role-gate__shape role-gate__shape--circle" aria-hidden="true" />
      <span className="role-gate__shape role-gate__shape--square" aria-hidden="true" />

      <div className="role-gate__panel">
        <img
          className="role-gate__logo"
          src={`${import.meta.env.BASE_URL}uniandes-medicina.png`}
          alt="Universidad de los Andes, Facultad de Medicina"
          width="184"
          height="40"
        />
        <h1 className="role-gate__title">
          <img
            className="role-gate__obs-logo"
            src={obsLogo}
            alt="Observatorio de Salud Pública y Epidemiología"
          />
        </h1>

        <div className="role-gate__cards">
          <button className="role-card" onClick={chooseGuest}>
            <span className="role-card__title">Invitado</span>
            <span className="role-card__cta">Entrar como invitado →</span>
          </button>

          <div className="role-card role-card--admin">
            <span className="role-card__title">Administrador</span>

            {!showPasscode ? (
              <button
                type="button"
                className="role-card__cta role-card__cta--button"
                onClick={() => setShowPasscode(true)}
              >
                Entrar como administrador →
              </button>
            ) : (
              <form className="role-card__form" onSubmit={handleAdminSubmit}>
                <label htmlFor="admin-passcode">Código de administrador</label>
                <input
                  id="admin-passcode"
                  type="password"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value)
                    setError('')
                  }}
                  placeholder="••••••••"
                  autoFocus
                />
                {error && <p className="role-card__error">{error}</p>}
                <button type="submit" className="btn btn-primary role-card__submit">
                  Confirmar
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
