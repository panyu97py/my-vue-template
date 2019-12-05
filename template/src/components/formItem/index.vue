<template >
  <el-col :span="size||8"
          :style="!isLast&&`marginBottom:${valueInArr(formItemType,['label','img'])?10:22}px`">
    <el-form-item :label="label"
                  style="marginBottom:0px"
                  :prop="prop">
      <el-row>
        <el-col :span="bodySize||14">
          <el-input :value="value"
                    :placeholder="placeholder||`请输入${label}`"
                    :disabled="disabled"
                    :show-password="showPassword"
                    :type="type"
                    @focus="handlerFocus"
                    @change="handlerChange"
                    @input="handlerInput"
                    class="components_formItem_input"
                    v-if="formItemType==='input'">
            <template slot="suffix">
              <slot name="suffix"
                    v-if="$slots.suffix" />
              <p v-else-if="unit"
                 class="components_formItem_unit">{{unit}}</p>
            </template>
          </el-input>
          <el-radio-group :value="value"
                          @input="handlerInput"
                          v-else-if="formItemType==='radio'&&formItemOption">
            <el-radio v-for="(item,index) in formItemOption"
                      :label="item[formItemValueKey]"
                      :disabled="disabled"
                      :key="index">{{item[formItemLabelKey]}}</el-radio>
          </el-radio-group>
          <el-select v-else-if="formItemType==='select'&&formItemOption"
                     class="components_formItem_select"
                     :value="formItemSelectAllItem&&value?value[formItemValueKey]:value"
                     :disabled="disabled"
                     @input="handlerInput"
                     :placeholder="placeholder||`请选择${label}`">
            <el-option v-for="(item,index) in formItemOption"
                       :key="index"
                       :label="item[formItemLabelKey]"
                       :value="item[formItemValueKey]" />
          </el-select>
          <p v-else-if="formItemType==='label'">{{value}}</p>
          <div v-else-if="formItemType==='img'"
               class="components_formItem_img">
            <div v-for="(img,index) in isArray(value)? value:[value]"
                 :key="index">
              <div class="components_formItem_img_masker">
                <i class="el-icon-zoom-in"
                   @click="handlerPreview(img)"></i>
              </div>
              <img :src="img"
                   alt="" />
            </div>
          </div>
          <elimUpload v-else-if="formItemType==='upload'"
                      :limit="uploadLimit"
                      @preview="handlerPreview" />
        </el-col>
        <el-col :span="slotSize||10"
                v-if="$slots.default">
          <slot />
        </el-col>
      </el-row>
    </el-form-item>
    <elim-dialog ref="previewDialog"
                 title="图片预览"
                 v-if="formItemType==='upload'||formItemType==='img'"
                 :hiddenFooter="true">
      <img :src="previewImgUrl"
           alt=""
           style="width:100%">
    </elim-dialog>
  </el-col>
</template>
<script>
import isArray from 'lodash/isArray'
import elimUpload from '@/components/upload'
export default {
  data () {
    return {
      isArray,
      previewImgUrl: ''
    }
  },
  props: ['value', 'type', 'showPassword', 'isLast', 'slotSize', 'disabled', 'placeholder', 'prop', 'label', 'size', 'unit', 'bodySize', 'option', 'valueKey', 'labelKey', 'uploadLimit', 'selectAllItem'],
  computed: {
    formItemSelectAllItem () {
      const { option, selectAllItem } = this
      return selectAllItem || (option && option.selectAllItem) || false
    },
    formItemType () {
      const { option, type } = this
      return type || (option && option.type) || 'input'
    },
    formItemValueKey () {
      const { option, valueKey } = this
      return valueKey || (option && option.valueKey) || 'value'
    },
    formItemLabelKey () {
      const { option, labelKey } = this
      return labelKey || (option && option.labelKey) || 'label'
    },
    formItemOption () {
      const { option } = this
      return (option && option.list) || option
    }
  },
  components: { elimUpload },
  methods: {
    valueInArr (value, arr) {
      return arr.filter(item => {
        return value === item
      }).length > 0
    },
    handlerInput (value) {
      const { formItemType, formItemSelectAllItem, formItemOption, formItemValueKey } = this
      if (formItemType === 'select' && formItemSelectAllItem) {
        const val = formItemOption.find(item => {
          return item[formItemValueKey] === value
        })
        console.log(val)
        this.$emit('input', val)
      } else {
        this.$emit('input', value)
      }
    },
    handlerFocus () {
      this.$emit('focus')
    },
    handlerChange (value) {
      this.$emit('change', value)
    },
    handlerPreview (fileUrl) {
      this.previewImgUrl = fileUrl
      this.$refs.previewDialog.open()
      this.$emit('preview', fileUrl)
    }
  }
}
</script>
<style lang="scss">
@import "./index.scss";
</style>
