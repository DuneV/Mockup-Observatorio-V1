import './ChartCard.css'

export default function ChartCard({ title, meta, status, size = 'md', children }) {
  return (
    <article className={`chart-card chart-card--${size}`}>
      <header className="chart-card__head">
        <div>
          <p className="chart-card__title">{title}</p>
          {meta && <p className="chart-card__meta">{meta}</p>}
        </div>
        {status && (
          <span className={`chart-card__status chart-card__status--${status}`}>
            {status === 'green' && 'En meta'}
            {status === 'amber' && 'En seguimiento'}
            {status === 'red' && 'Requiere atención'}
          </span>
        )}
      </header>
      <div className="chart-card__body">{children}</div>
    </article>
  )
}
