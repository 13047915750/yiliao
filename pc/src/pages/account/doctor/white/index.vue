<template>
  <section class="pd20">
    <el-form :inline="true" :model="queryForm" class="demo-form-inline">
      <el-form-item label="医生名称：">
        <el-input clearable size="mini" placeholder="请输入医生名称" v-model="queryForm.name" @keyup.enter.native="check"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" class="w80" icon="el-icon-search" @click="check">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" v-loading="loading" stripe :header-cell-style="headerStyle">
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="imgUrl" label="头像" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" width="60" height="60" />
        </template>
      </el-table-column>
      <el-table-column prop="openid" label="openid" align="center"></el-table-column>
      <el-table-column prop="hospital" label="医院" align="center"></el-table-column>
      <el-table-column prop="department" label="部门" align="center"></el-table-column>
      <el-table-column prop="title" label="职称" align="center"></el-table-column>
      <el-table-column prop="price" label="金额（元）" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="disable(scope.row)">禁用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="mt20 tr" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="PAGINATION.currentPage"
      :page-sizes="[5, 10, 20, 40]" :page-size="PAGINATION.pageSize" layout="total,sizes, prev, pager, next" :total="PAGINATION.total">
    </el-pagination>
  </section>
</template>

<script>
import { getDoctors, patchDoctor } from '@/api/account'
export default {
  name: 'white',
  components: {

  },
  data() {
    return {
      method: 'getDoctors',
      loading: false,
      tableData: [],
      queryForm: {
        name: '',
        disable: 1
      },
      doctorInfo: {
      }
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    async getDoctors() {
      this.loading = true
      const res = await getDoctors({ ...this.queryParams })
      this.tableData = res.data.rows
      this.PAGINATION.total = res.data.count
      this.loading = false
    },
    disable(row) {
      this.doctorInfo = { ...row }
      this.$confirm(`是否启运该医生?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.patchDoctor()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消 操作'
          })
        })
    },
    async patchDoctor() {
      await patchDoctor({ ...this.doctorInfo, disable: 1 })
      this.$message({
        type: 'success',
        message: '禁用成功'
      })
      this.getDoctors()
    }
  },
  created() {
    // this.check()
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
