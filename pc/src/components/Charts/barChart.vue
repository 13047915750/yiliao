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
      let total = 0
      this.yData.forEach(item => {
        total += item
      })
      this.chart = echarts.init(this.$el)
      this.chart.setOption({
        backgroundColor: '#fff',
        title: {
          text: this.showTotal ? `${this.title}:${total}` : this.title,
          x: this.showTotal ? '20' : '45%',
          top: '40',
          subtextStyle: {
            color: '#90979c',
            fontSize: '16'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        toolbox: {
          show: true,
          top: 20,
          right: 50,
          feature: {
            mark: { show: true },
            // dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            // restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          left: this.gLeft,
          right: '2%',
          borderWidth: 0,
          top: 100,
          bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          x: '5%',
          top: '10%',
          textStyle: {
            color: '#90979c'
          },
          data: []
        },
        calculable: true,
        xAxis: [{
          type: this.yType === 'category' ? 'value' : 'category',
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
          data: this.yType === 'category' ? null : this.xData
        }],
        yAxis: [{
          type: this.yType,
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
          axisLabel: this.yType === 'category' ? {
            show: true,
            interval: 0,
            textStyle: {
              align: 'right',
              baseline: 'middle'
            },
            formatter: function(params) {
              if (params.length > 15) { return params.substring(0, 15) + '...' } else { return params }
            }
          } : { interval: 0 },
          data: this.yType === 'category' ? this.yData : null
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
          yAxisIndex: this.yType === 'category' ? 0 : null,
          height: 15,
          start: 0,
          end: 100
        }],
        series: [{
          name: this.series,
          type: 'bar',
          stack: 'total',
          barMaxWidth: 25,
          barGap: '10%',
          itemStyle: {
            normal: {
              color: '#409EFF',
              label: {
                show: true,
                textStyle: {
                  color: '#fff'
                }
              }
            }
          },
          data: this.yType === 'category' ? this.xData : this.yData
        }]
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
