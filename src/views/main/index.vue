<template>
  <div class="main-shop-page">
    <div class="shop-item">
      <shop-item
        class="item"
        v-for="item in list"
        :key="item.id"
        :shop="item"
        @info="handleDetails"
      />
    </div>

    <Page
      :total="total"
      :pageSize="pageSize"
      :curPage="curPage"
      @handleChange="handlePage"
      @handleSizeChange="handleSizeChange"
    />
  </div>
</template>

<script>
import ShopItem from "@/components/ShopItem";
import Page from "@/components/common/Page";
import { getShopList } from "@/api/shop";

export default {
  name: "main-shop-page",
  data() {
    return {
      list: [],
      total: 0,
      pageSize: 10,
      curPage: 1,
    };
  },
  components: {
    ShopItem,
    Page,
  },
  methods: {
    getInit() {
      this.getList();
    },
    async getList() {
      const res = await getShopList({
        pageSize: this.pageSize,
        curPage: this.curPage,
      });
      const { list = [], total = 0 } = res || {};
      this.list = list;
      this.total = total;
    },
    handleDetails(item) {
      this.$router.push({
        path: "/shop/details",
        query: {
          id: item.id,
        },
      });
    },
    handlePage(page) {
      this.curPage = page;
      this.getList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getList();
    },
  },
  created() {
    this.getInit();
  },
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
