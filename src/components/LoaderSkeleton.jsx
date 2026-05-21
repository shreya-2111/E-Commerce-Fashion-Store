
const LoaderSkeleton = () => {
  return (
    <div style={styles.card}>
      {/* Shimmering Image Box */}
      <div className="shimmer" style={styles.imageBlock} />
      
      {/* Shimmering Details */}
      <div style={styles.detailsBlock}>
        {/* Brand placeholder */}
        <div className="shimmer" style={styles.brandLine} />
        {/* Title placeholder */}
        <div className="shimmer" style={styles.titleLine} />
        {/* Price placeholder */}
        <div className="shimmer" style={styles.priceLine} />
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '1rem',
  },
  imageBlock: {
    width: '100%',
    aspectRatio: '3/4',
    borderRadius: '16px',
  },
  detailsBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '0 4px',
  },
  brandLine: {
    width: '40px',
    height: '10px',
    borderRadius: '2px',
  },
  titleLine: {
    width: '75%',
    height: '16px',
    borderRadius: '4px',
  },
  priceLine: {
    width: '30%',
    height: '14px',
    borderRadius: '3px',
  },
};

export default LoaderSkeleton;
