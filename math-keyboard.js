const MathKeyboard = {
  init: (state, onCheck, onRender) => {
    window.onkeydown = (e) => {
      if (state.mode !== 'play' || state.isAnswerCorrect) return;
      const valid = ['0','1','2','3','4','5','6','7','8','9','+','-','/'];
      if (valid.includes(e.key)) MathKeyboard.handle(e.key, state, onCheck, onRender);
      else if (e.key === 'Backspace') { e.preventDefault(); MathKeyboard.handle('back', state, onCheck, onRender); }
      else if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') { e.preventDefault(); MathKeyboard.handle('next', state, onCheck, onRender); }
    };
  },
  handle: (key, state, onCheck, onRender) => {
    if (!state.currentKeyLog) state.currentKeyLog = [];
    state.currentKeyLog.push(key);

    if (key === 'back') {
      if (!state.isCorrecting) {
        state.attempts = (state.attempts || 1) + 1;
        state.isCorrecting = true;
        state.hasUsedBack = true;
      }
      if (state.userInputs[state.currentSlot] === "" && state.currentSlot > 0) state.currentSlot--;
      state.userInputs[state.currentSlot] = state.userInputs[state.currentSlot].toString().slice(0, -1);
    } else {
      state.isCorrecting = false;
      if (key === 'next') {
        if (state.userInputs[state.currentSlot] === "") {
          if (state.canAutoFill && state.canAutoFill(state.currentSlot)) {
            state.userInputs[state.currentSlot] = (state.currentSlot % 2 === 0) ? "+" : "0";
          } else return;
        }
        if (state.currentSlot < state.userInputs.length - 1) state.currentSlot++;
        else onCheck();
      } else {
        if (state.currentSlot % 2 === 0) {
          if (key === '+' || key === '-') { state.userInputs[state.currentSlot] = key; state.currentSlot++; }
        } else {
          if (!isNaN(key)) { state.userInputs[state.currentSlot] += key; onCheck(); }
        }
      }
    }
    onRender();
  }
};
