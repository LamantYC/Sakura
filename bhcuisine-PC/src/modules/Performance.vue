<template>
<div>
  <el-select style="float: right; width: 10%; padding-right: 20px;" v-model="branchName" placeholder="店名">
        <el-option v-for="item in null1" :key="item.value" :value="item.null">全  部</el-option>
    <el-option v-for="item in options" :key="item.id" :label="item.branchName" :value="item.branchName"></el-option>
  </el-select>
  <el-date-picker
    style="float: right;"
    v-model="addTime"
    type="month"
    value-format="yyyy-MM"
    placeholder="选择月">
  </el-date-picker>
  <el-button @click="onSubmit">搜索</el-button>
  <el-table :data="tableData" border style="width: 100%;" :row-class-name="tableRowClassName">
<!--      <el-table-column type="selection" width="50"></el-table-column> -->
      <el-table-column
        prop="branchName"
        label="店名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="monthTotal"
        label="营业额"
        width="80">
      </el-table-column>
      <el-table-column
        prop="costTotal"
        label="原材料成本"
        width="100">
      </el-table-column>
      <el-table-column
        prop="employeeTotal"
        label="人工"
        width="80">
      </el-table-column>
      <el-table-column
        prop="rentTotal"
        label="房租(包含水电)">
      </el-table-column>
      <el-table-column
        prop="profitTotal"
        label="利润">
      </el-table-column>
      <el-table-column
        prop="performance"
        label="绩效率">
      </el-table-column>
      <el-table-column
        prop="performanceTotal"
        label="绩效">
      </el-table-column>
      <el-table-column
        prop="rentTime"
        label="日期">
      </el-table-column>
      <el-table-column
        label="操作">
          <template slot-scope="scope">
          <el-button class="btn" @click="editor(scope.row.id)" >
          <p style="margin-top: -7px; margin-left: -13px;">修改</p>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :pagination="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.pageIndex"
      :page-size="pagination.pageSize"
      :total="pagination.total">
    </el-pagination>
    <el-dialog title="修改绩效率" :visible.sync="dialogFormVisible" center >
      <el-form :model="inputtext" ref="inputtext">
        <el-form-item label="极限率(%)" :label-width="formLabelWidth">
          <el-input v-model="inputtext.performance" placeholder="请输入" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="change">确 定</el-button>
      </div>
    </el-dialog>
</div>
</template>

<script>
export default {
  branchName: 'Performance',
  methods: {
    getcategory () {
      this.$axios
        .get('/getAllBranchName').then((resp) => {
          console.log(resp.data)
          this.options = resp.data.result
        })
    },
    tableRowClassName ({row, rowIndex}) {
      if (rowIndex % 2 === 0) {
        return 'success-row'
      } else {
        return ''
      }
    },
    handleSizeChange (val) {
      alert(val)
      this.pagination.pagesize = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.pagination.pageIndex = val
      this.onSubmit()
    },
    editor (row) {
      this.dialogFormVisible = true
      this.id = row
      let params = {
        id: this.id
      }
      this.$axios
        .get('/getPerformance', {params: params}).then(resp => {
          if (resp && resp.status === 200) {
            this.inputtext.performance = resp.data.result
          }
        })
    },
    change () {
      this.$axios
        .post('/updatePerformance', {
          id: this.id,
          performance: this.inputtext.performance
        }).then(resp => {
          if (resp && resp.status === 200) {
            this.dialogFormVisible = false
            this.$emit('change')
          }
        })
    },
    edit () {
      this.$refs.edit.dialogFormVisible = true
      this.form = {
        id: '',
        branchName: '',
        monthTotal: '',
        costTotal: '',
        employeeTotal: '',
        rentTotal: '',
        profitTotal: '',
        performance: '',
        performanceTotal: '',
        rentTime: ''
      }
    },
    onSubmit () {
      let params = {
        currentPage: this.pagination.pageIndex,
        pagesize: this.pagination.pageSize,
        addTime: this.addTime,
        branchName: this.branchName
      }
      console.log(this.addTime)
      console.log(this.branchName)
      this.$axios.get('/adminSearch', {params: params}).then((resp) => {
        if (resp && resp.status === 200) {
          this.tableData = resp.data.result.content
          console.log(this.tableData)
          var total = resp.data.result.totalElements
          this.pagination.total = resp.data.result.content ? total : 0
        }
      })
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      id: '',
      addTime: null,
      branchName: null,
      inputtext: {
        performance: ''
      },
      tableData: [],
      null1: [{
        value: null
      }],
      options: [],
      pagination: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  mounted () {
    this.onSubmit()
    this.getcategory()
  },
  watch: {
    '$route': 'getParams'
  }
}
</script>

<style>
  .el-table .success-row {
    background: #DCDFE6;
  }
  .el-table td, .el-table th{
      text-align :center !important;
  }
  .el-pagination {
      text-align: center;
      margin-top: 10px
  }
  .btn{
  width:40px;
  height:20px;
  }
</style>
