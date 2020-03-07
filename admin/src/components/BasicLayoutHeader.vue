<template>
<el-row>
  <el-button>
    <i class="el-icon-service"></i>
    <span @click="exit">退出系统</span>
  </el-button>
</el-row>
</template>

<script>
// import axios from 'axios'
export default {
  created () {
    this.route()
  },
  watch: {
    $route: 'route'
  },
  methods: {
    route () {
      let token = localStorage.getItem('token')
      if (!token) this.$router.replace({ name: 'Login' })
    },
    exit () {
      localStorage.removeItem('token')
      this.$message({
        type: 'success',
        message: '退出成功!'
      })
      this.$router.replace({ name: 'Login' })
      // axios.get('/admin/exit').then(res => {
      //   if (res.data.code === 200) {
      //     this.$message({
      //       type: 'success',
      //       message: '退出成功!'
      //     })
      //     this.$router.replace({ name: 'Login' })
      //   } else {
      //     this.$message({
      //       type: 'error',
      //       message: '退出失败!'
      //     })
      //   }
      // })
    }
  }
}
</script>

<style lang="less" scoped>
 .el-button{
   float: right;
   margin-top: 10px;
 }
</style>
