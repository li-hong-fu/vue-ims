<template>
<div class="page-container">
  <el-header class="breadcrumb-section">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">全部</el-breadcrumb-item>
      <template v-for="item in breadcrumb">
        <el-breadcrumb-item :to="{ path: '/Article/' + item.id }" :key="item.id">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
    <el-button type="text" @click="()=>this.$router.back()">管理员登录</el-button>
  </el-header>
  <el-main class="article-section">
    <router-view></router-view>
  </el-main>
</div>
</template>

<script>
import classifyModel from '@/models/classify'
export default {
  data () {
    return {
      classifyData: [],
      breadcrumb: []
    }
  },
  created () {
    classifyModel.get().then(res => {
      this.classifyData = res.data.data
      this.classifyData.map(data => {
        this.breadcrumb.push(data)
      })
    })
  }
}
</script>

<style lang="less" scoped>
.page-container{
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #f0f2f5;
}
.breadcrumb-section{
  display: flex;
  justify-content: space-around;
  background: #32CD32;
  .el-breadcrumb{
    line-height: 60px;
    /deep/.el-breadcrumb__item{
      font-size: 18px;
      font-family: monospace;
      span{
        color: #FFFFFF;
        font-weight: normal;
        &:hover{
          font-weight: 600;
          font-size: 20px;
          cursor: pointer;
        }
      }
    }
  }
}
button{
  color: #ffffff;
  font-size: 18px;
  font-family: monospace;
}
</style>
