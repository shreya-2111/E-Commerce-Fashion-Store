import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiX, FiPlus, FiMinus, FiTrash2, FiShoppingBag, FiInfo } from 'react-icons/fi';
import { ShopContext } from '../context/ShopContext';

const Cart = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    getCartSubtotal,
    getCartTotal,
    discount,
    promoCode,
    promoError,
    applyPromoCode,
    removePromoCode,
    triggerLoading
  } = useContext(ShopContext);

  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    triggerLoading(300);
  }, [triggerLoading]);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      const success = applyPromoCode(couponInput);
      if (success) {
        setCouponInput('');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={styles.page}
    >
      <div className="container">
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>YOUR SHOPPING BAG</h1>
          <span style={styles.subtitle}>
            ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
          </span>
        </div>

        {/* Content */}
        {cart.length === 0 ? (
          <div style={styles.emptyContainer} className="glass-panel">
            <FiShoppingBag size={48} style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }} />
            <h2>YOUR BAG IS EMPTY</h2>
            <p style={styles.emptyText}>
              You haven't added any premium selections to your cart. Explore our seasonal catalogs and Jordan retros to find your favorites.
            </p>
            <Link to="/shop" className="btn btn-primary" style={{ marginTop: '2rem' }}>
              DISCOVER NEW ARRIVALS
            </Link>
          </div>
        ) : (
          <div style={styles.cartGrid}>
            {/* Left Column: Items */}
            <div style={styles.itemsCol}>
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor.name}`}
                  style={styles.cartItem}
                  className="glass-panel"
                >
                  <img src={item.image} alt={item.title} style={styles.itemImage} />
                  
                  <div style={styles.itemDetails}>
                    <div style={styles.itemHeader}>
                      <div>
                        <span style={styles.itemBrand}>{item.brand}</span>
                        <h3 style={styles.itemTitle}>{item.title}</h3>
                      </div>
                      <span style={styles.itemPrice}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <div style={styles.itemMeta}>
                      <span style={styles.metaLabel}>
                        Size: <strong>{item.selectedSize}</strong>
                      </span>
                      <span style={styles.metaDivider}>|</span>
                      <span style={styles.colorIndicator}>
                        Color:
                        <span
                          style={{
                            ...styles.colorDot,
                            backgroundColor: item.selectedColor.hex,
                          }}
                        />
                        <strong>{item.selectedColor.name}</strong>
                      </span>
                    </div>

                    <div style={styles.itemActions}>
                      {/* Quantity buttons */}
                      <div style={styles.qtyBlock}>
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor.name, item.quantity - 1)}
                          style={styles.qtyBtn}
                        >
                          <FiMinus size={12} />
                        </button>
                        <span style={styles.qtyVal}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor.name, item.quantity + 1)}
                          style={styles.qtyBtn}
                        >
                          <FiPlus size={12} />
                        </button>
                      </div>

                      {/* Remove item */}
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor.name)}
                        style={styles.removeBtn}
                      >
                        <FiTrash2 size={16} style={{ marginRight: '6px' }} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Order Summary */}
            <div style={styles.summaryCol}>
              <div style={styles.summaryCard} className="glass-panel">
                <h3 style={styles.summaryTitle}>ORDER SUMMARY</h3>
                
                <div style={styles.summaryDivider} />

                {/* Subtotal */}
                <div style={styles.summaryLine}>
                  <span>Subtotal</span>
                  <strong>${getCartSubtotal().toFixed(2)}</strong>
                </div>

                {/* Shipping info */}
                <div style={styles.summaryLine}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    Shipping & Handling <FiInfo size={12} style={{ marginLeft: '4px', cursor: 'help' }} title="Free shipping over $150" />
                  </span>
                  <span>{getCartSubtotal() >= 150 ? 'FREE' : '$15.00'}</span>
                </div>

                {/* Promo Coupon Form */}
                <form onSubmit={handleApplyCoupon} style={styles.couponForm}>
                  <input
                    type="text"
                    placeholder="PROMO CODE"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    style={styles.couponInput}
                  />
                  <button type="submit" style={styles.couponBtn}>
                    APPLY
                  </button>
                </form>

                {/* Coupon badge display */}
                {promoCode && (
                  <div style={styles.couponBadge}>
                    <span>Promo: <strong>{promoCode} ({discount}% OFF)</strong></span>
                    <button type="button" onClick={removePromoCode} style={styles.removeCouponBtn}>
                      <FiX size={14} />
                    </button>
                  </div>
                )}
                {promoError && <p style={styles.promoError}>{promoError}</p>}

                {/* Discount calculation */}
                {discount > 0 && (
                  <div style={styles.summaryLine}>
                    <span>Coupon Discount</span>
                    <span style={{ color: 'var(--accent)' }}>
                      -${(getCartSubtotal() * (discount / 100)).toFixed(2)}
                    </span>
                  </div>
                )}

                <div style={styles.summaryDivider} />

                {/* Grand Total */}
                <div style={{ ...styles.summaryLine, fontSize: '1.15rem' }}>
                  <span>Total Due</span>
                  <strong style={{ color: 'var(--text-primary)' }}>
                    ${(getCartTotal() + (getCartSubtotal() >= 150 ? 0 : 15)).toFixed(2)}
                  </strong>
                </div>

                {/* Checkout button */}
                <button
                  onClick={() => navigate('/checkout')}
                  className="btn btn-primary"
                  style={styles.checkoutBtn}
                >
                  PROCEED TO SECURE CHECKOUT
                </button>

                <p style={styles.securityNote}>
                  Payments are secure and processed with high-grade SSL encryption. Standard deliveries arrive in 3-5 days.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const styles = {
  page: {
    padding: '3rem 0 6rem 0',
    minHeight: '80vh',
  },
  header: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '10px',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '1.5rem',
    marginBottom: '3rem',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
    textTransform: 'uppercase',
    fontWeight: '800',
    color: 'var(--text-primary)',
    margin: 0,
    letterSpacing: '0.05em',
  },
  subtitle: {
    fontSize: '1rem',
    color: 'var(--text-secondary)',
    fontWeight: '400',
  },
  emptyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '6rem 2rem',
    borderRadius: '16px',
  },
  emptyText: {
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    maxWidth: '450px',
    lineHeight: '1.6',
    fontWeight: '300',
    marginTop: '0.5rem',
  },
  cartGrid: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '3rem',
  },
  itemsCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  cartItem: {
    display: 'flex',
    gap: '1.5rem',
    padding: '1.5rem',
    borderRadius: '16px',
  },
  itemImage: {
    width: '100px',
    height: '130px',
    borderRadius: '8px',
    objectFit: 'cover',
  },
  itemDetails: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  itemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '6px',
  },
  itemBrand: {
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    color: 'var(--accent)',
    letterSpacing: '0.05em',
  },
  itemTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    lineHeight: '1.3',
    margin: '2px 0 0 0',
  },
  itemPrice: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  itemMeta: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '1rem',
  },
  metaLabel: {
    fontWeight: '400',
  },
  metaDivider: {
    opacity: 0.3,
  },
  colorIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  colorDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    border: '1px solid var(--border-color)',
    display: 'inline-block',
  },
  itemActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  qtyBlock: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid var(--border-color)',
    borderRadius: '20px',
    overflow: 'hidden',
  },
  qtyBtn: {
    padding: '0.35rem 0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-secondary)',
    ':hover': {
      backgroundColor: 'var(--bg-secondary)',
      color: 'var(--text-primary)',
    },
  },
  qtyVal: {
    fontSize: '0.9rem',
    fontWeight: '600',
    padding: '0 0.5rem',
    color: 'var(--text-primary)',
    minWidth: '22px',
    textAlign: 'center',
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '0.85rem',
    fontWeight: '600',
    transition: 'color var(--transition-fast)',
    ':hover': {
      color: 'var(--accent)',
    },
  },
  summaryCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  summaryCard: {
    padding: '2.5rem 2rem',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
  },
  summaryTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.1rem',
    fontWeight: '700',
    letterSpacing: '0.05em',
    color: 'var(--text-primary)',
  },
  summaryDivider: {
    height: '1px',
    backgroundColor: 'var(--border-color)',
    margin: '1.25rem 0',
  },
  summaryLine: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    marginBottom: '0.75rem',
  },
  couponForm: {
    display: 'flex',
    gap: '0.5rem',
    margin: '1.25rem 0 0.75rem 0',
  },
  couponInput: {
    flex: 1,
    padding: '0.75rem 1rem',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    fontSize: '0.8rem',
    fontWeight: '600',
    letterSpacing: '0.05em',
    outline: 'none',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
  },
  couponBtn: {
    padding: '0.75rem 1.25rem',
    backgroundColor: 'var(--text-primary)',
    color: 'var(--bg-primary)',
    borderRadius: '6px',
    fontSize: '0.8rem',
    fontWeight: '700',
    letterSpacing: '0.05em',
    cursor: 'pointer',
  },
  couponBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(230, 57, 70, 0.08)',
    color: 'var(--accent)',
    padding: '0.45rem 1rem',
    borderRadius: '6px',
    fontSize: '0.8rem',
    border: '1px solid rgba(230, 57, 70, 0.2)',
    marginBottom: '1rem',
  },
  removeCouponBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--accent)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  promoError: {
    color: 'var(--accent)',
    fontSize: '0.8rem',
    margin: '-0.5rem 0 1rem 0',
  },
  checkoutBtn: {
    width: '100%',
    padding: '1rem',
    fontWeight: '700',
    fontSize: '0.85rem',
    marginTop: '1.5rem',
  },
  securityNote: {
    fontSize: '0.75rem',
    lineHeight: '1.4',
    color: 'var(--text-muted)',
    marginTop: '1.5rem',
    textAlign: 'center',
    fontWeight: '300',
  },
};

// Add responsive media query rules for cart splits
const cssRule = `
@media (max-width: 992px) {
  div[style*="cartGrid"] {
    grid-template-columns: 1fr !important;
    gap: 2.5rem !important;
  }
}
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(cssRule));
  document.head.appendChild(style);
}

export default Cart;
