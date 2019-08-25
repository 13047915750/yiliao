<template>
  <div class="login">
    <my-header class="my-header"></my-header>
    <div class="login-panel">
      <h2 class="tc gray">管理员登录</h2>
      <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="手机号登陆" name="first"></el-tab-pane>
        <el-tab-pane label="用户名登陆" name="second"></el-tab-pane>
      </el-tabs> -->
      <el-form :model="form" ref="form" class="mt20">
        <el-form-item v-if="activeName === 'first'" prop="phone" :rules="{validator:validator_phone,trigger:'blur'}">
          <el-input v-model="form.phone" type="number" placeholder="手机号">
            <template slot="prepend">
              <img :src="require('@/assets/images/phone.png')" width="15" height="15">
            </template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="activeName === 'second'" prop="username" :rules="{validator:validator_username,trigger:'blur'}">
          <el-input v-model="form.username" placeholder="用户名">
            <template slot="prepend">
              <img :src="require('@/assets/images/user.png')" width="15" height="15">
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" :rules="{required:true,message:'请输入密码',trigger:'blur'}">
          <el-input type="password" v-model="form.password" placeholder="密码">
            <template slot="prepend">
              <img :src="require('@/assets/images/pass.png')" width="15" height="15">
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="image_code" :rules="{required:true,message:'请输入验证码',trigger:'blur'}">
          <el-input v-model="form.image_code" placeholder="验证码" class="w320">
            <template slot="prepend">
              <img :src="require('@/assets/images/pass.png')" width="15" height="15">
            </template>
          </el-input>
          <img :src="imgSrc" class="pointer imgsize" @click="getImageCode" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="submit('form')" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <my-footer class="my-footer"></my-footer>
  </div>
</template>
<script>
import MyHeader from '@/components/MyHeader'
import MyFooter from '@/components/MyFooter'
import axios from 'axios'
import { getOptionAllow, getReportLogin } from '@/api/public'
import { phonePasswordByLogin, usernamePasswordByLogin, phoneExist, usernameExist } from '@/api/account'
export default {
  name: 'login',
  components: {
    MyHeader, MyFooter
  },
  data() {
    return {
      activeName: 'second',
      imgSrc: '',
      loading: false,
      form: {
        phone: '',
        username: '',
        password: '',
        image_code: ''
      }
    }
  },
  methods: {
    getImageCode() {
      this.imgSrc = `/api/user-center/v1.0/captcha/image/code?width=110&height=35&nonce=${new Date().getTime()}`
    },
    validator_phone(rule, value, callback) {
      const reg = /^((1[3,5,7,8,9][0-9])|(14[5,7])|)\d{8}$/
      if (value === '' || value === null || value === undefined) {
        callback(new Error('请输入手机号'))
      } else if (!reg.test(value)) {
        callback(new Error('手机号码格式不正确'))
      } else {
        phoneExist({ phone: value }).then(res => {
          if (!res.data) {
            callback(new Error('该手机号还未注册'))
          } else {
            callback()
          }
        })
      }
    },
    validator_username(rule, value, callback) {
      if (value === '' || value === null || value === undefined) {
        callback(new Error('请输入用户名'))
      } else {
        usernameExist({ username: value }).then(res => {
          if (!res.data) {
            callback(new Error('该用户名未注册'))
          } else {
            callback()
          }
        })
      }
    },
    async getHasPermission(data) {
      await axios.get('/rc/v1/admin/acl/hasPermission', {
        headers: {
          Authorization: data.token
        }
      }).then((res) => {
        if (res.data.code === 0) {
          this.$store.dispatch('setUserInfo', data).then(() => {
            this.getOptionAllow()
            this.getReportLogin()
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
          this.loading = false
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error.message
        })
      })
      this.loading = false
    },
    async getOptionAllow() {
      const res = await getOptionAllow()
      this.$store.dispatch('setPermission', res.body).then(() => {
        this.$router.push('/index')
      })
    },
    async getReportLogin() {
      await getReportLogin()
    },
    async phonePasswordByLogin() {
      try {
        this.loading = true
        const res = await phonePasswordByLogin({ ...this.form })
        this.getHasPermission(res.data)
      } catch (error) {
        this.getImageCode()
        this.loading = false
      }
    },
    async usernamePasswordByLogin() {
      try {
        this.loading = true
        const res = await usernamePasswordByLogin({ ...this.form })
        this.getHasPermission(res.data)
      } catch (error) {
        this.getImageCode()
        this.loading = false
      }
    },
    handleClick() {
      this.$refs.form.resetFields()
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.activeName === 'first') {
            this.phonePasswordByLogin()
          } else {
            this.usernamePasswordByLogin()
          }
        } else {
          return false
        }
      })
    }
  },
  created() {
    this.getImageCode()
  },
  mounted() { }
}
</script>
<style lang='less'>
.login {
  width: 100%;
  height: calc(100% - 60px);
  margin-bottom: 60px;
  position: relative;
  background: url("../../assets/images/banner.png") no-repeat;
  background-size: 100% 100%;
  // background-color: #2d3a4b;
}

.login-panel {
  position: absolute;
  left: 0;
  right: 0;
  width: 520px;
  padding: 35px 35px 15px 35px;
  margin: 120px auto;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: rgba(255, 255, 255, 0.3) 0px 0px 15px 6px;
  .el-menu--horizontal > .el-menu-item {
    text-align: center;
    width: 50%;
  }
  .el-menu--horizontal > .el-menu-item.is-active {
    color: #409eff;
  }
  .el-tabs__item {
    width: 225px;
    text-align: center;
  }
}
.imgsize {
  width: 100px;
  height: 38px;
  border: 1px solid #eee;
}
.my-footer {
  position: absolute;
  left: 0;
  bottom: -60px;
  right: 0;
  z-index: 100;
}
</style>
