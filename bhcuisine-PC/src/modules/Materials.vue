<template>
  <div>
<el-button @click="dialogFormVisible = true">添加材料</el-button>
<el-dialog title="添加材料" :visible.sync="dialogFormVisible" center>
  <el-form :model="form">
    <el-form-item label="材料名称" :label-width="formLabelWidth">
      <el-input v-model="form.materials" placeholder="请输入" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="材料重量" :label-width="formLabelWidth">
      <el-input v-model="form.weight " placeholder="请输入(/kg)" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="材料单价" :label-width="formLabelWidth">
      <el-input v-model="form.unitprice" placeholder="请输入(/元)" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="分类" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择">
        <el-option v-for="item in list" :key="item.id" :label="item.categoryName" :value="item.id"></el-option>
      </el-select>
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
    getcategory () {
      this.$axios
        .get('/category').then((resp) => {
          console.log(resp.data)
          this.list = resp.data.result
        })
    },
    add () {
      this.$axios
        .post('/materials', {
          uid: localStorage.getItem('uid'),
          materialsName: this.form.materials,
          price: this.form.unitprice,
          quanty: this.form.weight,
          addTime: this.form.date,
          categoryId: this.form.region,
          categoryName: this.form.region
        }).then(resp => {
          if (resp && resp.status === 200) {
            this.dialogFormVisible = false
            this.$emit('add')
          }
        })
    }
  },
  mounted () {
    this.getcategory()
  },
  data () {
    return {
      dialogFormVisible: false,
      form: {
        materials: '',
        weight: '',
        unitprice: '',
        date: '',
        region: ''
      },
      formLabelWidth: '120px',
      list: []
    }
  }
}
</script>

<style>
</style>
