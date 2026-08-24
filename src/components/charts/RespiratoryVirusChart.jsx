import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import ChartCard from './ChartCard'

export default function RespiratoryVirusChart({ data }) {
  const rows = data ?? []
  return (
    <ChartCard
      title="Circulación de virus respiratorios"
      meta="% de positividad · frecuencia relativa semanal"
      size="lg"
      status="red"
    >
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={rows} margin={{ top: 8, right: 16, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id="fillInfluenza" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--teal)" stopOpacity={0.35} />
              <stop offset="95%" stopColor="var(--teal)" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="fillVsr" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--status-red)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--status-red)" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="fillCovid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--status-amber)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--status-amber)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 5" stroke="var(--line)" vertical={false} />
          <XAxis
            dataKey="semana"
            tick={{ fontSize: 11, fill: 'var(--muted)' }}
            axisLine={{ stroke: 'var(--line)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'var(--muted)' }}
            axisLine={false}
            tickLine={false}
            width={30}
            unit="%"
          />
          <Tooltip
            contentStyle={{
              background: 'var(--paper-raised)',
              border: '1px solid var(--line)',
              borderRadius: 0,
              fontSize: 12,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
          <Area type="monotone" dataKey="influenza" name="Influenza" stroke="var(--teal)" fill="url(#fillInfluenza)" strokeWidth={2} />
          <Area type="monotone" dataKey="vsr" name="VSR" stroke="var(--status-red)" fill="url(#fillVsr)" strokeWidth={2} />
          <Area type="monotone" dataKey="covid" name="COVID-19" stroke="var(--status-amber)" fill="url(#fillCovid)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
      <p className="chart-footnote">Datos ilustrativos.</p>
    </ChartCard>
  )
}
