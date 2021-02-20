<template>
  <div class="upload-img-comp">
    <el-upload
      action
      :http-request="Upload"
      list-type="picture-card"
      :auto-upload="false"
      :multiple="false"
      :limit="1"
      accept=".png,.jpg,.jpeg,.gif, .bmp"
      ref="upload"
      :on-change="onChange"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            class="el-upload-list__item-delete"
            v-if="!disabled"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" :modal="false" :close-on-click-modal="true">
      <img :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { apiUrl } from "@/constant";
import { mapGetters } from "vuex";
import { uploadSdk } from "@/sdk";

export default {
  computed: {
    ...mapGetters("global", ["token"]),
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      isImage: false,
    };
  },
  methods: {
    handleRemove(file) {
      this.$refs.upload.clearFiles();
      this.isImage = false;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传服务器
    submit() {
      this.$refs.upload.submit();
    },
    onChange(file) {
      if (!file.url) return;
      this.isImage = true;
    },
    Upload(file) {
      uploadSdk(file.file)
        .then((imageUrl) => {
          // 返回上传成功的地址
          this.$emit("success", imageUrl);
        })
        .catch((e) => {
          this.$emit("error", e);
        });
    },
  },
};
</script>
