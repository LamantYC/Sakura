<template>
<div>
  <el-container>
    <el-aside>
      分店店长
    </el-aside>
    <el-container>
    <el-header>
      分店店长
    </el-header>
    <el-main>
      <classify style="float: left; padding-right: 10px;"></classify>
      <materials style="float: left; padding-right: 10px;"></materials>
      <database style="float: left; padding-right: 10px;"></database>
      <uppasswd style="float: right;"></uppasswd>
      <tables></tables>
    </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>
import uppasswd from '../modules/Uppasswd.vue'
import tables from '../modules/Table.vue'
import classify from '../modules/Classify.vue'
import materials from '../modules/Materials.vue'
import database from '../modules/Database.vue'
export default {
  name: 'Index',
  components: {uppasswd, tables, classify, materials, database},
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>
.el-table td, .el-table th{
    text-align :center !important;
}
.el-pagination {
    text-align: center;
    margin-top: 10px
}
.el-header, .el-footer {
    background-color: #E6A23C;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #F56C6C;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
