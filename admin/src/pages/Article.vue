<template>
  <div class="page-article">
    <div class="article-body">
      <el-table
        :data="articleData"
        style="width: 100%">
        <el-table-column label="index" prop="id"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="分类" prop="classify_name"></el-table-column>
        <el-table-column label="操作" prop="operation">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      articleData: []
    }
  },
  created () {
    axios.get('/article').then(res => {
      this.articleData = res.data.data
    })
  },
  methods: {
    handleEdit (index, row) {
      let id = row.id
      location.href = '/admin/article/edit/' + id
    },
    handleDelete (index, row) {
      let affirm = confirm('确定删除吗？')
      if (affirm) {
        let id = row.id
        axios.delete('/article/' + id).then(res => {
          if (res.data.code === 200) {
            this.articleData.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message({
              type: 'info',
              message: '删除失败!'
            })
          }
        })
      }

      console.log(index, row)
    }
  }
}
</script>
<style lang="less" scoped>

</style>
