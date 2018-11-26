<template>
  <div class="form-dia">
    <p class="reg-form-title" style="margin-bottom: 10px;">
      登录
    </p>
    <div class="login-select-group">
      <el-radio-group v-model="loginForm.usertype" @change="changeType">
        <el-radio-button label="dsp">广告主登录</el-radio-button>
        <el-radio-button label="ssp">开发者登录</el-radio-button>
      </el-radio-group>
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left">
      <el-form-item prop="email" class="reg-input-box">
        <el-input v-model="loginForm.email" name="email" type="text" placeholder="请输入帐号名,邮箱格式" />
      </el-form-item>
      <el-form-item prop="password" class="reg-input-box">
        <el-input
          v-model="loginForm.password"
          type="password"
          class="reg-input"
          name="password"
          placeholder="请输入密码,6-12位" />
      </el-form-item>
      <el-form-item class="reg-input-box">
        <div class="button-small-box ">
          <button type="button" @click="register">立即登录</button>
        </div>
      </el-form-item>
    </el-form>
    <div class="reg-bottom-tips">
      <span class="login-span-link">忘记密码</span>
      <span style="margin: 0 10px">|</span>
      <span class="login-span-link" @click="regHandler">立即注册</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { isvalidUsername } from '@/utils/validate'

export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else if (value.length > 12) {
        callback(new Error('密码不能大于12位'))
      } else {
        callback()
      }
    }

    return {
      type: 'dsp',
      loginForm: {
        email: 'wangzhongpu@moxiu.net',
        password: '123456',
        usertype: 'ssp'
      },
      loginRules: {
        email: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      }
    }
  },
  computed: {
    ...mapGetters(['userType'])
  },
  methods: {
    ...mapActions(['selectType', 'changeStep', 'Login']),
    changeType() {
      this.$store.dispatch('selectType', this.loginForm.usertype)
    },
    register() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.Login(this.loginForm).then(r => {
            this.$notify({
              showClose: true,
              message: '登录成功',
              type: 'success'
            })
            this.$router.push({ 'path': '/' })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
      return false
    },
    regHandler() {
      this.$store.dispatch('changeStep', { reg_1: true })
    }
  }
}
</script>
