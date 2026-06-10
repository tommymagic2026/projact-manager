// 请将下方的内容替换为你在 Supabase 后台 API 页面复制的实际值
const SUPABASE_URL = "https://ykijfxxbhdnutqlloxuv.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlraWpmeHhiaGRudXRxbGxveHV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MDg3MDgsImV4cCI6MjA5NjQ4NDcwOH0.JR67KI4UfhhQLL8mekOfLNsndLsS7TZe2IH3SMPXjLQ";

// 初始化 Supabase 客户端
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 统一封装一层用户状态感知（沿用原系统的会话控制逻辑，但数据可由服务器校验）
function getCurrentUser() {
    const u = localStorage.getItem('zy_current_user');
    return u ? JSON.parse(u) : null;
}
function setCurrentUser(user) {
    if(user) localStorage.setItem('zy_current_user', JSON.stringify(user));
    else localStorage.removeItem('zy_current_user');
}
function logout() {
    setCurrentUser(null);
    alert('已退出登录！');
    // 根据当前页面层级跳转
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        window.location.reload();
    } else {
        window.location.href = 'index.html';
    }
}