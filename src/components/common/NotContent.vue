<template>
  <div class="not-content">
    <img :src="imgLogin" alt="" />
    <el-link type="primary" :href="`/#/publish/shop`"
      >没有发布任何商品，来发布你闲置物品吧</el-link
    >
  </div>
</template>

<script>
import imgLogin from "@/assets/images/notContent.png";

export default {
  name: "not-content",
  data() {
    return {
      imgLogin,
    };
  },
};
</script>
<style lang="less" scoped>
.not-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    width: 50%;
  }
}
</style>
