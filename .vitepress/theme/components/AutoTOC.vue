<template>
  <div v-if="headings.length > 0" class="custom-toc">
    <h4>本章目录</h4>
    <ul>
      <li v-for="heading in headings" :key="heading.anchor" 
          :style="{ paddingLeft: (heading.level - 1) * 12 + 'px' }">
        <a :href="heading.anchor" @click="scrollToHeading(heading.anchor)">
          {{ heading.title }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'

const headings = ref([])
const route = useRoute()

// 提取页面标题
const extractHeadings = () => {
  const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
  const extracted = []
  
  elements.forEach((el, index) => {
    const level = parseInt(el.tagName.charAt(1))
    const title = el.textContent || el.innerText
    
    // 生成或获取锚点
    let anchor = el.id
    if (!anchor) {
      anchor = title.toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
        .replace(/\s+/g, '-')
      el.id = anchor
    }
    
    extracted.push({
      level,
      title,
      anchor: `#${anchor}`
    })
  })
  
  headings.value = extracted
}

// 平滑滚动到指定标题
const scrollToHeading = (anchor) => {
  const element = document.querySelector(anchor)
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}

onMounted(() => {
  // 延迟提取，确保内容已渲染
  setTimeout(extractHeadings, 100)
})

// 监听路由变化
watch(() => route.path, () => {
  setTimeout(extractHeadings, 100)
})
</script>

<style scoped>
/* 组件特定样式已在 custom.css 中定义 */
</style>