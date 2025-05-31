import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserInputPage from './pages/UserInputPage';
import LoadingPage from './pages/LoadingPage';
import ResultPage from './pages/ResultPage';
import InventoryPage from './pages/InventoryPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import CheckoutPage from './pages/CheckoutPage';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  return (
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/input" element={<UserInputPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/cart" element={<ShoppingCartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
