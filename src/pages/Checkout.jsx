import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiCreditCard, FiLock, FiShoppingBag, FiTruck } from 'react-icons/fi';
import { ShopContext } from '../context/ShopContext';

const Checkout = () => {
  const { cart, getCartSubtotal, getCartTotal, clearCart } = useContext(ShopContext);

  // Steps: 1 = Shipping & Payment Info, 2 = Success Confirmation
  const [step, setStep] = useState(1);
  const [orderId, setOrderId] = useState('');

  // Form Fields
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!form.email) tempErrors.email = 'Required';
    if (!form.firstName) tempErrors.firstName = 'Required';
    if (!form.lastName) tempErrors.lastName = 'Required';
    if (!form.address) tempErrors.address = 'Required';
    if (!form.city) tempErrors.city = 'Required';
    if (!form.zipCode) tempErrors.zipCode = 'Required';
    if (!form.cardName) tempErrors.cardName = 'Required';
    if (!form.cardNumber) tempErrors.cardNumber = 'Required';
    if (!form.cardExpiry) tempErrors.cardExpiry = 'Required';
    if (!form.cardCvv) tempErrors.cardCvv = 'Required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Generate fake order ID
    const randomId = `AUR-${Math.floor(100000 + Math.random() * 900000)}-${Math.floor(10 + Math.random() * 89)}`;
    setOrderId(randomId);
    
    // Proceed to success screen
    setStep(2);
    
    // Clear shopping cart
    clearCart();
  };

  const shippingCost = getCartSubtotal() >= 150 ? 0 : 15;
  const finalTotal = getCartTotal() + shippingCost;

  if (step === 2) {
    return (
      <div className="container" style={styles.successContainer}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="glass-panel"
          style={styles.successCard}
        >
          <FiCheckCircle size={60} style={{ color: 'var(--accent)', marginBottom: '1.5rem' }} />
          <h1 style={styles.successTitle}>THANK YOU FOR YOUR ORDER</h1>
          <p style={styles.successText}>
            Your order has been placed successfully. We have sent a confirmation email to <strong>{form.email}</strong> with billing and shipment tracking updates.
          </p>

          <div style={styles.orderSummaryBox}>
            <div style={styles.orderDetailLine}>
              <span>Order Number</span>
              <strong>{orderId}</strong>
            </div>
            <div style={styles.orderDetailLine}>
              <span>Delivery Method</span>
              <span>Standard (3-5 Business Days)</span>
            </div>
            <div style={styles.orderDetailLine}>
              <span>Ship To</span>
              <span>{form.firstName} {form.lastName}, {form.address}, {form.city}</span>
            </div>
          </div>

          <Link to="/shop" className="btn btn-primary" style={{ width: '100%' }}>
            CONTINUE SHOPPING
          </Link>
        </motion.div>
      </div>
    );
  }

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
          <h1 style={styles.title}>Secure Checkout</h1>
          <div style={styles.securitySeal}>
            <FiLock size={14} style={{ marginRight: '6px' }} />
            <span>SSL Encrypted</span>
          </div>
        </div>

        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <FiShoppingBag size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
            <h2>Your cart is empty</h2>
            <p>Please add items to your cart before checking out.</p>
            <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
              Shop Catalog
            </Link>
          </div>
        ) : (
          <div style={styles.checkoutGrid}>
            {/* Left Column: Form */}
            <form onSubmit={handlePlaceOrder} style={styles.formCol}>
              
              {/* Shipping Address Section */}
              <div style={styles.formSection} className="glass-panel">
                <h3 style={styles.sectionHeading}>
                  <FiTruck size={16} style={{ marginRight: '8px' }} /> Shipping Address
                </h3>
                
                <div style={styles.formGrid}>
                  <div style={{ ...styles.formField, gridColumn: 'span 2' }}>
                    <label style={styles.label}>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      style={{ ...styles.input, borderColor: errors.email ? 'var(--accent)' : 'var(--border-color)' }}
                      placeholder="you@example.com"
                    />
                  </div>
                  
                  <div style={styles.formField}>
                    <label style={styles.label}>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleInputChange}
                      style={{ ...styles.input, borderColor: errors.firstName ? 'var(--accent)' : 'var(--border-color)' }}
                      placeholder="Jane"
                    />
                  </div>
                  
                  <div style={styles.formField}>
                    <label style={styles.label}>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleInputChange}
                      style={{ ...styles.input, borderColor: errors.lastName ? 'var(--accent)' : 'var(--border-color)' }}
                      placeholder="Doe"
                    />
                  </div>

                  <div style={{ ...styles.formField, gridColumn: 'span 2' }}>
                    <label style={styles.label}>Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleInputChange}
                      style={{ ...styles.input, borderColor: errors.address ? 'var(--accent)' : 'var(--border-color)' }}
                      placeholder="123 Luxury Ave, Apt 4"
                    />
                  </div>

                  <div style={styles.formField}>
                    <label style={styles.label}>City</label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleInputChange}
                      style={{ ...styles.input, borderColor: errors.city ? 'var(--accent)' : 'var(--border-color)' }}
                      placeholder="New York"
                    />
                  </div>

                  <div style={styles.formField}>
                    <label style={styles.label}>ZIP / Postal Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={form.zipCode}
                      onChange={handleInputChange}
                      style={{ ...styles.input, borderColor: errors.zipCode ? 'var(--accent)' : 'var(--border-color)' }}
                      placeholder="10001"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div style={styles.formSection} className="glass-panel">
                <h3 style={styles.sectionHeading}>
                  <FiCreditCard size={16} style={{ marginRight: '8px' }} /> Payment Details
                </h3>
                
                <div style={styles.formGrid}>
                  <div style={{ ...styles.formField, gridColumn: 'span 2' }}>
                    <label style={styles.label}>Name on Card</label>
                    <input
                      type="text"
                      name="cardName"
                      value={form.cardName}
                      onChange={handleInputChange}
                      style={{ ...styles.input, borderColor: errors.cardName ? 'var(--accent)' : 'var(--border-color)' }}
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div style={{ ...styles.formField, gridColumn: 'span 2' }}>
                    <label style={styles.label}>Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={form.cardNumber}
                      onChange={handleInputChange}
                      style={{ ...styles.input, borderColor: errors.cardNumber ? 'var(--accent)' : 'var(--border-color)' }}
                      placeholder="4111 2222 3333 4444"
                    />
                  </div>

                  <div style={styles.formField}>
                    <label style={styles.label}>Expiry Date</label>
                    <input
                      type="text"
                      name="cardExpiry"
                      value={form.cardExpiry}
                      onChange={handleInputChange}
                      style={{ ...styles.input, borderColor: errors.cardExpiry ? 'var(--accent)' : 'var(--border-color)' }}
                      placeholder="MM/YY"
                    />
                  </div>

                  <div style={styles.formField}>
                    <label style={styles.label}>CVV</label>
                    <input
                      type="password"
                      name="cardCvv"
                      value={form.cardCvv}
                      onChange={handleInputChange}
                      style={{ ...styles.input, borderColor: errors.cardCvv ? 'var(--accent)' : 'var(--border-color)' }}
                      placeholder="•••"
                      maxLength="4"
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-accent" style={styles.placeOrderBtn}>
                PLACE ORDER - ${finalTotal.toFixed(2)}
              </button>
            </form>

            {/* Right Column: Order Preview */}
            <div style={styles.previewCol}>
              <div style={styles.previewCard} className="glass-panel">
                <h3 style={styles.previewHeading}>IN YOUR BAG</h3>
                <div style={styles.divider} />
                
                <div style={styles.previewItems}>
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor.name}`} style={styles.previewItem}>
                      <img src={item.image} alt={item.title} style={styles.previewItemImg} />
                      <div style={styles.previewItemDetails}>
                        <span style={styles.previewItemBrand}>{item.brand}</span>
                        <span style={styles.previewItemTitle}>{item.title}</span>
                        <span style={styles.previewItemMeta}>
                          Size: {item.selectedSize} | Qty: {item.quantity}
                        </span>
                      </div>
                      <span style={styles.previewItemPrice}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={styles.divider} />

                <div style={styles.summaryLine}>
                  <span>Subtotal</span>
                  <span>${getCartSubtotal().toFixed(2)}</span>
                </div>
                <div style={styles.summaryLine}>
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>

                {getCartTotal() < getCartSubtotal() && (
                  <div style={styles.summaryLine}>
                    <span>Promo Discount</span>
                    <span style={{ color: 'var(--accent)' }}>
                      -${(getCartSubtotal() - getCartTotal()).toFixed(2)}
                    </span>
                  </div>
                )}

                <div style={styles.divider} />

                <div style={{ ...styles.summaryLine, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                  <strong>Total</strong>
                  <strong>${finalTotal.toFixed(2)}</strong>
                </div>
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
    justifyContent: 'space-between',
    alignItems: 'baseline',
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
  securitySeal: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    fontWeight: '500',
  },
  checkoutGrid: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '3rem',
  },
  formCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  formSection: {
    padding: '2.5rem 2rem',
    borderRadius: '16px',
  },
  sectionHeading: {
    fontFamily: 'var(--font-display)',
    fontSize: '1rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: 'var(--text-primary)',
    marginBottom: '1.5rem',
    letterSpacing: '0.05em',
    display: 'flex',
    alignItems: 'center',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.25rem',
  },
  formField: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: 'var(--text-secondary)',
    letterSpacing: '0.05em',
  },
  input: {
    padding: '0.8rem 1rem',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    fontSize: '0.85rem',
    outline: 'none',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    width: '100%',
    fontFamily: 'var(--font-sans)',
    transition: 'border var(--transition-fast)',
    ':focus': {
      borderColor: 'var(--text-primary)',
    },
  },
  placeOrderBtn: {
    padding: '1.1rem',
    width: '100%',
    fontWeight: '700',
    fontSize: '0.85rem',
    letterSpacing: '0.1em',
  },
  previewCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  previewCard: {
    padding: '2rem 1.5rem',
    borderRadius: '16px',
    position: 'sticky',
    top: '100px',
  },
  previewHeading: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.9rem',
    fontWeight: '700',
    letterSpacing: '0.08em',
    color: 'var(--text-primary)',
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--border-color)',
    margin: '1.25rem 0',
  },
  previewItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxHeight: '260px',
    overflowY: 'auto',
  },
  previewItem: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
  },
  previewItemImg: {
    width: '50px',
    height: '65px',
    borderRadius: '4px',
    objectFit: 'cover',
  },
  previewItemDetails: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  previewItemBrand: {
    fontSize: '0.65rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    color: 'var(--accent)',
  },
  previewItemTitle: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    lineHeight: '1.2',
  },
  previewItemMeta: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
  },
  previewItemPrice: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  summaryLine: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    marginBottom: '0.5rem',
  },
  successContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6rem 0',
    minHeight: '70vh',
  },
  successCard: {
    width: '100%',
    maxWidth: '500px',
    padding: '3.5rem 2.5rem',
    borderRadius: '20px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  successTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    fontWeight: '800',
    textTransform: 'uppercase',
    color: 'var(--text-primary)',
    margin: '0.5rem 0 1rem 0',
    letterSpacing: '0.05em',
  },
  successText: {
    fontSize: '0.9rem',
    lineHeight: '1.6',
    color: 'var(--text-secondary)',
    fontWeight: '300',
    marginBottom: '2rem',
  },
  orderSummaryBox: {
    width: '100%',
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '2.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    textAlign: 'left',
  },
  orderDetailLine: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
  },
};

const cssRule = `
@media (max-width: 992px) {
  div[style*="checkoutGrid"] {
    grid-template-columns: 1fr !important;
    gap: 2.5rem !important;
  }
}
@media (max-width: 576px) {
  div[style*="formGrid"] {
    grid-template-columns: 1fr !important;
  }
  div[style*="formField"] {
    grid-column: span 1 !important;
  }
}
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(cssRule));
  document.head.appendChild(style);
}

export default Checkout;
