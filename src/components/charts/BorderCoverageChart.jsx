import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import ChartCard from './ChartCard'

export default function BorderCoverageChart({ biologico, data }) {
  const rows = data ?? []

  return (
    <ChartCard
      title={`Cobertura en zonas de frontera — ${biologico.label}`}
      meta="vs. promedio nacional"
      status="red"
    >
      <ResponsiveContainer width="100%" height={230}>
        <BarChart
          data={rows}
          layout="vertical"
          margin={{ top: 4, right: 20, left: 6, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 5" stroke="var(--line)" horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: 'var(--muted)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="municipio"
            tick={{ fontSize: 11.5, fill: 'var(--ink-soft)' }}
            axisLine={false}
            tickLine={false}
            width={72}
          />
          <Tooltip
            contentStyle={{
              background: 'var(--paper-raised)',
              border: '1px solid var(--line)',
              borderRadius: 0,
              fontSize: 12,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="nacional" name="Promedio nacional" fill="var(--line)" maxBarSize={12} />
          <Bar dataKey="frontera" name="Municipio frontera" fill={biologico.color} maxBarSize={12} />
        </BarChart>
      </ResponsiveContainer>
      <p className="chart-footnote">Datos ilustrativos.</p>
    </ChartCard>
  )
}
