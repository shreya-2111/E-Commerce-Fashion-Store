import { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX, FiSearch } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopContext } from '../context/ShopContext';

const SearchBar = () => {
  const { searchOpen, setSearchOpen, searchQuery, setSearchQuery, products } = useContext(ShopContext);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input when search bar opens
  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  // Filter products for preview suggestions (limit to 5)
  const suggestions = searchQuery.trim()
    ? products
        .filter(p =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const handleSuggestionClick = (product) => {
    navigate(`/shop?search=${encodeURIComponent(product.title)}`);
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
            style={styles.backdrop}
          />

          {/* Search container */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="glass-panel"
            style={styles.searchContainer}
          >
            <div style={styles.searchHeader}>
              <form onSubmit={handleSearchSubmit} style={styles.searchForm}>
                <FiSearch size={22} style={styles.searchIcon} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="SEARCH FOR BRANDS, SNEAKERS, COATS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={styles.searchInput}
                />
              </form>
              <button onClick={() => setSearchOpen(false)} style={styles.closeBtn}>
                <FiX size={24} />
              </button>
            </div>

            {searchQuery && (
              <div style={styles.suggestionsContainer}>
                {suggestions.length > 0 ? (
                  <>
                    <div style={styles.sectionTitle}>Suggested Products</div>
                    <ul style={styles.suggestionsList}>
                      {suggestions.map((product) => (
                        <li
                          key={product.id}
                          onClick={() => handleSuggestionClick(product)}
                          style={styles.suggestionItem}
                        >
                          <img
                            src={product.image}
                            alt={product.title}
                            style={styles.suggestionImage}
                          />
                          <div style={styles.suggestionDetails}>
                            <span style={styles.suggestionBrand}>{product.brand}</span>
                            <span style={styles.suggestionTitle}>{product.title}</span>
                          </div>
                          <span style={styles.suggestionPrice}>${product.price}</span>
                        </li>
                      ))}
                    </ul>
                    <div
                      onClick={handleSearchSubmit}
                      style={styles.viewAllResults}
                    >
                      View all results for "{searchQuery}"
                    </div>
                  </>
                ) : (
                  <div style={styles.noResults}>No products found matching "{searchQuery}"</div>
                )}
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
    zIndex: 1000,
  },
  searchContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    padding: '2rem 5%',
    zIndex: 1001,
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  },
  searchHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  searchForm: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    marginRight: '2rem',
  },
  searchIcon: {
    color: 'var(--text-muted)',
    marginRight: '1rem',
  },
  searchInput: {
    width: '100%',
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '1.25rem',
    fontWeight: '400',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-sans)',
    letterSpacing: '0.05em',
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  suggestionsContainer: {
    marginTop: '1.5rem',
    borderTop: '1px solid var(--border-color)',
    paddingTop: '1.5rem',
    maxHeight: '400px',
    overflowY: 'auto',
  },
  sectionTitle: {
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    letterSpacing: '0.1em',
    marginBottom: '1rem',
  },
  suggestionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  },
  suggestionItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background var(--transition-fast)',
    ':hover': {
      background: 'var(--bg-secondary)',
    },
  },
  suggestionImage: {
    width: '50px',
    height: '50px',
    borderRadius: '4px',
    objectFit: 'cover',
    marginRight: '1rem',
  },
  suggestionDetails: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  suggestionBrand: {
    fontSize: '0.7rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
  },
  suggestionTitle: {
    fontSize: '0.95rem',
    fontWeight: '500',
    color: 'var(--text-primary)',
  },
  suggestionPrice: {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  viewAllResults: {
    marginTop: '1.5rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    color: 'var(--accent)',
    cursor: 'pointer',
    textAlign: 'center',
    letterSpacing: '0.05em',
  },
  noResults: {
    textAlign: 'center',
    color: 'var(--text-secondary)',
    padding: '2rem 0',
  },
};

export default SearchBar;
