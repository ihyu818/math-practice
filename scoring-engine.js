const ScoringEngine = {
  // 當答對時呼叫，傳入 state 與該題耗時(秒)
  processCorrect: (state, timeSpent) => {
    if (!state.stats) state.stats = { perfectTime: 0, correctedTime: 0, totalTime: 0 };
    
    const isPerfect = (state.attempts === 1);
    state.totalSolved = (state.totalSolved || 0) + 1;
    state.stats.totalTime += timeSpent;

    if (isPerfect) {
      state.totalPerfect = (state.totalPerfect || 0) + 1;
      state.stats.perfectTime += timeSpent;
      state.combo++;
      if (state.combo > state.maxCombo) state.maxCombo = state.combo;
    } else {
      state.totalCorrected = (state.totalCorrected || 0) + 1;
      state.stats.correctedTime += timeSpent;
      state.combo = 0;
    }

    const earn = ScoringEngine.calculateEarn(state.combo, state.hasUsedBack);
    state.score += earn;
    const status = isPerfect ? "Perfect" : state.attempts.toString();
    
    return { earn, status };
  },

  calculateEarn: (combo, hasUsedBack) => {
    if (hasUsedBack) return 1.0;
    let earn = 1 + (0.1 * (combo - 1));
    if (combo > 0 && combo % 3 === 0) earn += 0.01 * Math.pow(2, (combo / 3) - 1);
    return earn;
  }
};


/*
        // scoring-engine.js
        const ScoringEngine = {
          /**
           * 當遊戲判斷「答對」時呼叫此函數
           * @param {Object} state - 遊戲的狀態物件 (需包含 score, combo, maxCombo, hasUsedBack)
           * @returns {number} - 傳回本次獲得的分數 (earn)
           */
/*
          processCorrect: (state) => {
            // 1. 處理 Combo 邏輯
            // 只有在「沒動用 Backspace」的情況下才累計 Combo
            if (state.hasUsedBack) {
              state.combo = 0; 
            } else {
              state.combo++;
              // 自動更新該場遊戲的最高連擊紀錄
              if (state.combo > state.maxCombo) {
                state.maxCombo = state.combo;
              }
            }
            // 2. 計算加分 (套用三倍大獎勵公式)
            const earn = ScoringEngine.calculateEarn(state.combo, state.hasUsedBack);
            // 3. 更新總分
            state.score += earn;
        
            // 將嘗試次數轉化為標籤：1次為 Perfect，其餘為次數數字
            const status = (state.attempts === 1) ? "Perfect" : state.attempts.toString();
            
            return { earn, status };
          },
        
          /**
           * 單純的加分公式演算法
           */
/*
          calculateEarn: (combo, hasUsedBack) => {
            if (hasUsedBack) return 1.0; // 有修改過答案，固定只給 1 分
            
            // 基礎分 1 + 連擊加乘 (每多 1 combo + 0.1)
            let earn = 1 + (0.1 * (combo - 1));
            
            // 每 3 連擊的指數大獎勵 (3, 6, 9...)
            if (combo > 0 && combo % 3 === 0) {
              earn += 0.01 * Math.pow(2, (combo / 3) - 1);
            }
            return earn;
          }
        };
* /
