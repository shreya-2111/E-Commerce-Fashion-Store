import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { ShopContext } from '../context/ShopContext';
import WishlistButton from './WishlistButton';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const [hovered, setHovered] = useState(false);

  const discountPercent = product.oldPrice && product.oldPrice > product.price
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Choose default size and color
    const defaultSize = product.sizes[0];
    const defaultColor = product.colors[0];
    
    addToCart(product, defaultSize, defaultColor, 1);
  };

  const secondImage = product.images && product.images[1] ? product.images[1] : product.image;

  return (
    <Link
      to={`/product/${product.id}`}
      style={styles.cardLink}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.card}>
        {/* Image Frame */}
        <div style={styles.imageFrame}>
          {/* Discount Badge */}
          {discountPercent > 0 && (
            <span style={styles.discountBadge}>-{discountPercent}%</span>
          )}

          {/* Wishlist Floating Button */}
          <div style={styles.wishlistWrapper}>
            <WishlistButton product={product} size={16} />
          </div>

          {/* Primary image */}
          <img
            src={product.image}
            alt={product.title}
            style={{
              ...styles.cardImg,
              opacity: hovered ? 0 : 1,
            }}
          />

          {/* Secondary image (shows on hover) */}
          <img
            src={secondImage}
            alt={`${product.title} Alternate`}
            style={{
              ...styles.cardImg,
              ...styles.cardImgSecondary,
              opacity: hovered ? 1 : 0,
            }}
          />

          {/* Quick Add Overlay Button */}
          <div
            style={{
              ...styles.quickAddOverlay,
              transform: hovered ? 'translateY(0)' : 'translateY(100%)',
              opacity: hovered ? 1 : 0,
            }}
          >
            <button
              onClick={handleQuickAdd}
              style={styles.quickAddBtn}
              className="glass-panel"
            >
              <FiShoppingBag size={14} style={{ marginRight: '6px' }} />
              QUICK ADD TO BAG
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div style={styles.info}>
          <span style={styles.brandName}>{product.brand}</span>
          <h3 style={styles.title}>{product.title}</h3>
          
          <div style={styles.priceRow}>
            <span style={styles.price}>${product.price.toFixed(2)}</span>
            {product.oldPrice && product.oldPrice > product.price && (
              <span style={styles.oldPrice}>${product.oldPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

const styles = {
  cardLink: {
    display: 'block',
    color: 'inherit',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
  },
  imageFrame: {
    position: 'relative',
    width: '100%',
    aspectRatio: '3/4',
    borderRadius: '16px',
    overflow: 'hidden',
    backgroundColor: 'var(--bg-secondary)',
    boxShadow: 'var(--card-shadow)',
    transition: 'transform var(--transition-smooth)',
  },
  cardImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  cardImgSecondary: {
    transform: 'scale(1.05)',
  },
  discountBadge: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    backgroundColor: 'var(--accent)',
    color: '#ffffff',
    fontSize: '0.7rem',
    fontWeight: '700',
    padding: '0.25rem 0.6rem',
    borderRadius: '4px',
    zIndex: 5,
    letterSpacing: '0.05em',
  },
  wishlistWrapper: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    zIndex: 5,
  },
  quickAddOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '1rem',
    zIndex: 4,
    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  quickAddBtn: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--text-primary)',
    border: '1px solid var(--glass-border)',
    borderRadius: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s, color 0.2s',
    ':hover': {
      backgroundColor: 'var(--text-primary)',
      color: 'var(--bg-primary)',
    },
  },
  info: {
    padding: '1rem 0.25rem 0.25rem 0.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  brandName: {
    fontSize: '0.7rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    letterSpacing: '0.08em',
  },
  title: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    lineHeight: '1.4',
    margin: 0,
  },
  priceRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '2px',
  },
  price: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  oldPrice: {
    fontSize: '0.85rem',
    textDecoration: 'line-through',
    color: 'var(--text-muted)',
  },
};

export default ProductCard;
