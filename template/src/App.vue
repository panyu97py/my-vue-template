<template>
  <div id="app">
    <img src="./assets/logo.jpg"
         class="logo">
    <svg-icon icon-class="alarm" />
     {{#router}}
    <router-view/>
    {{else}}
    <demo/>
    {{/router}}
  </div>
</template>

<script>
{{#unless router}}
  import demo from './views/demo'
{{/unless}}
export default {
  name: 'App'{{#router}}{{else}},
    components: {
      demo
    }{{/router}}
}
</script>

<style lang='scss'>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $globalFontColor;
  margin-top: 60px;
  .logo {
    width: 200px;
    height: 200px;
  }
}
</style>
