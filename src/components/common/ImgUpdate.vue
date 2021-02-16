<template>
  <div class="upload-img-comp">
    <el-upload
      :action="actionUrl"
      list-type="picture-card"
      :auto-upload="false"
      :multiple="false"
      :headers="headers"
      :limit="1"
      accept=".png,.jpg,.jpeg,.gif, .bmp"
      ref="upload"
      :on-success="success"
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
import { apiUrl } from "@/utils/var";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("global", ["token"]),
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      actionUrl: `${apiUrl}/upload/image`, // 上传地址
      headers: {
        authtoken: "",
      },
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
      this.headers.authtoken = this.token;
      this.$refs.upload.submit();
    },
    success(response, file, fileList) {
      const { code } = response;
      if (code === 1005) {
        this.$router.push("/login");
        return;
      }
      this.$emit("success", response, file, fileList);
    },
    onChange(file) {
      if (!file.url) return;
      this.isImage = true;
    },
  },
};
</script>
