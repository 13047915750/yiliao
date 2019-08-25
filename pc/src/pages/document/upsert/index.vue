<template>
  <section class="center pd30">
    <div class="pd20">
      <el-form :model="ruleForm" ref="ruleForm" class="table-form" label-width="150px">
        <el-form-item label="文章图像：" prop="imgUrl" :rules="{required:true,message:'请上传应用图片',trigger:'blur'}">
          <el-upload class="avatar-uploader" action="" :http-request="uploadHttp" :show-file-list="false" :before-upload="beforeAvatarUpload" multiple>
            <img v-if="ruleForm.imgUrl" :src="ruleForm.imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章标题：" prop="title" :rules="{required:true,message:'请输入文章标题',trigger:'blur'}">
          <el-input v-model="ruleForm.title" size="mini" class="w300" clearable placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="作者：" prop="name" :rules="{required:true,validator:validate_name,trigger:'blur'}">
          <el-input v-model="ruleForm.name" size="mini" class="w300" clearable placeholder="请输入作者姓名"></el-input>
        </el-form-item>
        <el-form-item label="等级：" prop="rank" :rules="{required:true,message:'请选择文章等级',trigger:'change'}">
          <el-select v-model="queryForm.rank" size="mini" clearable placeholder="请选择文章等级">
            <template v-for="item in 10">
              <el-option :key="item" :label="item" :value="item">
              </el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容：" prop="content" :rules="{required:true,meesage:'请输入文章内容',trigger:'blur'}">
          <tinymce ref="richText" v-model="ruleForm.content" @on-upload-complete="onEditorUploadComplete"></tinymce>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w150" size="small" @click="submitForm('ruleForm')">提交</el-button>
          <el-button plain class="w150" size="small" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import validate from '@/mixin/validate'
import { postDocument, patchDocument } from '@/api/document'
import { ossUpload, uploadImg } from '@/api/public'
import tinymce from '@/components/TinyMce'
window.tinymce.baseURL = '/static/tinymce'
export default {
  name: 'editForm',
  mixins: [validate],
  components: {
    tinymce
  },
  data() {
    return {
      ruleForm: {
        imgUrl: '',
        content: '欢迎使用'
      },
      view: {
        name: this.$route.name,
        path: this.$route.path,
        title: this.$route.meta.title
      }
    }
  },
  computed: {
    ...mapGetters(['documentUpdateInfo', 'documentInsertInfo'])
  },
  watch: {

  },
  methods: {
    async postDocument() {
      await postDocument({ ...this.ruleForm })
      this.$message({
        type: 'success',
        message: '新增成功'
      })
      this.resetForm('ruleForm')
      this.closeSelectedTag()
    },
    async patchDocument() {
      await patchDocument({ ...this.ruleForm })
      this.$message({
        type: 'success',
        message: '编辑成功'
      })
      this.closeSelectedTag()
    },
    uploadHttp(content) {
      this.file = content.file
      this.ossUpload(this.file.type)
    },
    async ossUpload(type) {
      try {
        const res = await ossUpload({ type })
        this.uploadImg(res.data, this.file)
      } catch (error) {
        this.$message({
          type: 'error',
          message: error.msg
        })
      }
    },
    async uploadImg(data, file) {
      try {
        const res = await uploadImg(data, file)
        this.$message({
          type: 'success',
          message: '上传图片成功'
        })
        this.ruleForm.imgUrl = res.data.ossUrl
      } catch (error) {
        this.$message({
          type: 'error',
          message: error.msg
        })
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.view.name === 'document-update') {
            this.patchDocument()
          } else {
            this.postDocument()
          }
        } else {
          return false
        }
      })
    },
    onEditorUploadComplete(res) {
      if (res.code === 0) {
        this.$message({
          type: 'success',
          message: '上传成功'
        })
      } else {
        this.$message({
          type: 'error',
          message: res.msg
        })
      }
    },
    resetForm(formName) {
      // 重置为 第一次赋值状态
      this.$refs[formName].resetFields()
      if (this.view.name === 'document-insert') {
        this.ruleForm = {
          imgUrl: ''
        }
      }
    },
    closeSelectedTag() {
      this.$store.dispatch('delVisitedViews', this.view).then((views) => {
        this.$emit('refresh')
        this.$router.replace('/document/list')
      })
    }
  },
  created() {
    // 加载信息
    if (this.view.name === 'document-update') {
      this.ruleForm = { ...this.documentUpdateInfo }
    } else {
      if (JSON.stringify(this.documentInsertInfo) !== '{}') {
        this.ruleForm = { ...this.documentInsertInfo }
      } else {
        this.ruleForm = {
          imgUrl: '',
          content: ''
        }
      }
    }
  },
  mounted() {

  },
  beforeDestroy() {
    // 缓存编辑结果
    if (this.view.name === 'document-insert') {
      this.$store.dispatch('setDocumentInsertInfo', this.ruleForm)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.avatar {
  width: 300px;
  height: 160px;
}
.table-form {
  .el-form-item {
    margin-top: 20px;
    // margin-bottom: 0;
  }
}
</style>
