<template>
  <div class="my-shoping">
    <NotContent v-if="notContent" />
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
import { mapGetters } from "vuex";
import { getByIdShopList } from "@/api/shop";
import ShopItem from "@/components/ShopItem";
import Page from "@/components/common/Page";
import NotContent from "@/components/common/NotContent";

export default {
  name: "my-shoping",
  computed: {
    ...mapGetters("global", ["uid"]),
  },
  components: {
    ShopItem,
    Page,
    NotContent,
  },
  data() {
    return {
      pageSize: 10,
      curPage: 1,
      list: [],
      total: 0,
      notContent: false,
    };
  },
  methods: {
    async getList() {
      const res = await getByIdShopList({
        pageSize: this.pageSize,
        curPage: this.curPage,
        uid: this.uid,
      });
      const { total = 0, list = [] } = res || {};
      this.total = total;
      this.list = list;
      if (list.length === 0) {
        this.notContent = true;
      }
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
  mounted() {
    this.getList();
  },
};
</script>
<style lang="less" scoped>
.my-shoping {
  .shop-item {
    display: flex;
    flex-wrap: wrap;
    .item {
      margin: 20px 20px 0 0;
    }
  }
}
</style>
