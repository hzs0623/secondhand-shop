<template>
  <div class="main-page">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "main-page",
  data() {
    return {}
  },
}
</script>
<style lang="less" scoped>
.main-page {
  padding: 0 60px;
}
</style>
