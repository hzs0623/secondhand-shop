<template>
  <div class="login-nav">
    <div class="title" @click="onShow">
      {{ user.user }} <i class="el-icon-arrow-down"></i>
    </div>
    <ul v-show="show">
      <li class="login-nav-li" @click="getUserInfo">个人信息</li>
      <li class="login-nav-li" @click="out">退出</li>
    </ul>
  </div>
</template>

<script>
import { pro_token } from "@/utils";
import { userInfo } from "@/api/user";

export default {
  name: "login-nav",
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    onShow() {
      this.show = !this.show;
    },
    out() {
      window.localStorage.removeItem(pro_token);
      window.location.replace("/#/login");
    },
    navShow(e) {
      const map = ["title", "el-icon-arrow-down"];
      if (!this.show || map.indexOf(e.target.className) > -1) return;
      if (e.target.className !== "login-nav-li") {
        this.show = false;
      }
    },
    async getUserInfo() {
      const { uid } = this.user;
      const res = await userInfo({ uid });
      console.log(res);
    },
  },
  mounted() {
    document.addEventListener("click", this.navShow);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.navShow);
  },
};
</script>
<style lang="less">
.login-nav {
  height: 100%;
  display: flex;
  position: relative;
  width: 100px;
  align-items: center;
  justify-content: center;
  .title {
    &:hover {
      color: #589ef8;
    }
  }
  ul {
    width: 100%;
    position: absolute;
    top: 30px;
    left: 0;
    z-index: 99999;
    font-size: 14px;
    padding: 10px 0;
    margin: 5px 0;
    background-color: #fff;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

    li {
      text-align: center;
      line-height: 36px;
      &:hover {
        background: #eef5fe;
        color: #589ef8;
      }
    }
  }
}
</style>
