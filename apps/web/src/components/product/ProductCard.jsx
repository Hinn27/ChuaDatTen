import { useNavigate, useParams } from 'react-router-dom'
import useCartStore from '../../stores/useCartStore.js'

/**
 * Format giá tiền VND
 * @param {number} price
 * @returns {string}
 */
function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price)
}

/**
 * ProductCard — card hiển thị sản phẩm (dùng ở HomePage, SearchPage, v.v.)
 *
 * @param {Object} props
 * @param {Object} props.product - { id, name, image, price, originalPrice, category, description }
 * @param {boolean} [props.showAddToCart] - Hiện nút thêm giỏ hàng
 */
export function ProductCard({ product, showAddToCart = true }) {
  const navigate = useNavigate()
  const { member } = useParams()
  const addItem = useCartStore((state) => state.addItem)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    }, member || 'a')
  }

  return (
    <article
      onClick={() => navigate(`/${member || 'a'}/products/${product.id}`)}
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
        background: '#fff',
      }}
    >
      {/* Discount badge */}
      {discount > 0 && (
        <span
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            zIndex: 2,
            fontWeight: 700,
            backgroundColor: '#ff4b2b',
            color: '#ffffff',
            padding: '2px 8px',
            borderRadius: 999,
            fontSize: 12,
          }}
        >
          -{discount}%
        </span>
      )}

      <img
        src={product.image}
        alt={product.name}
        style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }}
      />

      <div style={{ padding: 12 }}>
        {product.category && (
          <span
            style={{
              marginBottom: 8,
              fontSize: 11,
              display: 'inline-block',
              padding: '2px 8px',
              borderRadius: 999,
              backgroundColor: '#f3f4f6',
              color: '#6b7280',
            }}
          >
            {product.category}
          </span>
        )}

        <div
          style={{
            fontWeight: 700,
            color: '#1a1a2e',
            marginBottom: 4,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {product.name}
        </div>

        {product.description && (
          <p
            style={{
              color: '#6b7280',
              margin: '0 0 8px 0',
              fontSize: 12,
              lineHeight: 1.4,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.description}
          </p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 800, color: '#ff4b2b' }}>
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && (
              <div style={{ textDecoration: 'line-through', color: '#9ca3af', fontSize: 12 }}>
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>

          {showAddToCart && (
            <button
              type="button"
              onClick={handleAddToCart}
              style={{
                backgroundColor: '#ff4b2b',
                color: '#ffffff',
                border: 'none',
                borderRadius: 8,
                padding: '6px 10px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              + Gio
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
