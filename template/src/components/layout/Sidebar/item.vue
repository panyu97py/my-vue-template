<template>
  <div v-if="!item.hidden">
    <!-- 当没有子路由或显示的子路时 -->
    <template v-if="!item.children|| noHiddenChildNumber (item) < 1">
      <el-menu-item :index="item.path" :route="{name:item.name}" v-if="item.meta">
        <svg-icon :icon-class="item.meta.icon" class="sidebar_icon" v-if="item.meta.icon"/>
        <p slot="title">\{{item.meta.title}}</p>
      </el-menu-item>
    </template>
    <!-- 当只有一个显示的子路由时 -->
    <template v-else-if="noHiddenChildNumber (item) === 1">
      <el-menu-item
        :index="item.children[0].path"
        :route="{name:item.children[0].name}"
        v-if="item.children[0].meta"
      >
        <svg-icon
          :icon-class="item.children[0].meta.icon"
          class="sidebar_icon"
          v-if="item.children[0].meta.icon"
        />
        <p slot="title">\{{item.children[0].meta.title}}</p>
      </el-menu-item>
    </template>
    <!-- 当显示的子路由大于1时 -->
    <template v-else>
      <el-submenu :index="item.path" :key="item.name" v-if="item.meta">
        <template slot="title">
          <svg-icon :icon-class="item.meta.icon" class="sidebar_icon" v-if="item.meta.icon"/>
          <p slot="title">\{{item.meta.title}}</p>
        </template>
        <SidebarItem v-for="(item,index) in item.children" :key="index" :item="item"/>
      </el-submenu>
      <template v-else>
        <SidebarItem v-for="(item,index) in item.children" :key="index" :item="item"/>
      </template>
    </template>
  </div>
</template>
<script>
export default {
  name: 'SidebarItem',
  props: ['item'],
  methods: {
    noHiddenChildNumber (item) {
      let children = item.children.filter(item => {
        return !item.hidden
      })
      return children.length
    }
  }
}
</script>
