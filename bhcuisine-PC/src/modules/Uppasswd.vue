<template>
<div>
  <el-button @click="outerVisible = true">修改密码</el-button>
  <el-dialog title="修改密码" :visible.sync="outerVisible" style="width:1000px; margin:0 auto" center>
  <el-form :rules="rules" :model="pwdList" style="width:350px;" status-icon ref="pwdList">
    <el-form-item prop="newPwd" label="新密码" label-width='100px' >
      <el-input v-model="pwdList.newPwd"  placeholder="新密码（5-12大小写字母、数字）" show-password style="width: 120%;"/>
    </el-form-item>
    <el-form-item prop="newPwd2"  label="确认密码" label-width='100px' >
      <el-input v-model="pwdList.newPwd2"  placeholder="确认密码（5-12大小写字母、数字）" show-password style="width: 120%;"/>
    </el-form-item>
  </el-form>
  <el-dialog width="30%" title="修改成功" :visible.sync="rebuldDialogVisible" append-to-body>
    <span>恭喜您，密码修改成功，下次登录生效！</span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="rebuldDialogVisible = false">确定</el-button>
  </span>
  </el-dialog>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="uppasswd">确定修改</el-button>
  </div>
  </el-dialog>
  </div>
</template>

<script>
const pwdListDefault = {
  newPwd: null,
  newPwd2: null
}
export default {
  methods: {
    resetForm (pwdList) {
      this.$refs[pwdList].resetFields()
    },
    uppasswd () {
      this.$axios
        .post('/resetPassword', {
          password: this.pwdList.newPwd
        })
      setTimeout(() => {
        this.$router.replace({path: '/login'})
      })
    }
  },
  data () {
    var checkPwd = (rule, value, callback) => {
      if (value !== this.pwdList.newPwd) {
        callback(new Error('密码不一致'))
      } else {
        console.log(this.pwdList.newPwd)
        callback()
      }
    }
    return {
      rebuldDialogVisible: false,
      pwdList: Object.assign({}, pwdListDefault),
      rules: {
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        newPwd2: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { validator: checkPwd, trigger: 'blur' }
        ]
      },
      outerVisible: false
    }
  }
}
</script>
