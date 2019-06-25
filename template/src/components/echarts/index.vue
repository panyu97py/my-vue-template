<template>
  <div />
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'echarts',
  data () {
    return {
      chart: null
    }
  },
  props: {
    /** 传入 echart 配置项 （官网样式 直接传入即可） */
    option: {
      type: Object,
      required: true
    }
  },
  computed: {
    id () {
      return this.chart.id
    }
  },
  watch: {
    /** 监听图表数据的变化 （最好将配置选项作为函数方法的返回值） */
    option: {
      deep: true,
      handler (option) {
        this.chart.setOption(option)
      }
    }
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')
      window.addEventListener('resize', () => { this.chart.resize() })
      // this.$store.dispatch('setChartsList', this.chart)
      this.chart.setOption(this.option)
    }
  },
  // beforeDestroy () {
  //   this.$store.dispatch('chartDestroy', this.id)
  // },
  mounted () {
    this.initChart()
  }
}
</script>
