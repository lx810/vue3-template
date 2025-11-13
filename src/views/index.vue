<script setup>
  import { useRequest } from '@/api'
  import { onMounted, ref } from 'vue'
  import * as echarts from 'echarts'
  import { debounce } from 'lodash-es'

  const title = ref('Hello World!')
  const message = ref('')
  const chartRef = ref(null)

  // 在js中直接调用useRequest() 函数就可以获取到配置的接口
  const { API_DEMO_POST, API_DEMO_GET } = useRequest()
  // 使用非常简单
  API_DEMO_GET({
    page: 1,
    pageSize: 10
  }).then((res) => {
    // 请求返回结果
  })

  // 使用 lodash-es
  const handleDebounce = debounce(() => {
    message.value = '防抖函数执行了！'
    console.log('防抖执行')
  }, 1000)

  // 使用 echarts 创建图表
  onMounted(() => {
    if (chartRef.value) {
      const myChart = echarts.init(chartRef.value)
      const option = {
        title: {
          text: 'ECharts 示例图表'
        },
        tooltip: {},
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
    <HelloWorld msg="Hello Vue 3.0 + Vite" />

    <!-- Ant Design Vue 组件示例（自动导入，无需手动 import） -->
    <a-card title="Ant Design Vue 示例" style="margin-top: 20px">
      <a-space direction="vertical" style="width: 100%">
        <a-button type="primary" @click="handleDebounce"> 点击测试防抖（lodash-es） </a-button>
        <a-alert v-if="message" :message="message" type="success" />
        <a-input v-model:value="title" placeholder="输入内容" style="width: 300px" />
        <a-tag color="blue">标签示例</a-tag>
      </a-space>
    </a-card>

    <!-- ECharts 图表示例 -->
    <a-card title="ECharts 图表示例" style="margin-top: 20px">
      <div ref="chartRef" style="width: 100%; height: 400px"></div>
    </a-card>
  </div>
</template>
