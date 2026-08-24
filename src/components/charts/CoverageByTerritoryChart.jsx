import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import ChartCard from './ChartCard'
import { coverageStatus } from '../../data/dashboardData'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const value = payload[0].value
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{label}</p>
      <p className="chart-tooltip__value">{value}% de cobertura</p>
    </div>
  )
}

export default function CoverageByTerritoryChart({ biologico, data }) {
  const rows = data ?? []
  const avg = rows.length
    ? Math.round(rows.reduce((sum, d) => sum + d.cobertura, 0) / rows.length)
    : 0

  return (
    <ChartCard
      title={`Coberturas de vacunación por territorio — ${biologico.label}`}
      meta="Eventos trazadores · actualizado"
      status={coverageStatus(avg)}
      size="lg"
    >
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={rows} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 5" stroke="var(--line)" vertical={false} />
          <XAxis
            dataKey="territorio"
            tick={{ fontSize: 11, fill: 'var(--muted)' }}
            axisLine={{ stroke: 'var(--line)' }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: 'var(--muted)' }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <ReferenceLine y={95} stroke="var(--status-green)" strokeDasharray="4 4" strokeOpacity={0.6} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: biologico.colorSoft }} />
          <Bar dataKey="cobertura" maxBarSize={44} fill={biologico.color} />
        </BarChart>
      </ResponsiveContainer>
      <p className="chart-footnote">
        Línea punteada verde: meta de cobertura (95%). Datos ilustrativos.
      </p>
    </ChartCard>
  )
}
