import { useNavigate, useParams } from "react-router-dom";
import useCartStore from "../../stores/useCartStore.js";

/**
 * Format giá tiền VND
 * @param {number} price
 * @returns {string}
 */
function formatPrice(price) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price);
}

/**
 * ProductCard — card hiển thị sản phẩm (dùng ở HomePage, SearchPage, v.v.)
 *
 * @param {Object} props
 * @param {Object} props.product - { id, name, image, price, originalPrice, category, description }
 * @param {boolean} [props.showAddToCart] - Hiện nút thêm giỏ hàng
 * @param {string} [props.memberOverride] - Ép member đích khi điều hướng
 */
export function ProductCard({ product, showAddToCart = true, memberOverride }) {
    const navigate = useNavigate();
    const { member } = useParams();
    const addItem = useCartStore((state) => state.addItem);
    const routeMember = memberOverride || member || "a";

    const discount = product.originalPrice
        ? Math.round(
              ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100,
          )
        : 0;

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addItem(
            {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
            },
            routeMember,
        );
    };

    return (
        <article
            onClick={() => navigate(`/${routeMember}/products/${product.id}`)}
            className="rf-product-card"
        >
            {/* Discount badge */}
            {discount > 0 && (
                <span className="rf-discount-badge">-{discount}%</span>
            )}

            <img
                src={product.image}
                alt={product.name}
                className="rf-product-image"
            />

            <div className="rf-product-body">
                {product.category && (
                    <span className="rf-product-category">
                        {product.category}
                    </span>
                )}

                <div className="rf-product-name">{product.name}</div>

                {product.description && (
                    <p className="rf-product-description">
                        {product.description}
                    </p>
                )}

                <div className="rf-product-footer">
                    <div>
                        <div className="rf-product-price">
                            {formatPrice(product.price)}
                        </div>
                        {product.originalPrice && (
                            <div className="rf-product-old-price">
                                {formatPrice(product.originalPrice)}
                            </div>
                        )}
                    </div>

                    {showAddToCart && (
                        <button
                            type="button"
                            onClick={handleAddToCart}
                            className="rf-add-btn"
                        >
                            + Gio
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
}
