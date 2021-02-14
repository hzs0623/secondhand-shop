<template>
  <div class="shop-page">
    <div class="content-card">
      <div class="content">
        <div class="shop-img">
          <img :src="shopping.image" alt="" />
        </div>
        <ul>
          <li><span>商品名称：</span> {{ shopping.title }}</li>
          <li><span>成色：</span> {{ shopping.level }}成</li>
          <li class="price">
            <span>单价：</span> ¥{{ shopping.price ? shopping.price : "0" }}
          </li>
          <li><span>数量：</span> {{ shopping.count }}</li>
          <li><span>详情：</span> {{ shopping.shoppingrmation }}</li>
          <li><span>分类：</span> {{ sort_map[shopping.sort] }}</li>
          <li><span>发布时间： </span>{{ shopping.create_time | formatTime }}</li>
          <li><span>更新时间： </span>{{ shopping.update_time | formatTime }}</li>
        </ul>
      </div>

      <div class="add-shop">
        <div class="btn" v-if="shopping.uid !== uid">
          <i class="el-icon-shopping-cart-2"></i> 加入购物车
        </div>
        <div v-else>
          <el-button type="primary" @click="handleEdit" class="el-icon-edit"
            >修改</el-button
          >
          <el-button @click="removeShop" class="el-icon-delete">删除商品 </el-button>
        </div>
      </div>
    </div>

    <!-- 留言 -->
    <div class="shop-message">
      <div class="title">商品留言:</div>
      <ul>
        <li v-for="item of mesgList" :key="item.id">
          <div class="user-name">
            <div>
              用户名：{{ item.username }}
              <el-link
                :type="item.uid == shopping.uid ? 'primary' : 'success'"
                :underline="false"
              >
                {{ item.uid == shopping.uid ? "卖家" : "买家" }}</el-link
              >
            </div>
            <div>
              {{ item.create_time | formatTime
              }}<span v-if="item.uid == uid" @click="handleDelete(item)">删除</span>
            </div>
          </div>
          <div class="text">{{ item.content }}</div>
        </li>
      </ul>
      <div class="message-text">
        <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="content">
        </el-input>
      </div>
      <div class="add-message">
        <el-button type="primary" @click="handleAddMesg">发布留言</el-button>
      </div>
    </div>

    <!-- 编辑商品 -->
    <ShopEdit
      @submit="onEditSumbit"
      :dialogVisible="dialogVisible"
      @close="onEditClose"
      :form="shopping"
    />
  </div>
</template>

<script>
import {
  getShopItem,
  getShopMesgList,
  addShopMesg,
  deleteShopMesg,
  removeShop,
  editShop,
} from "@/api/shop";
import { mapGetters } from "vuex";
import ShopEdit from "./shopEdit";

export default {
  name: "shop-page",
  data() {
    return {
      shopping: {},
      content: "",
      mesgList: [],
      dialogVisible: false,
    };
  },
  components: {
    ShopEdit,
  },
  computed: {
    ...mapGetters("global", ["sort_map", "uid"]),
  },
  methods: {
    async getInit() {
      const id = this.$route.query.id;
      const res = await getShopItem({ id });
      this.shopping = res || {};
      this.getMesgList();
    },
    async getMesgList() {
      const { id: sid } = this.shopping;
      const messageData = await getShopMesgList({ sid, curPage: 1, pageSize: 10 });
      const { list } = messageData || {};
      this.mesgList = list;
    },
    // 发布留言
    async handleAddMesg() {
      if (!this.uid) {
        // 没有登陆提示
        this.$message.warning("登陆后，可留言");
        return;
      }

      if (!this.content.trim()) return this.$message.warning("请输入留言内容");

      const res = await addShopMesg({
        content: this.content,
        sid: this.shopping.id,
        uid: this.uid,
      });

      this.getMesgList();
      this.$message.success("添加留言成功");
      this.content = "";
    },
    // 删除留言
    handleDelete(item) {
      this.$confirm("此操作将永久删除该留言, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { uid, sid, id } = item;
          await deleteShopMesg({
            id,
            uid,
            sid,
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getMesgList();
        })
        .catch(() => {
          this.$message({
            type: "shopping",
            message: "已取消删除",
          });
        });
    },
    // 删除商品
    removeShop() {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async (_) => {
          await removeShop({
            id: this.shopping.id,
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.$router.push("/");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleEdit() {
      this.dialogVisible = true;
    },
    onEditClose() {
      this.dialogVisible = false;
    },
    async onEditSumbit(form) {
      const res = await editShop(form);
      this.$message.success("修改成功");
      this.onEditClose();
      this.getInit();
    },
  },
  created() {
    this.getInit();
  },
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
