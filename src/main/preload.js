const { contextBridge, ipcRenderer } = require('electron')

// 暴露 API 给渲染进程
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer
})

// 创建一个简化版的 require 函数，只允许加载某些特定模块
const nodeModules = {
  path: require('path'),
  fs: require('fs'),
  crypto: require('crypto'),
  events: require('events'),
  stream: require('stream'),
  util: require('util'),
  os: require('os')
}

contextBridge.exposeInMainWorld('node', {
  // 提供对某些 Node.js 模块的访问
  modules: nodeModules,
  // 全局对象
  process: {
    platform: process.platform,
    env: process.env,
    versions: process.versions
  },
  // Buffer
  Buffer: {
    from: (...args) => Buffer.from(...args),
    isBuffer: (obj) => Buffer.isBuffer(obj),
    alloc: (...args) => Buffer.alloc(...args)
  }
})

// 在全局范围中加入常用变量
window.global = window
