<template>
  <el-dialog
    title="已购买商品"
    :visible.sync="dialogVisible"
    width="60%"
    :before-close="handleClose"
  >
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="title" label="商品名" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="商品图">
        <template slot-scope="scope">
          <div class="shop_img" @click="onSkip(scope.row.image)">
            <img :src="scope.row.image" alt="" style="height: 60px" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="information" label="详情" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="price" label="商品金额"> </el-table-column>
      <el-table-column prop="shop_count" label="数量"> </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">close</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getBuyshopList } from "@/api/user/buyShop";
import { mapGetters } from "vuex";

export default {
  name: "buy-shop-list",
  props: {
    dialogVisible: false,
  },
  computed: {
    ...mapGetters("global", ["uid"]),
  },
  watch: {
    dialogVisible(newVal) {
      if (newVal) {
        this.getList();
      }
    },
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    async getList() {
      const res = await getBuyshopList({
        uid: this.uid,
      });
      const { list = [] } = res;
      this.list = list;
    },
    onSkip(url) {
      window.open(url);
    },
    handleClose() {
      this.$emit("close");
    },
  },
};
</script>
<style lang="less" scoped></style>
