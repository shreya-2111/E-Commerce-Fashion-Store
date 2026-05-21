import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setLoading(true);
      // Mock submit latency
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        setForm({ name: '', email: '', subject: '', message: '' });
      }, 800);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
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
          <span style={styles.preTitle}>GET IN TOUCH</span>
          <h1 style={styles.title}>Contact Us</h1>
          <p style={styles.subtitle}>
            Have questions about our collections, customized sizing, delivery logistics, or press enquiries? Reach out directly.
          </p>
        </div>

        {/* Contact Layout Splits */}
        <div style={styles.grid}>
          {/* Left Column: Contact Cards */}
          <div style={styles.infoCol}>
            <div style={styles.infoCard} className="glass-panel">
              <div style={styles.iconWrapper}>
                <FiMail size={20} />
              </div>
              <div style={styles.infoDetails}>
                <h4 style={styles.infoTitle}>Email Inquiries</h4>
                <a href="mailto:support@velourstore.com" style={styles.infoLink}>support@velourstore.com</a>
                <a href="mailto:press@velourstore.com" style={styles.infoLink}>press@velourstore.com</a>
              </div>
            </div>

            <div style={styles.infoCard} className="glass-panel">
              <div style={styles.iconWrapper}>
                <FiPhone size={20} />
              </div>
              <div style={styles.infoDetails}>
                <h4 style={styles.infoTitle}>Phone Lines</h4>
                <a href="tel:+18005550199" style={styles.infoLink}>+1 (800) 555-0199</a>
                <span style={styles.infoSubtext}>Mon - Fri: 9:00 AM - 6:00 PM EST</span>
              </div>
            </div>

            <div style={styles.infoCard} className="glass-panel">
              <div style={styles.iconWrapper}>
                <FiMapPin size={20} />
              </div>
              <div style={styles.infoDetails}>
                <h4 style={styles.infoTitle}>Flagship Studio</h4>
                <span style={styles.infoText}>568 Broadway, Suite 502</span>
                <span style={styles.infoText}>SoHo, New York, NY 10012</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div style={styles.formCol}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={styles.successCard}
                className="glass-panel"
              >
                <FiCheckCircle size={44} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
                <h3 style={styles.successTitle}>MESSAGE RECEIVED</h3>
                <p style={styles.successText}>
                  Thank you for contacting us. Our editorial support team has cataloged your inquiry and will respond within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn btn-outline"
                  style={{ marginTop: '1rem' }}
                >
                  SEND ANOTHER MESSAGE
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={styles.form} className="glass-panel">
                <h3 style={styles.formHeading}>SEND US A MESSAGE</h3>
                
                <div style={styles.formField}>
                  <label style={styles.label}>Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Jane Doe"
                    required
                  />
                </div>

                <div style={styles.formField}>
                  <label style={styles.label}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="jane@example.com"
                    required
                  />
                </div>

                <div style={styles.formField}>
                  <label style={styles.label}>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Inquiry about sizing / orders..."
                  />
                </div>

                <div style={styles.formField}>
                  <label style={styles.label}>Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleInputChange}
                    style={{ ...styles.input, ...styles.textarea }}
                    placeholder="Type your message details here..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={styles.submitBtn}
                  disabled={loading}
                >
                  {loading ? 'SENDING...' : (
                    <>
                      SEND MESSAGE <FiSend size={14} style={{ marginLeft: '8px' }} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
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
    flexDirection: 'column',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '1.5rem',
    marginBottom: '3rem',
  },
  preTitle: {
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.15em',
    color: 'var(--accent)',
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
    textTransform: 'uppercase',
    fontWeight: '800',
    color: 'var(--text-primary)',
    margin: '4px 0',
  },
  subtitle: {
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    maxWidth: '550px',
    lineHeight: '1.5',
    fontWeight: '300',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.3fr',
    gap: '3rem',
    alignItems: 'start',
  },
  infoCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  infoCard: {
    padding: '2rem 1.5rem',
    borderRadius: '16px',
    display: 'flex',
    gap: '1.25rem',
    alignItems: 'flex-start',
  },
  iconWrapper: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  infoDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  infoTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.9rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--text-primary)',
    marginBottom: '4px',
  },
  infoLink: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    transition: 'color var(--transition-fast)',
    ':hover': {
      color: 'var(--accent)',
    },
  },
  infoText: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    fontWeight: '400',
  },
  infoSubtext: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    marginTop: '2px',
  },
  formCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    padding: '3rem 2.5rem',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  formHeading: {
    fontFamily: 'var(--font-display)',
    fontSize: '1rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--text-primary)',
    marginBottom: '0.5rem',
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
  textarea: {
    height: '140px',
    resize: 'none',
  },
  submitBtn: {
    width: '100%',
    padding: '0.9rem',
    fontWeight: '750',
    fontSize: '0.8rem',
    letterSpacing: '0.1em',
    marginTop: '0.5rem',
  },
  successCard: {
    padding: '4rem 3rem',
    borderRadius: '16px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  successTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.25rem',
    fontWeight: '800',
    textTransform: 'uppercase',
    color: 'var(--text-primary)',
    margin: '0.5rem 0',
  },
  successText: {
    fontSize: '0.9rem',
    lineHeight: '1.6',
    color: 'var(--text-secondary)',
    fontWeight: '300',
    marginBottom: '1.5rem',
    maxWidth: '350px',
  },
};

const cssRule = `
@media (max-width: 768px) {
  div[style*="grid"] {
    grid-template-columns: 1fr !important;
    gap: 2rem !important;
  }
}
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(cssRule));
  document.head.appendChild(style);
}

export default Contact;
