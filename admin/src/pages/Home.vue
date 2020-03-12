<template>
<div class="article-list">
  <div class="article-item" v-for="(item, index) in articleList" :key="index">
    <span class="article-item-number">{{index + 1}}</span>
    <div class="article-item-text">
      <p class="article-title">{{item.title}}</p>
      <p class="article-time">2020-02-12 15:07:51</p>
    </div>
  </div>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :page-sizes="[10, 20, 30, 40]"
    :page-size="10"
    layout="sizes, prev, pager, next"
    :total="this.total">
  </el-pagination>
</div>
</template>

<script>
import articleModel from '@/models/article'
export default {
  data () {
    return {
      articleData: [],
      articleList: [],
      total: null
    }
  },
  created () {
    articleModel.get().then(res => {
      this.articleData = res.data.data
      this.articleData.map(data => {
        this.articleList.push(data)
      })
      this.total = this.articleList.length
    })
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="less" scoped>
.article-item{
  display: flex;
  align-items: center;
  background: #ffffff;
  height: 100px;
  margin-bottom: 2px;
  .article-item-number{
    font-size: 20px;
    font-weight: 600;
    color: #F75000;
    line-height: 42px;
    width: 100px;
  }
  .article-item-text{
    text-align: left;
    .article-title{
      font-size: 18px;
      font-family: monospace;
      color: #32CD32;
      font-weight: 600;
    }
    .article-time{
      font-size: 14px;
      font-family: -webkit-pictograph;
      color: #7B7B7B;
    }
  }
}
</style>
