<template>
  <div class="components_layout">
    <Sidebar :isCollapse="isCollapse"/>
    <Navbar :isCollapse="isCollapse" @changeCollapse="isCollapse=!isCollapse"/>
    <mainView :isCollapse="isCollapse"/>
  </div>
</template>
<script>
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import mainView from './mainView'

export default {
  data () {
    return {
      isCollapse: true
    }
  },
  components: { Sidebar, Navbar, mainView }
}
</script>
