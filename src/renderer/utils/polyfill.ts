// 此文件用于提供全局对象的兼容性 polyfill

// 立即执行的函数表达式，确保在模块加载时执行
(function() {
  // 确保全局对象在渲染进程中可用
  if (typeof window !== 'undefined') {
    // 对于渲染进程
    window.global = window;
    window.process = window.process || { env: {} };
    window.Buffer = window.Buffer || {
      from: (data: any) => data,
      isBuffer: () => false
    };
  }
})();

export default {};
