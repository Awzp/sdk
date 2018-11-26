<template>
  <div>
    <el-dialog :visible.sync="show" :show-close="false" top="20%" width="400px" class="exit-dia-container" @closed="colseBox">
      <div class="notice">
        <img src="~@/img/notice.png" class="notice">
      </div>
      <p class="title">{{ title }}</p>
      <slot />
      <div class="handler-box">
        <el-button class="app-btn" type="primary" @click="sunbmitHandler">提交</el-button>
        <el-button class="app-btn app-cancle-btn" type="primary" @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import './index.scss'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    showExit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false
    }
  },
  watch: {
    'showExit': function(newV) {
      this.show = newV
    }
  },
  methods: {
    colseBox() {
      this.$emit('closebox')
    },
    sunbmitHandler() {
      this.$emit('confirmClick')
    },
    cancel() {
      this.show = false
    }
  }
}
</script>
