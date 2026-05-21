import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiArrowRight } from 'react-icons/fi';
import { ShopContext } from '../context/ShopContext';
import ProductGrid from '../components/ProductGrid';

const Wishlist = () => {
  const { wishlist, loading, triggerLoading } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    triggerLoading(400);
  }, [triggerLoading]);

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
          <span style={styles.preTitle}>MY PERSONAL SELECTION</span>
          <h1 style={styles.title}>
            <FiHeart size={24} style={{ marginRight: '10px', fill: 'var(--accent)', stroke: 'var(--accent)' }} />
            Wishlist
          </h1>
          <span style={styles.itemCount}>{wishlist.length} saved items</span>
        </div>

        {/* Content */}
        {wishlist.length === 0 ? (
          <div style={styles.emptyCard} className="glass-panel">
            <FiHeart size={48} style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }} />
            <h2 style={styles.emptyTitle}>YOUR WISHLIST IS EMPTY</h2>
            <p style={styles.emptyText}>
              Bookmark items that catch your eye while browsing our collections. They will show up here so you can add them to your bag later.
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="btn btn-primary"
              style={{ marginTop: '2rem' }}
            >
              BROWSE CATALOG <FiArrowRight style={{ marginLeft: '8px' }} />
            </button>
          </div>
        ) : (
          <div style={{ marginTop: '2rem' }}>
            <ProductGrid products={wishlist} isLoading={loading} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

const styles = {
  page: {
    padding: '3rem 0 6rem 0',
    minHeight: '70vh',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '1.5rem',
    marginBottom: '2rem',
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
    display: 'flex',
    alignItems: 'center',
  },
  itemCount: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
  },
  emptyCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '5rem 2rem',
    borderRadius: '16px',
  },
  emptyTitle: {
    fontSize: '1.2rem',
    fontWeight: '700',
    letterSpacing: '0.05em',
    color: 'var(--text-primary)',
    marginBottom: '0.5rem',
  },
  emptyText: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    maxWidth: '450px',
    lineHeight: '1.6',
    fontWeight: '300',
  },
};

export default Wishlist;
