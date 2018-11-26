<template>
  <div class="first-dia">
    <p class="title">聚川广告平台注册账号</p>
    <div class="button-box">
      <button @click="selectType('dsp')">我是广告主</button>
    </div>
    <div class="button-box">
      <button @click="selectType('ssp')">我是开发者</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['selectType', 'changeStep']),
    selectType(type) {
      this.$store.dispatch('selectType', type)
      this.$store.dispatch('changeStep', { reg_2: true })
    }
  }
}
</script>
