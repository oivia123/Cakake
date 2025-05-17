import React from 'react';
import { useLocation } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const result = location.state?.result;

  if (!result) return <div>No recommendation available.</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-yellow-100 to-pink-100">
      <h2 className="text-3xl font-bold mb-6">Your Personalized Cake Recommendation</h2>
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6 w-full max-w-md">
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-1">Selected Tarot Cards:</h4>
          <p className="mb-2 text-pink-700">{result.tarotCards?.join(', ')}</p>
          <h4 className="text-lg font-semibold mb-1">Your Input:</h4>
          <p className="mb-2 text-gray-600">{result.note}</p>
        </div>
        <h3 className="text-xl font-semibold mb-2">Recommendation</h3>
        <p className="mb-4 text-gray-700">{result.description}</p>
      </div>
      <button className="px-6 py-2 bg-pink-400 text-white rounded-lg hover:bg-pink-500 transition" onClick={() => window.location.href = '/input'}>Try Again</button>
    </div>
  );
};

export default ResultPage; 