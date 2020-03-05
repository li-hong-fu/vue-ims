<template>
  <div class="page-classify">
    <div class="classify-header">
      <el-button class="createButton" type="primary" @click="formAddShow = true">添加分类</el-button>
      <el-dialog title="添加分类" :visible.sync="formAddShow">
        <el-form>
          <el-form-item label="分类名" label-width="60px">
            <el-input name="name" v-model="formBoxValue" placeholder="请输入分类名"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleAddClassify">保存</el-button>
          <el-button @click="handleCancelAdd">取消</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="classify-body">
      <el-table
        :data="classifyData"
        style="width: 100%">
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="更新日期" prop="created_time"></el-table-column>
        <el-table-column label="分类名称" prop="name"></el-table-column>
        <el-table-column label="操作" prop="operation">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEditShow(scope.$index, scope.row)">编辑</el-button>
            <el-dialog title="更改分类" :visible.sync="formEditShow">
              <el-form>
                <el-form-item label="分类名" label-width="60px">
                  <el-input name="name" v-model="formBoxValue" placeholder="请输入分类名"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleEditClassify">保存</el-button>
                <el-button @click="handleCancelEdit">取消</el-button>
              </div>
            </el-dialog>
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
      formAddShow: false,
      formEditShow: false,
      formBoxId: null,
      formBoxIndex: null,
      formBoxValue: '',
      classifyData: []
    }
  },
  created () {
    axios.get('/classify').then(res => {
      this.classifyData = res.data.data
    }).catch(e => {
      console.log(e)
    })
  },
  methods: {
    handleCancelAdd () {
      this.formAddShow = false
      this.formBoxValue = ''
    },
    handleCancelEdit () {
      this.formEditShow = false
      this.formBoxValue = ''
    },
    handleAddClassify () {
      let name = this.formBoxValue
      let params = { name }

      if (!name) {
        this.$message({
          type: 'error',
          message: '缺少必要参数!'
        })
        return
      }

      axios.post('/classify', params).then(res => {
        if (res.data.code === 200) {
          this.formBoxValue = ''
          this.formAddShow = false
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          location.reload()
        } else {
          this.$message({
            type: 'info',
            message: '添加失败!'
          })
        }
      })
    },
    handleEditShow (index, row) {
      this.formEditShow = true
      this.formBoxValue = row.name
      this.formBoxId = row.id
      this.formBoxIndex = index
    },
    handleEditClassify () {
      let id = this.formBoxId
      let index = this.formBoxIndex
      let name = this.formBoxValue
      let params = { name }
      axios.put('/classify/' + id, params).then(res => {
        if (res.data.code === 200) {
          this.classifyData[index].name = name
          this.formEditShow = false
          this.$message({
            type: 'success',
            message: '编辑成功!'
          })
          location.reload()
        } else {
          this.$message({
            type: 'info',
            message: '编辑失败!'
          })
        }
      })
      console.log(id, index)
    },
    handleDelete (index, row) {
      let affirm = confirm('确定删除吗？')
      if (affirm) {
        let id = row.id
        axios.delete('/classify/' + id).then(res => {
          if (res.data.code === 200) {
            this.classifyData.splice(index, 1)
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
    }
  }
}
</script>

<style lang="less" scoped>
  .page-classify{
    height: 100%;
    .classify-header{
      .createButton{
        float: left;
      }
    }
  }
</style>
