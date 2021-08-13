// 获取浏览器内置对象window
let win = window;
// 获取html根元素
let docEl = document.getElementsByTagName("html")[0];
// 设计稿的宽度
let designWidth = 1920;
// 定时器
let tid;
// 监听resize事件，刷新rem布局
win.addEventListener(
  "resize",
  function() {
    // 防止执行两次
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 300);
  },
  false
);

// 刷新rem布局
function refreshRem() {
  // 浏览器视窗的宽度
  let innerWidth = window.innerWidth;
  // 1rem = 100px转换
  let rem = (innerWidth * 100) / designWidth;
  // 重新给html的font-size属性赋值
  docEl.style.fontSize = rem + "px";
}
refreshRem();
