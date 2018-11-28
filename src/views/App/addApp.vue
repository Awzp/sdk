<template>
  <div class="container-padding">
    <bag-box title="添加应用">
      <div slot="content" class="add-app-mange-content">
        <el-alert
          v-if="!$route.query.id"
          :closable="false"
          class="tips"
          title="*所填信息将影响媒体填充与收益，请谨慎填写！"
          type="warning"
          show-icon />
        <el-form ref="app" :model="appData" :rules="appRules" label-width="150px" class="app-form">
          <el-form-item label="应用名称" prop="appname">
            <el-col :span="14">
              <el-input v-model="appData.appname" placeholder="最多可输入50个字，请勿填写“Android，iOS”等便是应用平台的字样" />
            </el-col>
          </el-form-item>
          <el-form-item label="应用分类" required>
            <el-col :span="6">
              <el-form-item prop="apptype">
                <el-select v-model="appData.apptype" @change="apptypeChange">
                  <el-option
                    v-for="item in typeList"
                    :key="item.id"
                    :label="item.dict_name"
                    :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="subtype">
                <el-select v-model="appData.subtype">
                  <el-option
                    v-for="item in subTypeList"
                    :key="item.id"
                    :label="item.dict_name"
                    :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="操作系统" prop="os">
            <el-col :span="14">
              <el-input v-model="appData.os" placeholder="请输入操作系统" />
            </el-col>
          </el-form-item>
          <el-form-item label="程序主包名" prop="packagename">
            <el-col :span="14">
              <el-input v-model="appData.packagename" placeholder="开发者在项目中工程中自定义包名。例如：your.apckage.namespace" />
            </el-col>
          </el-form-item>
          <el-form-item label="应用市场下载链接" prop="linkurl">
            <el-col :span="14">
              <el-input v-model="appData.linkurl" placeholder="以”http：//”或者 ”https：// ”为开头" />
            </el-col>
          </el-form-item>
          <el-form-item label="应用关键词" prop="keyword">
            <el-col :span="14">
              <el-input v-model="appData.keyword" placeholder="准确填写有助于提高网站与产品匹配，以“，”分割。例如：购物，旅游" />
            </el-col>
          </el-form-item>
          <el-form-item label="日活用户数" prop="activeperday">
            <el-col :span="14">
              <el-input v-model="appData.activeperday" placeholder="请输入日活用户数" />
            </el-col>
          </el-form-item>
          <el-form-item label="适用人群" prop="groups">
            <el-col :span="14">
              <el-input v-model="appData.groups" placeholder="例如：男性，20~30" />
            </el-col>
          </el-form-item>
          <el-form-item label="应用描述">
            <el-col :span="14">
              <el-input v-model="appData.summary" maxlength="200" type="textarea" rows="6" resize="none" placeholder="最多可输入200个字符" />
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
import { getCategory, getAppInfo, HandelApp } from '@/api/app/app'
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
        appname: '',
        apptype: '',
        subtype: '',
        os: '',
        packagename: '',
        linkurl: '',
        keyword: '',
        activeperday: '',
        groups: '',
        summary: ''
      },
      appRules: {
        appname: [
          { required: true, message: '请输入应用名称', trigger: 'blur' },
          { max: 50, message: '最多输入50个字', trigger: 'blur' }
        ],
        apptype: [
          { required: true, message: '请选择应用分类', trigger: 'blur' }
        ],
        subtype: [
          { required: true, message: '请选择应用分类', trigger: 'blur' }
        ],
        os: [
          { required: true, message: '请输入操作系统', trigger: 'blur' }
        ],
        packagename: [
          { required: true, message: '请输入程序主包名', trigger: 'blur' }
        ],
        linkurl: [
          { required: true, validator: validateLink, trigger: 'blur' }
        ],
        keyword: [
          { required: true, message: '请输入应用关键词', trigger: 'blur' }
        ],
        activeperday: [
          { required: true, message: '请输入日活用户数', trigger: 'blur' }
        ],
        groups: [
          { required: true, message: '请输入适用人群', trigger: 'blur' }
        ]
      },
      checkedTerms: true,
      showTrems: false,
      typeList: [],
      subTypeList: []
    }
  },
  created() {
    getCategory({ cataid: '5bf7b64158e3cf09fa4c0ff1' }).then(res => {
      this.typeList = res.data.list
    })
    if (this.$route.query.id) {
      getAppInfo(this.$route.query.id).then(res => {
        const data = res.data
        Object.keys(this.appData).forEach(item => {
          this.appData[item] = data[item]
        })
        getCategory({ cataid: '5bf7b64158e3cf09fa4c0ff1', pid: this.appData.apptype }).then(res => {
          this.subTypeList = res.data.list
        })
      })
    }
  },
  methods: {
    confirmTrems() {
      this.checkedTerms = true
      this.showTrems = false
    },
    apptypeChange(id) {
      getCategory({ cataid: '5bf7b64158e3cf09fa4c0ff1', pid: id }).then(res => {
        this.subTypeList = res.data.list
      })
      this.appData.subtype = ''
    },
    back() {
      this.$router.push({ 'path': '/app' })
    },
    handelCallback(type, data, mes) {
      HandelApp(type, data, mes).then(() => {
        this.$notify({
          showClose: true,
          message: `${mes}成功`,
          duration: 1500,
          type: 'success'
        })
        this.$router.push({ 'path': '/app' })
      })
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
            const id = this.$route.query.id
            if (id) {
              var send = Object.assign({}, this.appData)
              send.appid = id
              this.handelCallback('edit', send, '修改')
            } else {
              this.handelCallback('add', this.appData, '添加')
            }
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
