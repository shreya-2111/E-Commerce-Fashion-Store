import { useContext } from 'react';
import { FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { ShopContext } from '../context/ShopContext';

const WishlistButton = ({ product, size = 20, style = {} }) => {
  const { toggleWishlist, isInWishlist } = useContext(ShopContext);
  const favorited = isInWishlist(product.id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      whileHover={{ scale: 1.1 }}
      onClick={handleClick}
      style={{
        ...styles.btn,
        backgroundColor: favorited ? 'var(--accent)' : 'var(--bg-primary)',
        borderColor: favorited ? 'var(--accent)' : 'var(--border-color)',
        color: favorited ? '#ffffff' : 'var(--text-primary)',
        ...style,
      }}
      aria-label={favorited ? "Remove from wishlist" : "Add to wishlist"}
    >
      <FiHeart
        size={size}
        style={{
          fill: favorited ? '#ffffff' : 'transparent',
          stroke: favorited ? '#ffffff' : 'currentColor',
          transition: 'fill 0.2s ease',
        }}
      />
    </motion.button>
  );
};

const styles = {
  btn: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
  },
};

export default WishlistButton;
