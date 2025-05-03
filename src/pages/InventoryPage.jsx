import React from 'react';

const InventoryPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">商家库存录入</h2>
      <form className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="mb-4">
          <label className="block font-semibold mb-2">缺货原料（逗号分隔）</label>
          <input type="text" className="w-full border rounded px-3 py-2" placeholder="如：草莓, 奶油" />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">可制作蛋糕（逗号分隔）</label>
          <input type="text" className="w-full border rounded px-3 py-2" placeholder="如：芒果慕斯蛋糕, 无麸质巧克力蛋糕" />
        </div>
        <button className="px-6 py-2 bg-pink-400 text-white rounded-lg hover:bg-pink-500 transition">提交</button>
      </form>
    </div>
  );
};

export default InventoryPage; 