import { createContext, useContext, useMemo, useState, useCallback } from 'react'
import { defaultDashboardData } from '../data/dashboardData'

const DashboardDataContext = createContext(null)

export function DashboardDataProvider({ children }) {
  const [data, setData] = useState(defaultDashboardData)
  const [lastUpdate, setLastUpdate] = useState(null)

  // Fusiona solo las claves presentes en `partialData` — así, subir un
  // Excel que solo trae la hoja "Cobertura" no borra el resto del dashboard.
  const mergeData = useCallback((partialData) => {
    setData((prev) => ({ ...prev, ...partialData }))
    setLastUpdate(new Date())
  }, [])

  const resetData = useCallback(() => {
    setData(defaultDashboardData)
    setLastUpdate(null)
  }, [])

  const value = useMemo(
    () => ({ data, lastUpdate, mergeData, resetData }),
    [data, lastUpdate, mergeData, resetData],
  )

  return <DashboardDataContext.Provider value={value}>{children}</DashboardDataContext.Provider>
}

export function useDashboardData() {
  const ctx = useContext(DashboardDataContext)
  if (!ctx) {
    throw new Error('useDashboardData debe usarse dentro de <DashboardDataProvider>')
  }
  return ctx
}
