import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router' // +
import './style.css'
// 引入 ant-design-vue 样式
import 'ant-design-vue/dist/reset.css'

const app = createApp(App)

setupRouter(app).then(() => {
  app.mount('#app')
})
