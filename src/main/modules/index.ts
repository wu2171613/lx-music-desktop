import registerUserApi from './userApi'
import registerWinMain from './winMain'
import registerHotKey from './hotKey'
import registerTray from './tray'
import registerAppMenu from './appMenu'
import registerWinLyric from './winLyric'
import registerCommonRenderers from './commonRenderers'
import registerWebDAV from './webdav'

let isRegistered = false
export default () => {
  if (isRegistered) return
  registerUserApi()
  registerCommonRenderers()
  registerWinMain()
  registerHotKey()
  registerTray()
  registerAppMenu()
  registerWinLyric()
  registerWebDAV()
  isRegistered = true
}
