import React from 'react';

const ResultPage = () => {
  // 后续通过 props/context 传入推荐结果
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-yellow-100 to-pink-100">
      <h2 className="text-3xl font-bold mb-6">你的专属蛋糕推荐</h2>
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-2">蛋糕名称</h3>
        <p className="mb-4 text-gray-700">这里显示蛋糕描述、关键词、幸运语等</p>
      </div>
      <button className="px-6 py-2 bg-pink-400 text-white rounded-lg hover:bg-pink-500 transition">再来一次</button>
    </div>
  );
};

export default ResultPage; 