<template>
  <div class="form-dia">
    <p class="reg-form-title">
      注册{{ userType == 'dsp' ? '广告主' : '开发者' }}账号
    </p>
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="login-form" label-position="left">
      <el-form-item prop="email" class="reg-input-box">
        <el-input v-model="registerForm.email" name="email" type="text" placeholder="请输入帐号名,邮箱格式" />
      </el-form-item>
      <el-form-item prop="password" class="reg-input-box">
        <el-input
          v-model="registerForm.password"
          type="password"
          class="reg-input"
          name="password"
          placeholder="请输入密码,6-12位" />
      </el-form-item>
      <el-form-item prop="repassword" class="reg-input-box">
        <el-input
          v-model="registerForm.repassword"
          type="password"
          class="reg-input"
          name="repassword"
          placeholder="请输入确认密码,6-12位" />
      </el-form-item>
      <el-form-item prop="companyname" class="reg-input-box">
        <el-input v-model="registerForm.companyname" name="companyname" type="text" placeholder="请输入公司名称" />
      </el-form-item>
      <el-form-item prop="weburl" class="reg-input-box">
        <el-input v-model="registerForm.weburl" name="weburl" type="text" placeholder="请输入公司网址(选填)" />
      </el-form-item>
      <el-form-item prop="contactname" class="reg-input-box">
        <el-input v-model="registerForm.contactname" name="contactname" type="text" placeholder="请输入联系人" />
      </el-form-item>
      <el-form-item prop="phone" class="reg-input-box">
        <el-input v-model="registerForm.phone" name="phone" type="text" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item class="reg-input-box">
        <div class="button-small-box">
          <button type="button" @click="registerHandler">立即注册</button>
        </div>
      </el-form-item>
    </el-form>
    <div class="reg-bottom-tips">
      <span>已注册?</span>
      <span class="longin-reg-link" @click="loginHandler">立即登录</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { isvalidUsername, validateURL } from '@/utils/validate'
import { register } from '@/api/login'
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
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const validateWeburl = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (!validateURL(value)) {
        callback(new Error('请输入正确的网址!'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        email: '333@qq.com',
        password: '12344321',
        repassword: '12344321',
        companyname: '432',
        weburl: '',
        contactname: '432',
        phone: '13232323232'
      },
      registerRules: {
        email: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        repassword: [{ required: true, trigger: 'blur', validator: validatePass2 }],
        companyname: [{ required: true, trigger: 'blur', message: '请输入公司名称' }],
        weburl: [{ trigger: 'blur', validator: validateWeburl }],
        contactname: [{ required: true, trigger: 'blur', message: '请输入联系人' }],
        phone: [{ required: true, trigger: 'blur', message: '请输入联系电话' }]
      }
    }
  },
  computed: {
    ...mapGetters(['userType'])
  },
  methods: {
    ...mapActions(['selectType', 'changeStep']),
    registerHandler() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          const send = Object.assign({}, this.registerForm)
          send.usertype = this.userType
          register(send).then(r => {
            this.$store.dispatch('changeStep', { login: true })
            this.$notify({
              showClose: true,
              message: '注册成功',
              type: 'success'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    loginHandler() {
      this.$store.dispatch('changeStep', { login: true })
    }
  }
}
</script>
