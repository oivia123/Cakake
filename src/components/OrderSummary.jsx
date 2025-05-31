import React from 'react';

const OrderSummary = ({ subtotal, vat, total, onCheckout }) => (
  <div style={{
    background: 'transparent',
    borderRadius: 18,
    padding: '28px 24px',
    minWidth: 320,
    maxWidth: 400,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 10
  }}>
    <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, letterSpacing: 1, textAlign: 'right', background: 'transparent', padding: 0 }}>ORDER SUMMARY</div>
    <div style={{ fontSize: 16, color: '#222', textAlign: 'right', width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
      <span>SUBTOTAL</span>
      <span>${subtotal.toFixed(2)}</span>
    </div>
    <div style={{ fontSize: 16, color: '#222', textAlign: 'right', width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
      <span>V.A.T</span>
      <span>${vat.toFixed(2)}</span>
    </div>
    <div style={{ fontSize: 18, fontWeight: 700, color: '#222', textAlign: 'right', width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: 6, marginBottom: 8 }}>
      <span>TOTAL</span>
      <span>${total.toFixed(2)}</span>
    </div>
    <button
      className="mt-4 px-6 py-2 rounded-lg font-semibold"
      style={{ background: '#ffe082', color: '#1e3a5c', fontSize: 18, fontFamily: 'Cinzel Decorative, serif', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', alignSelf: 'flex-end' }}
      onClick={onCheckout}
    >
      PROCEED TO CHECKOUT
    </button>
  </div>
);

export default OrderSummary; 