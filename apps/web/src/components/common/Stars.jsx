export function Stars({ value = 3.4, size }) {
  const full = Math.floor(value)
  const hasHalf = value - full >= 0.5 && value < 5
  return (
    <span className={`rp-stars ${size === 'sm' ? 'rp-stars--sm' : ''}`} aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < full ? 'is-on' : i === full && hasHalf ? 'is-half' : ''}
        >
          ★
        </span>
      ))}
    </span>
  )
}
