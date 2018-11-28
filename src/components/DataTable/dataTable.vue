<template>
  <div class="table-box">
    <el-table
      :data="data"
      style="width: 100%">
      <el-table-column
        prop="date"
        align="center"
        label="日期" />
      <el-table-column
        prop="showNum"
        align="center"
        label="曝光量" />
      <el-table-column
        prop="clickNum"
        align="center"
        label="点击量" />
      <el-table-column
        prop="clickPercent"
        align="center"
        label="点击率" />
      <el-table-column
        prop="ECPM"
        align="center"
        label="ECPM" />
      <el-table-column
        prop="CPC"
        align="center"
        label="CPC" />
      <el-table-column
        prop="total"
        align="center"
        label="总计收入" />
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: function() {
        return []
      }
    }
  }
}
</script>
