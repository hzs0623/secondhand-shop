<template>
  <div class="shop-cart">
    <el-table
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
        :selectable="checkboxT"
      >
      </el-table-column>
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
      <el-table-column label="是否还有货">
        <template slot-scope="scope">
          <div>
            {{ scope.row.display === 2 ? "卖完啦" : "有货" }}
          </div>
        </template>
      </el-table-column>
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
      <el-button
        type="primary"
        :disabled="totalPrice === 0"
        @click="handleSettlement"
      >
        结 算
      </el-button>
    </div>

    <el-dialog
      title="支付方式"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="收货地址：" prop="shipping_address">
          <el-input
            v-model="form.shipping_address"
            placeholder="请输入收货地址"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="联系电话：" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入联系电话">
          </el-input>
        </el-form-item>
        <el-form-item label="支付方式：" prop="buy_method">
          <el-select v-model="form.buy_method" placeholder="请选择支付方式">
            <el-option
              v-for="(item, key) in buy_type"
              :key="key"
              :label="item"
              :value="key"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="paymentShop">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getShopCart, removeShopCart, paymentShop } from "@/api/shop/shopCart"
import { mapGetters } from "vuex"
import { userInfo } from "@/api/user"

export default {
  name: "shop-cart",
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!/^1(3[0-9]|4[678]|5[0-35-9]|7[0-8]|9[0-35-9])\d{8}/.test(value)) {
        callback(new Error("输入正确的手机号"))
      } else {
        callback()
      }
    }
    return {
      list: [],
      tableData: [],
      totalPrice: 0,
      dialogVisible: false,
      form: {
        buy_method: "", // 支付方式
        shipping_address: "", // 收货地址
        phone: "",
      },
      rules: {
        buy_method: [
          { required: true, message: "请选择支付方式", trigger: "change" },
        ],
        shipping_address: [
          { required: true, message: "输入收货地址", trigger: "blur" },
        ],

        phone: { validator: validatePhone, trigger: "blur" },
      },
    }
  },
  computed: {
    ...mapGetters("global", ["uid", "buy_type"]),
  },
  filters: {
    formatPrice({ price, shop_count }) {
      return `¥ ${price * shop_count}`
    },
  },
  methods: {
    async getList() {
      const res = await getShopCart({
        uid: this.uid,
      })
      const { list = [] } = res || {}
      this.list = list
    },
    checkboxT(row) {
      return row.display !== 2
    },
    tableRowClassName({ row }) {
      if (row.display === 2) {
        return "warning-row"
      }
      return "success-row"
    },
    handleSelectionChange(val) {
      let total_price = 0
      val.forEach((item) => {
        const { price, shop_count } = item
        const totalPrice = price * shop_count
        total_price += totalPrice
      })
      this.totalPrice = total_price
      this.tableData = val
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
          })
          this.getList()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          })
        })
    },
    onSkip(url) {
      window.open(url)
    },
    paymentShop() {
      this.$refs["form"].validate(async (valid) => {
        if (!valid) {
          this.$message.warning("请完善表单")
          return
        }

        const shopList = this.tableData.map((item) => {
          const { shop_count, id: sid, uid: vendor_uid } = item
          return {
            shop_count,
            sid,
            state: 1,
            vendor_uid, // 商家uid
          }
        })
        // 结算
        await paymentShop({
          shopList,
          uid: this.uid,
          ...this.form,
        })
        this.handleClose()
        this.$message.success("购买成功，等待卖家发货")
        this.getList()
      })
    },
    handleClose() {
      this.dialogVisible = false
    },
    async handleSettlement() {
      this.dialogVisible = true
      const res = await userInfo({
        uid: this.uid,
      })
      const { phone, shipping_address } = res || {}
      this.form.phone = phone
      this.form.shipping_address = shipping_address
    },
  },
  mounted() {
    this.getList()
  },
}
</script>
<style lang="less" scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
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
