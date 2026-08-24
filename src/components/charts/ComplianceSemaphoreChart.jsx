import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import ChartCard from './ChartCard'

const STATUS_COLOR = {
  green: 'var(--status-green)',
  amber: 'var(--status-amber)',
  red: 'var(--status-red)',
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{label}</p>
      <p className="chart-tooltip__value">{payload[0].value}% de cumplimiento</p>
    </div>
  )
}

export default function ComplianceSemaphoreChart({ biologico, items }) {
  const rows = items ?? []

  return (
    <ChartCard
      title="Semaforización de cumplimiento"
      meta={`Coberturas de vacunación · fecha de corte · resaltado: ${biologico.label}`}
      size="lg"
    >
      <ResponsiveContainer width="100%" height={230}>
        <BarChart
          data={rows}
          layout="vertical"
          margin={{ top: 4, right: 24, left: 6, bottom: 0 }}
        >
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis
            type="category"
            dataKey="categoria"
            tick={{ fontSize: 11.5, fill: 'var(--ink-soft)' }}
            axisLine={false}
            tickLine={false}
            width={220}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: biologico.colorSoft }} />
          <Bar dataKey="valor" maxBarSize={18}>
            {rows.map((d) => {
              const isMatch = d.biologicoId === biologico.id
              return (
                <Cell
                  key={d.categoria}
                  fill={STATUS_COLOR[d.estado]}
                  fillOpacity={isMatch ? 1 : 0.28}
                  stroke={isMatch ? biologico.color : 'transparent'}
                  strokeWidth={isMatch ? 2 : 0}
                />
              )
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="chart-footnote">
        El contorno de color marca las categorías del biológico seleccionado. Datos ilustrativos.
      </p>
    </ChartCard>
  )
}
