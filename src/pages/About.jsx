import { useEffect } from 'react';
import { motion } from 'framer-motion';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={styles.page}
    >
      {/* Editorial Header */}
      <section style={styles.headerSection}>
        <div className="container" style={styles.headerContainer}>
          <span style={styles.preHeading}>OUR ARCHITECTURAL PHILOSOPHY</span>
          <h1 style={styles.mainTitle}>STRUCTURE & SILHOUETTE</h1>
          <p style={styles.introText}>
            VELOUR was conceived at the intersection of two distinct design disciplines: the biomechanical, aerodynamic structure of technical sportswear, and the loose, minimal tailoring of modern European fashion.
          </p>
        </div>
      </section>

      {/* Visual Narrative Grid 1 */}
      <section className="section-padding" style={styles.narrativeSection}>
        <div className="container" style={styles.narrativeGrid}>
          <div style={styles.textCol}>
            <span style={styles.colPre}>CHAPTER I</span>
            <h2 style={styles.colTitle}>The Kinetic Blueprint</h2>
            <p style={styles.colText}>
              Inspired by Nike’s focus on ergonomic movement and high-performance fabric engineering, our pieces are cut to support active lives. We believe that garments should move with you, not contain you. Under-arm panels, reinforced seams, and lightweight technical fleece are balanced against formal silhouettes to ensure utility never compromises comfort.
            </p>
          </div>
          <div style={styles.imgCol}>
            <img
              src="https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=800"
              alt="Nike inspired athletic pose"
              style={styles.narrativeImg}
            />
          </div>
        </div>
      </section>

      {/* Visual Narrative Grid 2 */}
      <section className="section-padding" style={{ ...styles.narrativeSection, backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container" style={{ ...styles.narrativeGrid, direction: 'rtl' }}>
          <div style={{ ...styles.textCol, direction: 'ltr' }}>
            <span style={styles.colPre}>CHAPTER II</span>
            <h2 style={styles.colTitle}>The Minimalist Drapery</h2>
            <p style={styles.colText}>
              Zara’s legacy of fast-shifting European runways informs our styling curation. We use low-intensity neutral palettes, boxy linens, double-breasted blazers, and long, fluid wool coats. By stripping away loud logos and aggressive colorways, we draw focus to fabric texture and geometric form.
            </p>
          </div>
          <div style={styles.imgCol}>
            <img
              src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800"
              alt="Zara inspired tailored portrait"
              style={styles.narrativeImg}
            />
          </div>
        </div>
      </section>

      {/* Brand Stat Badges */}
      <section className="section-padding" style={styles.statsSection}>
        <div className="container" style={styles.statsGrid}>
          {[
            { value: "2026", label: "Founded in New York" },
            { value: "100%", label: "Sustainably Sourced Linen" },
            { value: "30+", label: "Global Brand Partners" },
            { value: "Zero", label: "Carbon Neutral Delivery" }
          ].map((stat, idx) => (
            <div key={idx} style={styles.statCard} className="glass-panel">
              <span style={styles.statVal}>{stat.value}</span>
              <span style={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

const styles = {
  page: {
    minHeight: '80vh',
  },
  headerSection: {
    backgroundColor: '#111111',
    color: '#ffffff',
    padding: '8rem 0 6rem 0',
    textAlign: 'center',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  preHeading: {
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.25em',
    color: 'var(--accent)',
    marginBottom: '1rem',
  },
  mainTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
    fontWeight: '800',
    letterSpacing: '0.05em',
    marginBottom: '1.5rem',
    color: '#ffffff',
  },
  introText: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    fontWeight: '300',
    maxWidth: '700px',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  narrativeSection: {
    borderBottom: '1px solid var(--border-color)',
  },
  narrativeGrid: {
    display: 'flex',
    alignItems: 'center',
    gap: '4rem',
  },
  textCol: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  colPre: {
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.1em',
    color: 'var(--accent)',
  },
  colTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
    fontWeight: '800',
    textTransform: 'uppercase',
    color: 'var(--text-primary)',
  },
  colText: {
    fontSize: '0.95rem',
    lineHeight: '1.7',
    color: 'var(--text-secondary)',
    fontWeight: '300',
  },
  imgCol: {
    flex: 1,
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: 'var(--card-shadow)',
    aspectRatio: '1.3/1',
  },
  narrativeImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  statsSection: {
    backgroundColor: 'var(--bg-primary)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '2rem',
  },
  statCard: {
    padding: '2.5rem 1.5rem',
    textAlign: 'center',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  statVal: {
    fontFamily: 'var(--font-display)',
    fontSize: '2.5rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
  },
  statLabel: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
};

const cssRule = `
@media (max-width: 768px) {
  div[style*="narrativeGrid"] {
    flex-direction: column !important;
    gap: 2.5rem !important;
  }
  div[style*="statsGrid"] {
    grid-template-columns: 1fr 1fr !important;
    gap: 1.5rem !important;
  }
}
@media (max-width: 480px) {
  div[style*="statsGrid"] {
    grid-template-columns: 1fr !important;
  }
}
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(cssRule));
  document.head.appendChild(style);
}

export default About;
