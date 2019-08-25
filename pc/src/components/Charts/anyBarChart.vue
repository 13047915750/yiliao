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
      type: Array,
      default: () => []
    },
    dataLegend: {
      type: Array,
      default: () => []
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
        backgroundColor: '#fff',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            // dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            // restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: this.dataLegend
        },
        color: ['#E6A23C', '#409EFF', '#42b983', '#99d2dd', '#88b0bb', '#1c7099', '#038cc4', '#75abd0', '#afd6dd'],
        xAxis: [
          {
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 'auto'
            },
            data: this.xData
          }
        ],
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          splitArea: {
            show: false
          }
        }],
        dataZoom: [{
          show: false,
          height: 30,
          xAxisIndex: [
            0
          ],
          bottom: 30,
          start: 0,
          end: 100,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'

          },
          textStyle: {
            color: '#fff'
          },
          borderColor: '#90979c'

        }, {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        series: this.series
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
