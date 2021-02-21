<template>
  <div v-if="total" class="page-comp">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="curPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "page-comp",
  props: {
    total: 0,
    pageSize: 0,
    curPage: 0,
    pageSizes: [3, 6, 9, 100],
  },
  methods: {
    handleCurrentChange(page) {
      this.$emit("handleChange", page);
    },
    handleSizeChange(size) {
      this.$emit("handleSizeChange", size);
    },
  },
};
</script>

<style lang="less" scoped>
.page-comp {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
