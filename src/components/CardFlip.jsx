import React from 'react';
import './CardFlip.css';

// 卡牌编号到英文名称的映射
const tarotNames = [
  '00Fool', '01Magician', '02HighPriestess', '03Empress', '04Emperor', '05Hierophant', '06Lovers', '07Chariot',
  '08Strength', '09Hermit', '10WheelOfFortune', '11Justice', '12HangedMan', '13Death', '14Temperance',
  '15Devil', '16Tower', '17Star', '18Moon', '19Sun', '20Judgement', '21World'
];

function CardFlip({ flipped, onClick, number, ...rest }) {
  // number: 0-21
  let name = tarotNames[number];
  let imgName = name + '.jpg';
  return (
    <div className="card-container" onClick={onClick} {...rest}>
      <div className={`card-inner${flipped ? ' flipped' : ''}`}> 
        {/* 正面：显示图片和名称 */}
        <div className="card-front" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 'bold', color: '#222', background: '#fff', borderRadius: 12 }}>
          <img src={`/asset/image/${imgName}`} alt={name} style={{ width: 59.2, height: 100, objectFit: 'cover', borderRadius: 8 }} />
        </div>
        {/* 背面：统一图片 */}
        <div className="card-back" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eee', borderRadius: 12 }}>
          <img src="/asset/image/back.jpg" alt="card back" style={{ width: 59.2, height: 100, objectFit: 'cover', borderRadius: 8 }} />
        </div>
      </div>
    </div>
  );
}

export default CardFlip; 