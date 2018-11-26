<template>
  <el-dropdown class="username-container right-menu-item" trigger="click">
    <div class="show-name">
      <el-tooltip :content="user.email" class="item" effect="dark" placement="bottom">
        <span>{{ user.email }}</span>
      </el-tooltip>
      <i class="el-icon-caret-bottom"/>
    </div>
    <el-dropdown-menu slot="dropdown">
      <router-link to="/account">
        <el-dropdown-item>
          <svg-icon icon-class="account" class-name="account-icon"/>
          账号中心
        </el-dropdown-item>
      </router-link>
      <el-dropdown-item>
        <div @click="logOut">
          <svg-icon icon-class="logout" class-name="account-icon"/>
          <span>退出</span>
        </div>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import './index.scss'
export default {
  name: 'UserTab',
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['FedLogOut']),
    logOut() {
      this.FedLogOut().then(() => {
        location.reload()
      })
    }
  }
}
</script>
