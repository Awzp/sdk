<template>
  <div class="home-header">
    <span class="home-logo">_</span>
    <Menu />
    <Register />
  </div>
</template>

<script>
import Menu from './menu'
import Register from './register'
export default {
  components: {
    Menu,
    Register
  }
}
</script>
