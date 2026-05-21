import { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiSearch, FiHeart, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopContext } from '../context/ShopContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { getCartCount, wishlist, setSearchOpen, setCartOpen } = useContext(ShopContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`glass-panel`}
        style={{
          ...styles.header,
          backgroundColor: scrolled ? 'var(--glass-bg)' : 'rgba(255, 255, 255, 0.02)',
          borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
          boxShadow: scrolled ? 'var(--glass-shadow)' : 'none',
        }}
      >
        <div className="container" style={styles.navContainer}>
          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            style={styles.mobileMenuBtn}
            aria-label="Open mobile menu"
          >
            <FiMenu size={22} />
          </button>

          {/* Logo */}
          <Link to="/" style={styles.logo}>
            MODA
          </Link>

          {/* Desktop Navigation Links */}
          <nav style={styles.desktopNav}>
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink)}
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              style={({ isActive }) => (isActive ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink)}
            >
              Shop
            </NavLink>
            <NavLink
              to="/about"
              style={({ isActive }) => (isActive ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink)}
            >
              About Brand
            </NavLink>
            <NavLink
              to="/contact"
              style={({ isActive }) => (isActive ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink)}
            >
              Contact
            </NavLink>
          </nav>

          {/* Right Navigation Actions */}
          <div style={styles.actions}>
            {/* Search */}
            <button onClick={() => setSearchOpen(true)} style={styles.actionIcon} aria-label="Open Search">
              <FiSearch size={20} />
            </button>

            {/* Wishlist Link */}
            <Link to="/wishlist" style={styles.actionIcon} aria-label="Go to Wishlist">
              <FiHeart size={20} />
              {wishlist.length > 0 && (
                <span style={styles.badge}>{wishlist.length}</span>
              )}
            </Link>

            {/* Cart Icon Drawer Trigger */}
            <button onClick={() => setCartOpen(true)} style={styles.actionIcon} aria-label="Open Cart">
              <FiShoppingBag size={20} />
              {getCartCount() > 0 && (
                <span style={styles.badge}>{getCartCount()}</span>
              )}
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              style={styles.mobileOverlay}
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              style={styles.mobileSidebar}
            >
              <div style={styles.mobileSidebarHeader}>
                <span style={styles.logo}>MODA</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  style={styles.closeBtn}
                  aria-label="Close menu"
                >
                  <FiX size={24} />
                </button>
              </div>

              <nav style={styles.mobileNavLinks}>
                <NavLink
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  style={styles.mobileNavLink}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  style={styles.mobileNavLink}
                >
                  Shop
                </NavLink>
                <NavLink
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  style={styles.mobileNavLink}
                >
                  About Brand
                </NavLink>
                <NavLink
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  style={styles.mobileNavLink}
                >
                  Contact
                </NavLink>
                <NavLink
                  to="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  style={styles.mobileNavLink}
                >
                  Wishlist ({wishlist.length})
                </NavLink>
              </nav>

              <div style={styles.mobileSidebarFooter}>
                <p style={styles.mobileFooterText}>Inspired by Zara & Nike</p>
                <p style={{ ...styles.mobileFooterText, fontSize: '0.75rem', opacity: 0.6 }}>© 2024 MODA Inc.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div style={{ height: '70px' }} /> {/* Spacer to prevent content from hiding under navbar */}
    </>
  );
};

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    zIndex: 900,
    transition: 'background-color 0.3s ease, border 0.3s ease, box-shadow 0.3s ease',
  },
  navContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  logo: {
    fontFamily: 'var(--font-display)',
    fontWeight: '800',
    fontSize: '1.5rem',
    letterSpacing: '0.15em',
    color: 'var(--text-primary)',
    zIndex: 10,
  },
  desktopNav: {
    display: 'flex',
    gap: '2.5rem',
    alignItems: 'center',
  },
  navLink: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.85rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--text-secondary)',
    transition: 'color var(--transition-fast)',
    paddingBottom: '4px',
    borderBottom: '2px solid transparent',
  },
  activeNavLink: {
    color: 'var(--text-primary)',
    borderBottom: '2px solid var(--text-primary)',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
  },
  actionIcon: {
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
    transition: 'transform var(--transition-fast)',
  },
  badge: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    backgroundColor: 'var(--accent)',
    color: '#ffffff',
    fontSize: '0.65rem',
    fontWeight: '700',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileMenuBtn: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    cursor: 'pointer',
  },
  mobileOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(4px)',
    zIndex: 998,
  },
  mobileSidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '300px',
    height: '100vh',
    background: 'var(--bg-primary)',
    zIndex: 999,
    boxShadow: '10px 0 30px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem 1.5rem',
  },
  mobileSidebarHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '3rem',
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-primary)',
    cursor: 'pointer',
  },
  mobileNavLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    flex: 1,
  },
  mobileNavLink: {
    fontFamily: 'var(--font-sans)',
    fontSize: '1.1rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--text-primary)',
    paddingBottom: '8px',
    borderBottom: '1px solid var(--border-color)',
  },
  mobileSidebarFooter: {
    marginTop: 'auto',
  },
  mobileFooterText: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    marginBottom: '4px',
  },
  // Responsive overrides via media-queries are handled below in CSS, but let's make sure it hides on desktop
};

// Add raw style overrides for responsive classes dynamically or use standard media-queries
const cssRule = `
@media (max-width: 768px) {
  header nav {
    display: none !important;
  }
  header button[aria-label="Open mobile menu"] {
    display: block !important;
  }
}
`;

// Insert the responsive overrides into the style block
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(cssRule));
  document.head.appendChild(style);
}

export default Navbar;
