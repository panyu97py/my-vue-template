<template>
  <div
    :class="isCollapse?'components_layout_Navbar_collapse':'components_layout_Navbar_notCollapse'"
    class="components_layout_Navbar"
  >
    <div class="components_layout_Navbar_left">
      <svg-icon
        icon-class="menu"
        :class="isCollapse?'components_layout_Navbar_collapse_icon':'components_layout_Navbar_notCollapse_icon'"
        @click="$emit('changeCollapse')"
      />
      <breadcrumb class="components_layout_Navbar_left_breadcrumb"/>
    </div>
    <div class="components_layout_Navbar_right"></div>
  </div>
</template>
<script>
import breadcrumb from '@/components/breadcrumb'
export default {
  props: ['isCollapse'],
  components: { breadcrumb }
}
</script>
