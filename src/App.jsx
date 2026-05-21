import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';

// Components
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Scroll to Top on route change helper
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <ShopProvider>
      <Router>
        <ScrollToTop />
        <div style={styles.appContainer}>
          {/* Main sticky navigation header */}
          <Navbar />
          
          {/* Fullscreen Search bar overlay */}
          <SearchBar />
          
          {/* Sliding bag cart drawer */}
          <CartDrawer />
          
          {/* Active page views */}
          <main style={styles.mainContent}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          
          {/* Brand footer */}
          <Footer />
        </div>
      </Router>
    </ShopProvider>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  mainContent: {
    flex: 1,
  },
};

export default App;
