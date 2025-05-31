import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const addToCart = (item) => {
    setCartItems(prev => {
      const updated = [...prev, item];
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (idx) => {
    setCartItems(prev => {
      const updated = prev.filter((_, i) => i !== idx);
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  const updateQty = (idx, delta) => {
    setCartItems(prev => {
      const updated = prev.map((item, i) =>
        i === idx ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      );
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty }}>
      {children}
    </CartContext.Provider>
  );
} 