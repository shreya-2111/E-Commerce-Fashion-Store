import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowUp, FiArrowRight, FiStar, FiAward, FiTrendingUp, FiZap } from 'react-icons/fi';
import { ShopContext } from '../context/ShopContext';
import HeroSection from '../components/HeroSection';
import ProductGrid from '../components/ProductGrid';
import { categories } from '../data/categories';

const Home = () => {
  const { products, triggerLoading, loading } = useContext(ShopContext);
  const [showScroll, setShowScroll] = useState(false);

  // Trigger loading effect when page loads to showcase skeleton shimmer
  useEffect(() => {
    triggerLoading(600);
    
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [triggerLoading]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get specific subsets of products for display
  const trendingProducts = products.filter(p => p.rating >= 4.7).slice(0, 4);
  const newArrivals = products.slice().reverse().slice(0, 4);
  const featuredProducts = products.filter(p => p.brand === 'Zara' || p.brand === 'Nike').slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Fullscreen Hero lookbook */}
      <HeroSection />

      {/* Categories Grid Showcase */}
      <section className="section-padding" style={styles.categoriesSection}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <span style={styles.preHeading}>CURATED SELECTION</span>
            <h2 style={styles.sectionTitle}>Shop by Category</h2>
          </div>
          <div style={styles.categoriesGrid}>
            {categories.map((cat) => (
              <Link
                to={`/shop?category=${cat.slug}`}
                key={cat.id}
                style={styles.categoryCard}
              >
                <div style={styles.categoryImageContainer}>
                  <img src={cat.image} alt={cat.name} style={styles.categoryImg} />
                  <div style={styles.categoryOverlay}>
                    <h3 style={styles.categoryName}>{cat.name}</h3>
                    <p style={styles.categoryDesc}>{cat.description}</p>
                    <span style={styles.categoryCta}>
                      DISCOVER <FiArrowRight style={{ marginLeft: '4px' }} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection Grid */}
      <section className="section-padding" style={styles.sectionBg}>
        <div className="container">
          <div style={styles.sectionHeaderCentered}>
            <FiAward size={24} style={{ color: 'var(--accent)', marginBottom: '0.5rem' }} />
            <span style={styles.preHeadingCentered}>HANDPICKED CLASSICS</span>
            <h2 style={styles.sectionTitle}>Featured Collection</h2>
            <p style={styles.sectionSubtitle}>
              A sharp selection of performance footwear and structural outerwear.
            </p>
          </div>
          <ProductGrid products={featuredProducts} isLoading={loading} />
          <div style={styles.viewMoreWrapper}>
            <Link to="/shop" className="btn btn-outline">
              VIEW ALL PRODUCTS
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial Promo Banner (Nike / Zara style) */}
      <section style={styles.editorialPromo}>
        <div style={styles.promoImage} />
        <div style={styles.promoContent}>
          <div className="container" style={{ padding: 0 }}>
            <span style={styles.promoPre}>THE COLLABORATION</span>
            <h2 style={styles.promoTitle}>ATHLETIC TAILORING</h2>
            <p style={styles.promoText}>
              Redefining movement. Merging Zara's loose linen blazers with Nike's high-traction footwear lines. Streetwear silhouettes designed to drape organically.
            </p>
            <Link to="/shop" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
              EXPLORE COLLAB
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Products Grid */}
      <section className="section-padding">
        <div className="container">
          <div style={styles.sectionHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiTrendingUp style={{ color: 'var(--accent)' }} />
              <span style={styles.preHeading}>WHAT'S HOT</span>
            </div>
            <h2 style={styles.sectionTitle}>Trending Products</h2>
          </div>
          <ProductGrid products={trendingProducts} isLoading={loading} />
        </div>
      </section>

      {/* New Arrivals Grid */}
      <section className="section-padding" style={styles.sectionBg}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiZap style={{ color: 'var(--accent)' }} />
              <span style={styles.preHeading}>JUST RELEASED</span>
            </div>
            <h2 style={styles.sectionTitle}>New Arrivals</h2>
          </div>
          <ProductGrid products={newArrivals} isLoading={loading} />
        </div>
      </section>

      {/* Testimonials Showcase */}
      <section className="section-padding">
        <div className="container">
          <div style={styles.sectionHeaderCentered}>
            <span style={styles.preHeadingCentered}>CUSTOMER VOICES</span>
            <h2 style={styles.sectionTitle}>Tested & Loved</h2>
          </div>
          <div style={styles.testimonialsGrid}>
            {[
              {
                id: 1,
                name: "Marcus Aurelius",
                role: "Streetwear Enthusiast",
                rating: 5,
                text: "The shipping was incredibly fast, and the packaging feels like opening a high-end designer gift box. The Jordans fits perfect, and the Zara Blazer fabric drapes beautifully.",
              },
              {
                id: 2,
                name: "Clara Oswald",
                role: "Stylist & Consultant",
                rating: 5,
                text: "Finding minimal silhouettes with premium thickness is hard. This store curates only the best. Applying the NIKE20 code made it an unbeatable purchase. 10/10 recommendation.",
              },
              {
                id: 3,
                name: "Christian Bale",
                role: "Metropolitan Professional",
                rating: 4,
                text: "Outstanding customer portal. Responsive dark mode matches my device settings seamlessly. Returned a shirt for a different size and it was completed within 3 business days.",
              }
            ].map((t) => (
              <div key={t.id} className="glass-panel" style={styles.testimonialCard}>
                <div style={styles.stars}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                      key={i}
                      size={14}
                      style={{
                        fill: i < t.rating ? 'var(--accent)' : 'transparent',
                        stroke: 'var(--accent)',
                        marginRight: '2px',
                      }}
                    />
                  ))}
                </div>
                <p style={styles.testimonialText}>"{t.text}"</p>
                <div style={styles.testimonialUser}>
                  <h4 style={styles.userName}>{t.name}</h4>
                  <span style={styles.userRole}>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScroll && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          style={styles.scrollBtn}
          aria-label="Scroll to Top"
        >
          <FiArrowUp size={20} />
        </motion.button>
      )}
    </motion.div>
  );
};

const styles = {
  sectionBg: {
    backgroundColor: 'var(--bg-secondary)',
  },
  sectionHeader: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '3rem',
  },
  sectionHeaderCentered: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: '3.5rem',
  },
  preHeading: {
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.2em',
    color: 'var(--accent)',
    textTransform: 'uppercase',
    marginBottom: '0.5rem',
  },
  preHeadingCentered: {
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.2em',
    color: 'var(--accent)',
    textTransform: 'uppercase',
    marginBottom: '0.5rem',
  },
  sectionTitle: {
    fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
    textTransform: 'uppercase',
    fontWeight: '800',
    color: 'var(--text-primary)',
  },
  sectionSubtitle: {
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    fontWeight: '300',
    marginTop: '0.5rem',
    maxWidth: '500px',
  },
  categoriesSection: {
    borderBottom: '1px solid var(--border-color)',
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
  },
  categoryCard: {
    display: 'block',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: 'var(--card-shadow)',
  },
  categoryImageContainer: {
    position: 'relative',
    aspectRatio: '1/1.25',
    width: '100%',
    overflow: 'hidden',
  },
  categoryImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  categoryOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to top, rgba(17, 17, 17, 0.9) 10%, rgba(17, 17, 17, 0.1) 60%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '2rem',
    color: '#ffffff',
  },
  categoryName: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    fontWeight: '800',
    textTransform: 'uppercase',
    color: '#ffffff',
    letterSpacing: '0.05em',
  },
  categoryDesc: {
    fontSize: '0.85rem',
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.7)',
    margin: '4px 0 1.25rem 0',
  },
  categoryCta: {
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.1em',
    color: 'var(--accent)',
    display: 'inline-flex',
    alignItems: 'center',
  },
  viewMoreWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '4rem',
  },
  editorialPromo: {
    display: 'flex',
    height: '600px',
    width: '100%',
    backgroundColor: '#111111',
  },
  promoImage: {
    flex: 1.2,
    backgroundImage: `url('https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1200')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center 20%',
  },
  promoContent: {
    flex: 1,
    padding: '5% 7%',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#111111',
  },
  promoPre: {
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.25em',
    color: 'var(--accent)',
    textTransform: 'uppercase',
  },
  promoTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: '800',
    lineHeight: '1',
    margin: '0.75rem 0 1.5rem 0',
    letterSpacing: '0.05em',
  },
  promoText: {
    fontSize: '0.95rem',
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: '1.6',
    marginBottom: '2.5rem',
  },
  testimonialsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
  },
  testimonialCard: {
    padding: '2.5rem',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  stars: {
    display: 'flex',
  },
  testimonialText: {
    fontSize: '0.95rem',
    lineHeight: '1.6',
    color: 'var(--text-secondary)',
    fontStyle: 'italic',
    fontWeight: '300',
    flex: 1,
  },
  testimonialUser: {
    borderTop: '1px solid var(--border-color)',
    paddingTop: '1rem',
  },
  userName: {
    fontSize: '0.9rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  userRole: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
  scrollBtn: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: 'var(--text-primary)',
    color: 'var(--bg-primary)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 99,
  },
};

// Add responsive media query rules for categories, testimonials, and editorial promo
const cssRule = `
@media (max-width: 992px) {
  div[style*="categoriesGrid"] {
    grid-template-columns: 1fr !important;
    gap: 1.5rem !important;
  }
  div[style*="testimonialsGrid"] {
    grid-template-columns: 1fr !important;
    gap: 1.5rem !important;
  }
  section[style*="editorialPromo"] {
    flex-direction: column !important;
    height: auto !important;
  }
  div[style*="promoImage"] {
    height: 350px !important;
    width: 100% !important;
  }
  div[style*="promoContent"] {
    padding: 3rem 1.5rem !important;
    width: 100% !important;
  }
}
.categoryCard:hover img {
  transform: scale(1.05);
}
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(cssRule));
  document.head.appendChild(style);
}

export default Home;
