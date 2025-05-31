import React, { useState } from 'react';

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Top Bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: 60, background: 'transparent', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <button
          style={{
            marginRight: 32,
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'rgba(255,228,225,0.85)',
            color: '#8B4513',
            border: 'none',
            fontWeight: 700,
            fontSize: 24,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}
          aria-label="About"
          onClick={() => setShowModal(true)}
        >
          ?
        </button>
      </div>
      {/* About Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.35)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 18,
            padding: '36px 32px',
            maxWidth: 420,
            width: '90vw',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            position: 'relative',
            fontFamily: 'Cinzel Decorative, serif',
            color: '#1e3a5c',
            textAlign: 'left',
          }}>
            <button
              style={{
                position: 'absolute',
                top: 12,
                right: 16,
                background: 'none',
                border: 'none',
                fontSize: 24,
                color: '#8B4513',
                cursor: 'pointer',
                fontWeight: 700
              }}
              aria-label="Close"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12 }}>About This Website</h2>
            <p style={{ fontSize: 17, marginBottom: 10 }}>
              Welcome to our Tarot Cake Recommendation site!<br/>
              Draw three tarot cards, enter your allergies, and receive a poetic, mystical cake suggestion just for you.<br/>
              <br/>
              <b>How to use:</b><br/>
              1. Click <b>Start Divination</b> to begin.<br/>
              2. Flip three tarot cards.<br/>
              3. Enter any allergies or dietary restrictions.<br/>
              4. Get your personalized cake recommendation and add it to your cart!<br/>
              <br/>
              Enjoy your magical dessert journey!
            </p>
          </div>
        </div>
      )}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: '90vw',
          height: '90vh',
          maxWidth: '1200px',
          maxHeight: '90vh',
        }}
      >
        <img
          src="/asset/image/tar.png"
          alt="背景"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            zIndex: 0,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
          draggable={false}
        />
        <button
          style={{
            position: 'absolute',
            left: '50%',
            top: '80%',
            transform: 'translate(-50%, -50%)',
            padding: '1.2rem 5rem',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            backgroundColor: 'rgba(255, 228, 225, 0.8)',
            color: '#8B4513',
            border: 'none',
            borderRadius: '50px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
            cursor: 'pointer',
            zIndex: 2,
          }}
          onClick={() => window.location.href = '/input'}
        >
          Start Divination
        </button>
      </div>
    </div>
  );
};

export default HomePage; 