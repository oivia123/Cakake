import React from 'react';

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-pink-400 border-solid mb-8"></div>
      <p className="text-xl text-gray-700">正在为你生成专属蛋糕推荐…</p>
    </div>
  );
};

export default LoadingPage; 