<template>
  <div class="container-padding">
    <el-radio-group v-model="date" size="small" @change="changeDate">
      <el-radio-button label="yesterday">昨日</el-radio-button>
      <el-radio-button label="week">近7天</el-radio-button>
    </el-radio-group>
    <data-table />
    <chart id="totalChart" :data="chartData" :show-loading="showChartLoading" height="420px" width="100%" title="全部应用总计收入（RMB)"/>
  </div>
</template>

<script>
import dataTable from '@/components/DataTable/dataTable'
import Chart from '@/components/LineChart/chart'
import { chartApi } from '@/api/chart'
export default {
  components: {
    dataTable,
    Chart
  },
  data() {
    return {
      date: 'yesterday',
      chartData: null,
      showChartLoading: false
    }
  },
  mounted() {
    this.getChartData()
  },
  methods: {
    changeDate() {
      this.showChartLoading = true
      this.getChartData()
    },
    getChartData() {
      chartApi({ showtype: this.date }).then(res => {
        this.chartData = res.data
        this.showChartLoading = false
      })
    }
  }
}
</script>
