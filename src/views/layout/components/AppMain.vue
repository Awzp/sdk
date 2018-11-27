<template>
  <section :class="{'always': showAlways}" class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- or name="fade" -->
      <!-- <router-view :key="key"></router-view> -->
      <router-view/>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    'showAlways': function() {
      return this.$route.name === 'App'
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 64px);
  position: relative;
  overflow: hidden;
}
.always {
  min-height: 100vh;
}
</style>
