<template>
  <div class="container-padding">
    <el-radio-group v-model="date" size="small" @change="changeType">
      <el-radio-button label="yesterday">昨日</el-radio-button>
      <el-radio-button label="week">近7天</el-radio-button>
      <el-radio-button label="month">近1个月</el-radio-button>
    </el-radio-group>
    <chart id="stChart" :data="data" :show-loading="showChartLoading" height="420px" width="100%" title="全部应用总计收入（RMB)" />
  </div>
</template>

<script>
import Chart from '@/components/LineChart/chart'
import { getChart } from '@/api/statistics'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    Chart
  },
  data() {
    return {
      date: 'yesterday',
      data: null,
      showChartLoading: false
    }
  },
  computed: {
    ...mapGetters(['statisShowType', 'statisFilterData', 'statisAction'])
  },
  watch: {
    'statisShowType': function(val) {
      this.date = !val ? '' : val
    },
    'statisAction': function(val) {
      const send = this.statisFilterData
      send.showtype = this.date
      this.getData(send)
    }
  },
  created() {
    const send = Object.assign({}, this.statisFilterData)
    send.showtype = this.date
    this.getData(send)
  },
  methods: {
    ...mapActions(['changeShowType']),
    getData(data) {
      getChart(data).then(res => {
        this.data = res.data
        this.showChartLoading = false
      })
    },
    changeType(val) {
      this.$store.dispatch('changeShowType', val)
      const { appid, posid } = this.statisFilterData
      const send = { appid, posid }
      send.showtype = this.date
      this.getData(send)
    }
  }
}
</script>
