# 第三方库集成文档

本文档记录了项目中集成的第三方库及其配置使用方法。

## 📦 已集成的库

### 1. Ant Design Vue

- **版本**: `4.2.6`
- **官网**: https://antdv.com/
- **说明**: 基于 Vue 3 的企业级 UI 组件库

### 2. Lodash-es

- **版本**: `4.17.21`
- **官网**: https://lodash.com/
- **说明**: JavaScript 实用工具库的 ES 模块版本

### 3. ECharts

- **版本**: `6.0.0`
- **官网**: https://echarts.apache.org/
- **说明**: 基于 JavaScript 的开源可视化图表库

---

## 🔧 配置说明

### Ant Design Vue 配置

#### 1. 自动导入组件配置

在 `vite.config.js` 中已配置自动导入：

```javascript
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

Components({
  resolvers: [
    AntDesignVueResolver({
      importStyle: false // 手动导入样式以支持按需加载
    })
  ]
})
```

#### 2. 样式引入

在 `src/main.js` 中已引入样式：

```javascript
import 'ant-design-vue/dist/reset.css'
```

#### 3. 使用方式

**无需手动导入组件**，直接在模板中使用：

```vue
<template>
  <a-button type="primary">按钮</a-button>
  <a-card title="卡片标题">
    <p>卡片内容</p>
  </a-card>
  <a-input v-model:value="inputValue" placeholder="请输入" />
</template>
```

### Lodash-es 配置

#### 使用方式

需要手动导入需要的函数：

```javascript
import { debounce, throttle, cloneDeep, isEmpty } from 'lodash-es'

// 使用示例
const handleDebounce = debounce(() => {
  console.log('防抖执行')
}, 1000)

const handleThrottle = throttle(() => {
  console.log('节流执行')
}, 1000)
```

#### 常用函数列表

- `debounce` - 防抖函数
- `throttle` - 节流函数
- `cloneDeep` - 深拷贝
- `isEmpty` - 判断是否为空
- `isEqual` - 深度比较
- `merge` - 合并对象
- `pick` - 选择对象属性
- `omit` - 排除对象属性

### ECharts 配置

#### 使用方式

```javascript
import * as echarts from 'echarts'

// 在组件中使用
onMounted(() => {
  const chartDom = document.getElementById('chart')
  const myChart = echarts.init(chartDom)
  const option = {
    // 图表配置
  }
  myChart.setOption(option)
})
```

#### Vue 3 组合式 API 示例

```vue
<script setup>
  import { ref, onMounted } from 'vue'
  import * as echarts from 'echarts'

  const chartRef = ref(null)

  onMounted(() => {
    if (chartRef.value) {
      const myChart = echarts.init(chartRef.value)
      const option = {
        title: {
          text: '示例图表'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }
        ]
      }
      myChart.setOption(option)
    }
  })
</script>

<template>
  <div ref="chartRef" style="width: 100%; height: 400px"></div>
</template>
```

---

## 📝 完整示例

### 示例文件位置

完整的使用示例在 `src/views/index.vue` 文件中，包含：

1. **Ant Design Vue 组件示例**

   - 按钮、卡片、输入框、标签、提示等组件

2. **Lodash-es 使用示例**

   - 防抖函数的使用

3. **ECharts 图表示例**
   - 基础柱状图

### 代码示例

```vue
<script setup>
  import { ref, onMounted } from 'vue'
  import * as echarts from 'echarts'
  import { debounce } from 'lodash-es'

  const title = ref('Hello World!')
  const message = ref('')
  const chartRef = ref(null)

  // Lodash-es 防抖示例
  const handleDebounce = debounce(() => {
    message.value = '防抖函数执行了！'
  }, 1000)

  // ECharts 图表初始化
  onMounted(() => {
    if (chartRef.value) {
      const myChart = echarts.init(chartRef.value)
      const option = {
        title: { text: 'ECharts 示例图表' },
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [120, 200, 150, 80, 70, 110, 130]
          }
        ]
      }
      myChart.setOption(option)
    }
  })
</script>

<template>
  <div style="padding: 20px">
    <!-- Ant Design Vue 组件 -->
    <a-card title="Ant Design Vue 示例">
      <a-space direction="vertical" style="width: 100%">
        <a-button type="primary" @click="handleDebounce"> 点击测试防抖（lodash-es） </a-button>
        <a-alert v-if="message" :message="message" type="success" />
        <a-input v-model:value="title" placeholder="输入内容" style="width: 300px" />
        <a-tag color="blue">标签示例</a-tag>
      </a-space>
    </a-card>

    <!-- ECharts 图表 -->
    <a-card title="ECharts 图表示例" style="margin-top: 20px">
      <div ref="chartRef" style="width: 100%; height: 400px"></div>
    </a-card>
  </div>
</template>
```

---

## 🚀 快速开始

### 1. Ant Design Vue

直接使用组件，无需导入：

```vue
<template>
  <a-button type="primary">主要按钮</a-button>
</template>
```

### 2. Lodash-es

导入需要的函数：

```javascript
import { debounce } from 'lodash-es'
```

### 3. ECharts

导入并初始化：

```javascript
import * as echarts from 'echarts'
const chart = echarts.init(dom)
```

---

## 📚 相关资源

### Ant Design Vue

- [官方文档](https://antdv.com/docs/vue/introduce-cn)
- [组件列表](https://antdv.com/components/overview-cn)
- [设计规范](https://antdv.com/docs/spec/introduce-cn)

### Lodash-es

- [官方文档](https://lodash.com/docs/)
- [API 参考](https://lodash.com/docs/4.17.21)

### ECharts

- [官方文档](https://echarts.apache.org/zh/index.html)
- [配置项手册](https://echarts.apache.org/zh/option.html)
- [示例库](https://echarts.apache.org/examples/zh/index.html)

---

## ⚠️ 注意事项

1. **Ant Design Vue**

   - 组件会自动导入，无需手动 import
   - 样式已在 `main.js` 中全局引入
   - 如需按需加载样式，可修改 `AntDesignVueResolver` 的 `importStyle` 配置

2. **Lodash-es**

   - 建议按需导入，避免打包体积过大
   - 使用 ES 模块版本（lodash-es）而非 CommonJS 版本（lodash）

3. **ECharts**
   - 图表容器需要有明确的宽高
   - 在组件销毁时记得调用 `myChart.dispose()` 释放资源
   - 响应式布局需要监听窗口大小变化并调用 `myChart.resize()`

---

## 🔄 版本更新记录

- **2024-11-13**: 初始集成
  - ant-design-vue: 4.2.6
  - lodash-es: 4.17.21
  - echarts: 6.0.0

---

## 💡 最佳实践

### Ant Design Vue

- 使用组件时注意查看官方文档的 API 说明
- 合理使用主题定制功能
- 注意组件的国际化配置

### Lodash-es

- 只导入需要的函数，减少打包体积
- 使用 TypeScript 时可以获得更好的类型提示

### ECharts

- 复杂图表建议封装成组件
- 注意图表的响应式处理
- 大数据量时考虑使用数据采样或分页

---

## 📞 问题反馈

如遇到问题，请参考：

1. 各库的官方文档
2. GitHub Issues
3. 项目中的示例代码


