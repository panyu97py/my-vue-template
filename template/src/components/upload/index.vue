<template>
  <div class="components_upload">
    <el-upload action="https://jsonplaceholder.typicode.com/posts/"
               :http-request="uploadImg"
               list-type="picture-card"
               :limit="limit"
               :on-success="handleSuccess"
               :on-preview="handlePictureCardPreview"
               :on-remove="handleRemove">
      <div class="components_upload_icon">
        <i class="el-icon-plus components_upload_iconPlus"></i>
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: ['limit'],
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    async uploadImg (item) {
      let formData = new FormData()
      // formData.append('file', item.file)
      formData.append('uploadFile', item.file)
      console.log(formData)
      // await this.$api.upLoadImg(formData)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handleSuccess (response, file, fileList) {
      console.log(response, file, fileList)
    },
    handlePictureCardPreview (file) {
      this.$emit('preview', file.url)
    }
  }
}
</script>
<style lang="scss">
@import "./index.scss";
</style>
