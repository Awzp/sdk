<template>
  <div class="app-desc-content">
    <el-row v-for="(item, index) in descData" :key="index" class="app-desc-row">
      <el-col v-for="(label, key) in item" :key="key" :span="key == 0 ? 6 : 16">
        <label>{{ label.name }} :</label>
        <span>{{ label.value }}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    'appData': {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      descData: [[{
        name: 'AppID',
        key: 'appid',
        value: ''
      }, {
        name: '程序主包名',
        key: 'packagename',
        value: ''
      }], [{
        name: '操作系统',
        key: 'os',
        value: ''
      }, {
        name: '应用分类',
        key: 'subtype',
        value: ''
      }], [{
        name: '日活用户数',
        key: 'activeperday',
        value: ''
      }, {
        name: '应用市场下载链接',
        key: 'linkurl',
        value: ''
      }], [{
        name: '适用人群',
        key: 'groups',
        value: ''
      }]]
    }
  },
  created() {
    this.descData.forEach(item => {
      item.forEach(descItem => {
        descItem.value = this.appData[descItem.key]
      })
    })
  }
}
</script>
