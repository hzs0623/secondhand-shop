<template>
  <el-dialog
    title="出售订单"
    :visible.sync="sellState"
    width="90%"
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
      <el-table-column label="商品信息">
        <template slot-scope="scope">
          <div>
            <div>商品金额: {{ scope.row.price }}</div>
            <div>交易状态: {{ sell_state_map[scope.row.state] }}</div>
            <div>购买数量: {{ scope.row.shop_count }}</div>
            <div>支付方式: {{ buy_type[scope.row.buy_method] }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="买家信息">
        <template slot-scope="scope">
          <div>
            <div>用户名：{{ getUsername(scope.row.buy_uid) }}</div>
            <div>联系电话：{{ scope.row.phone }}</div>
            <div>收货地址：{{ scope.row.shipping_address }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.state == 1"
            size="mini"
            type="primary"
            @click="handleEdit(scope.row, 2)"
            >发货</el-button
          >
          <el-button
            v-if="scope.row.state == 3"
            size="mini"
            type="success"
            disabled
            >交易完成</el-button
          >
          <el-button
            size="mini"
            v-if="scope.row.state !== 3"
            type="warning"
            @click="handleCancel(scope.row)"
            >取消订单</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <Page
      :curPage="curPage"
      :pageSize="pageSize"
      :total="total"
      @handleChange="handleChange"
    />

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">close</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getOrderList, orderEdit, orderCancel } from "@/api/order"
import { mapGetters } from "vuex"
import Page from "@/components/common/Page"

export default {
  name: "buy-shop-list",
  props: {
    sellState: false,
  },
  computed: {
    ...mapGetters("global", [
      "uid",
      "username_map",
      "sell_state_map",
      "buy_type",
    ]),
  },
  components: {
    Page,
  },
  watch: {
    sellState(newVal) {
      if (newVal) {
        this.getList()
      }
    },
  },
  data() {
    return {
      list: [],
      pageSize: 5,
      curPage: 1,
      total: 0,
    }
  },
  methods: {
    async getList() {
      const res = await getOrderList({
        uid: this.uid,
        pageSize: this.pageSize,
        curPage: this.curPage,
      })
      const { list = [], total = 0 } = res
      this.list = list
      this.total = total
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.state === 1) {
        return "warning-row"
      } else if (row.state === 3) {
        return "success-row"
      }
      return ""
    },
    onSkip(url) {
      window.open(url)
    },
    handleClose() {
      this.$emit("close")
    },
    handleChange(page) {
      this.curPage = page
      this.getList()
    },
    // 发货
    async handleEdit({ buy_uid: uid, sid }, state) {
      await orderEdit({
        uid,
        sid,
        state,
      })
      this.$message.success("发货成功！")
      this.getList()
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
    // 取消订单
    async handleCancel({ sid }) {
      await orderCancel({
        sid,
        uid: this.uid,
      })
      this.$message.success("取消订单成功")
      this.getList()
    },
  },
}
</script>
<style lang="less"></style>
