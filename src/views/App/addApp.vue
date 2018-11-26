<template>
  <div class="container-padding">
    <bag-box title="添加应用">
      <div slot="content" class="add-app-mange-content">
        <el-alert
          :closable="false"
          class="tips"
          title="*所填信息将影响媒体填充与收益，请谨慎填写！"
          type="warning"
          show-icon />
        <el-form ref="app" :model="appData" :rules="appRules" label-width="150px" class="app-form">
          <el-form-item label="应用名称" prop="appName">
            <el-col :span="14">
              <el-input v-model="appData.appName" placeholder="最多可输入50个字，请勿填写“Android，iOS”等便是应用平台的字样" />
            </el-col>
          </el-form-item>
          <el-form-item label="应用分类" required>
            <el-col :span="6">
              <el-form-item prop="cate1">
                <el-select v-model="appData.cate1">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="cate2">
                <el-select v-model="appData.cate2">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="程序主包名" prop="appMainPackName">
            <el-col :span="14">
              <el-input v-model="appData.appMainPackName" placeholder="开发者在项目中工程中自定义包名。例如：your.apckage.namespace" />
            </el-col>
          </el-form-item>
          <el-form-item label="应用市场下载链接" prop="downLink">
            <el-col :span="14">
              <el-input v-model="appData.downLink" placeholder="以”http：//”或者 ”https：// ”为开头" />
            </el-col>
          </el-form-item>
          <el-form-item label="应用关键词" prop="keyword">
            <el-col :span="14">
              <el-input v-model="appData.keyword" placeholder="准确填写有助于提高网站与产品匹配，以“，”分割。例如：购物，旅游" />
            </el-col>
          </el-form-item>
          <el-form-item label="日活用户数" prop="daynumberuser">
            <el-col :span="14">
              <el-input v-model="appData.daynumberuser" placeholder="请输入日活用户数" />
            </el-col>
          </el-form-item>
          <el-form-item label="适用人群" prop="painter">
            <el-col :span="14">
              <el-input v-model="appData.painter" placeholder="例如：男性，20~30" />
            </el-col>
          </el-form-item>
          <el-form-item label="应用描述">
            <el-col :span="14">
              <el-input v-model="appData.appDesc" maxlength="200" type="textarea" rows="6" resize="none" placeholder="最多可输入200个字符" />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="14" :offset="2">
              <el-checkbox v-model="checkedTerms">我已阅读并接受</el-checkbox>
              <span class="trems-title" @click="showTrems = true">《聚川广告平台服务条款》</span>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="14" :offset="2">
              <el-button class="app-btn" type="primary" @click="submitApp">提交</el-button>
              <el-button class="app-btn app-cancle-btn" type="primary" @click="back">取消</el-button>
            </el-col>
          </el-form-item>
        </el-form>
        <terms v-if="showTrems">
          <el-button type="primary" style="margin-top: 30px" @click="confirmTrems">确认</el-button>
        </terms>
      </div>
    </bag-box>
  </div>
</template>

<script>
import BagBox from '@/components/BagBox'
import Terms from '@/components/Terms'
export default {
  components: {
    BagBox,
    Terms
  },
  data() {
    var validateLink = (rule, value, callback) => {
      var httpReg = /(http|ftp|https):\/\//
      if (value === '') {
        callback(new Error('请输入引用市场下载链接'))
      } else if (!httpReg.test(value)) {
        callback(new Error('链接格式不正确!'))
      } else {
        callback()
      }
    }
    return {
      appData: {
        appName: '',
        cate1: '',
        cate2: '',
        appMainPackName: '',
        downLink: '',
        keyword: '',
        daynumberuser: '',
        painter: '',
        appDesc: ''
      },
      appRules: {
        appName: [
          { required: true, message: '请输入应用名称', trigger: 'blur' },
          { max: 50, message: '最多输入50个字', trigger: 'blur' }
        ],
        cate1: [
          { required: true, message: '请选择应用分类', trigger: 'change' }
        ],
        cate2: [
          { required: true, message: '请选择应用分类', trigger: 'change' }
        ],
        appMainPackName: [
          { required: true, message: '请输入程序主包名', trigger: 'blur' }
        ],
        downLink: [
          { required: true, validator: validateLink, trigger: 'blur' }
        ],
        keyword: [
          { required: true, message: '请输入应用关键词', trigger: 'blur' }
        ],
        daynumberuser: [
          { required: true, message: '请输入日活用户数', trigger: 'blur' }
        ],
        painter: [
          { required: true, message: '请输入适用人群', trigger: 'blur' }
        ]
      },
      checkedTerms: false,
      showTrems: false,
      options: [{
        value: '123',
        label: 'app'
      }, {
        value: '1234',
        label: 'app1'
      }]
    }
  },
  methods: {
    confirmTrems() {
      this.checkedTerms = true
      this.showTrems = false
    },
    back() {
      window.history.go(-1)
    },
    submitApp() {
      this.$refs.app.validate((valid) => {
        if (valid) {
          if (!this.checkedTerms) {
            this.$message({
              showClose: true,
              message: '请阅读勾选服务条款!',
              type: 'error'
            })
          } else {
            this.$notify({
              showClose: true,
              message: '添加成功',
              type: 'success'
            })
            this.$router.push({ 'path': '/app' })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
