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
            <input type="text" v-model="form.username" placeholder="请输入用户名" />
          </div>
          <!-- 密码 -->
          <div class="user-warp">
            <span>密码</span>
            <input
              @keypress.enter="onLogin"
              placeholder="请输入密码"
              v-model="form.password"
              type="password"
            />
          </div>

          <div class="user-login">
            <div class="btn" @click.stop="onLogin">登陆</div>
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
import { login } from "@/api/user";
import { pro_token } from "@/utils";
import format from "../mixins";

export default {
  name: "login-page",
  mixins: [format],
  data() {
    return {
      imgLogin,
      form: {
        username: "huangzesi",
        password: "123456",
      },
    };
  },
  methods: {
    handleRegister() {
      window.location.replace("/#/register");
    },
    // 登陆
    async onLogin() {
      if (!this.formValid(this.form)) return;
      const res = await login(this.form);
      this.$message.success("登陆成功！");
      // 存入本地
      localStorage.setItem(pro_token, JSON.stringify(res));
      this.$router.replace("/");
    },
  },
};
</script>
<style lang="less" scoped>
@import "./index";
</style>
