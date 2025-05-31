import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { allCakes } from '../utils/cakeOptions';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;
  const { addToCart } = useCart();

  if (!result) return <div style={{ padding: 32 }}>No recommendation available.</div>;

  const handleAddToCart = () => {
    // 尝试从 result.description 中提取蛋糕名
    const match = result.description.match(/The most suitable cake for you is: ([^.\n]+)/i);
    const cakeName = match ? match[1].trim() : null;
    const cake = allCakes.find(c => c.name === cakeName);
    if (cake) {
      addToCart({
        name: cake.name,
        img: cake.img,
        price: cake.price,
        qty: 1
      });
      navigate('/cart');
    } else {
      alert('Cake not found!');
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-yellow-100 to-pink-100"
      style={{
        padding: '40px 24px',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      {/* Shopping Cart 按钮右上角 */}
      <button
        style={{
          position: 'fixed',
          top: 20,
          right: 32,
          marginRight: 0,
          padding: '8px 20px',
          borderRadius: 20,
          background: 'rgba(255,228,225,0.85)',
          color: '#8B4513',
          border: 'none',
          fontWeight: 600,
          fontSize: 16,
          cursor: 'pointer',
          zIndex: 200
        }}
        onClick={() => navigate('/cart')}
      >
        Shopping Cart
      </button>
      {/* 返回首页按钮左上角 */}
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: 50 }}>
        <h2 className="text-3xl font-bold mb-6">Your Personalized Cake Recommendation</h2>
        <div
          className="bg-white rounded-lg shadow-lg p-8 mb-6 w-full max-w-md"
          style={{
            margin: '0 auto',
            boxSizing: 'border-box',
            minWidth: 0,
            maxWidth: 800,
            padding: '32px 28px',
            marginTop: '-60px',
          }}
        >
          <div style={{
            background: '#f8bbd0',
            borderRadius: 16,
            padding: '16px 24px',
            margin: '32px 0 16px 0',
            position: 'relative',
            overflow: 'hidden',
            minHeight: 320,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <img
              src="/asset/image/cake-placeholder.png"
              alt="Cake Placeholder"
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                maxWidth: 700,
                height: 140,
                objectFit: 'cover',
                borderRadius: 12,
                opacity: 0.18,
                zIndex: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            />
            <div style={{ position: 'relative', zIndex: 1, width: '100%', textAlign: 'center' }}>
              <h4 className="text-lg font-semibold mb-1">Selected Tarot Cards:</h4>
              <p className="mb-2 text-pink-700">{result.tarotCards?.join(', ')}</p>
              <h4 className="text-lg font-semibold mb-1">Your Input:</h4>
              <p className="mb-4 text-gray-600">{result.note}</p>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#ad1457' }}>Recommendation</h3>
              <p className="mb-2 text-gray-800" style={{ fontSize: 18, textAlign: 'center', whiteSpace: 'pre-line' }}>{result.description}</p>
            </div>
          </div>
        </div>
        <button
          className="px-6 py-2 bg-pink-400 text-white rounded-lg hover:bg-pink-500 transition"
          style={{ marginTop: '-30px', fontWeight: 600, fontSize: 18 }}
          onClick={() => window.location.href = '/input'}
        >
          Try Again
        </button>
        <button
          className="px-6 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
          style={{ marginTop: '18px', fontWeight: 600, fontSize: 18 }}
          onClick={handleAddToCart}
        >
          Add to Shopping Cart
        </button>
      </div>
    </div>
  );
};

export default ResultPage; 