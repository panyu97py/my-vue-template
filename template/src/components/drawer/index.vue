<template>
  <el-drawer class="components_drawer"
             ref="elim-drawer"
             :visible.sync="drawer"
             @close="handlerClose"
             :destroy-on-close="true"
             :show-close="false"
             :wrapperClosable="true"
             :size="size||'30%'"
             :direction="direction">
    <div slot="title"
         class="components_drawer_header">
      <p class="components_drawer_header_title">{{title||'title'}}</p>
      <p class="components_drawer_header_closeIcon"
         @click="close">×</p>
    </div>
    <div class="components_drawer_body">
      <slot />
    </div>
  </el-drawer>
</template>
<script>
export default {
  props: ['size', 'title'],
  data () {
    return {
      // 开关状态
      drawer: false,
      // 方向 右往左
      direction: 'rtl'
    }
  },
  methods: {
    open () {
      this.drawer = true
    },
    close () {
      this.$refs['elim-drawer'].closeDrawer()
    },
    handlerClose () {
      this.drawer = false
    }
  }
}
</script>
<style lang="scss">
@import "./index.scss";
</style>
