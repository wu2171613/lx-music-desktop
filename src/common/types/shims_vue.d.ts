// declare module '*.vue' {
//   import { App } from 'vue'
//   export default App.Component
// }

declare module '*.vue' {
  import { type Component } from 'vue'
  const component: Component
  export default component
}

import { EventEmitter } from 'events';
declare global {
  interface Window {
    EventEmitter: typeof EventEmitter
  }
}
