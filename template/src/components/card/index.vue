<template>
  <div class="components_card">
    <div class="components_card_view"
         ref="components_card_view"
         :class="viewClass"
         :style="viewStyle">
      <div class="components_card_view_head"
           ref="components_card_view_head"
           v-if="$slots.head_right||$slots.head_left||title"
           :class="headClass"
           :style="headStyle">
        <div class="components_card_view_head_left">
          <div v-if="title||subTitle">
            <p v-if="title"
               class="components_card_view_head_title">{{title}}</p>
            <p v-if="subTitle"
               class="components_card_view_head_subTitle">{{subTitle}}</p>
          </div>
          <slot name="head_left" />
        </div>
        <div class="components_card_view_head_right">
          <slot name="head_right" />
        </div>
      </div>
      <div class="components_card_view_body"
           :class="`${bodyClass||''}`"
           :style="bodyStyle">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['title', 'bodyClass', 'bodyStyle', 'headClass', 'headStyle', 'viewClass', 'viewStyle', 'subTitle']
}
</script>
<style lang="scss">
@import "./index.scss";
</style>
