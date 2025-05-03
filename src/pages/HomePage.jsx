import React from 'react';

const HomePage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black overflow-hidden">
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