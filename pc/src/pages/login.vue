<template>
  <div class="login">
    <div class="login-panel">
      <h2 class="login-title text-center">医疗管理系统</h2>
      <el-form :model="form" ref="form" class="mt20" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username" @keyup.enter.native="login('form')" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password"  @keyup.enter.native="login('form')"  placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="login('form')"  :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// import { loginByPassword } from '@/api/admin'
export default {
  name: 'login',
  components: {
  },
  data() {
    var validateAcc = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请输入账号'));
      }else {
        callback()
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请输入密码'));
      }else {
        callback()
      }
    };
    return {
      loading: false,
      rememberPass: false,
      form: {
        username: '',
        password: ''
      },
      Rurl: this.$route.query.Rurl,
      rules: {
        username: [
          { validator: validateAcc, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
           this.$router.push(this.Rurl ? this.Rurl : '/account')
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    async  loginByPassword() {
      try {
        this.loading = true
        var res = await loginByPassword({ ...this.form })
         this.$message({
          type: "success",
          message: res.msg
        })
        this.$store.dispatch('login')
        this.$router.push(this.Rurl ? this.Rurl : '/statistics')
      } catch (err) {
        this.loading = false
        this.$message({
          type: "error",
          message: err.msg
        })
      }

    }
  },
  created() {
  },
  mounted() {

  }
}
</script>
<style lang='less'>

</style>
