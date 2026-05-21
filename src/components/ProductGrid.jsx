import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import LoaderSkeleton from './LoaderSkeleton';

const ProductGrid = ({ products = [], isLoading = false, skeletonCount = 6 }) => {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  if (isLoading) {
    return (
      <div className="grid-responsive">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <LoaderSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div style={styles.noResults}>
        <h3 style={styles.noResultsTitle}>No Products Found</h3>
        <p style={styles.noResultsText}>
          We couldn't find any products matching your filters. Try clearing your options or checking back later.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid-responsive"
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          variants={cardVariants}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
};

const styles = {
  noResults: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6rem 2rem',
    textAlign: 'center',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: '16px',
    border: '1px dashed var(--border-color)',
    width: '100%',
  },
  noResultsTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.25rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: 'var(--text-primary)',
    marginBottom: '0.75rem',
    letterSpacing: '0.05em',
  },
  noResultsText: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    maxWidth: '400px',
    lineHeight: '1.5',
  },
};

export default ProductGrid;
