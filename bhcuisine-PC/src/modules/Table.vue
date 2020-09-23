<template>
<div>
  <el-table
      :data="tableData"
      border
      :row-class-name="tableRowClassName"
      style="width: 100%; margin-top: 10px">
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
          <el-button class="btn" @click="lookover">
          <p style="margin-top: -7px; margin-left: -13px; float：right">详情</p>
          </el-button>
          <el-button class="btn" @click="editor(scope.row.id)" >
          <p style="margin-top: -7px; margin-left: -13px; float：left">修改</p>
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
    <el-dialog title="修改数据" :visible.sync="dialogFormVisible" center >
      <el-form :model="inputtext" ref="inputtext">
        <el-form-item label="营业额" :label-width="formLabelWidth">
          <el-input v-model="inputtext.turnover" placeholder="请输入" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="人工费" :label-width="formLabelWidth">
          <el-input v-model="inputtext.cost" placeholder="请输入" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="房租" :label-width="formLabelWidth">
          <el-input v-model="inputtext.rent" placeholder="请输入" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="change">确 定</el-button>
      </div>
    </el-dialog>
</div>
</template>

<script scoped>
export default {
  branchName: 'Performance',
  methods: {
    lookover () {
      this.$router.replace({path: '/details'})
    },
    tableRowClassName ({row, rowIndex}) {
      if (rowIndex % 2 === 0) {
        return 'success-row'
      } else {
        return ''
      }
    },
    load () {
      this.count += 2
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
      console.log(this.id)
      let params = {
        id: this.id
      }
      this.$axios
        .get('/getCast', {params: params}).then(resp => {
          if (resp && resp.status === 200) {
            this.inputtext.turnover = resp.data.result.monthTotal
            this.inputtext.cost = resp.data.result.employeeTotal
            this.inputtext.rent = resp.data.result.rentTotal
          }
        })
    },
    change () {
      this.$axios
        .post('/addCast2', {
          id: this.id,
          monthTotal: this.inputtext.turnover,
          employeeTotal: this.inputtext.cost,
          rentTotal: this.inputtext.rent
        }).then(resp => {
          if (resp && resp.status === 200) {
            this.dialogFormVisible = false
            this.$emit('change')
          }
        })
    },
    edit () {
      this.$refs.edit.dialogFormVisible = true
      var that = this
      that.tableData = {
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
        username: localStorage.getItem('username')
      }
      this.$axios.get('/search', {params: params}).then((resp) => {
        if (resp && resp.status === 200) {
          this.tableData = resp.data.result.content
          var total = resp.data.result.totalElements
          this.pagination.total = resp.data.result.content ? total : 0
        }
      })
    }
  },
  data () {
    return {
      count: 0,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      id: '',
      inputtext: {
        turnover: '',
        cost: '',
        rent: ''
      },
      tableData: [],
      pagination: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      username: ''
    }
  },
  mounted () {
    this.onSubmit()
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
