<template>
  <div class="container-padding">
    <div class="account-tips">
      <span class="el-icon-warning icon" />
      <p>温馨提示：账户资料尚不完整，<span class="span_title" @click="goInformation">点击此处</span>请尽快补全。</p>
    </div>
    <bag-box title="账号中心">
      <div slot="content" class="account-desc-content">
        <el-row v-for="(item, index) in userData" :key="index" class="account-desc-row">
          <el-col :span="6">
            <label>{{ item.name }} :</label>
            <span>{{ item.value }}</span>
          </el-col>
        </el-row>
      </div>
    </bag-box>
  </div>
</template>

<script>

import BagBox from '@/components/BagBox'
export default {
  components: {
    BagBox
  },
  data() {
    return {
      userData: [{
        name: '账号ID',
        value: '3499s'
      }, {
        name: '账号',
        value: '1321321@qq.com'
      }, {
        name: '手机号',
        value: '1322334323322'
      }, {
        name: '联系人',
        value: 'xxx'
      }]
    }
  },
  methods: {
    goInformation() {
      this.$router.push({ 'path': '/account/information' })
    }
  }
}
</script>
