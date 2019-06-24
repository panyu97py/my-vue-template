<template>
  <div :class="isCollapse?'components_layout_mainView_collapse':'components_layout_mainView'">
    <!-- <transition name="fade" mode="out-in"> -->
      <router-view/>
    <!-- </transition> -->
  </div>
</template>
<script>
export default {
  props: ['isCollapse']
}
</script>
