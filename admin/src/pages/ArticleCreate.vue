<template>
<div class="page-article-create">
  <el-form :model="formBoxValue" :rules="rules" ref="formBoxValue" label-width="100px" class="form-container">
    <el-form-item label="标题" prop="title">
      <el-input v-model="formBoxValue.title"></el-input>
    </el-form-item>
    <el-form-item label="分类" prop="classify_id">
      <el-select v-model="formBoxValue.classify_id" placeholder="请选择分类">
        <el-option v-for="item in classify" :key="item.id" :value="item.id" :label="item.name"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="内容" prop="content" class="create-content">
      <quill-editor
        class="quill-editor"
        v-model="formBoxValue.content"
        ref="myQuillEditor"
        :options="editorOption">
      </quill-editor>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">立即创建</el-button>
      <el-button @click="resetForm('formBoxValue')">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import axios from 'axios'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import hljs from 'highlight.js'
export default {
  data () {
    return {
      classify: [],
      formBoxValue: {
        title: '',
        classify_id: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        classify_id: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image', 'video']
          ],
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      }
    }
  },
  created () {
    axios.get('/classify').then(res => {
      this.classify = res.data.data
    }).catch(e => {
      console.log(e)
    })
  },
  methods: {
    submitForm () {
      let title = this.formBoxValue.title
      let classify = this.formBoxValue.classify_id
      let content = this.formBoxValue.content
      let params = { title, classify, content }

      console.log(params)

      if (!title || !classify || !content) {
        this.$message({
          type: 'error',
          message: '缺少必要参数!'
        })
        return
      }

      axios.post('/article', params).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.formBoxValue.title = ''
          this.formBoxValue.classify_id = ''
          this.formBoxValue.content = ''
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          location.href = '/admin/article'
        } else {
          this.$message({
            type: 'info',
            message: '添加失败!'
          })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  components: {
    'quill-editor': quillEditor
  }
}
</script>
<style lang="less" scoped>
  .page-article-create{
    width: 80%;
    height: 100%;
    text-align: left;
  }
</style>
