<template>
  <div :class="isCollapse?'components_layout_Sidebar_collapse':'components_layout_Sidebar'">
    <template v-if="isCollapse">
      <div class="components_layout_Sidebar_logo">
        <svg-icon icon-class="logo"/>
      </div>
      <p class="components_layout_Sidebar_title">热水智慧运维平台</p>
    </template>
    <el-menu
      class="components_layout_Sidebar_menu"
      :unique-opened="true"
      :collapse="!isCollapse"
      mode="vertical"
      :router="true"
      background-color="#1c2b36"
      text-color="#9BA4AB"
      active-text-color="#12ACEF"
    >
      <SidebarItem v-for="(item,index) in router" :key="index" :item="item"/>
    </el-menu>
  </div>
</template>
<script>
import SidebarItem from './item'
export default {
  props: ['isCollapse'],
  computed: {
    router () {
      return this.$router.options.routes
    }
  },
  components: {
    SidebarItem
  }
}
</script>
