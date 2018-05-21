<template>
  <div style="position:relative;" id="home-body">
    <div class="left-menu">
      <div class="logo text-center">
        <h3>医疗后台管理系统</h3>
      </div>
      <el-menu class="el-menu-vertical-demo" background-color="#002124" text-color="#eee" router>
        <el-submenu index="0">
          <template slot="title">统计管理</template>
          <el-menu-item index="/statistics" class="sub-title">充值统计</el-menu-item>
        </el-submenu>
        <el-submenu index="1">
          <template slot="title">账号管理</template>
          <el-menu-item index="/account" :route="{path:'/account',query:{state:'1'}}" class="sub-title">用户管理</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">订单管理</template>
          <el-menu-item index="/order/onlineService" class="sub-title">线上服务类订单</el-menu-item>
          <el-menu-item index="/order/entity" :route="{path:'/order/entity',query:{type:'3'}}" class="sub-title">实物类订单</el-menu-item>
          <el-menu-item index="/order/nursery/immediately" :route="{path:'/order/nursery/immediately',query:{type:'0'}}" class="sub-title">苗木类订单</el-menu-item>
          <el-menu-item index="/order/recharge" class="sub-title">充值类订单</el-menu-item>
          <el-menu-item index="/order/space" class="sub-title">空地类订单</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="right-sec">
      <div class="right-head pd15">
        <el-popover placement="bottom" width="200" trigger="click">
          <div style="text-align:center;display:block;margin:0;box-sizing:border-box;padding:0 20px;border-bottom:1px solid #eee;">
            <el-button type="text">修改密码</el-button>
          </div>
          <div style="text-align:center;display:block;margin:0">
            <el-button type="text" @click="logout">退出登录</el-button>
          </div>
          <template slot="reference">
            <span class="mr10" style="cursor:pointer">{{adminName}}
              <i class="el-icon-arrow-down" style="cursor:pointer"></i>
            </span>
          </template>
        </el-popover>
      </div>
      <div class="pd15 bg-home">
        <div class="bg-white" id="main-body">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { logout } from '@/api/admin'
export default {
  name: 'home',
  components: {

  },
  data() {
    return {
      adminName: 'admin',
    }
  },
  methods: {
    async logout() {
      var fullPath = this.$route.fullPath
      console.log(fullPath)
      var res = await logout()
      this.$store.dispatch("logout").then(res => {
        this.$message({
          type: 'error',
          message: '登出成功'
        })
        this.$router.push({ path: '/login', query: { Rurl: fullPath } })
      })
    }
  },
  created() { },
  mounted() {
    document.getElementById('home-body').style.minHeight = (window.screen.height - 90) + 'px'
    document.getElementById('main-body').style.minHeight = (window.screen.height - 175) + 'px'
  },
}
</script>

<style lang='less'>

</style>