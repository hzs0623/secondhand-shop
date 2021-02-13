<template>
  <div class="layout-container">
    <Header></Header>
    <Main />
  </div>
</template>

<script>
import Header from "./components/header";
import Main from "./components/Main";

export default {
  name: "layout-container",
  components: {
    Header,
    Main,
  },
};
</script>

<style lang="less">
.layout-container {
  overflow: hidden;
  width: 100%;
}
</style>
