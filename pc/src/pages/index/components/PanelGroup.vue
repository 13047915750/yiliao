<template>
  <section class="panel-group">
    <el-row>
      <el-col :span="12">
        <div class="sta-top">
          <h3 class="fz30">
            <countTo :startVal='0' :endVal='doctors' :duration='2600'></countTo>
          </h3>
          <h3 class="fz18 mt15">医生总数</h3>
          <h3 class="mt5">
            <span class="gray">日增长数</span>
            <span :class="[{'success':doctorsDayRise > 0},{'danger':doctorsDayRise < 0}, {'wraning':doctorsDayRise ===0}]">
              <countTo :startVal='0' :endVal='doctorsDayRise' :duration='2600'></countTo>
              {{doctorsDayRise>=0?(doctorsDayRise===0?'':'↑'):'↓'}}
            </span>
          </h3>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="sta-top">
          <h3 class="fz30">
            <countTo :startVal='0' :endVal='patients' :duration='2600'></countTo>
          </h3>
          <h3 class="fz18 mt15">患者总数</h3>
          <h3 class="mt5">
            <span class="gray">日增长数</span>
            <span :class="[{'success':patientDayRise > 0},{'danger':patientDayRise < 0}, {'wraning':patientDayRise ===0}]">
              <countTo :startVal='0' :endVal='Math.abs(patientDayRise)' :duration='2600'></countTo>
              {{patientDayRise>=0?(patientDayRise===0?'':'↑'):'↓'}}
            </span>
          </h3>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import CountTo from 'vue-count-to'
export default {
  components: {
    CountTo
  },
  props: {
  },
  data() {
    return {
      doctors: 100,
      doctorsDayRise: 10,
      patients: 10000,
      patientDayRise: 1000
    }
  },
  computed: {

  },
  methods: {

  },
  created() {

  }
}
</script>

<style  lang="less" scoped>
.sta-top {
  position: relative;
  &::before {
    content: "";
    display: block;
    height: 50%;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    border-right: 1px solid #e7e7e7;
  }
}
.panel-group {
  padding: 30px;
  text-align: center;
  box-shadow: rgba(48, 46, 46, 0.1) 0px 0px 5px 0px;
}
</style>
