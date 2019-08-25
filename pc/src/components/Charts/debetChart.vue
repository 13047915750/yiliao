<template>
  <div :class="className" :id="id" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
export default {
  mixins: [resize],
  props: {
    xData: {
      type: Array,
      default: () => []
    },
    yData: {
      type: Array,
      default: () => []
    },
    className: {
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
    title: {
      type: String,
      default: '总调用次数'
    },
    series: {
      type: String,
      default: '次数'
    },
    showTotal: {
      type: Boolean,
      default: true
    },
    yType: {
      type: String,
      default: 'value'
    },
    gLeft: {
      type: String,
      default: '5%'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    xData() {
      this.initChart()
    },
    yData() {
      this.initChart()
    }
  },
  computed: {
    id() {
      return `echarts` + Math.random() * 9999
    }
  },
  mounted() {
    this.initChart()
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
      this.chart = echarts.init(this.$el)
      this.chart.setOption({
        title: {
          text: this.title
        },
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ['type', '申请', '逾期'],
            ...this.xData
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          { type: 'bar' },
          { type: 'bar' }
        ] })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
