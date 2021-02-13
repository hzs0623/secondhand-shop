<template>
  <div class="loading-wrap" v-show="globalLoading">
    <div class="spinner-wrap">
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "loading",
  computed: {
    ...mapState("global", ["globalLoading"]),
  },
};
</script>

<style scoped lang="less">
.loading-wrap {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 9999;
  .spinner-wrap {
    min-width: 200px;
    padding: 40px 20px;
    background: #000;
    color: #fff;
    opacity: 0.7;
    font-size: 20px;
    text-align: center;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
    z-index: 1232;
    transform: translate(-50%, -50%);
    .spinner {
      text-align: center;
    }

    .spinner > div {
      width: 30px;
      height: 30px;
      background-color: #fff;
      border-radius: 100%;
      display: inline-block;
      -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
      animation: bouncedelay 1.4s infinite ease-in-out;
      /* Prevent first frame from flickering when animation starts */
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
    }

    .spinner .bounce1 {
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }

    .spinner .bounce2 {
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }

    .spinner .bounce3 {
      -webkit-animation-delay: -0.1s;
      animation-delay: -0.1s;
    }

    @-webkit-keyframes bouncedelay {
      0%,
      80%,
      100% {
        -webkit-transform: scale(0);
      }
      40% {
        -webkit-transform: scale(1);
      }
    }

    @keyframes bouncedelay {
      0%,
      80%,
      100% {
        transform: scale(0);
        -webkit-transform: scale(0);
      }
      40% {
        transform: scale(1);
        -webkit-transform: scale(1);
      }
    }
  }
}
</style>
