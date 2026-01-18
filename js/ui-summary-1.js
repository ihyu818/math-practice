const UISummary = {
  render: (containerId, state) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 從網址抓取符號
    const params = new URLSearchParams(window.location.search);
    const symbol = params.get('s') || '±'; 

    const accuracy = state.totalProblems > 0 
      ? ((state.perfectCorrect / state.totalProblems) * 100).toFixed(1) 
      : "0.0";
    const avgSpeed = state.totalProblems > 0 
      ? (state.totalTimeSpent / state.totalProblems).toFixed(2) 
      : "0.00";

    container.innerHTML = `
      <div class="min-h-screen flex items-center justify-center p-4 bg-slate-100 relative overflow-hidden">
        
        <div class="absolute top-6 left-6 flex flex-col gap-2 z-10">
          <button onclick="location.reload()" 
                  class="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur shadow-sm border border-slate-200 rounded-xl text-sm font-black text-slate-700 active:scale-95 transition-all">
            <span class="text-lg">↺</span> 再次挑戰
          </button>
          <button onclick="location.href='index.html'" 
                  class="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur shadow-sm border border-slate-200 rounded-xl text-sm font-bold text-slate-400 active:scale-95 transition-all">
            Home
          </button>
        </div>

        <div class="bg-white p-10 rounded-[3rem] shadow-2xl w-full max-w-sm text-center border-b-[12px]" style="border-color: var(--theme-color, #2563eb)">
          
          <div class="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-3xl text-4xl font-black shadow-inner" 
               style="background-color: var(--theme-bg-light, #eff6ff); color: var(--theme-color, #2563eb)">
            ${symbol}
          </div>
          
          <div class="text-sm font-black italic uppercase text-slate-400 tracking-widest mb-1">Final Score</div>
          <div class="text-6xl font-black mb-2 break-all leading-none" style="color: var(--theme-color, #2563eb)">
            ${state.score.toFixed(2)}
          </div>
          <div class="text-lg font-bold text-slate-500 mb-8">${state.name}</div>
          
          <div class="space-y-4 text-left bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
            <div class="flex justify-between items-center">
              <span class="text-slate-400 font-bold text-sm">總答題數</span>
              <span class="text-slate-800 font-black text-2xl">${state.totalProblems}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-400 font-bold text-sm">最高連擊</span>
              <span class="text-orange-500 font-black text-2xl">${state.maxCombo}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-400 font-bold text-sm">一次到位率</span>
              <span class="text-slate-800 font-black text-2xl">${accuracy}%</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-400 font-bold text-sm">平均答對速度</span>
              <span class="font-black text-2xl" style="color: var(--theme-color, #2563eb)">${avgSpeed} <small class="text-xs">s</small></span>
            </div>
          </div>
        </div>
      </div>`;
  }
};
