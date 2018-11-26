<template>
  <div class="table-box">
    <el-table
      :data="tableData"
      :cell-class-name="stripeTable"
      empty-text="暂无广告位数据"
      style="width: 100%">
      <el-table-column
        prop="name"
        width="200px"
        align="center"
        label="名称" />
      <el-table-column
        prop="type"
        align="center"
        label="流量类型" />
      <el-table-column
        prop="adFormat"
        align="center"
        label="广告形式" />
      <el-table-column
        prop="auditStatus"
        width="150px"
        align="center"
        label="审核状态">
        <template slot-scope="scope">
          <span v-if="scope.row.auditStatus == 0" class="no-pass-status">审核未通过</span>
          <span v-if="scope.row.auditStatus == 1" class="pass-status">审核中</span>
          <span v-if="scope.row.auditStatus == 2" class="pass-status">审核通过</span>
        </template>
      </el-table-column>
      <el-table-column
        width="120px"
        align="center"
        label="投放状态">
        <template slot-scope="scope">
          <div v-if="scope.row.auditStatus == 2">
            <span v-if="scope.row.putStatus == 0" class="no-pass-status">已下线</span>
            <span v-if="scope.row.putStatus == 1" class="pass-status">投放中</span>
          </div>
          <span v-else>---</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="adSid"
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
            :class="{ 'stop-btn-color': scope.row.putStatus == 1 }"
            size="small"
            type="success"
            class="start-btn-color"
            @click="changeAdverStatus(scope.row)"
          >
            {{ scope.row.putStatus == 0 ? '启用' : '停用' }}
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

export default {
  components: {
    ExitTips
  },
  data() {
    return {
      tableData: [{
        name: '锁屏充电屏保一图两文',
        type: 'App',
        adFormat: '信息流',
        auditStatus: 0,
        putStatus: 0,
        adSid: '8Djjdjdnoas2974474793393 '
      }, {
        name: '微锁屏启动页',
        type: 'App',
        adFormat: '信息流',
        auditStatus: 1,
        putStatus: 0,
        adSid: '8Djjdjdnoas2974474793393 '
      }, {
        name: '锁屏充电屏保一图两文',
        type: 'App',
        adFormat: '信息流',
        auditStatus: 2,
        putStatus: 1,
        adSid: '8Djjdjdnoas2974474793393 '
      }, {
        name: '锁屏充电屏保一图两文',
        type: 'App',
        adFormat: '信息流',
        auditStatus: 2,
        putStatus: 0,
        adSid: '8Djjdjdnoas2974474793393 '
      }],
      showDeleBox: false,
      currentItem: ''
    }
  },
  methods: {
    stripeTable({ row, column, rowIndex, columnIndex }) {
      return rowIndex % 2 ? '' : 'stripe-cell'
    },
    editAdver(row) {
    },
    changeAdverStatus(row) {
      if (row.auditStatus !== 2) {
        this.$message({
          showClose: true,
          message: '审核未通过,不能进行投放~',
          type: 'error'
        })
      } else {
        this.showDeleBox = true
        this.currentItem = row
      }
    },
    confirmDelete() {
      this.currentItem.putStatus = this.currentItem.putStatus === 0 ? 1 : 0
      this.showDeleBox = false
    },
    closeDeleteBox() {
      this.showDeleBox = false
    }
  }
}
</script>
