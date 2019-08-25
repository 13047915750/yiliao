<template>
  <section class="center pd30">
    <div class="basic-info">
      <h3 class="title">
        基础信息
      </h3>
      <div class="pd20">
        <table class="table-default">
          <tbody>
            <tr>
              <th>openid</th>
              <td>{{doctorInfo.openid}}</td>
              <th>姓名</th>
              <td>{{doctorInfo.name}}</td>
            </tr>
            <tr>
              <th>医院</th>
              <td>{{doctorInfo.hospital}}</td>
              <th>部门</th>
              <td>{{doctorInfo.department}}</td>
            </tr>
            <tr>
              <th>职称</th>
              <td>{{doctorInfo.title}}</td>
              <th>金额</th>
              <td>{{doctorInfo.price}}</td>
            </tr>
            <tr>
              <th>是否禁用</th>
              <td>{{doctorInfo.disable === 1? '是': '否' }}</td>
            </tr>
            <tr>
              <th>医生身份证</th>
              <td colspan="3">
                <div class="table-flex-box pd20">
                  <img class="pointer tableImg" v-if="doctorInfo.idCardFrontUrl" v-image-preview="doctorInfo.idCardFrontUrl" :src="doctorInfo.idCardFrontUrl">
                  <img v-else :src="require('@/assets/images/noImg.png')" class="tableImg">
                  <img class="pointer tableImg" v-if="doctorInfo.idCardBackUrl" v-image-preview="doctorInfo.idCardBackUrl" :src="doctorInfo.idCardBackUrl">
                  <img v-else :src="require('@/assets/images/noImg.png')" class="tableImg">
                </div>
              </td>
            </tr>
            <tr>
              <th>医生执照</th>
              <td colspan="3">
                <div class="pd20">
                  <img class="pointer tableImg" v-if="doctorInfo.lincenseUrl" v-image-preview="doctorInfo.lincenseUrl" :src="doctorInfo.lincenseUrl">
                  <img v-else :src="require('@/assets/images/noImg.png')" class="tableImg">
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'detail',
  components: {

  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['doctorInfo'])
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
</style>
