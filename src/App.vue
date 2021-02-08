<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style lang="less">
@import "@/assets/styles/core/normalize";
.app {
  padding: 0 60px;
}
</style>
