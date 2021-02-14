<template>
  <el-dialog
    title="修改商品信息"
    :visible.sync="dialogVisible"
    width="60%"
    :before-close="handleClose"
  >
    <ShopForm v-bind="$attrs" @close="handleClose" v-on="$listeners" />
  </el-dialog>
</template>

<script>
import ShopForm from "@/components/ShopForm";

export default {
  name: "demo",
  components: {
    ShopForm,
  },
  props: {
    dialogVisible: false,
  },
  data() {
    return {};
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
  },
};
</script>
<style lang="less" scoped></style>
