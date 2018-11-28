<template>
  <div class="chart">
    <div :id="id" :style="{ height: height,width: width }"/>
    <div class="button-group">
      <button v-for="item in names" :key="item" :class="{'active': activeName === item }" @click="toggleLegend(item)">{{ item }}</button>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import './index.scss'
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
    showLoading: {
      type: Boolean,
      default: false
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
      series: [],
      selectList: {},
      constant: {},
      activeName: '总计收入'
    }
  },
  watch: {
    'data': function(newV, oldV) {
      this.xItems = newV.title
      this.formatData(newV.datas)
      this.chart.hideLoading()
      this.initChart()
    },
    'showLoading': function(show) {
      if (show) {
        this.showChartLoading()
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.showChartLoading()
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
    toggleLegend(item) {
      const yet = this.activeName
      this.activeName = item
      this.chart.dispatchAction({
        type: 'legendUnSelect',
        name: yet
      })
      this.chart.dispatchAction({
        type: 'legendSelect',
        name: item
      })
    },
    showChartLoading() {
      this.chart.showLoading({
        text: 'loading',
        color: '#669cff',
        textColor: '#000',
        maskColor: 'rgba(255, 255, 255, 0.8)',
        zlevel: 0
      })
    },
    formatData(dataList) {
      var names = []
      var datas = []
      var selected = {}
      Object.keys(dataList).forEach((item, index) => {
        var name = dataList[item].name
        names.push(name)
        selected[name] = false
        datas.push({
          name: name,
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
      this.selectList = selected
      this.selectList[this.activeName] = true
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
          selected: this.selectList,
          show: false
        },
        grid: {
          top: 60,
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
