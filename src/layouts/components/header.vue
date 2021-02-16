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
      <Search />
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
import { getMap, getUserMap } from "@/api/init";
import Search from "@/components/common/Search";

const menuConfig = {
  1: "/index",
  2: "/my/shoping",
  3: "/publish/shop",
  4: "/shop/cart",
};
export default {
  name: "header-comp",
  data() {
    return {
      user: {},
      menuMap: {
        1: "首页",
        2: "我发布的商品",
        3: "发布闲置",
        4: "购物车",
      },
      menuConfig,
      activeIndex: this.getMenuIndex(),
    };
  },
  watch: {
    $route: function (newVal) {
      const { path } = newVal;
      Object.keys(menuConfig).forEach((key) => {
        const item = menuConfig[key];
        if (item === path) {
          this.activeIndex = key;
        }
      });
    },
  },
  components: {
    User,
    Search,
  },
  methods: {
    ...mapActions("global", ["setUserInfo", "setMapData"]),
    async getInit() {
      const data = getToken();
      this.setUserInfo(data); // 个人信息
      this.user = data;
      const sort_map = await getMap();
      const userMap = await getUserMap();
      this.setMapData({
        ...sort_map,
        ...userMap,
      }); // 映射map
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
  padding: 0 100px;
  width: calc(100% - 200px);
  background: #fff;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .hearder-log {
    cursor: pointer;
  }
  .hearder-login {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
</style>
