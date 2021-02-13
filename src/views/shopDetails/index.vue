<template>
  <div class="shop-page">
    <div class="content-card">
      <div class="content">
        <div class="shop-img">
          <img :src="info.image" alt="" />
        </div>
        <ul>
          <li><span>商品名称：</span> {{ info.title }}</li>
          <li><span>成色：</span> {{ info.level }}成</li>
          <li class="price"><span>单价：</span> ¥{{ info.price }}</li>
          <li><span>数量：</span> {{ info.count }}</li>
          <li><span>详情：</span> {{ info.information }}</li>
          <li><span>分类：</span> {{ sort_map[info.sort] }}</li>
          <li><span>发布时间： </span>{{ info.create_time | formatData }}</li>
        </ul>
      </div>

      <div class="add-shop">
        <div class="btn">加入购物车</div>
      </div>
    </div>

    <!-- 留言 -->
    <div class="shop-message">
      <div class="title">商品留言:</div>
      <ul>
        <li v-for="item of mesgList" :key="item.id">
          <div class="user-name">
            <div>用户名：{{ item.username }}</div>
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
  </div>
</template>

<script>
import { getShopItem, getShopMesgList, addShopMesg, deleteShopMesg } from "@/api/shop";
import { mapGetters } from "vuex";

export default {
  name: "shop-page",
  data() {
    return {
      info: {},
      content: "",
      mesgList: [],
    };
  },
  filters: {
    formatData(date) {
      if (!date) return "";
      var dateee = new Date(date).toJSON();
      return new Date(+new Date(dateee) + 16 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    },
  },
  computed: {
    ...mapGetters("global", ["sort_map", "uid"]),
  },
  methods: {
    async getInit() {
      const id = this.$route.query.id;
      const res = await getShopItem({ id });
      this.info = res || {};
      this.getMesgList();
    },
    async getMesgList() {
      const { id: sid } = this.info;
      const messageData = await getShopMesgList({ sid, curPage: 1, pageSize: 10 });
      const { list } = messageData || {};
      this.mesgList = list;
    },
    // 发布留言
    async handleAddMesg() {
      const res = await addShopMesg({
        content: this.content,
        sid: this.info.id,
        uid: this.uid,
      });
      this.$message.success("添加留言成功");
      this.getMesgList();
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
            type: "info",
            message: "已取消删除",
          });
        });
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
