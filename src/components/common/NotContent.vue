<template>
  <div class="not-content">
    <img
      src="https://daes-1251985304.cos.ap-shanghai.myqcloud.com/shop/home/notContent.png"
      alt=""
    />
    <el-link type="primary" :href="`/#/publish/shop`"
      >没有发布任何商品，来发布你闲置物品吧</el-link
    >
  </div>
</template>

<script>
export default {
  name: "not-content",
}
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
