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
  data() {
    return {
      descData: [[{
        name: 'AppID',
        value: '37eufh'
      }, {
        name: '程序主包名',
        value: 'Android'
      }], [{
        name: '操作系统',
        value: 'Android'
      }, {
        name: '应用分类',
        value: '桌面'
      }], [{
        name: '日活用户数',
        value: '10000000'
      }, {
        name: '应用市场下载链接',
        value: 'http://www.moxiu.com/aa/bb/cc'
      }], [{
        name: '适用人群',
        value: '女生'
      }]]
    }
  }
}
</script>
