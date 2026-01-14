// session-manager.js
const SessionManager = {
  // 產生 20 碼唯一遊戲 ID
  generateId: () => {
    return Math.random().toString(36).substring(2, 12).toUpperCase() + 
           Math.random().toString(36).substring(2, 12).toUpperCase();
  },
  // 從本地儲存獲取姓名
  getName: () => localStorage.getItem('math_lab_name') || 'Guest'
};
