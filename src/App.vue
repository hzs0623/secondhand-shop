<template>
  <div class="app">
    <router-view />
    <Loading />
  </div>
</template>

<script>
import Loading from "@/components/common/Loading";
export default {
  name: "app",
  components: {
    Loading,
  },
};
</script>

<style lang="less">
@import "Style/core/normalize";
@import "Style/color";
.app {
  min-width: 1000px;
}
#nprogress .bar {
  background: @color-primary; //进度条颜色
}
</style>
