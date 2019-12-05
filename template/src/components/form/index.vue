<template>
  <el-form :model="model"
           :label-width="labelWidth||'100px'"
           :disabled="disabled"
           :hide-required-asterisk="true"
           ref="form"
           :rules="rules"
           class="components_form">
    <el-row class="components_form_body"
            :gutter="gutter">
      <slot/>
    </el-row>
  </el-form>
</template>
<script>
export default {
  props: ['labelWidth', 'model', 'rules', 'gutter', 'disabled'],
  methods: {
    validate (callBack) {
      this.$refs.form.validate(callBack)
    }
  }
}
</script>
<style lang="scss">
@import "./index.scss";
</style>
