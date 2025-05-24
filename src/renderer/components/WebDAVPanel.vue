<template>
  <div class="webdav-panel">
    <h2>WebDAV 音乐播放</h2>
    <form @submit.prevent="onConnect">
      <div>
        <label>服务器地址</label>
        <input v-model="serverUrl" placeholder="https://example.com/webdav/" required />
      </div>
      <div>
        <label>用户名</label>
        <input v-model="username" placeholder="用户名" />
      </div>
      <div>
        <label>密码</label>
        <input v-model="password" type="password" placeholder="密码" />
      </div>
      <button type="submit" :disabled="connecting">{{ connecting ? '连接中...' : '连接' }}</button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>

    <div v-if="connected">
      <h3>音乐文件列表</h3>
      <ul>
        <li v-for="file in musicFiles" :key="file.filename">
          <span>{{ file.basename }}</span>
          <button @click="playMusic(file)">播放</button>
        </li>
      </ul>
      <div v-if="musicFiles.length === 0">暂无音乐文件</div>
    </div>

    <audio ref="audio" v-if="audioUrl" controls style="width: 100%; margin-top: 20px" :src="audioUrl" @ended="audioUrl = ''"></audio>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const serverUrl = ref('')
const username = ref('')
const password = ref('')
const connecting = ref(false)
const connected = ref(false)
const error = ref('')
const musicFiles = ref([])
const audioUrl = ref('')

function onConnect() {
  connecting.value = true
  error.value = ''
  // 兼容 Electron 环境判断
  if (!window.electron?.ipcRenderer) {
    error.value = '当前环境不支持 WebDAV 连接（请在桌面客户端使用）'
    connecting.value = false
    return
  }
  window.electron.ipcRenderer.invoke('webdav-connect', {
    url: serverUrl.value,
    username: username.value,
    password: password.value,
  }).then(files => {
    musicFiles.value = files
    connected.value = true
    connecting.value = false
  }).catch(err => {
    error.value = err.message || '连接失败'
    connecting.value = false
  })
}

function playMusic(file) {
  // 兼容 Electron 环境判断
  if (!window.electron?.ipcRenderer) {
    error.value = '当前环境不支持 WebDAV 播放（请在桌面客户端使用）'
    return
  }
  window.electron.ipcRenderer.invoke('webdav-get-music-url', file.filename).then(url => {
    audioUrl.value = url
  }).catch(err => {
    error.value = err.message || '播放失败'
  })
}
</script>

<style scoped>
.webdav-panel {
  max-width: 400px;
  margin: 0 auto;
  padding: 24px;
  background: #222c;
  border-radius: 12px;
  box-shadow: 0 2px 8px #0002;
}
.webdav-panel label {
  display: block;
  margin-bottom: 4px;
}
.webdav-panel input {
  width: 100%;
  margin-bottom: 12px;
  padding: 6px 8px;
  border-radius: 4px;
  border: 1px solid #666;
  background: #222;
  color: #fff;
}
.webdav-panel button {
  margin-left: 8px;
}
.error {
  color: #e55;
  margin-top: 8px;
}
</style>
