<template>
  <div class="components_pagination" :class="absolute && 'components_pagination_absolute'">
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="value"
      :page-count="pageCount"
      @current-change="(currentPage)=>{$emit('input',currentPage)}"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  props: ['pageCount', 'value', 'absolute']
}
</script>
