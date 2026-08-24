import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea,
} from 'recharts'
import ChartCard from './ChartCard'
import { biologicos } from '../../data/dashboardData'

export default function YearEndProjectionChart({ biologico, data }) {
  const rows = data ?? []

  return (
    <ChartCard
      title="Proyección de vacunación a fin de año"
      meta="Por biológico · % de meta acumulada"
      size="lg"
    >
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={rows} margin={{ top: 8, right: 16, left: -18, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 5" stroke="var(--line)" vertical={false} />
          <ReferenceArea x1="Sep" x2="Dic" fill="var(--teal-tint)" fillOpacity={0.6} />
          <XAxis
            dataKey="mes"
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
          <Tooltip
            contentStyle={{
              background: 'var(--paper-raised)',
              border: '1px solid var(--line)',
              borderRadius: 0,
              fontSize: 12,
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
            formatter={(v) => biologicos.find((b) => b.id === v)?.label ?? v}
          />
          {biologicos.map((b) => {
            const isSelected = b.id === biologico.id
            return (
              <Line
                key={b.id}
                type="monotone"
                dataKey={b.id}
                name={b.id}
                stroke={b.color}
                strokeWidth={isSelected ? 3 : 1.5}
                strokeOpacity={isSelected ? 1 : 0.32}
                dot={isSelected ? { r: 3 } : false}
                activeDot={{ r: 5 }}
              />
            )
          })}
        </LineChart>
      </ResponsiveContainer>
      <p className="chart-footnote">
        Línea resaltada: {biologico.label}. Zona sombreada: meses proyectados (sep–dic). Datos ilustrativos.
      </p>
    </ChartCard>
  )
}
