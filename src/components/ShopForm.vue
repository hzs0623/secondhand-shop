<template>
  <div class="form-shop">
    <el-form ref="form" :rules="rules" :model="formData" label-width="80px">
      <el-form-item label="商品标题" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="商品单价" prop="price">
        <el-input-number
          v-model="formData.price"
          :precision="2"
          :min="0.01"
          :max="9999"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="商品数量" prop="count">
        <el-input-number
          v-model="formData.count"
          :min="1"
          :max="99"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="商品成色" prop="level">
        <el-select v-model="formData.level" placeholder="请选择商品成色">
          <el-option
            v-for="(item, key) in level_map"
            :key="key"
            :label="item"
            :value="key - 0"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详情" prop="information">
        <el-input type="textarea" v-model="formData.information"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="sort">
        <el-select v-model="formData.sort" placeholder="请选择分类">
          <el-option
            v-for="(item, key) in sort_map"
            :key="key"
            :label="item"
            :value="key - 0"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品图片">
        <ImageUpdate ref="updateImg" @success="onSuccess" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布商品</el-button>
        <el-button v-if="!formData.id" @click="onClear">清空</el-button>
        <el-button v-else @click="onClose">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import ImageUpdate from "./common/ImgUpdate"

export default {
  name: "shop-form-comp",
  props: {
    form: {},
  },
  components: {
    ImageUpdate,
  },
  computed: {
    ...mapGetters("global", ["level_map", "sort_map"]),
  },
  data() {
    return {
      rules: {
        title: [{ required: true, message: "请输入商品标题", trigger: "blur" }],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        count: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
        information: [
          { required: true, message: "请输入商品详情", trigger: "blur" },
        ],
        level: [
          { required: true, message: "请选择商品成色", trigger: "change" },
        ],
        sort: [
          { required: true, message: "请选择商品分类", trigger: "change" },
        ],
      },
      formData: this.getInit() || {},
    }
  },
  methods: {
    getInit() {
      let obj = {
        count: 1,
        price: 0.01,
      }
      for (let key in this.form) {
        obj[key] = this.form[key]
      }
      return obj
    },
    // 图片上传成功
    onSuccess(imageUrl) {
      this.$emit("submit", {
        ...this.formData,
        image: imageUrl,
      })
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (!valid) return this.$message.warning("完善表单")
        // 修改
        if (this.formData.id && !this.$refs.updateImg.isImage) {
          this.$emit("submit", this.formData)
        } else {
          // 新增
          if (!this.$refs.updateImg.isImage)
            return this.$message.warning("请上传商品图片")
          this.$refs.updateImg.submit() // 提交图片
        }
      })
    },
    onClear() {
      this.$refs["form"].resetFields()
    },
    onClose() {
      this.$emit("close")
    },
  },
}
</script>
<style lang="less" scoped>
.form-shop {
  margin-top: 40px;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 50%;
}
</style>
