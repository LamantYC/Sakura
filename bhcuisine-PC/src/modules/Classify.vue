<template>
  <div>
<el-button @click="dialogFormVisible = true">添加分类</el-button>
<el-dialog title="添加分类"
:visible.sync="dialogFormVisible"
style="width: 60%; height: 40%; margin: 0 auto;"
center>
  <el-form :model="form">
    <el-form-item label="分类名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" placeholder="请输入" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="add" style="float: right; margin-top: 10px;">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    add () {
      this.$axios
        .post('/addcategory', {
          categoryName: this.form.name
        }).then(resp => {
          if (resp && resp.status === 200) {
            this.dialogFormVisible = false
            this.$emit('add')
          }
        })
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      form: {
        categoryname: ''
      },
      formLabelWidth: '120px'
    }
  }
}
</script>

<style>
</style>
