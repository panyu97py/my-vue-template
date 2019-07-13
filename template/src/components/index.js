import Vue from 'vue'
{{#echarts}}
import echarts from '@/components/echarts'
{{/echarts}}
import elimTable from '@/components/table'
import pagination from '@/components/pagination'
{{#svg}}
import SvgIcon from '@/components/SvgIcon'
{{/svg}}
{{#echarts}}
Vue.component('echarts', echarts)
{{/echarts}}
{{#svg}}
Vue.component('svg-icon', SvgIcon)
{{/svg}}
Vue.component('ele-table', elimTable)
Vue.component('pagination', pagination)
