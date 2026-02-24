// js/ui-keyboard-trig.js
const UITrigKeyboard = {
  render(containerId, onKeyPress) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 定義按鍵內容與其代表的數值 (num: 分子, den: 分母)
    const keys = [
      { label: '1/2', num: '1', den: '2' },
      { label: '√3/2', num: '*3', den: '2' },
      { label: '√2/2', num: '*2', den: '2' },
      { label: '√3', num: '*3', den: '1' },
      { label: '1/√3', num: '1', den: '*3' },
      { label: '1', num: '1', den: '1' },
      { label: '0', num: '0', den: '1', span: 1.5 },
      { label: '1', num: '1', den: '1', span: 1.5 }, // 雖然與上面重複，但依照您的配置放入
      { label: '-', type: 'sign', span: 1.5 },
      { label: '無意義', type: 'undefined', span: 1.5 }
    ];

    container.innerHTML = `
      <style>
        .trig-kbd-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr) 70px; /* 三欄值按鈕 + 一欄 70px 倒退鍵 */
          grid-template-rows: repeat(4, 1fr);
          gap: 10px;
          height: 320px;
          user-select: none;
        }
        .kbd-btn {
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.25rem;
          color: #1e293b;
          cursor: pointer;
          transition: all 0.1s;
          box-shadow: 0 4px 0 #e2e8f0;
        }
        .kbd-btn:active {
          transform: translateY(4px);
          box-shadow: 0 0 0 #e2e8f0;
        }
        .kbd-btn.special { background: #f8fafc; color: #64748b; }
        .kbd-btn.back { 
          grid-column: 4; 
          grid-row: 1 / 5; 
          background: #fff1f2; 
          color: #be123c; 
          border-color: #fecdd3;
          box-shadow: 0 4px 0 #fecdd3;
        }
        /* 處理第三、四列平分的 CSS */
        .btn-span-half { grid-column: span 1.5; }
      </style>
      <div class="trig-kbd-grid">
        <div class="kbd-btn" onclick="UITrigKeyboard.press('1/2')">1/2</div>
        <div class="kbd-btn" onclick="UITrigKeyboard.press('√3/2')">√3/2</div>
        <div class="kbd-btn" onclick="UITrigKeyboard.press('√2/2')">√2/2</div>
        <div class="kbd-btn" onclick="UITrigKeyboard.press('√3')">√3</div>
        <div class="kbd-btn" onclick="UITrigKeyboard.press('1/√3')">1/√3</div>
        <div class="kbd-btn" onclick="UITrigKeyboard.press('1')">1</div>
        
        <div class="kbd-btn" style="grid-column: 1 / span 2; margin-right: -50%; transform: scaleX(0.75) translateX(-16%);" onclick="UITrigKeyboard.press('0')">0</div>
        <div class="kbd-btn" style="grid-column: 2 / span 2; margin-left: 25%; transform: scaleX(0.75);" onclick="UITrigKeyboard.press('1')">1</div>

        <div class="kbd-btn special" style="grid-column: 1 / span 2; margin-right: -50%; transform: scaleX(0.75) translateX(-16%);" onclick="UITrigKeyboard.press('-')">－</div>
        <div class="kbd-btn special" style="grid-column: 2 / span 2; margin-left: 25%; transform: scaleX(0.75);" onclick="UITrigKeyboard.press('undefined')">無意義</div>

        <div class="kbd-btn back" onclick="UITrigKeyboard.press('back')">⌫</div>
      </div>
    `;

    // 儲存回呼函式
    this.onKeyPress = onKeyPress;
  },
  
  press(val) {
    if (this.onKeyPress) this.onKeyPress(val);
  }
};
