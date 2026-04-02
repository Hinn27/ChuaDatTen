import { Chip } from '@mui/material'

/**
 * SimilarityBadge — hiển thị điểm Cosine Similarity
 * Màu sắc thay đổi theo mức độ:
 * - ≥ 0.9: Xanh lá (rất phù hợp)
 * - 0.7–0.89: Vàng (phù hợp)
 * - < 0.7: Xám (ít phù hợp)
 *
 * @param {Object} props
 * @param {number} props.score - Điểm similarity (0–1)
 */
export function SimilarityBadge({ score }) {
  const percentage = Math.round(score * 100)

  let color = '#9E9E9E' // grey
  let bgColor = '#F5F5F5'
  let label = 'Ít phù hợp'

  if (score >= 0.9) {
    color = '#10B981'
    bgColor = '#ECFDF5'
    label = 'Rất phù hợp'
  } else if (score >= 0.7) {
    color = '#F59E0B'
    bgColor = '#FFFBEB'
    label = 'Phù hợp'
  }

  return (
    <Chip
      label={`${percentage}% — ${label}`}
      size="small"
      sx={{
        fontWeight: 600,
        fontSize: '0.7rem',
        backgroundColor: bgColor,
        color,
        borderRadius: 2,
      }}
    />
  )
}
