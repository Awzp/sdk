<template>
  <div class="container-padding">
    <div class="account-tips">
      <span class="el-icon-warning icon" />
      <p style="color: #e86d62">温馨提示：账户资料尚不完整，请尽快补全。补全信息并通过账户审核后方可正常投放广告</p>
    </div>
    <bag-box title="账号资料">
      123
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
    }
  },
  methods: {
    goInformation() {
      this.$router.push({ 'path': '/account/information' })
    }
  }
}
</script>
