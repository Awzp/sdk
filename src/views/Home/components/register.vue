<template>
  <div>
    <div class="register">
      <button @click="registerHandler">注册</button>
      <button @click="loginHandler">登录</button>
    </div>
    <el-dialog :visible.sync="showRegDia" :modal="false" :close-on-click-modal="false" width="460px" @closed="closeDia">
      <img slot="title" class="dia-top-img" src="../../../img/home/dia-h.png">
      <reg-first v-if="diaStep.reg_1"/>
      <reg-second v-if="diaStep.reg_2" />
      <Login v-if="diaStep.login" />
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import RegFirst from './regStep_1'
import RegSecond from './regStep_2'
import Login from './login'
export default {
  components: {
    RegFirst,
    RegSecond,
    Login
  },
  data() {
    return {
      showRegDia: false
    }
  },

  computed: {
    ...mapGetters(['diaStep'])
  },

  methods: {
    ...mapActions(['resetRegState', 'changeStep']),
    registerHandler() {
      this.showRegDia = true
      this.$store.dispatch('changeStep', { reg_1: true })
    },
    loginHandler() {
      this.showRegDia = true
      this.$store.dispatch('changeStep', { login: true })
    },
    closeDia() {
      this.$store.dispatch('resetRegState')
    }
  }
}
</script>
