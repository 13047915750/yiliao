<template>
  <div :class="className" :id="id" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    xData: {
      type: Array,
      default: () => []
    },
    yData: {
      type: Object,
      default: () => { return { success: [], failure: [], total: [] } }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  watch: {
    xData() {
      this.initChart()
    },
    yData() {
      this.initChart()
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        title: {
          text: '短信发送量概览'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['发送成功', '发送失败', '发送总数']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '发送成功',
            type: 'line',
            data: this.yData.success
          },
          {
            name: '发送失败',
            type: 'line',
            data: this.yData.failure
          },
          {
            name: '发送总数',
            type: 'line',
            data: this.yData.total
          }
        ]
      })
    }
  }
}
</script>
