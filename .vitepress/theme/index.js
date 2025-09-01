import DefaultTheme from 'vitepress/theme'
import './custom.css'
import AutoTOC from './components/AutoTOC.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component('AutoTOC', AutoTOC)
  }
}