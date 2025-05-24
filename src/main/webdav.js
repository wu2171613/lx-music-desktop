const { createClient } = require('webdav')

let client = null

function connectWebDAV({ url, username, password }) {
  client = createClient(url, { username, password })
  // 只获取根目录下音频文件，可根据需求扩展为递归
  return client.getDirectoryContents('/').then(files =>
    files.filter(f => f.type === 'file' && /\.(mp3|flac|wav|m4a)$/i.test(f.basename))
  )
}

function getMusicFileUrl(filePath) {
  if (!client) throw new Error('WebDAV 未连接')
  // 直接返回可播放的 WebDAV 直链
  return client.getFileDownloadLink(filePath)
}

module.exports = { connectWebDAV, getMusicFileUrl }
