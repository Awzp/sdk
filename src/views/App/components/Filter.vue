<template>
  <div class="top-filter">
    <div class="top-filter-box" style="width: 220px">
      <label>应用名称</label>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
      </el-select>
    </div>
    <div class="top-search-box">
      <el-button type="primary" @click="addAppHandler">添加应用</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [{
        value: 'all',
        label: '全部应用'
      }, {
        value: '选项2',
        label: '双皮奶43214213'
      }],
      value: '全部应用',
      value6: ''
    }
  },
  methods: {
    addAppHandler() {
      this.$router.push({ 'path': '/app/addApp' })
    }
  }
}
</script>
