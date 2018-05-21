<template>
  <div>
    <div class="mt15 mb15">
      <span class="ml10">
        关键字:
        <el-input placeholder="昵称/手机号/等级"  @keyup.enter.native="check" size="small" v-model="keyword" class="w150"></el-input>
      </span>
      <span class="ml30">
        注册时间:
        <el-date-picker class="w300 ml10" v-model="rangeTime" size="small" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
        </el-date-picker>
      </span>
      <el-button type="primary" size="small" class="w100 ml30" @click="check">查询</el-button>
    </div>
    <el-table :data="tableData" v-loading="loading" border style="width: 100%">
      <el-table-column type="index" label="序号" width="100" align="center">
        <template slot-scope="scope">
          {{getIndex(scope.$index)}}
        </template>
      </el-table-column>
      <el-table-column label="头像" prop="headimgUrl" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.headimgUrl" width="60" height="60">
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" align="center">
      </el-table-column>
      <el-table-column prop="level" label="等级" align="center">
      </el-table-column>
      <el-table-column prop="regDate" label="注册时间" align="center">
        <template slot-scope="scope">
          {{getFormateTime(scope.row.regDate)}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="view(scope.row.id)">详情</el-button>
          <el-button type='text' v-if="state == 1" class="danger-color" @click="changeState(scope.row)">拉黑</el-button>
          <el-button type='text' v-if="state == 0" class="danger-color" @click="changeState(scope.row)">恢复</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="PAGINATION.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="PAGINATION.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="PAGINATION.total">
    </el-pagination>
  </div>
</template>
<script>
// import { searchUserListByPage, changeUserState } from '@/api/account'
export default {
  name: 'list',
  components: {
  },
  data() {
    return {
      loading: false,
      state: this.$route.query.state || 1,
      method: 'searchUserListByPage',
      keyword: '',
      tableData: [],
      dayMs: 24 * 60 * 60 * 1000,
      userState: {},
      rangeTime: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
    }
  },
  methods: {
    getParams() {
      let startTime = ''
      let endTime = ''
      if (this.rangeTime&&this.rangeTime.length > 0) {
        startTime = this.rangeTime[0].valueOf() / 1000
        endTime = (this.rangeTime[1].valueOf() + this.dayMs) / 1000
      }
      return {
        keyword: this.keyword,
        state: this.state,
        page: this.PAGINATION.currentPage,
        offset: this.PAGINATION.pageSize,
        startTime: startTime,
        endTime: endTime
      }
    },
    async searchUserListByPage() {
      this.loading = true
      var res = await searchUserListByPage({ ...this.queryParams })
      this.tableData = res.body.list
      this.PAGINATION.total = res.body.total
      this.loading = false
    },
    changeState(row) {
      this.userState.userid = row.id
      if (row.state == 1) {
        this.userState.state = 0
        this.$confirm("是否要拉黑该用户", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.changeUserState()
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作"
            })
          })
      } else {
        this.userState.state = 1
        this.$confirm("是否要恢复该用户?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.changeUserState()
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作"
            })
          })
      }

    },
    async changeUserState() {
      var res = await changeUserState({ ...this.userState })
      this.$message({
        type: 'success',
        message: res.msg
      })
      this.searchUserListByPage()
    },
    view(id) {
      this.$router.push({ path: '/account/detail', query: { userId: id } })
    },
  },
  created() {
    this.check()
  },
  mounted() {

  }
}
</script>
<style lang='less'>

</style>
