import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import ChartCard from './ChartCard'

const TREND_COLOR = {
  up: 'var(--status-red)',
  stable: 'var(--status-amber)',
  down: 'var(--status-green)',
}

const TREND_ICON = { up: '↑', stable: '→', down: '↓' }

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const item = payload[0].payload
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{label}</p>
      <p className="chart-tooltip__value">
        {item.casos} casos {TREND_ICON[item.tendencia]}
      </p>
    </div>
  )
}

export default function ImmunopreventableEventsChart({ data }) {
  const rows = data ?? []
  return (
    <ChartCard
      title="Eventos inmunoprevenibles"
      meta="Frecuencia absoluta de casos notificados"
    >
      <ResponsiveContainer width="100%" height={230}>
        <BarChart data={rows} margin={{ top: 8, right: 8, left: -18, bottom: 24 }}>
          <CartesianGrid strokeDasharray="3 5" stroke="var(--line)" vertical={false} />
          <XAxis
            dataKey="evento"
            tick={{ fontSize: 10.5, fill: 'var(--muted)' }}
            axisLine={{ stroke: 'var(--line)' }}
            tickLine={false}
            angle={-30}
            textAnchor="end"
            interval={0}
          />
          <YAxis tick={{ fontSize: 11, fill: 'var(--muted)' }} axisLine={false} tickLine={false} width={34} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--teal-tint)' }} />
          <Bar dataKey="casos" maxBarSize={36}>
            {rows.map((d) => (
              <Cell key={d.evento} fill={TREND_COLOR[d.tendencia]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="chart-footnote">
        Color por tendencia (↑ aumento · → estable · ↓ disminución). Datos ilustrativos.
      </p>
    </ChartCard>
  )
}
