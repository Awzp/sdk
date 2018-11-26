<template>
  <div>
    <div class="top-max">
      <span class="logo" />
      <el-menu
        :show-timeout="200"
        :default-active="resolvePath($route.path)"
        mode="horizontal"
        background-color="#669cff"
        text-color="#fff"
        active-text-color="#fff"
        class="ul-container"
      >
        <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path"/>
        <el-menu-item v-show="false" index="/hide" />
      </el-menu>
      <user-tab />
    </div>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem'
import userTab from '@/components/userTab'
import { mapGetters } from 'vuex'

export default {
  components: { SidebarItem, userTab },
  data() {
    return {
      canShowRoute: []
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers'
    ])
  },
  mounted: function() {
    this.permission_routers.map((item, index) => {
      if (!item.hidden && item.children) {
        this.canShowRoute.push(item.path)
      }
    })
  },
  methods: {
    resolvePath(path) {
      var pre = `/${path.split('/')[1]}`
      if (this.canShowRoute.indexOf(pre) === -1) {
        return '/hide'
      } else {
        return pre
      }
    }
  }
}
</script>
