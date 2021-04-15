<template>
  <div class="layout-container">
    <Header></Header>
    <Main />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/header"
import Main from "./components/Main"
import Footer from "./components/Footer"

export default {
  name: "layout-container",
  components: {
    Header,
    Main,
    Footer,
  },
}
</script>

<style lang="less">
.layout-container {
  width: 100%;
  min-height: calc(100vh - 40px);
  padding-bottom: 40px;
  position: relative;
}
</style>
