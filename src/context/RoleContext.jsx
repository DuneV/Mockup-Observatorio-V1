import { createContext, useContext, useMemo, useState } from 'react'

const RoleContext = createContext(null)

// Código de acceso de demostración para el rol de administrador.
// Esto NO es autenticación real: es solo una barrera de uso en el
// navegador para esta demo. Para producción, reemplázalo por un login
// contra un backend real.
export const ADMIN_PASSCODE = 'OBSERVATORIO2026'

export function RoleProvider({ children }) {
  const [role, setRole] = useState(null) // null | 'guest' | 'admin'

  const value = useMemo(
    () => ({
      role,
      isAdmin: role === 'admin',
      chooseGuest: () => setRole('guest'),
      chooseAdmin: (passcode) => {
        if (passcode === ADMIN_PASSCODE) {
          setRole('admin')
          return true
        }
        return false
      },
      switchRole: () => setRole(null),
    }),
    [role],
  )

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
}

export function useRole() {
  const ctx = useContext(RoleContext)
  if (!ctx) {
    throw new Error('useRole debe usarse dentro de <RoleProvider>')
  }
  return ctx
}
