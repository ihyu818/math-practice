const UIKeyboard = {
  render: (containerId, onPress) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 數字 1-9
    const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3];
    
    container.className = "w-full max-w-sm grid grid-cols-4 gap-2";
    container.innerHTML = `
      <div class="col-span-3 grid grid-cols-3 gap-2">
        
        ${numbers.map(n => `
          <div onclick="window.gamePress('${n}')" 
               class="flex items-center justify-center bg-white border border-slate-200 rounded-xl font-bold text-xl h-14 shadow-sm active:scale-95 transition-all cursor-pointer select-none">
               ${n}
          </div>`).join('')}

        <div onclick="window.gamePress('0')" 
             class="flex items-center justify-center bg-white border border-slate-200 rounded-xl font-bold text-xl h-14 shadow-sm active:scale-95 transition-all cursor-pointer select-none">
             0
        </div>
        <div onclick="window.gamePress('-')" 
             class="flex items-center justify-center bg-blue-50 text-blue-600 border border-blue-100 rounded-xl font-bold text-xl h-14 shadow-sm active:scale-95 transition-all cursor-pointer select-none">
             －
        </div>
        <div onclick="window.gamePress('/')" 
             class="flex items-center justify-center bg-blue-50 text-blue-600 border border-blue-100 rounded-xl font-bold text-xl h-14 shadow-sm active:scale-95 transition-all cursor-pointer select-none">
             /
        </div>
      </div>

      <div class="col-span-1 flex flex-col gap-2">
        <div onclick="window.gamePress('back')" 
             class="flex-1 flex items-center justify-center bg-red-50 text-red-500 border border-red-100 rounded-xl font-bold text-2xl shadow-sm active:scale-95 cursor-pointer select-none">
             ⌫
        </div>
        <div onclick="window.gamePress('*')" 
             class="flex-1 flex items-center justify-center bg-amber-50 text-amber-600 border border-amber-100 rounded-xl font-bold text-2xl shadow-sm active:scale-95 cursor-pointer select-none">
             √
        </div>
      </div>
    `;
    
    window.gamePress = onPress;
  }
};
