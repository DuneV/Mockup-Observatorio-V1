import { coverageStatus } from '../data/dashboardData'
import './KpiStats.css'

function average(rows, key) {
  if (!rows?.length) return 0
  return Math.round(rows.reduce((sum, r) => sum + (r[key] ?? 0), 0) / rows.length)
}

export default function KpiStats({ biologico, coverageRows, goal, borderRows, events }) {
  const avgCoverage = average(coverageRows, 'cobertura')
  const avgBorder = average(borderRows, 'frontera')
  const totalEvents = (events ?? []).reduce((sum, e) => sum + (e.casos ?? 0), 0)
  const risingEvents = (events ?? []).filter((e) => e.tendencia === 'up').length

  const stats = [
    {
      label: 'Cobertura promedio',
      value: `${avgCoverage}%`,
      status: coverageStatus(avgCoverage),
      hint: `${biologico.label} · por territorio`,
    },
    {
      label: 'Meta alcanzada',
      value: `${goal?.avance ?? 0}%`,
      status: coverageStatus(goal?.avance ?? 0),
      hint: goal?.corte ?? '—',
    },
    {
      label: 'Cobertura en frontera',
      value: `${avgBorder}%`,
      status: coverageStatus(avgBorder),
      hint: 'Promedio municipios frontera',
    },
    {
      label: 'Eventos notificados',
      value: totalEvents,
      status: risingEvents > 0 ? 'red' : 'green',
      hint: `${risingEvents} en aumento`,
    },
  ]

  return (
    <div className="kpi-stats">
      {stats.map((s) => (
        <div key={s.label} className="kpi-stats__card">
          <span className={`kpi-stats__dot kpi-stats__dot--${s.status}`} />
          <div>
            <p className="kpi-stats__label">{s.label}</p>
            <p className="kpi-stats__value" style={{ color: biologico.color }}>
              {s.value}
            </p>
            <p className="kpi-stats__hint">{s.hint}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
