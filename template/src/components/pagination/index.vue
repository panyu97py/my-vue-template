<template>
  <div class="components_pagination"
       :class="absolute && 'components_pagination_absolute'">
    <el-pagination background
                   layout="prev, pager, next"
                   :current-page="currentPage"
                   :page-count="pageCount"
                   hide-on-single-page
                   @current-change="handlerCurrentChange"></el-pagination>
  </div>
</template>
<script>
export default {
  props: ['pageCount', 'value', 'absolute', 'apiPageStart'],
  computed: {
    currentPage () {
      return this.apiPageStart !== 0 && this.apiPageStart !== '0' ? this.value : this.value + 1
    }
  },
  methods: {
    handlerCurrentChange (currentPage) {
      const submitPage = this.apiPageStart !== 0 && this.apiPageStart !== '0' ? currentPage : currentPage - 1
      this.$emit('input', submitPage)
      this.$emit('change', submitPage)
    }
  }
}
</script>
<style lang="scss">
@import "./index.scss";
</style>
