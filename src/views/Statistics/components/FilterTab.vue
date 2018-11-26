<template>
  <div class="top-filter">
    <div class="top-filter-box">
      <label>应用</label>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
      </el-select>
    </div>
    <div class="top-filter-box" style="width: 190px">
      <label>广告位</label>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
      </el-select>
    </div>
    <div class="top-filter-box" style="width: 340px">
      <label>起止时间</label>
      <el-date-picker
        v-model="value6"
        align="left"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期" />
    </div>
    <div class="top-search-box">
      <el-button type="primary">查询</el-button>
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
  }
}
</script>
