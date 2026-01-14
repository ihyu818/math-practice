const UIHeader = {
  // 從網址獲取顏色並注入 CSS 變數 (放在這或獨立皆可，建議放在 Header 初始化時跑一次)
  initTheme: () => {
    const params = new URLSearchParams(window.location.search);
    const mainColor = params.get('c1') || '#3b82f6'; 
    const lightColor = params.get('c2') || '#eff6ff';
    document.documentElement.style.setProperty('--theme-color', mainColor);
    document.documentElement.style.setProperty('--theme-bg-light', lightColor);
  },

  render: (containerId, state) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const timePercent = (state.timeLeft / 120) * 100;
    const comboScale = state.combo > 1 ? 'scale-110' : 'scale-100';

    container.innerHTML = `
      <div class="w-full bg-gray-200 h-1.5 rounded-full mb-4 overflow-hidden">
        <div id="timer-bar" class="h-full transition-all duration-500" 
             style="width: ${timePercent}%; background-color: var(--theme-color); filter: brightness(0.8);"></div>
      </div>
      <div class="w-full grid grid-cols-3 items-center mb-6 px-1">
        <div class="text-left">
          <div class="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Student</div>
          <div class="text-xs font-bold text-slate-600 truncate">${state.name}</div>
        </div>
        <div class="text-center">
          <div class="text-[9px] text-slate-400 uppercase font-bold">Score</div>
          <div class="text-2xl font-black" style="color: var(--theme-color); filter: brightness(0.8);">${state.score.toFixed(1)}</div>
        </div>
        <div class="text-right">
          <div class="text-[9px] text-slate-400 uppercase font-bold">Combo</div>
          <div class="text-2xl font-black text-orange-500 transition-transform ${comboScale}">
            ${state.combo > 0 ? '🔥 ' + state.combo : '0'}
          </div>
        </div>
      </div>
    `;
  }
};
