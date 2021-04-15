<template>
  <el-dialog
    title="已购买商品"
    :visible.sync="dialogVisible"
    width="80%"
    :before-close="handleClose"
  >
    <el-table
      :data="list"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
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
      <el-table-column label="卖家">
        <template slot-scope="scope">
          <div>
            {{ getUsername(scope.row.uid) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="交易状态">
        <template slot-scope="scope">
          <div>
            {{ sell_state_map[scope.row.state] }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="buy_method" label="支付方式">
        <template slot-scope="scope">
          <div>
            {{ buy_type[scope.row.buy_method] }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.state == 2"
            size="mini"
            type="primary"
            @click="handleEdit(scope.row, 3)"
            >确认收货</el-button
          >
          <el-button
            v-else-if="scope.row.state == 3"
            size="mini"
            type="success"
            disabled
            >交易完成</el-button
          >
          <el-button
            v-else
            size="mini"
            type="warning"
            @click="handleCancel(scope.row)"
            >取消订单</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">close</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getBuyshopList } from "@/api/user/buyShop"
import { orderEdit, orderCancel } from "@/api/order"

import { mapGetters } from "vuex"

export default {
  name: "buy-shop-list",
  props: {
    dialogVisible: false,
  },
  computed: {
    ...mapGetters("global", [
      "uid",
      "username_map",
      "sell_state_map",
      "buy_type",
    ]),
  },
  watch: {
    dialogVisible(newVal) {
      if (newVal) {
        this.getList()
      }
    },
  },
  data() {
    return {
      list: [],
    }
  },
  methods: {
    async getList() {
      const res = await getBuyshopList({
        uid: this.uid,
      })
      const { list = [] } = res
      this.list = list
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.state === 1) {
        return "success-row"
      } else if (row.state === 3) {
        return "warning-row"
      }
      return ""
    },
    onSkip(url) {
      window.open(url)
    },
    handleClose() {
      this.$emit("close")
    },
    getUsername(uid) {
      let username = ""
      this.username_map.some((item) => {
        if (item.uid == uid) {
          username = item.username
          return true
        }
      })
      return username
    },
    // 发货
    async handleEdit({ sid }, state) {
      await orderEdit({
        uid: this.uid,
        sid,
        state,
      })
      this.$message.success("确认收货成功")
      this.getList()
    },
    // 取消订单
    async handleCancel({ sid }) {
      await orderCancel({
        sid,
        uid: this.uid,
      })
      this.$message.success("取消订单成功")
      this.getList()
      // this.handleClose();
    },
  },
}
</script>
