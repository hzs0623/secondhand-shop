<template>
  <div class="shop-cart">
    <el-table
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="title" label="商品名" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="商品图">
        <template slot-scope="scope">
          <div class="shop_img" @click="onSkip(scope.row.image)">
            <img :src="scope.row.image" alt="" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="information" label="详情" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="price" label="商品金额"> </el-table-column>
      <el-table-column prop="shop_count" label="数量"> </el-table-column>
      <el-table-column label="总金额">
        <template slot-scope="scope">
          <div class="price">
            {{ scope.row | formatPrice }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleRemove(scope.row)" size="mini" type="danger"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 提交 -->
    <div class="submit" v-if="list.length">
      <span
        >总价¥ <i>{{ totalPrice }}</i></span
      >
      <el-button type="primary" :disabled="totalPrice === 0" @click="paymentShop">
        结 算
      </el-button>
    </div>
  </div>
</template>

<script>
import { getShopCart, removeShopCart, paymentShop } from "@/api/shop/shopCart";
import { mapGetters } from "vuex";

export default {
  name: "shop-cart",
  data() {
    return {
      list: [],
      tableData: [],
      totalPrice: 0,
    };
  },
  computed: {
    ...mapGetters("global", ["uid"]),
  },
  filters: {
    formatPrice({ price, shop_count }) {
      return `¥ ${price * shop_count}`;
    },
  },
  methods: {
    async getList() {
      const res = await getShopCart({
        uid: this.uid,
      });
      const { list = [] } = res || {};
      this.list = list;
    },
    handleSelectionChange(val) {
      let total_price = 0;
      val.forEach((item) => {
        const { price, shop_count } = item;
        const totalPrice = price * shop_count;
        total_price += totalPrice;
      });
      this.totalPrice = total_price;
      this.tableData = val;
    },
    handleRemove({ id: sid }) {
      this.$confirm("此操作将删除商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async (_) => {
          await removeShopCart({
            sid,
            uid: this.uid,
          });
          this.getList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    onSkip(url) {
      window.open(url);
    },
    async paymentShop() {
      const shopList = this.tableData.map((item) => {
        const { shop_count, id: sid } = item;
        return {
          shop_count,
          sid,
          state: 1,
        };
      });
      const res = await paymentShop({
        shopList,
        uid: this.uid,
      });
      this.getList();
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="less" scoped>
.shop-cart {
  margin-top: 40px;
  padding: 0 100px;
  .price {
    color: red;
    font-weight: 500;
  }
  .shop_img {
    height: 100px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .submit {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 80px;
    span {
      margin-right: 20px;
      font-size: 18px;
      i {
        color: red;
      }
    }
  }
}
</style>
