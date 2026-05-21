import { useContext } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { ShopContext } from '../context/ShopContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ShopContext);

  return (
    <button
      onClick={toggleTheme}
      className="btn-icon"
      aria-label="Toggle Theme"
      style={{ border: 'none', background: 'transparent' }}
    >
      {theme === 'light' ? (
        <FiMoon size={20} style={{ transition: 'transform 0.5s ease' }} />
      ) : (
        <FiSun size={20} style={{ color: '#FDB813', transition: 'transform 0.5s ease' }} />
      )}
    </button>
  );
};

export default ThemeToggle;
