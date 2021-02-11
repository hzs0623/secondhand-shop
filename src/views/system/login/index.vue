<template>
  <div class="login-page">
    <div class="content">
      <div class="img">
        <img :src="imgLogin" alt="login" />
      </div>
      <div class="info">
        <h4 class="title">
          <span class="left"></span>
          <div class="text">欢迎登陆</div>
          <span class="right"></span>
        </h4>

        <!-- 登陆 -->
        <div class="user">
          <!-- 用户名 -->
          <div class="user-warp">
            <span>用户名</span>
            <input type="text" placeholder="请输入用户名" />
          </div>
          <!-- 密码 -->
          <div class="user-warp">
            <span>密码</span>
            <input placeholder="请输入密码" type="password" />
          </div>

          <div class="user-login">
            <div class="btn">登陆</div>
          </div>
        </div>

        <!-- 跳转注册 -->
        <div class="rigister">
          没有账号，前往<el-link type="primary" @click="handleRegister">注册</el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imgLogin from "@/assets/images/login.png";
export default {
  name: "login-page",
  data() {
    return {
      imgLogin,
    };
  },
  methods: {
    handleRegister() {
      window.location.replace("/#/register");
    },
  },
};
</script>
<style lang="less" scoped>
@import "./index";
</style>
