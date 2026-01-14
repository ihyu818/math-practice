const SessionManager = {
  // 建立一個閉包變數，確保同一場遊戲 ID 不會變
  _currentSessionId: null,

  getSessionId: () => {
    if (!SessionManager._currentSessionId) {
      SessionManager._currentSessionId = Math.random().toString(36).substring(2, 12).toUpperCase() + 
                                       Math.random().toString(36).substring(2, 12).toUpperCase();
    }
    return SessionManager._currentSessionId;
  },
  
  getName: () => localStorage.getItem('math_lab_name') || 'Guest'
};
