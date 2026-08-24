import { useState } from 'react'
import { useRole } from '../context/RoleContext'
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
          src="/uniandes-medicina.png"
          alt="Universidad de los Andes — Facultad de Medicina"
          width="184"
          height="40"
        />
        <h1 className="role-gate__title">Observatorio de Salud Pública</h1>
        <p className="role-gate__lead">
          Elige cómo quieres entrar. El contenido del visor es el mismo para
          ambos roles — la diferencia es que, como <strong>administrador</strong>,
          puedes actualizar los datos del dashboard subiendo un archivo Excel,
          en vez de depender de que alguien edite el código.
        </p>

        <div className="role-gate__cards">
          <button className="role-card" onClick={chooseGuest}>
            <span className="role-card__eyebrow">Ver el visor</span>
            <span className="role-card__title">Invitado</span>
            <span className="role-card__desc">
              Explora todos los indicadores, filtra por biológico y consulta
              boletines y publicaciones. Solo lectura.
            </span>
            <span className="role-card__cta">Entrar como invitado →</span>
          </button>

          <div className="role-card role-card--admin">
            <span className="role-card__eyebrow">Actualizar datos</span>
            <span className="role-card__title">Administrador</span>
            <span className="role-card__desc">
              Todo lo del invitado, más un panel para subir un Excel y
              refrescar coberturas, metas y proyecciones sin tocar código.
            </span>

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

        <p className="role-gate__footnote">
          Este código es solo una barrera de demostración en el navegador,
          no un inicio de sesión real — no lo uses para proteger datos
          sensibles en producción.
        </p>
      </div>
    </div>
  )
}
