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
@import "Style/core/normalize";
@import "Style/color";

.app {
  // padding: 0 60px;
}
#nprogress .bar {
  background: @color-primary; //进度条颜色
}
</style>
