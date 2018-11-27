<template>
  <div class="container-padding dev-advert">
    <bag-box title="添加广告位">
      <div slot="content" class="add-app-mange-content">
        <el-form ref="advert" :model="advertData" :rules="advertRules" label-width="150px" class="app-form">
          <el-form-item label="应用名称：">
            <el-col :span="12">
              <span>{{ $route.query.app }}</span>
            </el-col>
          </el-form-item>
          <el-form-item label="广告位名称：" prop="posname">
            <el-col :span="12">
              <el-input v-model="advertData.posname" placeholder="最多可输入20个字符" />
            </el-col>
          </el-form-item>
          <el-form-item label="广告位类型：" prop="postype">
            <el-col :span="12">
              <el-radio v-model="advertData.postype" label="1">开屏</el-radio>
              <el-radio v-model="advertData.postype" label="2" style="margin-left: 50px;">原生</el-radio>
              <el-radio v-model="advertData.postype" label="3" style="margin-left: 50px;">充电屏保</el-radio>
              <transition name="fade" mode="out-in">
                <el-card v-show="advertData.postype === '2'" class="box-card">
                  <div v-for="(size, index) in typeNativeSize" :key="index" class="text item">
                    <el-radio v-model="advertData.size" :label="size">尺寸：{{ size }}</el-radio>
                  </div>
                </el-card>
              </transition>
            </el-col>
          </el-form-item>
          <el-form-item label="每次请求广告数：" prop="number">
            <el-col :span="12">
              <el-input v-model="advertData.number" type="number" placeholder="默认1条，最多10条" />
            </el-col>
          </el-form-item>
          <el-form-item label="预计点击率：" prop="click">
            <el-col :span="12">
              <el-input v-model="advertData.click" placeholder="如：20%；（即广告位历史点击）" />
            </el-col>
          </el-form-item>
          <el-form-item label="预计曝光率：" prop="views">
            <el-col :span="12">
              <el-input v-model="advertData.views" placeholder="如：300000；（即广告位历史曝光）" />
            </el-col>
          </el-form-item>
          <el-form-item label="广告位位置描述：">
            <el-col :span="12">
              <el-input v-model="advertData.summary" maxlength="200" type="textarea" rows="6" resize="none" placeholder="如：“开屏-应用首页顶部”；字数100字以内" />
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
import { getInfo, handlePositions } from '@/api/app/positions'
export default {
  components: {
    BagBox,
    Terms
  },
  data() {
    var numberValid = (rule, value, callback) => {
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
        posname: '',
        postype: '1',
        size: '640-320',
        number: '',
        click: '',
        views: '',
        summary: ''
      },
      advertRules: {
        posname: [
          { required: true, message: '请输入广告位名称', trigger: 'blur' },
          { max: 50, message: '最多输入50个字', trigger: 'blur' }
        ],
        postype: [
          { required: true, message: '请选择广告位类型', trigger: 'blur' }
        ],
        number: [
          { required: true, validator: numberValid, trigger: 'blur' }
        ],
        click: [
          { required: true, message: '请输入预计点击率', trigger: 'blur' }
        ],
        views: [
          { required: true, message: '请输入预计点击率', trigger: 'blur' }
        ],
        daynumberuser: [
          { required: true, message: '请输入预计曝光率：', trigger: 'blur' }
        ],
        summary: [
          { required: true, message: '请输入广告位位置描述', trigger: 'blur' }
        ]
      },
      typeNativeSize: ['640-320', '640-360', '120-120'],
      checkedTerms: true,
      showTrems: false
    }
  },
  computed: {
    'showImg': function() {
      const type = this.advertData.postype
      if (type === '1') {
        return require('./img/coopen.png')
      } else if (type === '2') {
        return require(`./img/${this.advertData.size}.png`)
      } else {
        return require('./img/charge.png')
      }
    }
  },
  created() {
    const posid = this.$route.query.posid
    if (posid) {
      getInfo(posid).then(res => {
        const data = res.data
        Object.keys(this.advertData).forEach(item => {
          this.advertData[item] = data[item]
        })
        if (!this.advertData.size) {
          this.advertData.size = '640-320'
        }
      })
    }
  },
  methods: {
    confirmTrems() {
      this.checkedTerms = true
      this.showTrems = false
    },
    back() {
      this.$router.push({ 'path': '/app' })
    },
    handelCallback(type, send, message) {
      handlePositions(type, send).then(() => {
        this.$notify({
          showClose: true,
          message,
          duration: 1500,
          type: 'success'
        })
        this.$router.push({ 'path': '/app' })
      })
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
            var send = Object.assign({}, this.advertData)
            const posid = this.$route.query.posid
            if (send.postype !== '2') {
              send.size = ''
            }
            send.appid = this.$route.query.id
            if (posid) {
              send.posid = posid
              this.handelCallback('edit', send, '修改成功')
            } else {
              this.handelCallback('add', send, '添加成功')
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
