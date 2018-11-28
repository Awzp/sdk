<template>
  <div class="container-padding">
    <el-radio-group v-model="date" size="small" @change="changeDate">
      <el-radio-button label="yesterday">昨日</el-radio-button>
      <el-radio-button label="week">近7天</el-radio-button>
    </el-radio-group>
    <data-table :data="tableList"/>
    <chart id="totalChart" :data="chartData" :show-loading="showChartLoading" height="420px" width="100%" title="全部应用总计收入（RMB)"/>
  </div>
</template>

<script>
import dataTable from '@/components/DataTable/dataTable'
import Chart from '@/components/LineChart/chart'
import { chartSimpleApi } from '@/api/overview'
export default {
  components: {
    dataTable,
    Chart
  },
  data() {
    return {
      date: 'yesterday',
      chartData: null,
      tableList: null,
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
      chartSimpleApi({ showtype: this.date }).then(res => {
        const data = res.data
        this.chartData = { datas: data.datas, title: data.title }
        this.tableList = data.list
        this.showChartLoading = false
      })
    }
  }
}
</script>
