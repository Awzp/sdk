<template>
  <div>
    <filterTab />
    <bag-box v-for="item in appList" :key="item.id" :title="item.appname" >
      <div slot="header">
        <el-button type="primary" size="small" @click="editApp(item.id)">编辑</el-button>
        <el-button type="danger" size="small" @click="deleteHandler(item.id)">删除</el-button>
      </div>
      <div slot="content" class="app-desc-container">
        <appDesc :app-data="item"/>
        <addAdvPos :id="item.id" :app="item.appname" />
        <adDataTable :id="item.id" :data="item.positions" :app="item.appname" />
      </div>
    </bag-box>
    <ExitTips
      :show-exit="showDeleBox"
      title="是否确定删除应用"
      @closebox="closeDeleteBox"
      @confirmClick="confirmDelete"
    >
      <p class="exit-dia-desc">应用删除后工作人员将在<span>一个工作日</span>内停用该应用下所有广告位</p>
    </ExitTips>
  </div>
</template>

<script>
import filterTab from './components/Filter'
import BagBox from '@/components/BagBox'
import appDesc from './components/appDesc'
import addAdvPos from './components/addAdvPos'
import adDataTable from './components/adDataTable'
import ExitTips from '@/components/ExitTips'
import { getAppList, delteApp } from '@/api/app/app'

export default {
  components: {
    BagBox,
    filterTab,
    appDesc,
    addAdvPos,
    adDataTable,
    ExitTips
  },
  data() {
    return {
      showDeleBox: false,
      appList: [],
      currentItem: ''
    }
  },
  created() {
    document.documentElement.scrollTop = document.body.scrollTop = 0
    this.getList()
  },
  methods: {
    getList() {
      getAppList().then(res => {
        this.appList = res.data.list
      })
    },
    editApp(id) {
      this.$router.push({ 'path': '/app/addApp', query: { id }})
    },
    deleteHandler(id) {
      this.showDeleBox = true
      this.currentItem = id
    },
    confirmDelete() {
      delteApp(this.currentItem).then(() => {
        this.showDeleBox = false
        this.$notify({
          showClose: true,
          message: '删除成功',
          type: 'success'
        })
        this.getList()
      })
    },
    closeDeleteBox() {
      this.showDeleBox = false
    }
  }
}
</script>
