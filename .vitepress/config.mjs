import { defineConfig } from 'vitepress'
import { generateSidebar, autoGenerateItems } from './utils/sidebar.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Xiao to Future",
  description: "筱言浅语",
  lang: 'zh-CN', // 语言
  base: '/note-to-study/', // ⬅️ 非常重要！部署到 GitHub Pages 时的基础路径

  //主题配置
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    //顶部导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '开始', link: '/text/index' }
    ],

    //侧边栏 - 使用自动生成功能
    sidebar: [
      // 单独的开始章节
      { text: '开始', link: '/text/index' },

      // 三个可折叠组
      {
        text: '房子，伴侣，城市。',
        collapsed: false,
        items: autoGenerateItems('./text', 'chapter1-Upward')
      },
      {
        text: '生成式英语',
        collapsed: false,
        items: autoGenerateItems('./text', 'chapter2-eng')
      },
      {
        text: '技术相关',
        collapsed: false,
        items: autoGenerateItems('./text', 'chapter3-technology')
      },
      {
        text: 'AI 工作流',
        collapsed: false,
        items: autoGenerateItems('./text', 'chapter4-n8n')
      },
      {
        text: '思考迭代',
        collapsed: false,
        items: autoGenerateItems('./text', 'chapter5-update')
      },
      {
        text: '代码笔记',
        collapsed: false,
        items: autoGenerateItems('./text', 'chapter6-code')
      },
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
    },

    // 自动生成目录
    outline: {
      level: [2, 6],
      label: '目录'
    }
  }
})
