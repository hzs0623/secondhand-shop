<template>
  <div class="main-shop-page">
    <NotContent v-if="NotContent" />
    <div class="shop-item" v-else>
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
import NotContent from "@/components/common/NotContent";

export default {
  name: "main-shop-page",
  data() {
    return {
      list: [],
      total: 0,
      pageSize: 10,
      curPage: 1,
      NotContent: false,
    };
  },
  components: {
    ShopItem,
    Page,
    NotContent,
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
      this.NotContent = total == 0 && true;
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
