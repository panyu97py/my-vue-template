<template>
  <div class="components_checkboxGroup">
    <el-checkbox :indeterminate="isIndeterminate"
                 v-model="checkAll"
                 @change="handleCheckAllChange">全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group :value="value"
                       @input="handlerInput">
      <el-row>
        <el-col v-for="item in option"
                :span="boxSize"
                :key="item[valueKey]">
          <el-checkbox :label="item[valueKey]">{{\item[labelKey]}}</el-checkbox>
        </el-col>
      </el-row>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  props: {
    option: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    value: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    labelKey: {
      type: String,
      required: false,
      default () {
        return 'label'
      }
    },
    valueKey: {
      type: String,
      required: false,
      default () {
        return 'value'
      }
    },
    boxSize: {
      type: Number,
      required: false,
      default () {
        return 6
      }
    }
  },
  watch: {
    value: {
      deep: true,
      handler (value) {
        this.handleCheckedChange(value)
      }
    }
  },
  computed: {
    isIndeterminate () {
      const checkedCount = this.value.length
      return checkedCount > 0 && checkedCount < this.option.length
    },
    allValue () {
      return this.option.map(item => {
        return item[this.valueKey]
      })
    }
  },
  data () {
    return {
      checkAll: false
    }
  },
  methods: {
    handlerInput (value) {
      this.$emit('input', value)
    },
    handleCheckAllChange (val) {
      this.handlerInput(val ? this.allValue : [])
    },
    handleCheckedChange (value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.allValue.length
    }
  }
}
</script>
<style lang="scss">
@import "./index.scss";
</style>
