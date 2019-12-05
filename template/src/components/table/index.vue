<template>
  <el-table :data="data"
            stripe
            ref="elimTable"
            class="components_table"
            :key="tableKey"
            :height="height"
            @row-click="(row, event, column)=>{$emit('rowClick',row, event, column)}"
            @select="select"
            @select-all="selectAll"
            @selection-change="selectionChange"
            header-cell-class-name="components_table_head"
            cell-class-name="components_table_cell">
    <template v-for="(item,index) in columnList">
      <el-table-column v-if="item.type==='selection'"
                       :key="index"
                       :type="item.type"
                       width="55" />
      <el-table-column v-else-if="item.type==='html'"
                       :width="item.width"
                       :label="item.label"
                       :key="index">
        <template slot-scope="scope">
          <div v-html="scope.row[item.key]"></div>
        </template>
      </el-table-column>
      <el-table-column :label="item.label"
                       :width="item.width"
                       :key="index"
                       v-else-if="item.type==='operate'">
        <template slot-scope="scope">
          <operate :keys="item.key.split(',')"
                   :hideOperates="scope.row.hideOperates"
                   :disableOperates="scope.row.disableOperates"
                   @click="handlerOperate($event,scope.row,item)" />
        </template>
      </el-table-column>
      <el-table-column v-else-if="item.type==='slot'"
                       :width="item.width"
                       :label="item.label"
                       :key="index">
        <template slot-scope="scope">
          <slot :name="item.key"
                :row="scope.row" />
        </template>
      </el-table-column>
      <el-table-column v-else
                       :key="index"
                       :width="item.width"
                       :prop="item.key"
                       :label="item.label" />
    </template>
    <slot />
  </el-table>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import operate from './operate'
export default {
  props: ['data', 'value', 'columnList', 'primaryKey', 'tableKey', 'height'],
  components: {
    operate
  },
  data () {
    return {
      // 所有的所被选择的选项
      selectValue: [],
      // 当前显示的被选择的项
      selection: []
    }
  },
  computed: {
    selectValueLength () {
      return this.selectValue.length
    },
    hasSelection () {
      const index = this.columnList.findIndex(item => {
        return item.type === 'selection'
      })
      return index >= 0
    }
  },
  mounted () {
    if (this.value) {
      this.selectValue = this.value
      this.selection = []
      this.toggleRowSelection()
    }
  },
  watch: {
    value: {
      deep: true,
      handler (value) {
        if (this.value && this.selectValue !== this.value && this.hasSelection) {
          this.selectValue = this.value
          this.selection = []
          this.toggleRowSelection()
        }
      }
    },
    data: {
      deep: true,
      handler (data) {
        if (this.hasSelection) {
          this.selection = []
          this.toggleRowSelection()
        }
      }
    },
    selectValueLength: {
      deep: true,
      handler (data) {
        if (this.hasSelection) {
          this.submitSelectValue()
        }
      }
    }
  },
  methods: {
    async handlerOperate (key, row, item) {
      const SensitiveOperationKeys = ['delete', 'cancel', 'release']
      const isSensitiveOperation = SensitiveOperationKeys.indexOf(key) >= 0
      if (isSensitiveOperation) {
        await this.handlerSensitiveOperation(item, key)
      }
      this.$emit(key, row)
    },
    /** 敏感操作 */
    handlerSensitiveOperation (item, key) {
      return new Promise((resolve, reject) => {
        this.$confirm(item[`${key}WarningMsg`] || '此操作为敏感操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resolve()
        }).catch((err) => {
          this.$notify.info({
            title: '消息',
            message: '已取消'
          })
          reject(err)
        })
      })
    },
    exportExcel (hasSelection) {
      const excel = new this.$utils.Excel(this.$el)
      if (hasSelection) {
        excel.deleteCol('Sheet1', 0)
      }
      excel.export()
    },
    /** 提交选择项 */
    submitSelectValue () {
      this.$emit('selectValueChange', this.selectValue)
      this.$emit('input', this.selectValue)
    },
    /** 切换选择项选中状态 */
    toggleRowSelection () {
      let timmer = 0
      timmer = setInterval(() => {
        if (this.data && this.$refs.elimTable) {
          let primaryKey = this.primaryKey || 'id'
          // 先清空表格中的被选项
          this.data.map(item => {
            this.$refs.elimTable.toggleRowSelection(item, false)
          })
          // 勾选对应数据
          this.selectValue.map(selectItem => {
            let selectRowIndex = this.data.findIndex(item => {
              return item[primaryKey] === selectItem[primaryKey]
            })
            if (selectRowIndex >= 0) {
              this.$refs.elimTable.toggleRowSelection(this.data[selectRowIndex], true)
              // } else {
              //   console.log({ selectItem })
            }
          })
          clearInterval(timmer)
        }
      })
    },
    /** 设置选择项 */
    setSelectValue (row, status) {
      let primaryKey = this.primaryKey || 'id'
      let index = this.selectValue.findIndex(item => { return item[primaryKey] === row[primaryKey] })
      if (status === '+' && index < 0) {
        this.selectValue.push(row)
      } else if (status === '-' && index >= 0) {
        this.selectValue.splice(index, 1)
      }
    },
    /** 当选择项发生变化时会触发该事件 */
    selectionChange (selection) {
      this.$emit('selection', selection)
    },
    /** 用户手动勾选数据行的checkbox时触发 */
    select (selection, row) {
      let status = this.selection > selection ? '-' : '+'
      this.selection = cloneDeep(selection)
      this.setSelectValue(row, status)
      this.$emit('select', selection, row)
    },
    /** 当用户手动勾选全选 Checkbox 时触发的事件 */
    selectAll (selection) {
      let status = selection.length === 0 ? '-' : '+'
      this.data.map(row => {
        this.setSelectValue(row, status)
      })
      this.$emit('selectAll', selection)
    }
  }
}
</script>
<style lang="scss">
@import "./index.scss";
</style>
