import Vue from 'vue'
{{#echarts}}
import echarts from '@/components/echarts'
{{/echarts}}
import SvgIcon from '@/components/SvgIcon'
import table from '@/components/table'
import pagination from '@/components/pagination'
import form from '@/components/form'
import formItem from '@/components/formItem'
import dialog from '@/components/dialog'
import checkboxGroup from '@/components/checkboxGroup'
{{#echarts}}
Vue.component('echarts', echarts)
{{/echarts}}
{{#svg}}
Vue.component('svg-icon', SvgIcon)
{{/svg}}
Vue.component('elim-table', table)
Vue.component('elim-pagination', pagination)
Vue.component('elim-drawer', drawer)
Vue.component('elim-form', form)
Vue.component('elim-formItem', formItem)
Vue.component('elim-dialog', dialog)
Vue.component('elim-checkboxGroup', checkboxGroup)