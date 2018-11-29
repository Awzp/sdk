<template>
  <div class="container-padding">
    <div class="export-excel">
      <el-button type="primary">导出Excel</el-button>
    </div>
    <dataTable :data="tableData"/>
    <p class="table-tips">共一条记录, 每页7条信息</p>
  </div>
</template>

<script>
import dataTable from '@/components/DataTable/dataTable'
import { mapActions, mapGetters } from 'vuex'
import { getTable } from '@/api/statistics'
export default {
  components: {
    dataTable
  },
  data() {
    return {
      tableData: []
    }
  },
  computed: {
    ...mapGetters(['statisShowType', 'statisFilterData', 'statisAction'])
  },
  watch: {
    'statisShowType': function(val) {
      console.log(123)
    },
    'statisAction': function(val) {
      const send = this.statisFilterData
      send.showtype = this.date
      // this.getData(send)
    }
  },
  created() {
    const send = Object.assign({}, this.statisFilterData)
    send.showtype = this.date
    // this.getData(send)
  },
  methods: {
    ...mapActions(['changeShowType']),
    getData(data) {
      getTable(data).then(res => {
        this.data = res.data
      })
    },
    changeType(val) {
      this.$store.dispatch('changeShowType', val)
      const { appid, posid } = this.statisFilterData
      const send = { appid, posid }
      send.showtype = this.date
      // this.getData(send)
    }
  }
}
</script>
