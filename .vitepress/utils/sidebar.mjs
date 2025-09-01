import fs from 'fs'
import path from 'path'

/**
 * 自动生成侧边栏配置
 * @param {string} docsPath 文档根目录
 * @returns {Array} 侧边栏配置
 */
export function generateSidebar(docsPath = './') {
  const sidebar = []
  
  // 单独的开始章节
  sidebar.push({
    text: '开始',
    link: '/text/index'
  })
  
  // 四个可折叠组
  const groups = [
    { name: '待定1', items: [] },
    { name: '待定2', items: [] },
    { name: '待定3', items: [] },
    { name: '待定4', items: [] }
  ]
  
  groups.forEach(group => {
    sidebar.push({
      text: group.name,
      collapsed: true,
      items: group.items
    })
  })
  
  return sidebar
}

/**
 * 从Markdown文件提取标题
 * @param {string} filePath 文件路径
 * @returns {Array} 标题数组
 */
export function extractHeadings(filePath) {
  if (!fs.existsSync(filePath)) return []
  
  const content = fs.readFileSync(filePath, 'utf-8')
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings = []
  let match
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const title = match[2].trim()
    const anchor = title
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
      .replace(/\s+/g, '-')
    
    headings.push({
      level,
      title,
      anchor: `#${anchor}`
    })
  }
  
  return headings
}

/**
 * 生成目录结构
 * @param {Array} headings 标题数组
 * @returns {Array} 目录结构
 */
export function generateTOC(headings) {
  const toc = []
  const stack = []
  
  headings.forEach(heading => {
    const item = {
      text: heading.title,
      link: heading.anchor,
      items: []
    }
    
    // 找到合适的父级
    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop()
    }
    
    if (stack.length === 0) {
      toc.push(item)
    } else {
      stack[stack.length - 1].items.push(item)
    }
    
    stack.push({
      ...item,
      level: heading.level
    })
  })
  
  return toc
}

/**
 * 自动扫描文档目录并生成侧边栏
 * @param {string} basePath 基础路径
 * @param {string} relativePath 相对路径
 * @returns {Array} 侧边栏项目
 */
export function autoGenerateItems(basePath, relativePath = '') {
  const fullPath = path.join(basePath, relativePath)
  const items = []
  
  if (!fs.existsSync(fullPath)) return items
  
  const files = fs.readdirSync(fullPath, { withFileTypes: true })
  
  files.forEach(file => {
    if (file.isDirectory()) {
      // 递归处理子目录
      const subItems = autoGenerateItems(basePath, path.join(relativePath, file.name))
      if (subItems.length > 0) {
        items.push({
          text: file.name,
          collapsed: false,
          items: subItems
        })
      }
    } else if (file.name.endsWith('.md') && file.name !== 'index.md') {
      const fileName = file.name.replace('.md', '')
      const filePath = path.join(fullPath, file.name)
      const headings = extractHeadings(filePath)
      
      // 读取文件第一行作为标题
      let title = fileName
      try {
        const content = fs.readFileSync(filePath, 'utf-8')
        const firstLine = content.split('\n')[0]
        if (firstLine.startsWith('#')) {
          title = firstLine.replace(/^#+\s*/, '')
        }
      } catch (e) {
        // 使用默认标题
      }
      
      const linkPath = relativePath ? 
        `/text/${relativePath}/${fileName}`.replace(/\\/g, '/') : 
        `/text/${fileName}`
      
      items.push({
        text: title,
        link: linkPath,
        headings: headings.length > 1 ? generateTOC(headings.slice(1)) : [] // 排除第一个标题
      })
    }
  })
  
  return items
}