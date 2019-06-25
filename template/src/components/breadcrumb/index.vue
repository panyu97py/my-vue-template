<template>
  <div class="components_breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item,index) in breadcrumbList"
        :key="index"
        :to="item.to"
      >{{item.label}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: { ...mapGetters(['breadcrumbList']) }
}
</script>
