<template>
  <el-dialog custom-class="components_dialog"
             :visible.sync="visible"
             :destroy-on-close="destroyOnClose"
             :close-on-click-modal="closeOnClickModal"
             :show-close="showClose"
             :before-close="beforeClose"
             :width="width"
             @open="handlerOpen"
             @close="handlerClose"
             @opened="handlerOpened"
             @closed="handlerClosed"
             center>
    <template slot="title">
      <p v-if="!$slots.title"
         class="components_dialog_title">
        {{title}}
      </p>
      <slot name="title"
            v-else />
    </template>
    <slot />
    <template slot="footer"
              v-if="!hiddenFooter">
      <template v-if="!$slots.footer">
        <elim-button :text="cancelText"
                     @click="cancel" />
        <elim-button type="primary"
                     :text="confirmText"
                     @click="save" />
        <slot name="footerButtonGroup" />
      </template>
      <slot name="footer"
            v-else />
    </template>
  </el-dialog>
</template>
<script>
export default {
  props: {
    cancelText: {
      type: String,
      required: false,
      default: '取消'
    },
    confirmText: {
      type: String,
      required: false,
      default: '保存'
    },
    hiddenFooter: {
      type: Boolean,
      required: false,
      default: false
    },
    showClose: {
      type: Boolean,
      required: false,
      default: true
    },
    width: {
      type: String,
      required: false,
      default: '30%'
    },
    title: {
      type: String,
      required: false
    },
    beforeClose: {
      type: Function,
      required: false
    },
    destroyOnClose: {
      type: Boolean,
      require: false,
      default: true
    },
    closeOnClickModal: {
      type: Boolean,
      require: false,
      default: false
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    handlerOpen () {
      this.$emit('open')
    },
    handlerClose () {
      this.$emit('close')
    },
    handlerOpened () {
      this.$emit('opened')
    },
    handlerClosed () {
      this.$emit('closed')
    },
    save () {
      this.$emit('save')
      this.$emit('confirm')
    },
    cancel () {
      this.$emit('cancel')
    },
    open () {
      this.visible = true
    },
    close () {
      this.visible = false
    }
  }
}
</script>
<style lang="scss">
@import "./index.scss";
</style>
