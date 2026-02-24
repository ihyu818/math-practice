// js/ui-keyboard-trig.js
const UITrigKeyboard = {
  render(containerId, onKeyPress) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 關鍵修正：加入 \displaystyle 讓分數變大
    const keys = [
      { label: '\\displaystyle \\frac{1}{2}', val: '1/2', col: 'span 2', bg: '#ffffff' },
      { label: '\\displaystyle \\frac{\\sqrt{3}}{2}', val: '√3/2', col: 'span 2', bg: '#ffffff' },
      { label: '\\displaystyle \\frac{\\sqrt{2}}{2}', val: '√2/2', col: 'span 2', bg: '#ffffff' },
      { label: '\\displaystyle \\sqrt{3}', val: '√3', col: 'span 2', bg: '#f8fafc' },
      { label: '\\displaystyle \\frac{1}{\\sqrt{3}}', val: '1/√3', col: 'span 2', bg: '#f8fafc' },
      { label: '\\displaystyle 1', val: '1', col: 'span 2', bg: '#f8fafc' },
      { label: '0', val: '0', col: 'span 3', bg: '#f0f9ff', color: '#0369a1' },
      { label: '1', val: '1', col: 'span 3', bg: '#f0f9ff', color: '#0369a1' },
      { label: '－', val: '-', col: 'span 3', bg: '#f1f5f9', color: '#475569' },
      { label: '\\text{無意義}', val: 'undefined', col: 'span 3', bg: '#f1f5f9', color: '#475569' }
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
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.1s;
          box-shadow: 0 4px 0 #cbd5e1;
          padding: 4px;
        }
        .kbd-btn:active { transform: translateY(4px); box-shadow: 0 0 0 #cbd5e1; }
        
        /* 強化 KaTeX 字體大小 */
        .kbd-btn .katex { font-size: 1.4em !important; } 

        .back-btn {
          grid-column: 7; grid-row: 1 / 5;
          background: #fff1f2; color: #be123c; border-color: #fecdd3;
          box-shadow: 0 4px 0 #fecdd3; font-size: 1.8rem;
        }
      </style>
      <div class="trig-kbd-grid">
    `;

    keys.forEach((key, index) => {
      html += `<div class="kbd-btn" 
                    style="grid-column: ${key.col}; background: ${key.bg}; color: ${key.color || 'inherit'};" 
                    id="kbd-key-${index}"
                    onclick="UITrigKeyboard.press('${key.val}')">
               </div>`;
    });

    html += `<div class="kbd-btn back-btn" onclick="UITrigKeyboard.press('back')">⌫</div></div>`;
    container.innerHTML = html;

    // 渲染 KaTeX
    keys.forEach((key, index) => {
      const el = document.getElementById(`kbd-key-${index}`);
      if (el) {
        katex.render(key.label, el, { throwOnError: false, displayMode: false });
      }
    });

    this.onKeyPress = onKeyPress;
  },
  
  press(val) {
    if (this.onKeyPress) this.onKeyPress(val);
  }
};
