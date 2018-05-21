<template>
  <div class="pd20">
    <h3 class="fsize ml15">基本信息</h3>
    <table class="mt30">
      <tr>
        <th>头像</th>
        <td> <img :src="information.headimgUrl" width="60" height="60"></td>
      </tr>
      <tr>
        <th>昵称</th>
        <td>{{information.nickname}}</td>
      </tr>
      <tr>
        <th>手机号</th>
        <td>{{information.phone}}</td>
      </tr>
      <tr>
        <th>等级</th>
        <td>{{information.level}}</td>
      </tr>
      <tr>
        <th>注册时间</th>
        <td>{{getFormateTime(information.regDate)}}</td>
      </tr>
      <tr>
        <th>经验值</th>
        <td>{{information.exp}}</td>
      </tr>
      <tr>
        <th>金币</th>
        <td>{{information.gold}}</td>
      </tr>
      <tr>
        <th>积分</th>
        <td>{{information.point}}</td>
      </tr>
      <tr>
        <th>农场数量</th>
        <td>{{information.ground}}</td>
      </tr>
      <tr>
        <th>帐号状态</th>
        <td>
          <span v-if="information.state == 1">正常</span>
          <span v-else>拉黑</span>
        </td>
      </tr>
      <tr>
        <th>上次登录时间</th>
        <td>{{getFormateTime(information.lastloginDate)}}</td>
      </tr>
    </table>
    <el-button plain class="mt30" @click="getUsersGroundListByPage(information.id)">查看用户农场</el-button>
    <el-button plain class="mt30" @click="back">返回</el-button>
    <el-dialog title="用户农场" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="name" label="农场名称" align="center">
      </el-table-column>
      <el-table-column property="number"  label="农场编号" align="center" width="100px">
      </el-table-column>
      <el-table-column property="housenum"  label="大棚编号" align="center" width="100px">
      </el-table-column>
      <el-table-column property="houseType" label="大棚类型" align="center">
      </el-table-column>
      <el-table-column property="addDate" label="下单时间" align="center">
        <template slot-scope="scope">
          {{getFormateTime(scope.row.addDate)}}
        </template>
      </el-table-column>
      <el-table-column property="remark" label="用户备注" align="left">
      </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
// import { getUserInfo, getUsersGroundListByPage } from '@/api/account'
export default {
  name: 'detail',
  data() {
    return {
      id: this.$route.query.userId,
      information: {},
      dialogTableVisible: false,
      gridData: []
    }
  },
  computed: {

  },
  methods: {
    async getUserInfo() {
      var res = await getUserInfo({ id: this.id })
      this.information = res.body
    },
    async getUsersGroundListByPage(id) {
      this.dialogTableVisible = true
      var res = await getUsersGroundListByPage({ userid: id })
      this.gridData = res.body.list
    }
  },
  created() {
    this.getUserInfo()
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
table {
  border-collapse: collapse;
}

table,
td,
th {
  border: 1px solid black;
}
th {
  background: rgba(66, 237, 180, 0.3);
  width: 200px;
  text-align: center;
  height: 36px;
}
td {
  width: 300px;
}
</style>
