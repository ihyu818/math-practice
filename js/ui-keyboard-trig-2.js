// js/ui-keyboard-trig.js
const UITrigKeyboard = {
  render(containerId, onKeyPress) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 定義按鍵：label 使用 LaTeX 語法
    const keys = [
      { label: '\\frac{1}{2}', val: '1/2', col: 'span 2' },
      { label: '\\frac{\\sqrt{3}}{2}', val: '√3/2', col: 'span 2' },
      { label: '\\frac{\\sqrt{2}}{2}', val: '√2/2', col: 'span 2' },
      { label: '\\sqrt{3}', val: '√3', col: 'span 2' },
      { label: '\\frac{1}{\\sqrt{3}}', val: '1/√3', col: 'span 2' },
      { label: '1', val: '1', col: 'span 2' },
      { label: '0', val: '0', col: 'span 3' },
      { label: '1', val: '1', col: 'span 3' },
      { label: '－', val: '-', col: 'span 3', isSpecial: true },
      { label: '\\text{無意義}', val: 'undefined', col: 'span 3', isSpecial: true }
    ];

    let html = `
      <style>
        .trig-kbd-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr) 75px;
          grid-template-rows: repeat(4, 1fr);
          gap: 10px;
          height: 320px;
          user-select: none;
        }
        .kbd-btn {
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.1s;
          box-shadow: 0 4px 0 #cbd5e1;
          /* 預留空間給 KaTeX */
          padding: 4px;
          overflow: hidden;
        }
        .kbd-btn:active { transform: translateY(4px); box-shadow: 0 0 0 #cbd5e1; }
        .back-btn {
          grid-column: 7; grid-row: 1 / 5;
          background: #fff1f2; color: #be123c; border-color: #fecdd3;
          box-shadow: 0 4px 0 #fecdd3; font-size: 1.5rem;
        }
        .special-btn { background: #f8fafc; color: #64748b; }
        /* 調整 KaTeX 在按鈕中的縮放，避免分數太擠 */
        .katex { font-size: 1.1em; }
      </style>
      <div class="trig-kbd-grid">
    `;

    keys.forEach((key, index) => {
      html += `<div class="kbd-btn ${key.isSpecial ? 'special-btn' : ''}" 
                    style="grid-column: ${key.col}" 
                    id="kbd-key-${index}"
                    onclick="UITrigKeyboard.press('${key.val}')">
               </div>`;
    });

    // 加入倒退鍵
    html += `<div class="kbd-btn back-btn" onclick="UITrigKeyboard.press('back')">⌫</div></div>`;
    container.innerHTML = html;

    // 渲染 KaTeX
    keys.forEach((key, index) => {
      const el = document.getElementById(`kbd-key-${index}`);
      if (el) {
        katex.render(key.label, el, {
          throwOnError: false,
          displayMode: false // 使用行內模式讓排版較緊湊
        });
      }
    });

    this.onKeyPress = onKeyPress;
  },
  
  press(val) {
    if (this.onKeyPress) this.onKeyPress(val);
  }
};
