import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import OrderSummary from '../components/OrderSummary';

const ShoppingCartPage = () => {
  const navigate = useNavigate();
  const { cartItems, updateQty, removeFromCart } = useCart();

  // 只对有数字价格的商品计算小计
  const subtotal = cartItems.reduce((sum, item) => (typeof item.price === 'number' ? sum + item.price * item.qty : sum), 0);
  const vat = Math.round(subtotal * 0.0535 * 100) / 100;
  const total = subtotal + vat;

  const handleQty = (idx, delta) => {
    updateQty(idx, delta);
  };
  const handleDelete = idx => {
    removeFromCart(idx);
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
      <div className="flex flex-row w-full max-w-5xl gap-10 mt-12 mb-16" style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
        {/* 商品列表 */}
        <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-8" style={{ minWidth: 320, flex: 2 }}>
          <div className="flex items-center text-gray-500 text-lg font-semibold border-b border-pink-100 pb-4 mb-4" style={{ flex: 1, marginLeft: 110 }}>
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
                    <ProductInfo
                      img={`/asset/image/${item.name.toLowerCase().replace(/ cake$/, '').replace(/ /g, '_')}.jpg`}
                      name={item.name}
                    >
                      <button
                        onClick={() => handleQty(idx, -1)}
                        style={{
                          width: 32, height: 32, borderRadius: 8, background: '#f5f5f5', border: 'none',
                          fontSize: 20, color: '#8B4513', fontWeight: 700, cursor: 'pointer'
                        }}
                      >-</button>
                      <span style={{ minWidth: 24, textAlign: 'center', fontSize: 18 }}>{item.qty}</span>
                      <button
                        onClick={() => handleQty(idx, 1)}
                        style={{
                          width: 32, height: 32, borderRadius: 8, background: '#f5f5f5', border: 'none',
                          fontSize: 20, color: '#8B4513', fontWeight: 700, cursor: 'pointer'
                        }}
                      >+</button>
                      <span style={{ fontSize: 18, color: '#8B4513', fontWeight: 600, marginLeft: 32 }}>
                        {typeof item.price === 'number' ? `$${item.price * item.qty}` : '--'}
                      </span>
                      <button
                        onClick={() => handleDelete(idx)}
                        style={{
                          width: 32, height: 32, borderRadius: 8, background: '#222', border: 'none',
                          color: '#fff', fontSize: 18, display: 'flex', alignItems: 'center',
                          justifyContent: 'center', cursor: 'pointer', marginLeft: 8
                        }}
                        aria-label="Delete"
                      >
                        <span role="img" aria-label="delete">🗑️</span>
                      </button>
                    </ProductInfo>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* 右侧 Order Summary 区域 */}
        <div style={{ flex: 1, alignSelf: 'flex-start', display: 'flex', justifyContent: 'flex-end' }}>
          <OrderSummary
            subtotal={subtotal}
            vat={vat}
            total={total}
            onCheckout={() => navigate('/checkout')}
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage; 