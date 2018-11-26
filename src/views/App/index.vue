<template>
  <div>
    <filterTab />
    <bag-box v-for="item in 2" :key="item" title="心情天气" >
      <div slot="header">
        <el-button type="primary" size="small">编辑</el-button>
        <el-button type="danger" size="small" @click="deleteHandler(item)">删除</el-button>
      </div>
      <div slot="content" class="app-desc-container">
        <appDesc />
        <addAdvPos :id="item+''"/>
        <adDataTable />
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
      currentItem: ''
    }
  },
  methods: {
    deleteHandler(item) {
      this.showDeleBox = true
      this.currentItem = item
    },
    confirmDelete() {
      this.showDeleBox = false
    },
    closeDeleteBox() {
      this.showDeleBox = false
    }
  }
}
</script>
