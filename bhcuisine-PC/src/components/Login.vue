<template>
<body id="poster">
  <el-form :model="loginForm" class="login-container" label-position="left" label-width="0px">
    <h2 class="login_title">日式料理管理系统</h2>
    <el-form-item prop="username" :rules="[{ required: true, message: '请输入账号'}]">
      <el-input type="username" v-model="loginForm.username"  autocomplete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password" :rules="[{ required: true, message: '请输入密码'}]">
      <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="密码"></el-input>
    </el-form-item>
      <el-checkbox style="float: left;">记住密码</el-checkbox>
      <br><br>
    <el-form-item>
      <el-button type="primary" style="width:100%;background:#505458;border:none" v-on:click="login">登录</el-button>
    </el-form-item>
  </el-form>
</body>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      responseResult: []
    }
  },
  methods: {
    login () {
      this.$axios
        .post('/login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        })
        .then(successResponse => {
          console.log(successResponse)
          if (successResponse.data.code === 200) {
            if (successResponse.data.result.status === 1) {
              this.$router.replace({path: '/admin'})
            } else {
              this.$router.replace({path: '/index'})
            }
          } else {
            alert('密码或用户名错误！！！')
          }
          localStorage.setItem('username', successResponse.data.result.username)
          localStorage.setItem('branchname', successResponse.data.result.branchName)
          localStorage.setItem('uid', successResponse.data.result.id)
          console.log(successResponse.data.result.username)
          console.log(localStorage.getItem('username'))
        })
        .catch(failResponse => {
        })
    }
  }
}
</script>

<style>
 .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
 .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  #poster {
    background-image: url("../assets/timg.jpg");
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
    overflow-y: scroll;
  }
 body{
    margin: 0px;
  }
</style>
