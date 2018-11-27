<template>
  <div class="table-box">
    <el-table
      :data="data"
      :cell-class-name="stripeTable"
      empty-text="暂无广告位数据"
      style="width: 100%">
      <el-table-column
        prop="posname"
        width="200px"
        align="center"
        label="名称" />
      <el-table-column
        prop="adFormat"
        align="center"
        label="广告形式">
        <template slot-scope="scope">
          <span>{{ scope.row.postype }}</span>
          <span v-if="scope.row.size">{{ scope.row.size }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="enabled"
        width="150px"
        align="center"
        label="审核状态">
        <template slot-scope="scope">
          <span v-if="scope.row.enabled == 0" class="pass-status">审核中</span>
          <span v-if="scope.row.enabled == 1" class="pass-status">审核通过</span>
          <span v-if="scope.row.enabled == 2" class="no-pass-status">审核未通过</span>
        </template>
      </el-table-column>
      <el-table-column
        width="120px"
        align="center"
        label="投放状态">
        <template slot-scope="scope">
          <div v-if="scope.row.enabled == 1">
            <span v-if="scope.row.online == 0" class="no-pass-status">已下线</span>
            <span v-if="scope.row.online == 1" class="pass-status">投放中</span>
          </div>
          <span v-else>---</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        align="center"
        width="240px"
        label="广告位ID" />
      <el-table-column
        align="center"
        width="160px"
        label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="editAdver(scope.row)" >编辑</el-button>
          <el-button
            :class="{ 'stop-btn-color': scope.row.online == 1 }"
            size="small"
            type="success"
            class="start-btn-color"
            @click="changeAdverStatus(scope.row)"
          >
            {{ scope.row.online == 0 ? '启用' : '停用' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <ExitTips
      :show-exit="showDeleBox"
      title="是否确定停用广告位"
      @closebox="closeDeleteBox"
      @confirmClick="confirmDelete"
    >
      <p class="exit-dia-desc">广告位停用后工作人员<span>一个工作日</span>内停用该广告位</p>
    </ExitTips>
  </div>
</template>

<script>
import ExitTips from '@/components/ExitTips'
import { OnOffline } from '@/api/app/positions'
export default {
  components: {
    ExitTips
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    app: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showDeleBox: false,
      currentItem: ''
    }
  },
  methods: {
    stripeTable({ row, column, rowIndex, columnIndex }) {
      return rowIndex % 2 ? '' : 'stripe-cell'
    },
    editAdver(row) {
      this.$router.push({ 'path': '/app/addAdvert', query: { id: this.id, app: this.app, posid: row.id }})
    },
    changeAdverStatus(row) {
      if (row.enabled !== 1) {
        this.$message({
          showClose: true,
          message: '审核未通过,不能进行投放~',
          duration: 1000,
          type: 'error'
        })
      } else {
        if (row.online === 0) {
          OnOffline('online', row.id).then(() => {
            this.$message({
              showClose: true,
              message: '上线成功',
              duration: 1000,
              type: 'success'
            })
            row.online = 1
          })
        } else {
          this.showDeleBox = true
          this.currentItem = row
        }
      }
    },
    confirmDelete() {
      OnOffline('offline', this.currentItem.id).then(() => {
        this.$message({
          showClose: true,
          message: '下线成功',
          duration: 1000,
          type: 'success'
        })
        this.currentItem.online = 0
      })
      this.showDeleBox = false
    },
    closeDeleteBox() {
      this.showDeleBox = false
    }
  }
}
</script>
