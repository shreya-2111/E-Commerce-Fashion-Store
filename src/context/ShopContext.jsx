/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';
import { products } from '../data/products';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // Load initial states from LocalStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('fashion_store_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('fashion_store_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('fashion_store_theme');
    if (savedTheme) return savedTheme;
    // Fallback to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('fashion_store_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('fashion_store_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('fashion_store_theme', theme);
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Theme action
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Cart operations
  const addToCart = (product, size, color, quantity = 1) => {
    if (!size) {
      alert('Please select a size');
      return;
    }
    if (!color) {
      alert('Please select a color');
      return;
    }

    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item =>
          item.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            title: product.title,
            brand: product.brand,
            price: product.price,
            image: product.image,
            selectedSize: size,
            selectedColor: color,
            quantity: quantity
          }
        ];
      }
    });
    
    // Open cart drawer automatically on add
    setCartOpen(true);
  };

  const removeFromCart = (productId, size, colorName) => {
    setCart(prevCart =>
      prevCart.filter(
        item =>
          !(item.id === productId &&
            item.selectedSize === size &&
            item.selectedColor.name === colorName)
      )
    );
  };

  const updateQuantity = (productId, size, colorName, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId &&
        item.selectedSize === size &&
        item.selectedColor.name === colorName
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setDiscount(0);
    setPromoCode('');
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartTotal = () => {
    const subtotal = getCartSubtotal();
    return subtotal - subtotal * (discount / 100);
  };

  // Promo Code Validation
  const applyPromoCode = (code) => {
    const uppercaseCode = code.toUpperCase().trim();
    if (uppercaseCode === 'WELCOME10') {
      setDiscount(10);
      setPromoCode('WELCOME10');
      setPromoError('');
      return true;
    } else if (uppercaseCode === 'NIKE20') {
      setDiscount(20);
      setPromoCode('NIKE20');
      setPromoError('');
      return true;
    } else if (uppercaseCode === 'ZARA30') {
      setDiscount(30);
      setPromoCode('ZARA30');
      setPromoError('');
      return true;
    } else {
      setPromoError('Invalid promo code');
      return false;
    }
  };

  const removePromoCode = () => {
    setDiscount(0);
    setPromoCode('');
    setPromoError('');
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    setWishlist(prevWishlist => {
      const isExist = prevWishlist.some(item => item.id === product.id);
      if (isExist) {
        return prevWishlist.filter(item => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Global Loader trigger
  const triggerLoading = (duration = 800) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, duration);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        theme,
        searchQuery,
        searchOpen,
        cartOpen,
        loading,
        discount,
        promoCode,
        promoError,
        setSearchQuery,
        setSearchOpen,
        setCartOpen,
        setLoading,
        toggleTheme,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        getCartSubtotal,
        getCartTotal,
        applyPromoCode,
        removePromoCode,
        toggleWishlist,
        isInWishlist,
        triggerLoading
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
