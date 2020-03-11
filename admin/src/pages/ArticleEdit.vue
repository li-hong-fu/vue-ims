<template>
<div class="page-article-create">
  <!-- <el-button type="primary" @click="()=>this.$router.back()">返回文章列表</el-button> -->
  <el-form :model="formBoxValue" :rules="rules" ref="formBoxValue" label-width="50px" class="form-container">
    <el-form-item label="标题" prop="title">
      <el-input name="title" v-model="formBoxValue.title"></el-input>
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
      <el-button type="primary" @click="submitForm">保存</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
// import axios from 'axios'
import articleModel from '@/models/article'
import classifyModel from '@/models/classify'
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
        classify_id: null,
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
    let id = this.$route.params.id
    articleModel.item(id).then(res => {
      console.log(res)
      this.formBoxValue = res.data.data[0]
    })
    classifyModel.get().then(res => {
      this.classify = res.data.data
    })
    // axios.get('/classify').then(res => {
    //   this.classify = res.data.data
    //   console.log(this.classify)
    // }).catch(e => {
    //   console.log(e)
    // })

    // axios.get('/article/' + id).then(res => {
    //   this.formBoxValue = res.data.data[0]
    // })
  },
  methods: {
    submitForm () {
      let id = this.$route.params.id
      let title = this.formBoxValue.title
      let classify = this.formBoxValue.classify_id
      let content = this.formBoxValue.content
      let params = { title, classify, content }
      if (!title || !classify || !content) {
        this.$message({
          type: 'error',
          message: '缺少必要参数!'
        })
        return
      }
      articleModel.put(id, params).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          location.href = '/admin/article'
        } else {
          this.$message({
            type: 'info',
            message: '修改失败!'
          })
        }
      })
      // axios.put('/article/edit/' + id, params).then(res => {
      //   if (res.data.code === 200) {
      //     this.$message({
      //       type: 'success',
      //       message: '修改成功!'
      //     })
      //     location.href = '/admin/article'
      //   } else {
      //     this.$message({
      //       type: 'info',
      //       message: '修改失败!'
      //     })
      //   }
      // })
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
    .form-container{
      height: 100%;
      .create-content{
        height: 70%;
        /deep/.el-form-item__content{
          height: 100%;
          /deep/.quill-editor.quill-editor{
            height: 80%;
          }
        }
      }
    }
  }
</style>
