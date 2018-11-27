<template>
  <div class="ov-chart">
    <div :id="id" :style="{height:height,width:width}"/>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  props: {
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
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      chart: null,
      names: [],
      xItems: [],
      series: []
    }
  },
  watch: {
    'data': function(newV, oldV) {
      this.xItems = newV.title
      this.formatData(newV.datas)
      this.chart.hideLoading()
      this.initChart()
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.showLoading({
        text: 'loading',
        color: '#669cff',
        textColor: '#000',
        maskColor: 'rgba(255, 255, 255, 0.8)',
        zlevel: 0
      })
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    formatData(dataList) {
      var names = []
      var datas = []
      Object.keys(dataList).forEach((item, index) => {
        names.push(dataList[item].name)
        datas.push({
          name: dataList[item].name,
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 3,
          showSymbol: false,
          lineStyle: {
            width: 2
          },
          data: dataList[item].data
        })
      })
      this.names = names
      this.series = datas
    },
    initChart() {
      this.chart.setOption({
        backgroundColor: '#fff',
        color: ['#ff6b6b', '#ffd069', '#7df2b4', '#bcb0ff', '#7fcaff', '#bbff00', '#e066ff', '#9e0002'],
        title: {
          text: this.title,
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#374064'
          },
          top: '0%',
          left: '0%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          icon: 'rect',
          itemWidth: 18,
          itemHeight: 8,
          itemGap: 13,
          data: this.names,
          left: '5%',
          top: '10%',
          textStyle: {
            fontSize: 14,
            color: '#333'
          }
        },
        grid: {
          top: 100,
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: true,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: this.xItems
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: { show: false }
        }],
        series: this.series
      })
    }
  }
}
</script>
