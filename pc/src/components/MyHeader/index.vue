<template>
  <header>
    <div class="flex justify-between items-center">
      <img :src="require('@/assets/images/logo.png')" class="ml64" width="28" height="28">
      <h1 class="white mr64 fz24">医疗中后台管理系统</h1>
    </div>
  </header>
</template>
<script>
export default {
  name: 'MyFooter',
  components: {

  },
  data() {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  methods: {

  },
  created() {

  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
header {
  height: 60px;
  line-height: 60px;
  background-color: #060d20;
}
</style>
