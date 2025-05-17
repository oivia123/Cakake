import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialCartItems = [
  {
    name: 'LV600S Smart Hybrid Ultrasonic Humidifier',
    price: 370,
    qty: 1,
    img: 'https://cdn.levoit.com/website/2022/07/LV600S-1.png',
  },
  {
    name: 'Dr. Heater DR-PS11024 10000W Portable Fan',
    price: 420,
    qty: 1,
    img: 'https://images.homedepot-static.com/productImages/1b2e2e2e-1e2e-4e2e-8e2e-2e2e2e2e2e2e/svn/dr-heater-portable-fans-dr-ps11024-64_1000.jpg',
  },
  {
    name: 'Airthereal MA5000 Ozone Generator',
    price: 290,
    qty: 1,
    img: 'https://m.media-amazon.com/images/I/71QwQ1r6QwL._AC_SL1500_.jpg',
  },
];

const ShoppingCartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [coupon, setCoupon] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const vat = Math.round(subtotal * 0.0535 * 100) / 100; // 5.35% VAT
  const total = subtotal + vat;

  const handleQty = (idx, delta) => {
    setCartItems(items => items.map((item, i) => i === idx ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  };
  const handleDelete = idx => {
    setCartItems(items => items.filter((_, i) => i !== idx));
  };

  // 新增结构化商品信息组件
  const ProductInfo = ({ img, name, children }) => (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      background: 'rgba(255,228,225,0.5)',
      borderRadius: 12,
      padding: 40,
      paddingRight: 92,
      width: 920,
      marginLeft: 32
    }}>
      <img
        src={img}
        alt={name}
        style={{
          width: 96,
          height: 96,
          objectFit: 'cover',
          borderRadius: 12,
          background: '#f5f5f5',
          border: '1px solid #eee',
          marginRight: 16,
          flexShrink: 0
        }}
      />
      <span style={{
        fontSize: 20,
        color: '#222',
        fontWeight: 700,
        textAlign: 'center',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        flex: 1
      }}>
        {name}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginLeft: 32 }}>
        {children}
      </div>
    </div>
  );

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-pink-50 to-pink-100" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
      {/* Top Bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: 60, background: 'transparent', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        {/* 返回按钮，左侧 */}
        <button
          className="shadow-lg transition flex items-center justify-center"
          style={{
            position: 'fixed',
            top: 12,
            left: 16,
            width: '48px',
            height: '48px',
            backgroundColor: 'rgba(255, 228, 225, 0.95)',
            color: '#8B4513',
            border: 'none',
            borderRadius: '50px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
            cursor: 'pointer',
            fontSize: '2rem',
            fontWeight: 'bold',
            zIndex: 200
          }}
          onClick={() => navigate('/')}
          aria-label="返回首页"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B4513" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        {/* Shopping Cart 按钮，右侧 */}
        <button
          style={{
            marginRight: 32,
            padding: '8px 20px',
            borderRadius: 20,
            background: 'rgba(255,228,225,0.85)',
            color: '#8B4513',
            border: 'none',
            fontWeight: 600,
            fontSize: 16,
            cursor: 'pointer'
          }}
        >
          Shopping Cart
        </button>
      </div>
      {/* 新增：进度条紧跟在 top bar 之后 */}
      <div className="w-full flex items-center justify-center" style={{ maxWidth: 1200, margin: '16px auto 0 auto' }}>
        <div className="flex items-center gap-8 w-full max-w-3xl">
          {/* Cart */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <div style={{ width: 44, height: 44, borderRadius: 22, background: '#222', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, marginBottom: 4 }}>🛒</div>
            <span style={{ color: '#222', fontWeight: 700 }}>Cart</span>
          </div>
          {/* ... 其余 Checkout、Order ... */}
        </div>
      </div>
      {/* 占位高度可以适当减少 */}
      <div style={{ height: 32 }} />
      {/* 主体内容 */}
      <div className="flex flex-row w-full max-w-3xl gap-6 mt-12 mb-16" style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
        {/* 商品列表 */}
        <div className="flex-1 bg-white bg-opacity-90 rounded-xl shadow-lg p-8" style={{ minWidth: 320 }}>
          <div className="flex items-center text-gray-500 text-lg font-semibold border-b border-pink-100 pb-4 mb-4">
            <span style={{ flex: 2 }}>Product</span>
            <span style={{ flex: 1, textAlign: 'center' }}>Quantity</span>
            <span style={{ flex: 1, textAlign: 'right' }}>Total</span>
          </div>
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-400" style={{ fontSize: 20, fontWeight: 400 }}>
              Your cart is empty.
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div key={idx} className="flex items-center border-b border-pink-100 py-6 last:border-b-0">
                <div style={{ flex: 2, display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <ProductInfo img={item.img} name={item.name}>
                      <button onClick={() => handleQty(idx, -1)} style={{ width: 32, height: 32, borderRadius: 8, background: '#f5f5f5', border: 'none', fontSize: 20, color: '#8B4513', fontWeight: 700, cursor: 'pointer' }}>-</button>
                      <span style={{ minWidth: 24, textAlign: 'center', fontSize: 18 }}>{item.qty}</span>
                      <button onClick={() => handleQty(idx, 1)} style={{ width: 32, height: 32, borderRadius: 8, background: '#f5f5f5', border: 'none', fontSize: 20, color: '#8B4513', fontWeight: 700, cursor: 'pointer' }}>+</button>
                      <span style={{ fontSize: 18, color: '#8B4513', fontWeight: 600, marginLeft: 32 }}>${item.price * item.qty}</span>
                      <button onClick={() => handleDelete(idx)} style={{ width: 32, height: 32, borderRadius: 8, background: '#222', border: 'none', color: '#fff', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginLeft: 8 }} aria-label="Delete"><span role="img" aria-label="delete">🗑️</span></button>
                    </ProductInfo>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* 右侧 Order Summary 区域 */}
        <div className="w-full max-w-xs bg-[#1e3a5c] rounded-xl shadow-lg p-8 flex flex-col gap-6" style={{ minWidth: 220, color: '#fff' }}>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, letterSpacing: 1 }}>Order Summary</div>
          <div className="flex items-center justify-between" style={{ fontSize: 18 }}>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between" style={{ fontSize: 18 }}>
            <span>V.A.T</span>
            <span>${vat.toFixed(2)}</span>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <span style={{ fontSize: 16 }}>Add a coupon</span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                placeholder="Enter your code"
                style={{ flex: 1, borderRadius: 8, border: 'none', padding: '8px 12px', fontSize: 16, fontFamily: 'Cinzel Decorative, serif', color: '#1e3a5c' }}
              />
              <button style={{ background: '#fff', color: '#1e3a5c', border: 'none', borderRadius: 8, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, cursor: 'pointer' }}>&#8594;</button>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4" style={{ fontSize: 20, fontWeight: 700 }}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            className="mt-6 px-6 py-3 rounded-lg font-semibold"
            style={{ background: '#ffe082', color: '#1e3a5c', fontSize: 20, fontFamily: 'Cinzel Decorative, serif', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage; 