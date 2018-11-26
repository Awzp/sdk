<template>
  <div class="container-padding">
    <div class="export-excel">
      <el-button type="primary">导出Excel</el-button>
    </div>
    <dataTable />
    <p class="table-tips">共一条记录, 每页7条信息</p>
  </div>
</template>

<script>
import dataTable from '@/components/DataTable/dataTable'

export default {
  components: {
    dataTable
  }
}
</script>
