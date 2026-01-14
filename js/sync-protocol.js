const SyncProtocol = {
  saveLog: (url, state, p) => {
    const params = new URLSearchParams({
      action: 'save', sessionId: state.sessionId, studentName: state.name, type: state.gameType,
      problem: p.problem, correctAnswer: p.ans, userAnswer: p.userAns,
      isCorrect: p.status, timeSpent: p.ts, score: p.earn, combo: state.combo, keyLog: p.keyLog
    });
    fetch(`${url}?${params.toString()}`, { mode: 'no-cors' });
  },
  saveSummary: (url, state) => {
    const s = state.stats || { perfectTime: 0, correctedTime: 0, totalTime: 0 };
    const avgAll = (state.totalSolved > 0) ? (s.totalTime / state.totalSolved) : 0;
    const avgPerf = (state.totalPerfect > 0) ? (s.perfectTime / state.totalPerfect) : 0;
    const avgCorr = (state.totalCorrected > 0) ? (s.correctedTime / state.totalCorrected) : 0;

    const params = new URLSearchParams({
      action: 'saveSummary',
      sessionId: state.sessionId,
      studentName: state.name,
      type: state.gameType,
      score: state.score.toFixed(2),
      maxCombo: state.maxCombo,
      totalPerfect: state.totalPerfect || 0,
      totalSolved: state.totalSolved || 0,
      totalTimeSpent: s.totalTime.toFixed(2), // 支援固定題數模式的總耗時
      avgTimeAll: avgAll.toFixed(2),
      avgTimePerfect: avgPerf.toFixed(2),
      avgTimeCorrected: avgCorr.toFixed(2)
    });
    fetch(`${url}?${params.toString()}`, { mode: 'no-cors' });
  }
};
