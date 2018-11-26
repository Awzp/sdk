<template>
  <div class="add-adver-position">
    <p>广告位</p>
    <el-button icon="el-icon-circle-plus-outline" @click="addAdvert">添加广告位</el-button>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  methods: {
    addAdvert() {
      this.$router.push({ 'path': '/app/addAdvert', query: { id: this.id }})
    }
  }
}
</script>
