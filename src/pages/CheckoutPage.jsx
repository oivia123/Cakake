import React from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-pink-50" style={{ position: 'relative', fontFamily: 'Cinzel Decorative, serif' }}>
      {/* Return to Cart Button */}
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
        onClick={() => navigate('/cart')}
        aria-label="Return to Shopping Cart"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B4513" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
      </button>
      {/* 感谢卡片绝对居中 */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: 'calc(50% + 350px)',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        background: 'rgba(255,255,255,0.85)',
        borderRadius: 24,
        boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
        padding: '48px 56px',
        width: 600,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 420
      }}>
        <img
          src="/asset/image/cake-thankyou.png"
          alt="Thank you cake"
          style={{ width: 120, height: 120, objectFit: 'contain', margin: '0 auto 24px auto', display: 'block', borderRadius: 18, boxShadow: '0 2px 12px rgba(255,192,203,0.12)' }}
          onError={e => { e.target.style.display = 'none'; }}
        />
        <h2 className="text-4xl font-extrabold mb-4" style={{ color: '#ad1457', fontSize: 38, letterSpacing: 1 }}>Thank You for Shopping With Us!</h2>
        <p className="text-lg mb-6" style={{ color: '#5d4037', fontSize: 20, lineHeight: 1.7 }}>
          Your magical cake journey is complete.<br/>
          We hope our tarot-inspired dessert brings you joy and a touch of wonder.<br/>
          <br/>
          If you have any questions or want to start a new divination, you're always welcome back!
        </p>
        <button
          className="px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-pink-200 transition"
          style={{ background: '#ffe082', color: '#ad1457', fontSize: 22, fontFamily: 'Cinzel Decorative, serif', marginTop: 12 }}
          onClick={() => navigate('/')}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage; 