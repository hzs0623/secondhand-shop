<template>
  <div class="header-comp">
    <div class="hearder-log" @click="onSkip('/')">首页</div>
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

export default {
  name: "header-comp",
  data() {
    return {
      val: "",
      user: {},
    };
  },
  components: {
    User,
  },
  methods: {
    ...mapActions("global", ["setUserInfo", "setMapData"]),
    async getInit() {
      const data = getToken();
      this.setUserInfo(data);
      const res = await getMap();
      this.setMapData(res);
      this.user = data;
    },
    onSkip(url) {
      // window.location.replace(url);
      this.$router.push(url);
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
  height: 50px;
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
