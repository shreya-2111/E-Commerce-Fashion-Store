import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiArrowRight } from 'react-icons/fi';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubsubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubsubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer style={styles.footer}>
      <div className="container">
        {/* Top Section */}
        <div style={styles.topSection}>
          {/* Brand Info */}
          <div style={styles.brandCol}>
            <span style={styles.logo}>VELOUR</span>
            <p style={styles.brandDesc}>
              A luxury editorial shopping experience. Inspired by Nike’s structural athleticism and Zara’s minimalist tailoring. Delivering timeless classics worldwide.
            </p>
            <div style={styles.socialIcons}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" style={styles.socialIcon} aria-label="Instagram">
                <FiInstagram size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" style={styles.socialIcon} aria-label="Twitter">
                <FiTwitter size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" style={styles.socialIcon} aria-label="Facebook">
                <FiFacebook size={18} />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div style={styles.linksCol}>
            <h4 style={styles.colTitle}>Collections</h4>
            <ul style={styles.linksList}>
              <li><Link to="/shop?category=Apparel" style={styles.link}>Apparel</Link></li>
              <li><Link to="/shop?category=Footwear" style={styles.link}>Footwear</Link></li>
              <li><Link to="/shop?category=Outerwear" style={styles.link}>Outerwear</Link></li>
              <li><Link to="/shop" style={styles.link}>All Products</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div style={styles.linksCol}>
            <h4 style={styles.colTitle}>Company</h4>
            <ul style={styles.linksList}>
              <li><Link to="/about" style={styles.link}>Our Story</Link></li>
              <li><a href="#/careers" style={styles.link}>Careers</a></li>
              <li><a href="#/sustainability" style={styles.link}>Sustainability</a></li>
              <li><Link to="/contact" style={styles.link}>Press & Media</Link></li>
            </ul>
          </div>

          {/* Links Column 3 / Support */}
          <div style={styles.linksCol}>
            <h4 style={styles.colTitle}>Customer Service</h4>
            <ul style={styles.linksList}>
              <li><Link to="/contact" style={styles.link}>Contact Us</Link></li>
              <li><a href="#/shipping" style={styles.link}>Shipping & Returns</a></li>
              <li><a href="#/size-guide" style={styles.link}>Size Guide</a></li>
              <li><a href="#/faqs" style={styles.link}>FAQs</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div style={styles.newsletterCol}>
            <h4 style={styles.colTitle}>Subscribe to newsletters</h4>
            <p style={styles.newsletterDesc}>
              Be the first to receive updates on high-end collections, seasonal runway drops, and premium editorial releases.
            </p>
            {subscribed ? (
              <p style={styles.subscribedMsg}>THANK YOU FOR SUBSCRIBING.</p>
            ) : (
              <form onSubmit={handleSubscribe} style={styles.subscribeForm}>
                <input
                  type="email"
                  placeholder="YOUR EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.subscribeInput}
                  required
                />
                <button type="submit" style={styles.subscribeBtn} aria-label="Subscribe">
                  <FiArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div style={styles.bottomSection}>
          <p style={styles.copyright}>
            © 2024 VELOUR Inc. All Rights Reserved.
          </p>
          <div style={styles.bottomLinks}>
            <a href="#/privacy" style={styles.bottomLink}>Privacy Policy</a>
            <a href="#/terms" style={styles.bottomLink}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: 'var(--bg-secondary)',
    borderTop: '1px solid var(--border-color)',
    padding: '5rem 0 2rem 0',
    marginTop: 'auto',
  },
  topSection: {
    display: 'grid',
    gridTemplateColumns: '1.5fr repeat(3, 0.8fr) 1.5fr',
    gap: '2.5rem',
    marginBottom: '4rem',
  },
  brandCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  logo: {
    fontFamily: 'var(--font-display)',
    fontWeight: '800',
    fontSize: '1.5rem',
    letterSpacing: '0.15em',
    color: 'var(--text-primary)',
  },
  brandDesc: {
    fontSize: '0.85rem',
    lineHeight: '1.6',
    color: 'var(--text-secondary)',
    fontWeight: '300',
  },
  socialIcons: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '0.5rem',
  },
  socialIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
    transition: 'all var(--transition-fast)',
    ':hover': {
      backgroundColor: 'var(--text-primary)',
      color: 'var(--bg-primary)',
    },
  },
  linksCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  colTitle: {
    fontSize: '0.8rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--text-primary)',
  },
  linksList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  link: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    fontWeight: '400',
    transition: 'color var(--transition-fast)',
    ':hover': {
      color: 'var(--text-primary)',
    },
  },
  newsletterCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  newsletterDesc: {
    fontSize: '0.85rem',
    lineHeight: '1.5',
    color: 'var(--text-secondary)',
    fontWeight: '300',
  },
  subscribeForm: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '2px solid var(--text-primary)',
    paddingBottom: '0.5rem',
    marginTop: '0.5rem',
  },
  subscribeInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '0.8rem',
    color: 'var(--text-primary)',
    fontWeight: '600',
    letterSpacing: '0.05em',
  },
  subscribeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: '4px',
    transition: 'transform var(--transition-fast)',
    ':hover': {
      transform: 'translateX(4px)',
    },
  },
  subscribedMsg: {
    fontSize: '0.8rem',
    fontWeight: '700',
    color: 'var(--accent)',
    letterSpacing: '0.1em',
    marginTop: '0.5rem',
  },
  bottomSection: {
    borderTop: '1px solid var(--border-color)',
    paddingTop: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  copyright: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    fontWeight: '300',
  },
  bottomLinks: {
    display: 'flex',
    gap: '1.5rem',
  },
  bottomLink: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    fontWeight: '300',
    transition: 'color var(--transition-fast)',
    ':hover': {
      color: 'var(--text-primary)',
    },
  },
};

// Add responsive stylesheet rules for mobile grids
const cssRule = `
@media (max-width: 992px) {
  footer div[style*="gridTemplateColumns"] {
    grid-template-columns: 1fr 1fr !important;
  }
}
@media (max-width: 576px) {
  footer div[style*="gridTemplateColumns"] {
    grid-template-columns: 1fr !important;
  }
}
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(cssRule));
  document.head.appendChild(style);
}

export default Footer;
