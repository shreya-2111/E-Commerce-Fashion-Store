import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const HeroSection = () => {
  const navigate = useNavigate();

  // Framer Motion animation configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // premium ease out
      },
    },
  };

  return (
    <section style={styles.heroSection}>
      {/* Background Overlay Layer */}
      <div style={styles.heroBackground} />
      
      {/* Editorial Content Container */}
      <div className="container" style={styles.contentContainer}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={styles.textBlock}
        >
          {/* Tagline */}
          <motion.span variants={itemVariants} style={styles.seasonTag}>
            SPRING / SUMMER 2026 EDITION
          </motion.span>
          
          {/* Main Title */}
          <motion.h1 variants={itemVariants} className="luxury-heading" style={styles.mainTitle}>
            FORM MEETS <br />
            <span style={{ color: 'var(--accent)' }}>ATHLETICISM</span>
          </motion.h1>
          
          {/* Short description */}
          <motion.p variants={itemVariants} className="subtitle" style={styles.description}>
            Explore our curated capsule collection where tailoring merges with structural performance. Inspired by European runway silhouettes and classic sportswear silhouettes.
          </motion.p>
          
          {/* Call to action buttons */}
          <motion.div variants={itemVariants} style={styles.btnGroup}>
            <button
              onClick={() => navigate('/shop')}
              className="btn btn-primary"
              style={styles.heroBtn}
            >
              SHOP COLLECTION <FiArrowRight style={{ marginLeft: '8px' }} />
            </button>
            <button
              onClick={() => navigate('/about')}
              className="btn btn-outline"
              style={{ ...styles.heroBtn, color: '#ffffff', borderColor: '#ffffff' }}
            >
              THE CAMPAIGN STORY
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating lookbook specs details on side (Nike/Zara look) */}
      <div style={styles.lookbookMeta}>
        <div style={styles.metaLine}>
          <span style={styles.metaLabel}>LOOK 08</span>
          <span style={styles.metaVal}>Zara Wool Blend Coat + Jordan 1 High</span>
        </div>
      </div>
    </section>
  );
};

const styles = {
  heroSection: {
    height: 'calc(100vh - 70px)',
    minHeight: '600px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    color: '#ffffff',
    overflow: 'hidden',
  },
  heroBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `linear-gradient(to right, rgba(17, 17, 17, 0.85) 30%, rgba(17, 17, 17, 0.25) 80%), url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center 20%',
    zIndex: 1,
  },
  contentContainer: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  textBlock: {
    maxWidth: '750px',
    textAlign: 'left',
  },
  seasonTag: {
    fontSize: '0.85rem',
    fontWeight: '700',
    letterSpacing: '0.25em',
    color: 'var(--accent)',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '1rem',
  },
  mainTitle: {
    fontSize: 'clamp(2.5rem, 6.5vw, 5rem)',
    lineHeight: '0.9',
    marginBottom: '1.5rem',
    color: '#ffffff',
    fontFamily: 'var(--font-display)',
    fontWeight: '800',
  },
  description: {
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '2.5rem',
    fontSize: '1rem',
    fontWeight: '300',
  },
  btnGroup: {
    display: 'flex',
    gap: '1.25rem',
    flexWrap: 'wrap',
  },
  heroBtn: {
    padding: '1.1rem 2.25rem',
    fontSize: '0.8rem',
  },
  lookbookMeta: {
    position: 'absolute',
    bottom: '2rem',
    right: '5%',
    zIndex: 2,
    display: 'none', // hidden on smaller screens, shown on desktop
  },
  metaLine: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    borderRight: '2px solid var(--accent)',
    paddingRight: '1rem',
  },
  metaLabel: {
    fontSize: '0.7rem',
    fontWeight: '700',
    letterSpacing: '0.1em',
    color: 'var(--accent)',
  },
  metaVal: {
    fontSize: '0.8rem',
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.6)',
  },
};

// Add responsive media query styles for hero section
const cssRule = `
@media (min-width: 992px) {
  div[style*="lookbookMeta"] {
    display: block !important;
  }
}
@media (max-width: 480px) {
  div[style*="btnGroup"] {
    flex-direction: column !important;
    width: 100% !important;
  }
  div[style*="btnGroup"] button {
    width: 100% !important;
  }
}
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(cssRule));
  document.head.appendChild(style);
}

export default HeroSection;
