<template>
  <section class="pd20">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="白名单" name="doctor-white"></el-tab-pane>
      <el-tab-pane label="黑名单" name="doctor-black"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: 'doctor',
  components: {
  },
  data() {
    return {
      activeName: 'doctor-white'
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    handleClick(tab, event) {
      switch (tab.name) {
        case 'doctor-white':
          this.$router.push('/account/doctor/white')
          break
        case 'doctor-black':
          this.$router.push('/account/doctor/black')
          break
      }
    },
    initActive() {
      this.activeName = this.$route.name
    }

  },
  created() {
    this.initActive()
  },
  mounted() {

  },
  updated() {
    this.initActive()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
