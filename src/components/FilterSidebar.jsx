import { FiX, FiSliders, FiStar } from 'react-icons/fi';

const FilterSidebar = ({
  categories = [],
  brands = [],
  activeCategory,
  setActiveCategory,
  activeBrand,
  setActiveBrand,
  priceRange,
  setPriceRange,
  activeRating,
  setActiveRating,
  sortBy,
  setSortBy,
  resetFilters,
  isOpen,
  setIsOpen
}) => {
  return (
    <div
      style={{
        ...styles.wrapper,
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      }}
      className="glass-panel"
    >
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerTitle}>
          <FiSliders size={16} style={{ marginRight: '8px' }} />
          <span>FILTERS</span>
        </div>
        <button onClick={() => setIsOpen(false)} style={styles.closeBtn} aria-label="Close filters">
          <FiX size={20} />
        </button>
      </div>

      <div style={styles.content}>
        {/* Sort By Section */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Sort By</h4>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={styles.select}
          >
            <option value="popularity">Featured / Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Average Rating</option>
          </select>
        </div>

        {/* Category Filters */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Category</h4>
          <div style={styles.filterList}>
            <label style={styles.filterItem}>
              <input
                type="radio"
                name="category"
                checked={activeCategory === 'All'}
                onChange={() => setActiveCategory('All')}
                style={styles.radio}
              />
              <span style={activeCategory === 'All' ? styles.activeText : styles.filterText}>
                All Collections
              </span>
            </label>
            {categories.map((cat) => (
              <label key={cat.id} style={styles.filterItem}>
                <input
                  type="radio"
                  name="category"
                  checked={activeCategory === cat.slug}
                  onChange={() => setActiveCategory(cat.slug)}
                  style={styles.radio}
                />
                <span style={activeCategory === cat.slug ? styles.activeText : styles.filterText}>
                  {cat.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Brand Filters */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Brands</h4>
          <div style={styles.filterList}>
            <label style={styles.filterItem}>
              <input
                type="radio"
                name="brand"
                checked={activeBrand === 'All'}
                onChange={() => setActiveBrand('All')}
                style={styles.radio}
              />
              <span style={activeBrand === 'All' ? styles.activeText : styles.filterText}>
                All Brands
              </span>
            </label>
            {brands.map((brand) => (
              <label key={brand.id} style={styles.filterItem}>
                <input
                  type="radio"
                  name="brand"
                  checked={activeBrand === brand.name}
                  onChange={() => setActiveBrand(brand.name)}
                  style={styles.radio}
                />
                <span style={activeBrand === brand.name ? styles.activeText : styles.filterText}>
                  {brand.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Slider */}
        <div style={styles.section}>
          <div style={styles.sectionTitleRow}>
            <h4 style={styles.sectionTitle}>Max Price</h4>
            <span style={styles.priceLabel}>${priceRange}</span>
          </div>
          <input
            type="range"
            min="0"
            max="300"
            step="10"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            style={styles.rangeInput}
          />
          <div style={styles.rangeValues}>
            <span>$0</span>
            <span>$300</span>
          </div>
        </div>

        {/* Rating filter */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Minimum Rating</h4>
          <div style={styles.ratingGroup}>
            {[4, 4.5, 4.8].map((rating) => (
              <button
                key={rating}
                onClick={() => setActiveRating(activeRating === rating ? 0 : rating)}
                style={{
                  ...styles.ratingBtn,
                  backgroundColor: activeRating === rating ? 'var(--text-primary)' : 'var(--bg-secondary)',
                  color: activeRating === rating ? 'var(--bg-primary)' : 'var(--text-primary)',
                }}
              >
                <FiStar size={12} style={{ marginRight: '4px', fill: activeRating === rating ? 'var(--bg-primary)' : 'transparent' }} />
                {rating}+
              </button>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={resetFilters}
          className="btn btn-outline"
          style={styles.resetBtn}
        >
          CLEAR FILTERS
        </button>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    position: 'fixed',
    top: '70px',
    left: 0,
    width: '320px',
    height: 'calc(100vh - 70px)',
    zIndex: 850,
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid var(--border-color)',
    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    boxShadow: 'var(--box-shadow)',
  },
  header: {
    display: 'none', // Shown only on mobile in responsive CSS override
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.25rem 1.5rem',
    borderBottom: '1px solid var(--border-color)',
  },
  headerTitle: {
    fontSize: '0.85rem',
    fontWeight: '700',
    letterSpacing: '0.05em',
    color: 'var(--text-primary)',
    display: 'flex',
    alignItems: 'center',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    padding: '2rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  sectionTitleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: '0.8rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--text-primary)',
  },
  priceLabel: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: 'var(--accent)',
  },
  select: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '0.85rem',
    outline: 'none',
    fontFamily: 'var(--font-sans)',
  },
  filterList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  filterItem: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  radio: {
    marginRight: '0.75rem',
    accentColor: 'var(--text-primary)',
    width: '14px',
    height: '14px',
  },
  filterText: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    transition: 'color var(--transition-fast)',
  },
  activeText: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  rangeInput: {
    width: '100%',
    accentColor: 'var(--text-primary)',
    margin: '0.5rem 0',
  },
  rangeValues: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
  ratingGroup: {
    display: 'flex',
    gap: '0.5rem',
  },
  ratingBtn: {
    flex: 1,
    padding: '0.5rem',
    border: '1px solid var(--border-color)',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
  },
  resetBtn: {
    width: '100%',
    padding: '0.8rem',
    fontSize: '0.75rem',
    fontWeight: '700',
    marginTop: '1rem',
  },
};

// Add responsive rules for filters sidebar. On screen width > 992px, the filter sidebar is static (no transform translate).
const cssRule = `
@media (min-width: 992px) {
  div[style*="wrapper"] {
    transform: translateX(0) !important;
    position: sticky !important;
    height: calc(100vh - 70px) !important;
    top: 70px !important;
    z-index: 10 !important;
    box-shadow: none !important;
    border-right: 1px solid var(--border-color) !important;
  }
  div[style*="wrapper"] div[style*="header"] {
    display: none !important;
  }
}
@media (max-width: 992px) {
  div[style*="wrapper"] div[style*="header"] {
    display: flex !important;
  }
}
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(cssRule));
  document.head.appendChild(style);
}

export default FilterSidebar;
