import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import ChartCard from './ChartCard'
import { coverageStatus } from '../../data/dashboardData'

export default function BiologicoGoalChart({ biologico, goal }) {
  const avance = goal?.avance ?? 0
  const data = [{ name: 'avance', value: avance, fill: biologico.color }]

  return (
    <ChartCard
      title={`Meta de vacunación — ${biologico.label}`}
      meta={goal?.corte ?? ''}
      status={coverageStatus(avance)}
    >
      <div className="gauge">
        <ResponsiveContainer width="100%" height={200}>
          <RadialBarChart
            innerRadius="72%"
            outerRadius="100%"
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar dataKey="value" cornerRadius={0} background={{ fill: biologico.colorSoft }} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="gauge__center">
          <span className="gauge__value" style={{ color: biologico.color }}>
            {avance}%
          </span>
          <span className="gauge__label">de la meta</span>
        </div>
      </div>
      <p className="chart-footnote">
        Población objetivo: {goal?.poblacionObjetivo ?? '—'}. Datos ilustrativos.
      </p>
    </ChartCard>
  )
}
