<template>
  <div class="page-user">
    <div class="user-header">
      <el-button class="createButton" type="primary" @click="formBoxShow = true">添加用户</el-button>
      <el-dialog title="添加用户" :visible.sync="formBoxShow">
        <el-form>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input name="name" v-model="formBoxValue.name" placeholder="请输入添加用户名"></el-input>
          </el-form-item>
          <el-form-item label="手机" :label-width="formLabelWidth">
            <el-input name="phone" v-model="formBoxValue.phone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input name="password" placeholder="请输入密码" v-model="formBoxValue.password" show-password></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleAddUser">保存</el-button>
          <el-button @click="handleCancelAdd">取消</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="user-body">
      <el-table
        :data="userData"
        style="width: 100%">
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="更新日期" prop="created_time"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="操作" prop="operation">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEditShow(scope.$index, scope.row)">编辑</el-button>
            <el-dialog title="编辑用户" :visible.sync="formEditShow">
              <el-form>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                  <el-input name="name" v-model="formBoxValue.name" placeholder="请输入添加用户名"></el-input>
                </el-form-item>
                <el-form-item label="手机" :label-width="formLabelWidth">
                  <el-input name="phone" v-model="formBoxValue.phone" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                  <el-input name="password" placeholder="请输入密码" v-model="formBoxValue.password" show-password></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleEditUser">保存</el-button>
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
      userData: [],
      formBoxID: null,
      formBoxIndex: null,
      formBoxShow: false,
      formEditShow: false,
      formLabelWidth: '60px',
      formBoxValue: {
        name: '',
        password: '',
        phone: ''
      }
    }
  },
  created () {
    axios.get('/user').then(res => {
      this.userData = res.data.data
    }).catch(e => {
      console.log(e)
    })
  },
  methods: {
    handleCancelAdd () {
      this.formBoxShow = false
      this.formBoxValue.name = ''
      this.formBoxValue.password = ''
      this.formBoxValue.phone = ''
    },
    handleCancelEdit () {
      this.formEditShow = false
    },
    handleEditShow (index, row) {
      this.formEditShow = true
      this.formBoxID = row.id
      this.formBoxIndex = index
      this.formBoxValue.name = row.name
      this.formBoxValue.phone = row.phone
      this.formBoxValue.password = row.password
    },
    handleAddUser () {
      let name = this.formBoxValue.name
      let phone = this.formBoxValue.phone
      let password = this.formBoxValue.password
      let params = { name, phone, password }
      if (!name || !phone || !password) {
        this.$message({
          type: 'error',
          message: '缺少必要参数!'
        })
        return
      }

      axios.post('/user', params).then(res => {
        if (res.data.code === 200) {
          this.formBoxValue.name = ''
          this.formBoxValue.password = ''
          this.formBoxValue.phone = ''
          this.formBoxShow = false
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
    handleEditUser () {
      let id = this.formBoxID
      let index = this.formBoxIndex
      let name = this.formBoxValue.name
      let phone = this.formBoxValue.phone
      let password = this.formBoxValue.password
      let params = { name, phone, password }
      axios.put('/user/' + id, params).then(res => {
        if (res.data.code === 200) {
          this.userData[index].name = name
          this.userData[index].phone = phone
          this.userData[index].password = password
          this.formEditShow = false
          this.$message({
            type: 'success',
            message: '编辑成功!'
          })
        } else {
          this.$message({
            type: 'info',
            message: '编辑失败!'
          })
        }
      })
    },
    handleDelete (index, row) {
      let affirm = confirm('确定删除吗？')
      if (affirm) {
        let id = row.id
        axios.delete('/user/' + id).then(res => {
          if (res.data.code === 200) {
            this.userData.splice(index, 1)
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
  .page-user{
    height: 100%;
    .user-header{
      .createButton{
        float: left;
      }
    }
  }
</style>
