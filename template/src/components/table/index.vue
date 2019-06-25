<template>
  <el-table :data="data"
            stripe
            ref="elimTable"
            class="components_table"
            :key="tableKey"
            @row-click="(row, event, column)=>{$emit('rowClick',row, event, column)}"
            @select="select"
            @selection-change="selectionChange"
            header-cell-class-name="components_table_head"
            cell-class-name="components_table_cell">
    <template v-for="(item,index) in columnList">
      <el-table-column v-if="item.type==='selection'"
                       :key="index"
                       :type="item.type"
                       width="55" />
      <el-table-column v-else-if="item.type==='html'"
                       :label="item.label"
                       :key="index">
        <template slot-scope="scope">
          <div v-html="scope.row[item.key]"></div>
        </template>
      </el-table-column>
      <el-table-column v-else
                       :key="index"
                       :prop="item.key"
                       :label="item.label" />
    </template>
  </el-table>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  props: ['data', 'columnList', 'primaryKey', 'tableKey'],
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
    }
  },
  watch: {
    data: {
      deep: true,
      handler (data) {
        this.selection = []
        this.toggleRowSelection()
      }
    },
    selectValueLength: {
      deep: true,
      handler (data) {
        this.submitSelectValue()
      }
    }
  },
  methods: {
    /** 提交选择项 */
    submitSelectValue () {
      this.$emit('getSelectValue', this.selectValue)
    },
    /** 切换选择项选中状态 */
    toggleRowSelection () {
      let timmer = 0
      timmer = setInterval(() => {
        if (this.data) {
          let primaryKey = this.primaryKey || 'id'
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
    }
  }
}
</script>
