<template>
  <router-view v-if="hidden" @refresh="getDocuments" :key="key"></router-view>
  <section v-else class="pd20">
    <el-form :inline="true" :model="queryForm" class="demo-form-inline">
      <el-form-item label="文章标题：">
        <el-input clearable size="mini" placeholder="请输入文章标题" v-model="queryForm.title" @keyup.enter.native="check"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" class="w80" icon="el-icon-search" @click="check">查询</el-button>
        <el-button type="primary" size="mini" class="w80" icon="el-icon-edit" @click="insert">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" v-loading="loading" stripe :header-cell-style="headerStyle">
      <el-table-column prop="imgUrl" label="标题图像" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" width="60" height="60" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center"></el-table-column>
      <el-table-column prop="name" label="作者" align="center"></el-table-column>
      <el-table-column prop="support" label="点赞数" align="center"></el-table-column>
      <el-table-column prop="browse" label="浏览次数" align="center"></el-table-column>
      <el-table-column prop="rank" label="等级" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="viewEdit(scope.row)">查看/编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="mt20 tr" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="PAGINATION.currentPage"
      :page-sizes="[5, 10, 20, 40]" :page-size="PAGINATION.pageSize" layout="total,sizes, prev, pager, next" :total="PAGINATION.total">
    </el-pagination>
  </section>
</template>

<script>
import { getDocuments } from '@/api/document'
export default {
  name: 'white',
  components: {

  },
  data() {
    return {
      hidden: this.$route.meta.hidden || false,
      method: 'getDocuments',
      loading: false,
      tableData: [],
      queryForm: {
        title: ''
      }
    }
  },
  computed: {
    key() {
      return this.$route.path + Math.random() * 9999
    }
  },
  watch: {
    '$route'() {
      this.hidden = this.$route.meta.hidden || false
    }
  },
  methods: {
    async getDocuments() {
      this.loading = true
      const res = await getDocuments({ ...this.queryParams })
      this.tableData = res.data.rows
      this.PAGINATION.total = res.data.count
      this.loading = false
    },
    viewEdit(row) {
      this.$$store.dispatch('setDocumentUpdateInfo', { ...row })
      this.$$router.push('/document/list/insert')
    },
    insert() {
      this.$router.push('/document/list/insert')
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
