import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Xiao to Future",
  description: "筱言浅语",
  lang: 'zh-CN', // 语言
  base: '/note-to-study/', // ⬅️ 非常重要！部署到 GitHub Pages 时的基础路
  
  //主题配置
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    //顶部导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/markdown-examples' }
    ],

    //侧边栏
    sidebar: [
      // 这是一个例子，路径要和你 docs 文件夹下的文件结构对应
      '/text/' [
        {
          text: '文档',
          collapsed: false, // 默认是否折叠
          items: [
            { text: '1.1开始', link: '/text/chapter1/1-start' },
            { text: 'Runtime API Examples', link: '/api-examples' }
          ]
        },
        {
          text: '第二章：使用数据构造抽象',
          collapsed: true,
          items: [
            // ...
          ]
        }
      ]
    ],

    // 右上角的社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    // 搜索功能
    search: {
      provider: 'local' // 使用本地搜索，更高级的可以用 algolia
    },

    // 页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Your Name'
    }
  }
})
