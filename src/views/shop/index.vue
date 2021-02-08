<template>
  <div class="main-shop-page">
    <div class="shop-item">
      <shop-item
        class="item"
        v-for="item in shopList"
        :key="item.title"
        :shop="item"
        @info="handleDetails"
      />
    </div>
  </div>
</template>

<script>
import ShopItem from "@/components/ShopItem";
export default {
  name: "main-shop-page",
  data() {
    return {
      shopList: [
        {
          image:
            "https://cbu01.alicdn.com/img/ibank/2019/578/545/12498545875_1724752818.220x220.jpg?_=2020",
          title: "厂家直供家用智能静音扫地机器人电池 家用电器充电清洁扫地机",
          price: 1.4,
          level: 9,
          browse_num: 999,
        },
        {
          image:
            "https://cbu01.alicdn.com/img/ibank/2019/578/545/12498545875_1724752818.220x220.jpg?_=2020",
          title: "厂家直供家用智能静音扫地机器人电池 ",
          price: 1.4,
          level: 9,
          browse_num: 999,
        },
        {
          image:
            "https://cbu01.alicdn.com/img/ibank/2019/578/545/12498545875_1724752818.220x220.jpg?_=2020",
          title: "厂家直供家用静音扫地机器人电池 ",
          price: 1.4,
          level: 9,
          browse_num: 999,
        },

        {
          image:
            "https://cbu01.alicdn.com/img/ibank/2019/578/545/12498545875_1724752818.220x220.jpg?_=2020",
          title: "厂家直供家用静音扫地机器人电池 ",
          price: 1.4,
          level: 9,
          browse_num: 999,
        },
        {
          image:
            "https://cbu01.alicdn.com/img/ibank/2019/578/545/12498545875_1724752818.220x220.jpg?_=2020",
          title: "厂家直供家用静音扫地机器人电池 ",
          price: 1.4,
          level: 9,
          browse_num: 999,
        },
        {
          image:
            "https://cbu01.alicdn.com/img/ibank/2019/578/545/12498545875_1724752818.220x220.jpg?_=2020",
          title: "厂家直供家用静音扫地机器人电池 ",
          price: 1.4,
          level: 9,
          browse_num: 999,
        },
        {
          image:
            "https://cbu01.alicdn.com/img/ibank/2019/578/545/12498545875_1724752818.220x220.jpg?_=2020",
          title: "厂家直供家用静音扫地机器人电池 ",
          price: 1.4,
          level: 9,
          browse_num: 999,
        },
        {
          image:
            "https://cbu01.alicdn.com/img/ibank/2019/578/545/12498545875_1724752818.220x220.jpg?_=2020",
          title: "厂家直供家用静音扫地机器人电池 ",
          price: 1.4,
          level: 9,
          browse_num: 999,
        },
      ],
    };
  },
  components: {
    ShopItem,
  },
  methods: {
    handleDetails(item) {
      console.log(item);
    },
  },
  created() {},
};
</script>
<style lang="less">
.main-shop-page {
  .shop-item {
    display: flex;
    flex-wrap: wrap;
    .item {
      margin: 20px 20px 0 0;
    }
  }
}
</style>
