import { ipcMain } from 'electron'
const webdav = require('../webdav')

export default function registerWebDAV() {
  ipcMain.handle('webdav-connect', async (_event, config) => {
    try {
      return await webdav.connectWebDAV(config)
    } catch (err: any) {
      throw new Error(err.message || 'WebDAV 连接失败')
    }
  })
  ipcMain.handle('webdav-get-music-url', async (_event, filePath) => {
    try {
      return await webdav.getMusicFileUrl(filePath)
    } catch (err: any) {
      throw new Error(err.message || '获取音乐链接失败')
    }
  })
}
