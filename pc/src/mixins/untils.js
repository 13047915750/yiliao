import moment from 'moment'
export default {
  components: {},
  data() {
    return {
      queryParams: {},
      PAGINATION: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
    }
  },
  computed: {},
  methods: {
    back() {
      this.$router.back()
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    getFormateTime(timestamp) {
      if (`${timestamp}`.length < 13) {
        timestamp *= 1000
      }
      if (timestamp >= 0) {
        return moment(timestamp).format('YYYY-MM-DD HH:mm')
      } else {
        return ''
      }
    },
    getDayTime(timestamp) {
      if (`${timestamp}`.length < 13) {
        timestamp *= 1000
      }
      if (timestamp >= 0) {
        return moment(timestamp).format('YYYY-MM-DD')
      } else {
        return ''
      }
    },
    getIndex(index) {
      var rowIndex =
        this.PAGINATION.pageSize * (this.PAGINATION.currentPage - 1) +
        index +
        1;
      return rowIndex < 10 ? `0${rowIndex}` : rowIndex
    },
    validator_imgUrl(rule, value, callback) {
      if (!value) {
        callback(new Error('请上传图片'))
      } else {
        callback()
      }
    },
    validator_number(rule, value, callback) {
      var reg = /^\d{3}$/
      if (!value) {
        callback(new Error('请填写编号'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入三位数字'))
      } else {
        callback()
      }
    },
    validator_price(rule, value, callback) {
      var reg = /^[0-9]*$/
      if (!value) {
        callback(new Error('请填写价格'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入整数'))
      } else {
        callback()
      }
    },
    validator_gold(rule, value, callback) {
      var reg = /^[0-9]*$/
      if (!value) {
        callback(new Error('请填写金币数量'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入整数'))
      } else {
        callback()
      }
    },
    validator_name(rule, value, callback) {
      var reg = /^[\u4e00-\u9fa5]{4,8}$/
      if (value == null || value == '') {
        callback(new Error('名称不能为空'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入4-8位的中文名字'))
      } else {
        callback()
      }
    },
    check() {
      this.PAGINATION = {
        ...this.PAGINATION,
        currentPage: 1
      }
      this.queryParams = this.getParams()
      this.useMethod()
    },
    handleSizeChange(pageSize) {
      this.PAGINATION = {
        ...this.PAGINATION,
        pageSize
      }
      this.queryParams = {
        ...this.queryParams,
        offset: this.PAGINATION.pageSize
      }
      this.useMethod()
    },
    handleCurrentChange(currentPage) {
      this.PAGINATION = {
        ...this.PAGINATION,
        currentPage
      }
      this.queryParams = {
        ...this.queryParams,
        page: this.PAGINATION.currentPage
      }
      this.useMethod()
    },
    useMethod() {
      switch (this.method) {
      
      }
    }
  }
}
