<template>
  <div class="header-comp">
    <div class="hearder-log">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        @select="handleSelect"
        text-color="#9fc4f9"
        active-text-color="#689df1"
      >
        <el-menu-item :index="key" v-for="(item, key) in menuMap" :key="key">{{
          item
        }}</el-menu-item>
      </el-menu>
    </div>
    <div class="hearder-search">
      <input class="input" placeholder="请输入搜索内容🔍" type="text" v-model="val" />
      <div class="btn"><i class="el-icon-search"></i></div>
    </div>
    <div class="hearder-login">
      <User v-if="user && user.user" :user="user" />
      <div v-else>
        <el-link @click="onSkip('/#/login')">登陆</el-link>
        <el-link @click="onSkip('/#/register')">注册</el-link>
      </div>
    </div>
  </div>
</template>

<script>
import User from "./userNav";
import { getToken } from "@/utils";
import { mapActions } from "vuex";
import { getMap } from "@/api/init";

const menuConfig = {
  1: "/index",
  2: "/ask/buy",
  3: "/publish/shop",
  4: "/my/shoping",
};
export default {
  name: "header-comp",
  data() {
    return {
      val: "",
      user: {},
      menuMap: {
        1: "首页",
        2: "求购商城",
        3: "发布闲置",
        4: "我发布的商品",
      },
      menuConfig,
      activeIndex: this.getMenuIndex(),
    };
  },
  components: {
    User,
  },
  methods: {
    ...mapActions("global", ["setUserInfo", "setMapData"]),
    async getInit() {
      const data = getToken();
      this.setUserInfo(data); // 个人信息
      const res = await getMap();
      this.setMapData(res); // 映射map
      this.user = data;
    },
    getMenuIndex() {
      let i = "1";
      for (let key in menuConfig) {
        const curPath = menuConfig[key];
        if (curPath == this.$route.path) {
          i = key;
        }
      }
      return i;
    },
    onSkip(url) {
      window.location.replace(url);
    },
    handleSelect(index) {
      const path = menuConfig[index];
      this.activeIndex = index;
      this.$router.push(path);
    },
  },
  mounted() {
    this.getInit();
  },
};
</script>
<style lang="less" scoped>
.header-comp {
  padding: 0 60px;
  width: calc(100% - 120px);
  background: #fff;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  .hearder-log {
    flex: 1;
    cursor: pointer;
  }
  .hearder-search {
    height: 32px;
    line-height: 32px;
    width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    .input {
      font-size: 14px;
      display: inline-block;
      width: calc(100% - 40px);
      height: 100%;
      line-height: inherit;
      border: 0 none;
      outline: 0;
      background: #f5f6f7;
      color: #222226;
      vertical-align: top;
      text-indent: 16px;
      border: 1px solid #e8e8ed;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      border-radius: 4px 0 0 4px;
      &:focus {
        border-color: #589ef8;
      }
    }
    .btn {
      height: 100%;
      width: 40px;
      background: #589ef8;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0 4px 4px 0;
    }
  }
  .hearder-login {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
</style>
