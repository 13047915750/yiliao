<template>
  <div class="pd20">
    <el-tabs v-model="activeName"  @tab-click="handleClick">
      <el-tab-pane label="白名单" name="1">
        <account-list v-if="activeName == '1'" :state='1'></account-list>
      </el-tab-pane>
      <el-tab-pane label="黑名单" name="0">
        <account-list v-if="activeName == '0'" :state='0'></account-list>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>
<script>
import accountList from './list'
export default {
  name: 'account',
  components: { accountList },
  data() {
    return {
      activeName: this.$route.query.state || 1
    }
  },
  computed: {

  },
  watch: {
    $route(val) {
      this.activeName = val.query.state
    }
  },
  methods: {
    handleClick(vm) {
      var inx = vm.name
      this.$router.push({ path: '/account', query: { state: inx } })
    }
  },
  created() {

  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
