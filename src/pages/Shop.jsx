import { useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSliders, FiXCircle } from 'react-icons/fi';
import { ShopContext } from '../context/ShopContext';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import { categories } from '../data/categories';
import { brands } from '../data/brands';

const Shop = () => {
  const { products, loading, triggerLoading } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  // Sidebar toggle state for mobile
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Derived filter terms directly from searchParams URL
  const activeCategory = searchParams.get('category') || 'All';
  const activeBrand = searchParams.get('brand') || 'All';
  const searchQuery = searchParams.get('search') || '';

  // Local filter states for non-URL parameters
  const [priceRange, setPriceRange] = useState(300);
  const [activeRating, setActiveRating] = useState(0);
  const [sortBy, setSortBy] = useState('popularity');

  // Handle triggering loading skeleton animation when parameters shift
  useEffect(() => {
    triggerLoading(500);
  }, [searchParams, triggerLoading]);

  // Set Search Param Helpers
  const updateCategoryParam = (category) => {
    const newParams = new URLSearchParams(searchParams);
    if (category === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', category);
    }
    setSearchParams(newParams);
  };

  const updateBrandParam = (brand) => {
    const newParams = new URLSearchParams(searchParams);
    if (brand === 'All') {
      newParams.delete('brand');
    } else {
      newParams.set('brand', brand);
    }
    setSearchParams(newParams);
  };

  // Reset Filters Action
  const resetFilters = () => {
    setPriceRange(300);
    setActiveRating(0);
    setSortBy('popularity');
    setSearchParams({});
  };

  const clearSearch = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('search');
    setSearchParams(newParams);
  };

  // Apply filters and sorting
  const filteredProducts = products.filter((product) => {
    // 1. Category Filter
    if (activeCategory !== 'All' && product.category !== activeCategory) {
      return false;
    }
    // 2. Brand Filter
    if (activeBrand !== 'All' && product.brand !== activeBrand) {
      return false;
    }
    // 3. Price Filter
    if (product.price > priceRange) {
      return false;
    }
    // 4. Rating Filter
    if (activeRating > 0 && product.rating < activeRating) {
      return false;
    }
    // 5. Search Bar Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = product.title.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      const matchCat = product.category.toLowerCase().includes(q);
      if (!matchTitle && !matchBrand && !matchCat) {
        return false;
      }
    }
    return true;
  });

  // Apply Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    }
    if (sortBy === 'price-high') {
      return b.price - a.price;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    // default popularity / features: higher ratings and ID ordering
    return b.rating * 10 + b.id - (a.rating * 10 + a.id);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={styles.page}
    >
      <div className="container" style={styles.layoutContainer}>
        
        {/* Left Filters Sidebar Column */}
        <FilterSidebar
          categories={categories}
          brands={brands}
          activeCategory={activeCategory}
          setActiveCategory={updateCategoryParam}
          activeBrand={activeBrand}
          setActiveBrand={updateBrandParam}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          activeRating={activeRating}
          setActiveRating={setActiveRating}
          sortBy={sortBy}
          setSortBy={setSortBy}
          resetFilters={resetFilters}
          isOpen={filtersOpen}
          setIsOpen={setFiltersOpen}
        />

        {/* Right Content / Products Column */}
        <div style={styles.productsColumn}>
          {/* Header Bar */}
          <div style={styles.topControlBar}>
            <div style={styles.textSection}>
              {searchQuery ? (
                <div style={styles.searchHeaderRow}>
                  <h1 style={styles.pageTitle}>Search results for "{searchQuery}"</h1>
                  <button onClick={clearSearch} style={styles.clearSearchBtn}>
                    <FiXCircle size={16} style={{ marginRight: '4px' }} /> Clear search
                  </button>
                </div>
              ) : (
                <h1 style={styles.pageTitle}>
                  {activeCategory !== 'All' ? activeCategory : 'ALL PRODUCTS'}
                </h1>
              )}
              <span style={styles.itemCount}>{sortedProducts.length} items found</span>
            </div>

            {/* Mobile Filter Button toggle */}
            <button
              onClick={() => setFiltersOpen(true)}
              style={styles.mobileFilterToggle}
              className="btn btn-outline"
            >
              <FiSliders size={14} style={{ marginRight: '6px' }} />
              FILTERS
            </button>
          </div>

          {/* Active Tags Summary row */}
          {(activeCategory !== 'All' || activeBrand !== 'All' || priceRange < 300 || activeRating > 0) && (
            <div style={styles.activeTagsRow}>
              {activeCategory !== 'All' && (
                <span style={styles.tagBadge} onClick={() => updateCategoryParam('All')}>
                  Category: {activeCategory} <span style={styles.tagX}>×</span>
                </span>
              )}
              {activeBrand !== 'All' && (
                <span style={styles.tagBadge} onClick={() => updateBrandParam('All')}>
                  Brand: {activeBrand} <span style={styles.tagX}>×</span>
                </span>
              )}
              {priceRange < 300 && (
                <span style={styles.tagBadge} onClick={() => setPriceRange(300)}>
                  Max Price: ${priceRange} <span style={styles.tagX}>×</span>
                </span>
              )}
              {activeRating > 0 && (
                <span style={styles.tagBadge} onClick={() => setActiveRating(0)}>
                  Rating: {activeRating}+ ★ <span style={styles.tagX}>×</span>
                </span>
              )}
              <button onClick={resetFilters} style={styles.clearAllTextBtn}>
                Clear All
              </button>
            </div>
          )}

          {/* Product Grid Render */}
          <div style={{ marginTop: '1.5rem' }}>
            <ProductGrid products={sortedProducts} isLoading={loading} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const styles = {
  page: {
    padding: '2.5rem 0 5rem 0',
    minHeight: '80vh',
  },
  layoutContainer: {
    display: 'flex',
    gap: '2.5rem',
    position: 'relative',
  },
  productsColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  topControlBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '1.25rem',
    marginBottom: '1rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  textSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  pageTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    textTransform: 'uppercase',
    fontWeight: '800',
    color: 'var(--text-primary)',
    margin: 0,
    letterSpacing: '0.05em',
  },
  searchHeaderRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  clearSearchBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '0.8rem',
    color: 'var(--accent)',
    fontWeight: '600',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
  },
  itemCount: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
  },
  mobileFilterToggle: {
    display: 'none', // Shown on mobile in responsive override CSS
    padding: '0.6rem 1.25rem',
    fontSize: '0.75rem',
    fontWeight: '600',
    letterSpacing: '0.05em',
    borderRadius: '4px',
  },
  activeTagsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  tagBadge: {
    fontSize: '0.75rem',
    fontWeight: '600',
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
    padding: '0.35rem 0.75rem',
    borderRadius: '20px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'background var(--transition-fast)',
    ':hover': {
      backgroundColor: 'var(--border-color)',
    },
  },
  tagX: {
    fontWeight: '700',
    color: 'var(--text-muted)',
  },
  clearAllTextBtn: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--accent)',
    textTransform: 'uppercase',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    marginLeft: '0.5rem',
    letterSpacing: '0.05em',
  },
};

// Add responsive layout styles. Below 992px, the filter sidebar shifts off-canvas, and the toggle button displays.
const cssRule = `
@media (max-width: 992px) {
  div[style*="productsColumn"] {
    width: 100% !important;
  }
  button[style*="mobileFilterToggle"] {
    display: block !important;
  }
}
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(cssRule));
  document.head.appendChild(style);
}

export default Shop;
