import './DashboardTabs.css'

export const TABS = [
  {
    id: 'cobertura',
    label: 'Cobertura y meta',
    title: 'Cobertura y cumplimiento de metas',
    description:
      'Coberturas de vacunación por territorio y el avance del biológico seleccionado frente a su meta.',
  },
  {
    id: 'frontera',
    label: 'Frontera y cumplimiento',
    title: 'Frontera y semaforización',
    description:
      'Cobertura en zonas de frontera frente al promedio nacional, y el cumplimiento por categoría de meta.',
  },
  {
    id: 'proyeccion',
    label: 'Proyección',
    title: 'Proyección a fin de año',
    description: 'Proyección de cierre de año por biológico frente a la meta acumulada.',
  },
  {
    id: 'vigilancia',
    label: 'Vigilancia',
    title: 'Vigilancia epidemiológica',
    description: 'Circulación de virus respiratorios y monitoreo de eventos inmunoprevenibles.',
  },
]

export default function DashboardTabs({ activeId, onChange }) {
  return (
    <div className="dashboard-tabs" role="tablist" aria-label="Categorías del visor">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={tab.id === activeId}
          className={`dashboard-tabs__item ${tab.id === activeId ? 'is-active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
