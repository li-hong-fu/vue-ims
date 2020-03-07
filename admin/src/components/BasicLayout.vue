<template>
<el-container>
  <el-aside width="300px">
    <Sider class="page-sider" />
  </el-aside>
  <el-container>
    <el-header>
      <Header class="page-header" />
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer>
      <Footer class="page-footer" />
    </el-footer>
  </el-container>
</el-container>
</template>

<script>
import Header from './BasicLayoutHeader'
import Footer from './BasicLayoutFooter'
import Sider from './BasicLayoutSider'
export default {
  data () {
    return {
    }
  },
  components: {
    Header,
    Footer,
    Sider
  }
}
</script>

<style lang="less" scoped>
  .el-container{
    height: 100%;
  }
  .el-header, .el-footer {
    color: #333;
    text-align: center;
    line-height: 60px;
    border-bottom: 2px solid #e4e4e4;
  }

  .el-aside {
    border-right: 2px solid #e4e4e4;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    border-bottom: 2px solid #e4e4e4;
    color: #333;
    text-align: center;
    line-height: 30px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
