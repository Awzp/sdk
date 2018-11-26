<template>
  <div class="bag-box_container">
    <div class="bag-box_title_box">
      <span>{{ title }}</span>
      <slot name="header" class="bag-box_title_box_header" />
    </div>
    <slot name="content" />
  </div>
</template>

<script>
import './index.scss'
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
