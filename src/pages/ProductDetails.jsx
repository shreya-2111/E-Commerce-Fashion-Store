import { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiStar, FiChevronRight, FiAlertCircle } from 'react-icons/fi';
import { ShopContext } from '../context/ShopContext';
import WishlistButton from '../components/WishlistButton';
import ProductGrid from '../components/ProductGrid';

const ProductDetailsContent = ({ id }) => {
  const { products, addToCart, triggerLoading, loading } = useContext(ShopContext);

  // Find product by ID
  const product = products.find((p) => p.id === parseInt(id));

  // States - Initialized directly from the product to avoid cascading renders
  const [activeImage, setActiveImage] = useState(product?.image || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Trigger loading state and scroll to top on mount
  useEffect(() => {
    if (product) {
      triggerLoading(400);
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!product) {
    return (
      <div className="container" style={styles.errorContainer}>
        <FiAlertCircle size={48} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
        <h2>Product Not Found</h2>
        <p>The product you are looking for does not exist or has been removed.</p>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  // Find related products (same category/brand, excluding current product, limit 4)
  const relatedProducts = products
    .filter((p) => (p.category === product.category || p.brand === product.brand) && p.id !== product.id)
    .slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={styles.page}
    >
      <div className="container">
        {/* Breadcrumbs */}
        <div style={styles.breadcrumbs}>
          <Link to="/" style={styles.breadcrumbLink}>Home</Link>
          <FiChevronRight size={12} style={styles.breadcrumbDivider} />
          <Link to="/shop" style={styles.breadcrumbLink}>Shop</Link>
          <FiChevronRight size={12} style={styles.breadcrumbDivider} />
          <Link to={`/shop?category=${product.category}`} style={styles.breadcrumbLink}>
            {product.category}
          </Link>
          <FiChevronRight size={12} style={styles.breadcrumbDivider} />
          <span style={styles.breadcrumbCurrent}>{product.title}</span>
        </div>

        {/* Main Details Section */}
        <div style={styles.detailsGrid}>
          {/* Left Column: Gallery */}
          <div style={styles.galleryCol}>
            <div style={styles.mainImgWrapper}>
              <img src={activeImage} alt={product.title} style={styles.mainImage} />
            </div>
            
            {/* Thumbnails row */}
            {product.images && product.images.length > 0 && (
              <div style={styles.thumbnails}>
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    style={{
                      ...styles.thumbnailWrapper,
                      borderColor: activeImage === img ? 'var(--text-primary)' : 'var(--border-color)',
                    }}
                  >
                    <img src={img} alt={`${product.title} thumb ${idx}`} style={styles.thumbnailImg} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information Panel */}
          <div style={styles.infoCol}>
            {/* Brand & Title */}
            <span style={styles.brandName}>{product.brand}</span>
            <h1 style={styles.title}>{product.title}</h1>

            {/* Ratings Row */}
            <div style={styles.ratingRow}>
              <div style={styles.stars}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <FiStar
                    key={i}
                    size={16}
                    style={{
                      fill: i < Math.floor(product.rating) ? 'var(--accent)' : 'transparent',
                      stroke: 'var(--accent)',
                      marginRight: '2px',
                    }}
                  />
                ))}
              </div>
              <span style={styles.ratingText}>
                {product.rating} ({product.reviews?.length || 0} reviews)
              </span>
            </div>

            {/* Price block */}
            <div style={styles.priceBlock}>
              <span style={styles.price}>${product.price.toFixed(2)}</span>
              {product.oldPrice && product.oldPrice > product.price && (
                <span style={styles.oldPrice}>${product.oldPrice.toFixed(2)}</span>
              )}
            </div>

            {/* Color selection circles */}
            {product.colors && product.colors.length > 0 && (
              <div style={styles.optionSection}>
                <h3 style={styles.optionTitle}>
                  Color: <strong>{selectedColor?.name}</strong>
                </h3>
                <div style={styles.colorOptions}>
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        ...styles.colorCircle,
                        backgroundColor: color.hex,
                        outline: selectedColor?.name === color.name ? '2px solid var(--text-primary)' : 'none',
                        outlineOffset: '2px',
                      }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size selection grids */}
            {product.sizes && product.sizes.length > 0 && (
              <div style={styles.optionSection}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={styles.optionTitle}>
                    Select Size: <strong>{selectedSize}</strong>
                  </h3>
                  <a href="#/size-guide" style={styles.sizeGuideLink}>Size Guide</a>
                </div>
                <div style={styles.sizeOptions}>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        ...styles.sizeBox,
                        backgroundColor: selectedSize === size ? 'var(--text-primary)' : 'var(--bg-secondary)',
                        color: selectedSize === size ? 'var(--bg-primary)' : 'var(--text-primary)',
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity select & Actions group */}
            <div style={styles.actionSection}>
              <div style={styles.qtyBlock}>
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  style={styles.qtyBtn}
                >
                  -
                </button>
                <span style={styles.qtyVal}>{quantity}</span>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  style={styles.qtyBtn}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn btn-primary"
                style={styles.addToCartBtn}
              >
                <FiShoppingBag style={{ marginRight: '8px' }} /> ADD TO BAG
              </button>

              <div style={styles.wishlistWrapper}>
                <WishlistButton product={product} size={18} style={styles.wishlistBtnOverride} />
              </div>
            </div>

            {/* Description Tab list */}
            <div style={styles.tabsSection}>
              <div style={styles.tabHeader}>
                <button
                  onClick={() => setActiveTab('description')}
                  style={{
                    ...styles.tabLink,
                    borderBottom: activeTab === 'description' ? '2px solid var(--text-primary)' : '2px solid transparent',
                    color: activeTab === 'description' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  style={{
                    ...styles.tabLink,
                    borderBottom: activeTab === 'details' ? '2px solid var(--text-primary)' : '2px solid transparent',
                    color: activeTab === 'details' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  Material & Care
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  style={{
                    ...styles.tabLink,
                    borderBottom: activeTab === 'shipping' ? '2px solid var(--text-primary)' : '2px solid transparent',
                    color: activeTab === 'shipping' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  Shipping & Returns
                </button>
              </div>

              <div style={styles.tabContent}>
                {activeTab === 'description' && (
                  <p style={styles.tabText}>{product.description}</p>
                )}
                {activeTab === 'details' && (
                  <ul style={styles.detailsList}>
                    <li>100% Organic Fibers / Premium Grade Leather</li>
                    <li>Sustainably sourced and structured under Nike & Zara specifications</li>
                    <li>Dry clean recommended / Machine wash cold on delicate</li>
                    <li>Made in Italy / Portugal</li>
                  </ul>
                )}
                {activeTab === 'shipping' && (
                  <p style={styles.tabText}>
                    Free standard shipping on orders over $150. Delivery takes 3-5 business days. Returns are accepted within 30 days of purchase in original unworn condition.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Product reviews list */}
        {product.reviews && product.reviews.length > 0 && (
          <section style={styles.reviewsSection}>
            <h2 style={styles.reviewsHeading}>Product Reviews</h2>
            <div style={styles.reviewsList}>
              {product.reviews.map((rev) => (
                <div key={rev.id} style={styles.reviewCard}>
                  <div style={styles.reviewHeader}>
                    <span style={styles.reviewUser}>{rev.user}</span>
                    <div style={styles.stars}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FiStar
                          key={i}
                          size={12}
                          style={{
                            fill: i < rev.rating ? 'var(--accent)' : 'transparent',
                            stroke: 'var(--accent)',
                            marginRight: '2px',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <p style={styles.reviewComment}>{rev.comment}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related products grids */}
        {relatedProducts.length > 0 && (
          <section style={styles.relatedSection}>
            <div style={styles.relatedHeader}>
              <span style={styles.relatedPre}>EXPLORE SIMILAR</span>
              <h2 style={styles.relatedHeading}>Related Products</h2>
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <ProductGrid products={relatedProducts} isLoading={loading} />
            </div>
          </section>
        )}
      </div>
    </motion.div>
  );
};

const styles = {
  page: {
    padding: '2rem 0 5rem 0',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8rem 2rem',
    textAlign: 'center',
  },
  breadcrumbs: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    marginBottom: '2rem',
  },
  breadcrumbLink: {
    transition: 'color var(--transition-fast)',
    ':hover': {
      color: 'var(--text-primary)',
    },
  },
  breadcrumbDivider: {
    opacity: 0.5,
  },
  breadcrumbCurrent: {
    color: 'var(--text-primary)',
    fontWeight: '600',
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '4rem',
  },
  galleryCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  mainImgWrapper: {
    width: '100%',
    aspectRatio: '3/4',
    borderRadius: '16px',
    overflow: 'hidden',
    backgroundColor: 'var(--bg-secondary)',
    boxShadow: 'var(--card-shadow)',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  thumbnails: {
    display: 'flex',
    gap: '0.75rem',
  },
  thumbnailWrapper: {
    width: '70px',
    height: '90px',
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'pointer',
    border: '2px solid',
    transition: 'border-color var(--transition-fast)',
  },
  thumbnailImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  infoCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  brandName: {
    fontSize: '0.8rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: 'var(--accent)',
    letterSpacing: '0.15em',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
    fontWeight: '800',
    color: 'var(--text-primary)',
    lineHeight: '1.1',
    margin: '0.5rem 0 1rem 0',
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '1.5rem',
  },
  stars: {
    display: 'flex',
  },
  ratingText: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    fontWeight: '500',
  },
  priceBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '2rem',
  },
  price: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  oldPrice: {
    fontSize: '1.25rem',
    textDecoration: 'line-through',
    color: 'var(--text-muted)',
  },
  optionSection: {
    marginBottom: '1.75rem',
  },
  optionTitle: {
    fontSize: '0.85rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    color: 'var(--text-primary)',
    letterSpacing: '0.05em',
    marginBottom: '0.75rem',
  },
  colorOptions: {
    display: 'flex',
    gap: '0.75rem',
  },
  colorCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: '1px solid var(--border-color)',
    cursor: 'pointer',
  },
  sizeGuideLink: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    textDecoration: 'underline',
    fontWeight: '500',
  },
  sizeOptions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  sizeBox: {
    padding: '0.75rem 1.25rem',
    fontSize: '0.85rem',
    fontWeight: '700',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    cursor: 'pointer',
    minWidth: '55px',
    textAlign: 'center',
    transition: 'all var(--transition-fast)',
  },
  actionSection: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    margin: '2rem 0',
  },
  qtyBlock: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid var(--border-color)',
    borderRadius: '30px',
    overflow: 'hidden',
    height: '50px',
  },
  qtyBtn: {
    width: '36px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    ':hover': {
      backgroundColor: 'var(--bg-secondary)',
      color: 'var(--text-primary)',
    },
  },
  qtyVal: {
    padding: '0 0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    minWidth: '24px',
    textAlign: 'center',
  },
  addToCartBtn: {
    flex: 1,
    height: '50px',
    fontSize: '0.85rem',
    fontWeight: '700',
    letterSpacing: '0.1em',
  },
  wishlistWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  wishlistBtnOverride: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  },
  tabsSection: {
    borderTop: '1px solid var(--border-color)',
    paddingTop: '1.5rem',
    marginTop: '1rem',
  },
  tabHeader: {
    display: 'flex',
    gap: '1.5rem',
    borderBottom: '1px solid var(--border-color)',
  },
  tabLink: {
    padding: '0.5rem 0 0.75rem 0',
    fontSize: '0.85rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
  },
  tabContent: {
    padding: '1rem 0',
  },
  tabText: {
    fontSize: '0.9rem',
    lineHeight: '1.6',
    color: 'var(--text-secondary)',
    fontWeight: '300',
  },
  detailsList: {
    fontSize: '0.9rem',
    lineHeight: '1.7',
    color: 'var(--text-secondary)',
    fontWeight: '300',
    paddingLeft: '1.2rem',
    listStyleType: 'disc',
  },
  reviewsSection: {
    marginTop: '5rem',
    borderTop: '1px solid var(--border-color)',
    paddingTop: '3rem',
  },
  reviewsHeading: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: '2rem',
  },
  reviewsList: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
  },
  reviewCard: {
    padding: '1.5rem',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
  },
  reviewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem',
  },
  reviewUser: {
    fontSize: '0.9rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  reviewComment: {
    fontSize: '0.85rem',
    lineHeight: '1.5',
    color: 'var(--text-secondary)',
    fontWeight: '300',
  },
  relatedSection: {
    marginTop: '6rem',
    borderTop: '1px solid var(--border-color)',
    paddingTop: '3rem',
  },
  relatedHeader: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '2.5rem',
  },
  relatedPre: {
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.15em',
    color: 'var(--accent)',
  },
  relatedHeading: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.75rem',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
};

// Add responsive overrides for grid splits
const cssRule = `
@media (max-width: 992px) {
  div[style*="detailsGrid"] {
    grid-template-columns: 1fr !important;
    gap: 2.5rem !important;
  }
  div[style*="reviewsList"] {
    grid-template-columns: 1fr !important;
    gap: 1.5rem !important;
  }
}
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(cssRule));
  document.head.appendChild(style);
}

const ProductDetails = () => {
  const { id } = useParams();
  return <ProductDetailsContent key={id} id={id} />;
};

export default ProductDetails;
