# 图片使用指南

## 问题说明

你遇到的错误是因为Markdown文件中引用了Typora编辑器的本地缓存图片路径，这些路径在VitePress中无法访问。

## 解决方案

### 1. 图片存放位置
将所有图片文件放在 `public/images/` 文件夹中：

```
public/
  images/
    example.png
    diagram.jpg
    screenshot.gif
```

### 2. 在Markdown中引用图片
使用以下格式引用图片：

```markdown
![图片描述](/images/your-image.png)
```

**注意事项：**
- 路径以 `/images/` 开头（不是 `./images/` 或 `../images/`）
- 因为 `public` 文件夹是网站的根目录
- 部署后路径会自动加上 base 路径

### 3. 支持的图片格式
- PNG (.png)
- JPEG (.jpg, .jpeg)
- GIF (.gif)
- SVG (.svg)
- WebP (.webp)

### 4. 最佳实践
- 使用有意义的文件名，避免中文字符
- 图片文件名建议使用小写字母和连字符
- 例如：`higher-order-functions-diagram.png`

### 5. 从Typora迁移图片
如果你有很多Typora的图片引用，需要：

1. 将图片文件复制到 `public/images/` 文件夹
2. 更新Markdown文件中的图片路径
3. 删除或注释掉无效的图片引用

### 示例

**错误的引用方式：**
```markdown
![image](C:/Users/DID-xiaoxiao/AppData/Roaming/Typora/typora-user-images/image-20250902162702624.png)
```

**正确的引用方式：**
```markdown
![高阶函数示例](/images/higher-order-functions-example.png)
```