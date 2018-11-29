<template>
  <div class="top-filter">
    <div class="top-filter-box">
      <label>应用</label>
      <el-select v-model="send.appid" placeholder="请选择" @change="selectedApp">
        <el-option
          v-for="item in appList"
          :key="item.id"
          :label="item.appname"
          :value="item.id" />
      </el-select>
    </div>
    <div class="top-filter-box" style="width: 190px">
      <label>广告位</label>
      <el-select v-model="send.posid" placeholder="请选择">
        <el-option
          v-for="item in posList"
          :key="item.id"
          :label="item.posname"
          :value="item.id" />
      </el-select>
    </div>
    <div class="top-filter-box" style="width: 340px">
      <label>起止时间</label>
      <el-date-picker
        v-model="date"
        align="left"
        type="daterange"
        value-format="yyyy-MM-dd"
        start-placeholder="开始日期"
        end-placeholder="结束日期" />
    </div>
    <div class="top-search-box">
      <el-button type="primary" @click="search">查询</el-button>
    </div>
  </div>
</template>

<script>
import { getOpts } from '@/api/app/app'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      appList: [{
        id: 'all',
        appname: '全部应用'
      }],
      posList: [{
        id: 'all',
        posname: '全部广告位'
      }],
      date: null,
      send: {
        appid: 'all',
        posid: 'all'
      }
    }
  },
  created() {
    getOpts().then(res => {
      this.appList = this.appList.concat(res.data.list)
    })
  },
  methods: {
    ...mapActions(['changeSearch']),
    selectedApp(type) {
      var list = [{
        id: 'all',
        posname: '全部广告位'
      }]
      if (!(type === 'all')) {
        const positions = this.appList.filter((currentValue, index, arr) => {
          return currentValue.id === this.send.appid
        })[0].positions
        this.posList = positions ? list.concat(positions) : list
      } else {
        this.send.posid = 'all'
        this.posList = list
      }
    },
    search() {
      const send = {}
      if (this.date) {
        send.startdate = this.date[0]
        send.enddate = this.date[1]
      }
      Object.assign(send, this.send)
      this.$store.dispatch('changeSearch', send)
    }
  }
}
</script>
