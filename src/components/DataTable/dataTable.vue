<template>
  <div class="table-box">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        align="center"
        label="日期" />
      <el-table-column
        prop="requestNum"
        align="center"
        label="请求次数" />
      <el-table-column
        prop="issueNum"
        align="center"
        label="下发次数" />
      <el-table-column
        prop="showNum"
        align="center"
        label="展示次数" />
      <el-table-column
        prop="clickNum"
        align="center"
        label="点击次数" />
      <el-table-column
        prop="fullPercent"
        align="center"
        label="填充率" />
      <el-table-column
        prop="clickPercent"
        align="center"
        label="点击率" />
      <el-table-column
        prop="eCPM"
        align="center"
        label="eCPM" />
      <el-table-column
        prop="eCPC"
        align="center"
        label="eCPC" />
      <el-table-column
        prop="total"
        align="center"
        label="总计收入" />
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2019-05-02',
        requestNum: 0,
        issueNum: 0,
        showNum: 0,
        clickNum: 0,
        fullPercent: 0,
        clickPercent: 0,
        eCPM: 0,
        eCPC: 0,
        total: 0
      }]
    }
  }
}
</script>
