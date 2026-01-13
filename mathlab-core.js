// mathlab-core.js
const MathLabCore = {
  // --- 模組 1: 會話管理 ---
  generateSessionId: () => {
    return Math.random().toString(36).substring(2, 12).toUpperCase() + 
           Math.random().toString(36).substring(2, 12).toUpperCase();
  },

  // --- 模組 2: 統一數據傳送 ---
  saveData: (url, action, type, sessionId, studentName, additionalParams) => {
    const params = new URLSearchParams({
      action: action,
      type: type,
      sessionId: sessionId,
      studentName: studentName,
      ...additionalParams
    });
    fetch(`${url}?${params.toString()}`, { mode: 'no-cors' });
  },

  // --- 模組 3: 統一計分算法 ---
  calculateEarn: (combo, hasUsedBack) => {
    if (hasUsedBack) return 1.0;
    let earn = 1 + (0.1 * (combo - 1));
    if (combo % 3 === 0 && combo > 0) earn += 0.01 * Math.pow(2, (combo / 3) - 1);
    return earn;
  },

  // --- 模組 4: 虛擬鍵盤與輸入邏輯 ---
  // 這部分會負責監聽鍵盤，並處理 Next/自動補位邏輯
  setupKeyboard: (state, checkAnswerCallback, renderCallback) => {
    // 實體鍵盤監聽
    window.onkeydown = (e) => {
      if (state.mode !== 'play' || state.isAnswerCorrect) return;
      
      if ((e.key >= '0' && e.key <= '9') || e.key === '+' || e.key === '-' || e.key === '/') {
        MathLabCore.handleInput(e.key, state, checkAnswerCallback, renderCallback);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        MathLabCore.handleInput('back', state, checkAnswerCallback, renderCallback);
      } else if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight' || e.key === 'Tab') {
        e.preventDefault();
        MathLabCore.handleInput('next', state, checkAnswerCallback, renderCallback);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (state.currentSlot > 0) { state.currentSlot--; renderCallback(); }
      }
    };
  },

  // 處理按鍵輸入邏輯 (點擊 UI 按鈕也會呼叫這個)
  handleInput: (key, state, checkAnswerCallback, renderCallback) => {
    if (state.isAnswerCorrect) return;

    if (key === 'back') {
      state.hasUsedBack = true;
      if (state.userInputs[state.currentSlot] === "" && state.currentSlot > 0) {
        state.currentSlot--;
      }
      // 支援單個字元刪除或清空
      state.userInputs[state.currentSlot] = state.userInputs[state.currentSlot].toString().slice(0, -1);
    } 
    else if (key === 'next') {
      // 自動補位邏輯
      if (state.userInputs[state.currentSlot] === "") {
        // 這裡需要遊戲端提供判定：這格答案是不是 0
        const isTargetZero = state.checkIsTargetZero ? state.checkIsTargetZero(state.currentSlot) : false;
        if (isTargetZero) {
          state.userInputs[state.currentSlot] = (state.currentSlot % 2 === 0) ? "+" : "0";
        } else {
          return; // 不准跳過
        }
      }
      if (state.currentSlot < state.userInputs.length - 1) {
        state.currentSlot++;
      } else {
        checkAnswerCallback();
      }
    } 
    else {
      // 數字與符號輸入
      if (state.currentSlot % 2 === 0) { // 符號格 (0, 2, ...)
        if (key === '+' || key === '-') {
          state.userInputs[state.currentSlot] = key;
          state.currentSlot++;
        }
      } else { // 數字格 (1, 3, ...)
        if (!isNaN(key)) {
          state.userInputs[state.currentSlot] += key;
          // 數字輸入後是否自動跳下一格？(由 checkAnswerCallback 內部判斷或手動按 Next)
          checkAnswerCallback();
        }
      }
    }
    renderCallback();
  }
};
