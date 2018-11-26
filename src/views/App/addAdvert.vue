<template>
  <div class="container-padding dev-advert">
    <bag-box title="添加广告位">
      <div slot="content" class="add-app-mange-content">
        <el-form ref="advert" :model="advertData" :rules="advertRules" label-width="150px" class="app-form">
          <el-form-item label="应用名称：">
            <el-col :span="12">
              <span>巴拉巴拉</span>
            </el-col>
          </el-form-item>
          <el-form-item label="广告位名称：" prop="addName">
            <el-col :span="12">
              <el-input v-model="advertData.addName" placeholder="最多可输入20个字符" />
            </el-col>
          </el-form-item>
          <el-form-item label="广告位类型：" prop="adType">
            <el-col :span="12">
              <el-radio v-model="advertData.adType.type" label="1">开屏</el-radio>
              <el-radio v-model="advertData.adType.type" label="2" style="margin-left: 50px;">原生</el-radio>
              <el-radio v-model="advertData.adType.type" label="3" style="margin-left: 50px;">充电屏保</el-radio>
              <transition name="fade" mode="out-in">
                <el-card v-show="advertData.adType.type === '2'" class="box-card">
                  <div v-for="(size, index) in typeNativeSize" :key="index" class="text item">
                    <el-radio v-model="advertData.adType.size" :label="size">尺寸：{{ size }}</el-radio>
                  </div>
                </el-card>
              </transition>
            </el-col>
          </el-form-item>
          <el-form-item label="每次请求广告数：" prop="reqNumber">
            <el-col :span="12">
              <el-input v-model="advertData.reqNumber" type="number" placeholder="默认1条，最多10条" />
            </el-col>
          </el-form-item>
          <el-form-item label="预计点击率：" prop="preClick">
            <el-col :span="12">
              <el-input v-model="advertData.preClick" placeholder="如：20%；（即广告位历史点击）" />
            </el-col>
          </el-form-item>
          <el-form-item label="预计曝光率：" prop="preExposure">
            <el-col :span="12">
              <el-input v-model="advertData.preExposure" placeholder="如：300000；（即广告位历史曝光）" />
            </el-col>
          </el-form-item>
          <el-form-item label="广告位位置描述：">
            <el-col :span="12">
              <el-input v-model="advertData.adDesc" maxlength="200" type="textarea" rows="6" resize="none" placeholder="如：“开屏-应用首页顶部”；字数100字以内" />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="12" :offset="2">
              <el-checkbox v-model="checkedTerms">我已阅读并接受</el-checkbox>
              <span class="trems-title" @click="showTrems = true">《聚川广告平台服务条款》</span>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="12" :offset="2">
              <el-button class="app-btn" type="primary" @click="submitAdvert">提交</el-button>
              <el-button class="app-btn app-cancle-btn" type="primary" @click="back">取消</el-button>
            </el-col>
          </el-form-item>
        </el-form>
        <div class="show-effect">
          <img :src="showImg">
        </div>
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
    var reqNumberValid = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入每次请求广告数'))
      } else if (value > 10) {
        callback(new Error('每次请求广告数最多10条!'))
      } else {
        callback()
      }
    }
    return {
      advertData: {
        appName: '',
        addName: '',
        adType: {
          type: '1',
          size: '640-320'
        },
        reqNumber: '',
        preClick: '',
        preExposure: '',
        adDesc: ''
      },
      advertRules: {
        addName: [
          { required: true, message: '请输入广告位名称', trigger: 'blur' },
          { max: 50, message: '最多输入50个字', trigger: 'blur' }
        ],
        adType: [
          { required: true, message: '请选择广告位类型', trigger: 'blur' }
        ],
        reqNumber: [
          { required: true, validator: reqNumberValid, trigger: 'blur' }
        ],
        preClick: [
          { required: true, message: '请输入预计点击率', trigger: 'blur' }
        ],
        preExposure: [
          { required: true, message: '请输入预计点击率', trigger: 'blur' }
        ],
        daynumberuser: [
          { required: true, message: '请输入预计曝光率：', trigger: 'blur' }
        ],
        adDesc: [
          { required: true, message: '请输入广告位位置描述', trigger: 'blur' }
        ]
      },
      typeNativeSize: ['640-320', '640-360', '120-120'],
      checkedTerms: false,
      showTrems: false
    }
  },
  computed: {
    'showImg': function() {
      const type = this.advertData.adType.type
      if (type === '1') {
        return require('./img/coopen.png')
      } else if (type === '2') {
        return require(`./img/${this.advertData.adType.size}.png`)
      } else {
        return require('./img/charge.png')
      }
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
    submitAdvert() {
      this.$refs.advert.validate((valid) => {
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
