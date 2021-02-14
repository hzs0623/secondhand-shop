<template>
  <div class="publish-page">
    <Form @submit="submit" />
  </div>
</template>

<script>
import Form from "@/components/ShopForm";
import { mapGetters } from "vuex";
import { addShopItem } from "@/api/shop";

export default {
  name: "publish-page",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("global", ["uid"]),
  },
  components: {
    Form,
  },
  methods: {
    async submit(form) {
      const params = {
        ...form,
        uid: this.uid,
      };
      const res = await addShopItem(params);
      this.$message.success("发布商品成功");
      this.$router.push("/"); // 跳转到主页
    },
  },
};
</script>
