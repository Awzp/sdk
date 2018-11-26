<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">
    <template>
      <app-link :to="item.path">
        <el-menu-item :index="item.path">
          <item :title="item.meta.title" />
        </el-menu-item>
      </app-link>
    </template>
  </div>
</template>

<script>
import Item from './Item'
import AppLink from './Link'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  }
}
</script>
