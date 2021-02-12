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
            <input placeholder="请输入密码" v-model="form.password" type="password" />
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
import { mapActions } from "vuex";
import { getShopList } from "@/api/shopList";

export default {
  name: "login-page",
  data() {
    return {
      imgLogin,
      form: {
        username: "daes",
        password: "123456",
      },
    };
  },
  methods: {
    ...mapActions("global", ["setUserInfo"]),
    handleRegister() {
      window.location.replace("/#/register");
      // this.getList();
    },
    async getList() {
      const res = await getShopList({
        pageSize: 10,
        curPage: 1,
      });
      console.log(res);
    },
    // 登陆
    async onLogin() {
      const res = await login(this.form);
      this.setUserInfo(res);
    },
  },
};
</script>
<style lang="less" scoped>
@import "./index";
</style>
