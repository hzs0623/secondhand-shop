<template>
  <div class="register-page">
    <div class="content">
      <div class="img">
        <img :src="imgLogin" alt="login" />
      </div>
      <div class="info">
        <h4 class="title">
          <span class="left"></span>
          <div class="text">帐号注册</div>
          <span class="right"></span>
        </h4>

        <!-- 登陆 -->
        <div class="user">
          <!-- 用户名 -->
          <div class="user-warp">
            <span>用户名</span>
            <input type="text" placeholder="请输入注册用户名" />
          </div>
          <!-- 密码 -->
          <div class="user-warp">
            <span>密码</span>
            <input placeholder="设置你账号的登陆密码" type="password" />
          </div>
          <div class="user-warp">
            <span>确认密码</span>
            <input placeholder="再次输入密码" type="password" />
          </div>

          <div class="user-login">
            <div class="btn">注册</div>
          </div>
        </div>

        <!-- 跳转注册 -->
        <div class="rigister">
          已有账号，前往<el-link type="primary" @click="handleLogin">登陆</el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imgLogin from "@/assets/images/login.png";
export default {
  name: "register-page",
  data() {
    return {
      imgLogin,
    };
  },
  methods: {
    handleLogin() {
      window.location.replace("/#/login");
    },
  },
};
</script>
<style lang="less" scoped>
@import "./index";
</style>
