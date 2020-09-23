<template>
  <div>
<el-button @click="dialogFormVisible = true">添加分店</el-button>
<el-dialog title="添加分店" :visible.sync="dialogFormVisible" center>
  <el-form :model="form">
    <el-form-item label="分店店长" :label-width="formLabelWidth">
      <el-input v-model="form.manager" placeholder="请输入(登录账号)" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="店铺名称" :label-width="formLabelWidth">
      <el-input v-model="form.designation" placeholder="请输入" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="店铺地址" :label-width="formLabelWidth">
      <el-input v-model="form.location" placeholder="请输入" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="addmanager">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    addmanager () {
      this.$axios
        .post('/saveUser', {
          branchName: this.form.designation,
          branchLocation: this.form.location,
          username: this.form.manager
        }).then(resp => {
          if (resp && resp.status === 200) {
            this.dialogFormVisible = false
            this.$emit('addmanager')
          }
        })
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      form: {
        manager: '',
        designation: '',
        location: ''
      },
      formLabelWidth: '120px'
    }
  }
}
</script>

<style>
</style>
