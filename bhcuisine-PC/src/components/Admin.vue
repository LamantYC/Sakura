<template>
  <div>
    <el-container>
      <el-aside>
        老板BOSS
      </el-aside>
      <el-container>
      <el-header>
        老板BOSS
      </el-header>
      <el-main>
        <div style="width: 100%; margin-top: 10px">
        <shop style="float: left; padding-right: 10px;"></shop>
        <uppasswd style="float: right;"></uppasswd>
        <performance></performance>
        </div>
      </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import performance from '../modules/Performance.vue'
import shop from '../modules/Shop.vue'
import uppasswd from '../modules/Uppasswd.vue'
export default {
  components: {performance, shop, uppasswd},
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
