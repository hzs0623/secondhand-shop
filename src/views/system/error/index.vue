<template>
  <div class="error-page">
    <img
      src="https://daes-1251985304.cos.ap-shanghai.myqcloud.com/shop/home/404.png"
      alt=""
    />
    <el-link type="primary" :href="'/'">返回主页</el-link>
  </div>
</template>

<script>
export default {
  name: "error-page",
}
</script>
<style lang="less" scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    width: 50%;
  }
}
</style>
