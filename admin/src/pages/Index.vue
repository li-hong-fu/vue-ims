<template>
  <el-container class="page-container">
    <el-header class="page-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">全部</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">技术动态</a></el-breadcrumb-item>
        <el-breadcrumb-item>极客新闻</el-breadcrumb-item>
        <el-breadcrumb-item>通知公告</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button>
        <i class="el-icon-user"></i>
        <span @click="login">管理员登录</span>
      </el-button>
    </el-header>
    <el-main class="page-main">Main</el-main>
    <el-footer class="page-footer">
      <div>Copyright © 2018 Design by jikexueyuan All Rights Reserved</div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    login () {
      this.$router.replace({ name: 'Login' })
    }
  }
}
</script>

<style lang="less" scoped>
  .page-container{
    display: flex;
    flex-direction: column;
    height: 100%;
    .page-header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      /deep/.el-breadcrumb__item{
        font-size: 18px;
        font-family: monospace;
      }
    }
    .page-main{
      flex: 1;
    }
  }
</style>
