<template>
  <div class="login-nav">
    <div class="title" @click="onShow">
      {{ user.user }} <i class="el-icon-arrow-down"></i>
    </div>
    <ul v-show="show" class="login-nav-ul">
      <li @click="getUserInfo">个人信息</li>
      <li @click="dialogVisible = true">已买商品</li>
      <li @click="sellState = true">出售订单</li>
      <li @click="out">退出</li>
    </ul>

    <Dialog :dialogVisible="dialogVisible" @close="dialogVisible = false" />
    <SellShop :sellState="sellState" @close="sellState = false" />
  </div>
</template>

<script>
import { pro_token } from "@/constant";
import Dialog from "@/components/BuyDialog";
import SellShop from "@/components/SellShop";

export default {
  name: "login-nav",
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    Dialog,
    SellShop,
  },
  data() {
    return {
      show: false,
      dialogVisible: false,
      sellState: false,
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
      this.show = false;
    },
    getUserInfo() {
      this.$router.push("/user/info");
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
<style lang="less" scoped>
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
  .login-nav-ul {
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
