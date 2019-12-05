<template>
  <div class="components_table_operte">
    <template v-for="key in keys">
      <elim-button :key="key"
                   v-if="operateList[key]&&!judgeHidden(key)"
                   :style="{fontWeight:'bold',margin:'5px 10px 5px 0'}"
                   @click="handlerClick(key)"
                   :icon="operateList[key].icon"
                   :text="operateList[key].text"
                   :disable="judgeDisable(key)"
                   :color="operateList[key].color" />
    </template>
  </div>
</template>
<script>
import isArray from 'lodash/isArray'
export default {
  props: ['keys', 'hideOperates', 'disableOperates'],
  methods: {
    handlerClick (key) {
      this.$emit('click', key)
    },
    judgeDisable (key) {
      let { disableOperates } = this
      if (!disableOperates) {
        return false
      }
      disableOperates = isArray(disableOperates) ? disableOperates : [disableOperates]
      return disableOperates.indexOf(key) > -1
    },
    judgeHidden (key) {
      let { hideOperates } = this
      if (!hideOperates) {
        return false
      }
      hideOperates = isArray(hideOperates) ? hideOperates : [hideOperates]
      return hideOperates.indexOf(key) > -1
    }
  },
  data () {
    return {
      // 操作列表
      operateList: {
        release: {
          text: '发布',
          color: '#199c8f',
          icon: '发布'
        },
        delete: {
          text: '删除',
          color: '#FE5562',
          icon: '删除'
        },
        cancel: {
          text: '撤销',
          color: '#ff9b26',
          icon: '撤销'
        },
        edit: {
          text: '编辑',
          color: '#1890FF',
          icon: '编辑'
        },
        control: {
          text: '控制命令',
          color: '#45BE87',
          icon: '控制命令'
        },
        auto: {
          text: '自动',
          color: '#13AE9F',
          icon: '自动'
        },
        manual: {
          text: '手动',
          color: '#7817CA',
          icon: '手动'
        }
      }
    }
  }
}
</script>
