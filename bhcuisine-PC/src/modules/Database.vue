<template>
  <div>
<el-button @click="dialogFormVisible = true">添加数据</el-button>
<el-dialog title="添加数据" :visible.sync="dialogFormVisible" center>
  <el-form :model="form">
    <el-form-item label="营业额" :label-width="formLabelWidth">
      <el-input v-model="form.turnover" placeholder="请输入" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="人工费" :label-width="formLabelWidth">
      <el-input v-model="form.cost" placeholder="请输入" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="房租" :label-width="formLabelWidth">
      <el-input v-model="form.rent" placeholder="请输入" autocomplete="off"></el-input>
    </el-form-item>
    <div style="margin-left: 88px;">
      <span class="demonstration">日期</span>
      <el-date-picker
        v-model="form.date"
        type="month"
        value-format="yyyy-MM"
        placeholder="选择月">
      </el-date-picker>
      </div>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="add">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    add () {
      this.$axios
        .post('/addCast', {
          branchName: localStorage.getItem('branchname'),
          monthTotal: this.form.turnover,
          employeeTotal: this.form.cost,
          rentTotal: this.form.rent,
          rentTime: this.form.date
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
        turnover: '',
        cost: '',
        rent: '',
        data: ''
      },
      formLabelWidth: '120px'
    }
  }
}
</script>

<style>
</style>
