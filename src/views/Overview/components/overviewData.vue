<template>
  <div class="container-padding">
    <el-radio-group v-model="date" size="small">
      <el-radio-button label="yesterday">昨日</el-radio-button>
      <el-radio-button label="seven">近7天</el-radio-button>
    </el-radio-group>
    <data-table />
    <chart id="totalChart" :data="data" height="420px" width="100%" title="全部应用总计收入（RMB)"/>
  </div>
</template>

<script>
import dataTable from '@/components/DataTable/dataTable'
import Chart from '@/components/LineChart/chart'
export default {
  components: {
    dataTable,
    Chart
  },
  data() {
    return {
      date: 'yesterday',
      data: null
    }
  },
  mounted() {
  }
}
</script>
