import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX, FiPlus, FiMinus, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopContext } from '../context/ShopContext';

const CartDrawer = () => {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    getCartSubtotal,
    getCartTotal,
    discount,
    promoCode,
    promoError,
    applyPromoCode,
    removePromoCode
  } = useContext(ShopContext);

  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      const success = applyPromoCode(couponInput);
      if (success) {
        setCouponInput('');
      }
    }
  };

  const handleCheckoutClick = () => {
    setCartOpen(false);
    navigate('/checkout');
  };

  const handleViewCartClick = () => {
    setCartOpen(false);
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            style={styles.backdrop}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={styles.drawer}
          >
            {/* Header */}
            <div style={styles.header}>
              <div style={styles.headerTitle}>
                <FiShoppingBag size={20} style={{ marginRight: '0.75rem' }} />
                <span>YOUR BAG ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
              </div>
              <button onClick={() => setCartOpen(false)} style={styles.closeBtn} aria-label="Close Bag">
                <FiX size={24} />
              </button>
            </div>

            {/* Content / Cart Items */}
            <div style={styles.itemsContainer}>
              {cart.length === 0 ? (
                <div style={styles.emptyContainer}>
                  <p style={styles.emptyText}>YOUR BAG IS CURRENTLY EMPTY.</p>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      navigate('/shop');
                    }}
                    className="btn btn-primary"
                    style={{ marginTop: '1.5rem', width: '100%' }}
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedSize}-${item.selectedColor.name}`}
                    style={styles.cartItem}
                  >
                    <img src={item.image} alt={item.title} style={styles.itemImage} />
                    <div style={styles.itemDetails}>
                      <span style={styles.itemBrand}>{item.brand}</span>
                      <span style={styles.itemTitle}>{item.title}</span>
                      <div style={styles.itemMeta}>
                        <span>Size: <strong>{item.selectedSize}</strong></span>
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
                      
                      <div style={styles.itemFooter}>
                        {/* Quantity Controls */}
                        <div style={styles.quantityControls}>
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

                        {/* Trash Button */}
                        <button
                          onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor.name)}
                          style={styles.removeBtn}
                          aria-label="Remove Item"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div style={styles.itemPrice}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary (Sticky at bottom) */}
            {cart.length > 0 && (
              <div style={styles.drawerFooter}>
                {/* Subtotal */}
                <div style={styles.summaryLine}>
                  <span style={styles.summaryLabel}>Subtotal</span>
                  <span style={styles.summaryVal}>${getCartSubtotal().toFixed(2)}</span>
                </div>

                {/* Promo Code System */}
                <form onSubmit={handleApplyCoupon} style={styles.couponForm}>
                  <input
                    type="text"
                    placeholder="ENTER WELCOME10, NIKE20..."
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    style={styles.couponInput}
                  />
                  <button type="submit" style={styles.couponBtn}>
                    APPLY
                  </button>
                </form>

                {/* Coupon Feedback */}
                {promoCode && (
                  <div style={styles.promoCodeBadge}>
                    <span>Promo: <strong>{promoCode} ({discount}% OFF)</strong></span>
                    <button type="button" onClick={removePromoCode} style={styles.removePromoBtn}>
                      <FiX size={14} />
                    </button>
                  </div>
                )}
                {promoError && <p style={styles.promoErrorText}>{promoError}</p>}

                {/* Discount display */}
                {discount > 0 && (
                  <div style={styles.summaryLine}>
                    <span style={styles.summaryLabel}>Discount</span>
                    <span style={{ ...styles.summaryVal, color: 'var(--accent)' }}>
                      -${(getCartSubtotal() * (discount / 100)).toFixed(2)}
                    </span>
                  </div>
                )}

                {/* Total */}
                <div style={{ ...styles.summaryLine, marginTop: '0.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                  <span style={{ ...styles.summaryLabel, fontWeight: '700', fontSize: '1.1rem' }}>Total</span>
                  <span style={{ ...styles.summaryVal, fontWeight: '700', fontSize: '1.1rem' }}>
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>

                {/* CTA Buttons */}
                <div style={styles.ctaGroup}>
                  <button onClick={handleCheckoutClick} className="btn btn-primary" style={styles.checkoutBtn}>
                    PROCEED TO CHECKOUT
                  </button>
                  <button onClick={handleViewCartClick} className="btn btn-outline" style={styles.viewCartBtn}>
                    VIEW BAG DETAILS
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const styles = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(4px)',
    zIndex: 1002,
  },
  drawer: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '100%',
    maxWidth: '440px',
    height: '100vh',
    background: 'var(--bg-primary)',
    zIndex: 1003,
    boxShadow: '-10px 0 40px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    borderLeft: '1px solid var(--border-color)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.5rem',
    borderBottom: '1px solid var(--border-color)',
  },
  headerTitle: {
    fontFamily: 'var(--font-display)',
    fontWeight: '700',
    fontSize: '1rem',
    letterSpacing: '0.05em',
    color: 'var(--text-primary)',
    display: 'flex',
    alignItems: 'center',
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  itemsContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  emptyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    textAlign: 'center',
  },
  emptyText: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    letterSpacing: '0.1em',
  },
  cartItem: {
    display: 'flex',
    gap: '1rem',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '1.5rem',
  },
  itemImage: {
    width: '80px',
    height: '100px',
    borderRadius: '4px',
    objectFit: 'cover',
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  itemBrand: {
    fontSize: '0.7rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    letterSpacing: '0.05em',
  },
  itemTitle: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    lineHeight: '1.3',
    margin: '2px 0 6px 0',
  },
  itemMeta: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.75rem',
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
  itemFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid var(--border-color)',
    borderRadius: '20px',
    overflow: 'hidden',
  },
  qtyBtn: {
    padding: '0.25rem 0.6rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-secondary)',
    ':hover': {
      color: 'var(--text-primary)',
      background: 'var(--bg-secondary)',
    },
  },
  qtyVal: {
    fontSize: '0.85rem',
    fontWeight: '600',
    padding: '0 0.5rem',
    color: 'var(--text-primary)',
    minWidth: '20px',
    textAlign: 'center',
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'color var(--transition-fast)',
    ':hover': {
      color: 'var(--accent)',
    },
  },
  itemPrice: {
    fontWeight: '600',
    fontSize: '0.95rem',
    color: 'var(--text-primary)',
  },
  drawerFooter: {
    borderTop: '1px solid var(--border-color)',
    padding: '1.5rem',
    backgroundColor: 'var(--bg-secondary)',
  },
  summaryLine: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
  },
  summaryLabel: {
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
  },
  summaryVal: {
    fontWeight: '600',
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
  },
  couponForm: {
    display: 'flex',
    gap: '0.5rem',
    margin: '1rem 0',
  },
  couponInput: {
    flex: 1,
    padding: '0.6rem 1rem',
    border: '1px solid var(--border-color)',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '600',
    letterSpacing: '0.05em',
    outline: 'none',
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
  },
  couponBtn: {
    padding: '0.6rem 1.25rem',
    backgroundColor: 'var(--text-primary)',
    color: 'var(--bg-primary)',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.05em',
    cursor: 'pointer',
  },
  promoCodeBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'rgba(230, 57, 70, 0.08)',
    color: 'var(--accent)',
    padding: '0.35rem 0.75rem',
    borderRadius: '4px',
    fontSize: '0.75rem',
    marginBottom: '0.75rem',
    border: '1px solid rgba(230, 57, 70, 0.2)',
  },
  removePromoBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--accent)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  promoErrorText: {
    color: 'var(--accent)',
    fontSize: '0.75rem',
    margin: '-0.5rem 0 0.75rem 0',
  },
  ctaGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginTop: '1.25rem',
  },
  checkoutBtn: {
    width: '100%',
    padding: '0.9rem',
    fontSize: '0.8rem',
    fontWeight: '700',
  },
  viewCartBtn: {
    width: '100%',
    padding: '0.9rem',
    fontSize: '0.8rem',
    fontWeight: '700',
  },
};

export default CartDrawer;
