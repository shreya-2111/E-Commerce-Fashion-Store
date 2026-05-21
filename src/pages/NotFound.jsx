import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiAlertTriangle } from 'react-icons/fi';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={styles.page}
    >
      <div className="container" style={styles.container}>
        <FiAlertTriangle size={56} style={{ color: 'var(--accent)', marginBottom: '1.5rem' }} />
        
        <h1 style={styles.errorCode}>404</h1>
        <h2 style={styles.errorText}>PAGE NOT FOUND</h2>
        
        <p style={styles.description}>
          The luxury editorial page you are searching for has been archived, renamed, or is temporarily unavailable. Let us guide you back to our primary collections.
        </p>

        <Link to="/" className="btn btn-primary" style={styles.homeBtn}>
          <FiHome size={16} style={{ marginRight: '8px' }} /> RETURN HOME
        </Link>
      </div>
    </motion.div>
  );
};

const styles = {
  page: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 0',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  errorCode: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(5rem, 12vw, 8rem)',
    fontWeight: '800',
    lineHeight: '0.9',
    color: 'var(--text-primary)',
    margin: 0,
  },
  errorText: {
    fontSize: '1rem',
    fontWeight: '700',
    letterSpacing: '0.25em',
    color: 'var(--accent)',
    marginTop: '0.5rem',
    marginBottom: '1.5rem',
  },
  description: {
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    maxWidth: '450px',
    lineHeight: '1.6',
    fontWeight: '300',
    marginBottom: '2.5rem',
  },
  homeBtn: {
    padding: '1rem 2rem',
    fontSize: '0.8rem',
  },
};

export default NotFound;
