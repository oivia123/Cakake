import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardFlip from '../components/CardFlip';
import '../components/CardFlip.css';
import { generateCakeDescription } from '../api/generateCakeDescription';
import { allCakes } from '../utils/cakeOptions';

const CARD_COUNT = 22;
const CARDS_PER_ROW = 11;

// 洗牌算法
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 塔罗牌编号到英文名映射
const tarotCardMap = [
  "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor", "The Hierophant", "The Lovers", "The Chariot",
  "Strength", "The Hermit", "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
  "The Devil", "The Tower", "The Star", "The Moon", "The Sun", "Judgement", "The World"
];

const UserInputPage = () => {
  const navigate = useNavigate();
  // 生成0-21编号并洗牌
  const [cardOrder] = useState(() => shuffle(Array.from({ length: CARD_COUNT }, (_, i) => i)));
  // flipped[i] 表示第i张牌是否已翻开
  const [flipped, setFlipped] = useState(Array(CARD_COUNT).fill(false));
  // 已翻开的牌索引
  const [selected, setSelected] = useState([]);
  // 输入框内容（过敏信息）
  const [inputValue, setInputValue] = useState('');
  // 新增 pendingSummary 用于缓存待发送的内容
  const [pendingSummary, setPendingSummary] = useState(null);
  // 控制卡牌区淡入
  const [showCards, setShowCards] = useState(false);

  const handleFlip = (i) => {
    if (flipped[i] || selected.length >= 3) return;
    const newFlipped = [...flipped];
    newFlipped[i] = true;
    setFlipped(newFlipped);
    setSelected([...selected, i]);
  };

  // 计算U型扇形排布角度
  const getFanStyle = (row, idx) => {
    const total = CARDS_PER_ROW;
    const baseAngle = 60;
    const startAngle = -baseAngle / 2;
    const step = baseAngle / (total - 1);
    const angle = startAngle + idx * step;
    const radius = 340;
    // 透视角度统一为 65 度
    const tilt = 65;
    return {
      position: 'absolute',
      left: `calc(50% - 22.5px)`,
      top: row === 0 ? '45%' : '55%',
      transform:
        `rotate(${angle}deg) translateY(${radius}px) rotate(${-angle}deg) rotateX(${tilt}deg)`
    };
  };

  // 选中的三张卡的信息
  const selectedCards = selected.map(idx => ({
    idx,
    number: cardOrder[idx],
    navy: idx >= CARDS_PER_ROW
  }));

  // 飘出动画的触发状态
  const showFloating = selected.length === 3;

  // 生成 summary
  const handleGenerateSummary = () => {
    if (selectedCards.length === 3) {
      // 缓存输入内容和选中卡牌，为后续 API 调用做准备
      setPendingSummary({
        cards: selectedCards.map(card => card.number),
        allergies: inputValue.split(/[，,、\s]+/).filter(Boolean), // 过敏信息数组
        note: inputValue // 也可作为备注传递
      });
    }
  };

  useEffect(() => {
    if (pendingSummary) {
      const tarotCards = pendingSummary.cards.map(idx => tarotCardMap[idx]);
      const allergies = pendingSummary.allergies;

      // 根据过敏原过滤蛋糕列表
      const filteredCakes = allCakes
        .filter(cake => !allergies.some(a => cake.contains.includes(a.toLowerCase())))
        .map(cake => cake.name);

      // 组装 inventory 信息
      const inventory = {
        missingIngredients: [], // 你可以根据其他逻辑动态生成
        availableCakes: filteredCakes
      };

      generateCakeDescription({ tarotCards, allergies, inventory })
        .then(description => {
          navigate('/result', {
            state: {
              result: {
                description,
                tarotCards,
                note: pendingSummary.note
              }
            }
          });
        });
    }
  }, [pendingSummary, navigate]);

  useEffect(() => {
    // 用 setTimeout 确保初始渲染为 opacity 0
    const timer = setTimeout(() => setShowCards(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Top Bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: 60, background: 'transparent', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
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
          onClick={() => navigate('/cart')}
        >
          Shopping Cart
        </button>
      </div>
      {/* 返回按钮，绝对定位在左上角，zIndex更高 */}
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
      <div
        className="relative flex flex-col items-center justify-center"
        style={{
          width: '90vw',
          height: '90vh',
          maxWidth: '1200px',
          maxHeight: '90vh',
        }}
      >
        {/* 背景图片绝对定位填满容器 */}
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
        {/* 扇形排布的卡牌，带编号和洗牌效果 */}
        <div
          className="relative z-10"
          style={{
            width: 900,
            height: 600,
            perspective: 1200,
            perspectiveOrigin: '50% 90%',
            marginTop: 20,
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: showCards ? 1 : 0,
            transition: 'opacity 1.5s cubic-bezier(0.4,0,0.2,1)'
          }}
        >
          {/* 上弧（U型） */}
          {Array.from({ length: CARDS_PER_ROW }).map((_, i) => {
            const cardIdx = i;
            const cardNum = cardOrder[cardIdx];
            // 飘出时隐藏已选三张卡，否则正常显示
            if (showFloating && selected.includes(cardIdx)) return null;
            return (
              <div key={i} style={getFanStyle(0, i)}>
                <CardFlip flipped={flipped[cardIdx]} onClick={() => handleFlip(cardIdx)} number={cardNum} data-testid="card-btn" />
              </div>
            );
          })}
          {/* 下弧（U型，藏蓝色） */}
          {Array.from({ length: CARDS_PER_ROW }).map((_, i) => {
            const cardIdx = i + CARDS_PER_ROW;
            const cardNum = cardOrder[cardIdx];
            if (showFloating && selected.includes(cardIdx)) return null;
            return (
              <div key={cardIdx} style={getFanStyle(1, i)}>
                <CardFlip flipped={flipped[cardIdx]} onClick={() => handleFlip(cardIdx)} number={cardNum} data-testid="card-btn">
                  <div className="card-back navy" />
                </CardFlip>
              </div>
            );
          })}
        </div>
        {/* 三张已选卡牌飘出来并列展示，带放大和渐出动画，第二张居中 */}
        {showFloating && (
          <div className="z-20 flex flex-row items-center justify-center fadein-cards" style={{ position: 'absolute', left: 0, right: 0, top: '50%', margin: '0 auto', transform: 'translateY(-50%)', width: '100%' }}>
            {[0, 1, 2].map((pos) => {
              const card = selectedCards[pos];
              if (!card) return null;
              // 计算每张卡的横向偏移，第二张居中，第一张左，第三张右
              const offset = (pos - 1) * 180; // 180px 间距
              return (
                <div
                  key={card.idx}
                  style={{
                    transition: 'transform 1.2s cubic-bezier(0.4,1.4,0.6,1)',
                    transform: `translateX(${offset}px) scale(2.2)`,
                    willChange: 'transform',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CardFlip flipped={true} number={card.number} data-testid="card-btn">
                    {card.navy && <div className="card-back navy" />}
                  </CardFlip>
                </div>
              );
            })}
          </div>
        )}
        {/* 三张卡下方文本输入框 */}
        {showFloating && (
          <div className="z-30 flex flex-col items-center justify-center w-full" style={{ position: 'absolute', left: '50%', top: 'calc(50% + 180px)', transform: 'translate(-50%, 0)', margin: 0, alignItems: 'center' }}>
            <input
              className="rounded-lg px-4 py-2 text-lg border-2 border-pink-300 focus:outline-none focus:border-pink-500 bg-white bg-opacity-80 shadow mx-auto"
              style={{ minWidth: 240, maxWidth: 400, display: 'block' }}
              type="text"
              placeholder="Enter your allergies or dietary restrictions"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />
            {/* Generate Summary Button */}
            <button
              className="mt-6 px-8 py-3 bg-pink-400 text-white rounded-lg shadow-lg hover:bg-pink-500 transition text-lg font-semibold"
              style={{ minWidth: 200, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
              onClick={handleGenerateSummary}
            >
              Generate Summary
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInputPage; 