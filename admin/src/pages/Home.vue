<template>
<div class="article-list">
  <div class="article-item" v-for="(item, index) in articletotal" :key="index">
    <span class="article-item-number">{{index + 1}}</span>
    <div class="article-item-text">
      <p class="article-title">{{item.title}}</p>
      <p class="article-time">2020-02-12 15:07:51</p>
    </div>
  </div>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage"
    :page-count="totalPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    layout="sizes, prev, pager, next"
    :total="articletotal.length">
  </el-pagination>
</div>
</template>

<script>
import articleModel from '@/models/article'
export default {
  data () {
    return {
      articleData: [],
      articletotal: [],
      pageSizes: [10, 20, 30, 40],
      pageSize: 10,
      totalPage: null,
      currentPage: 1
    }
  },
  created () {
    this.handleSizeChange()
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      val = val || 10
      this.pageSize = val
      let currentPage = this.currentPage
      let params = { currentPage, val }
      articleModel.get(params).then(res => {
        this.articleData = res.data.data
        this.articleData.map(data => {
          return data
        })
        this.articletotal = this.articleData
        console.log(this.articletotal.length)
      })
      console.log(this.articletotal.length)
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
