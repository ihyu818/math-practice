const UIKeyboard = {
  render: (containerId, onPress) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const keys = [7, 8, 9, 4, 5, 6, 1, 2, 3, '+', 0, '-'];
    
    container.className = "w-full max-w-sm grid grid-cols-4 gap-2";
    container.innerHTML = `
      <div class="col-span-3 grid grid-cols-3 gap-2">
        ${keys.map(k => `
          <div onclick="window.gamePress('${k}')" 
               class="flex items-center justify-center bg-white border border-slate-200 rounded-xl font-bold text-xl h-14 shadow-sm active:scale-95 transition-all cursor-pointer select-none">
               ${k}
          </div>`).join('')}
      </div>
      <div class="col-span-1 flex flex-col gap-2">
        <div onclick="window.gamePress('back')" 
             class="flex items-center justify-center bg-red-50 text-red-500 rounded-xl font-bold h-14 shadow-sm active:scale-95 cursor-pointer select-none">⌫</div>
        <div onclick="window.gamePress('next')" 
             class="flex items-center justify-center text-white rounded-xl font-black italic uppercase text-lg shadow-lg flex-grow active:scale-95 cursor-pointer select-none"
             style="background-color: var(--theme-color)">Next</div>
      </div>
    `;
    // 將按鍵事件掛載到全域，確保 HTML 的 onclick 能抓到
    window.gamePress = onPress;
  }
};
