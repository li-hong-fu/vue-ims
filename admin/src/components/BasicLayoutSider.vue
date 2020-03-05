<template>
<el-col>
  <div class="logo-container">
    <img class="logo" src="@/assets/login_logo.jpg">
    <span>信息管理</span>
  </div>
  <el-menu
    :router="true"
    default-active="defaultActive"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose">
    <el-menu-item index="/admin/user">
      <i class="el-icon-date"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-menu-item index="/admin/classify">
      <i class="el-icon-date"></i>
      <span slot="title">分类管理</span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-share"></i>
        <span>文章管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/admin/article">文章列表</el-menu-item>
        <el-menu-item index="/admin/article/create">新建文章</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</el-col>
</template>

<script>
export default {
  props: {
    defaultActive: String
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
  .page-sider{
    height: 100%;
    .logo-container{
      height: 60px;
      line-height: 59px;
      color: #002140;
      font-size: 14px;
      border-bottom: 2px solid #e4e4e4;
      .logo{
        height: 40px;
        margin: 10px 20px;
        vertical-align: middle;
      }
    }
    ul{
      background: none;
      text-align: left;
      border: none;
    }
  }
</style>
