<template>
  <div class="user-page">
    <img
      src="https://pic1.zhimg.com/80/v2-51ffeb6f6e1f221ebe277a09b43280e4_r.jpg"
      alt=""
    />
    <el-card>
      <ul>
        <li>
          <h3 class="name">用户名</h3>
          <div class="content" v-if="!infoObj.username">
            <span>{{ infoData.username }}</span>
            <div class="edit" @click="isEdit('username')">
              <i class="el-icon-edit"></i> 修改
            </div>
          </div>
          <div class="form" v-else>
            <el-input class="input" v-model="formData.username"></el-input>
            <div class="btn">
              <el-button size="small" type="primary" @click="onSubmit('username')"
                >确定</el-button
              >
              <el-button size="small" @click="cancel('username')">取消</el-button>
            </div>
          </div>
        </li>
        <li>
          <h3>真实姓名</h3>
          <div class="content" v-if="!infoObj.real_name">
            <span>{{ infoData.real_name }}</span>
            <div class="edit" @click="isEdit('real_name')">
              <i class="el-icon-edit"></i> 修改
            </div>
          </div>
          <div class="form" v-else>
            <el-input class="input" v-model="formData.real_name"></el-input>
            <div class="btn">
              <el-button size="small" type="primary" @click="onSubmit('real_name')"
                >确定</el-button
              >
              <el-button size="small" @click="cancel('real_name')">取消</el-button>
            </div>
          </div>
        </li>
        <li>
          <h3>性别</h3>
          <div class="content" v-if="!infoObj.gender">
            <span>{{ genderMap[infoData.gender] }}</span>
            <div class="edit" @click="isEdit('gender')">
              <i class="el-icon-edit"></i> 修改
            </div>
          </div>
          <div class="form" v-else>
            <el-radio v-model="formData.gender" label="1">男</el-radio>
            <el-radio v-model="formData.gender" label="2">女</el-radio>
            <div class="btn">
              <el-button size="small" type="primary" @click="onSubmit('gender')"
                >确定</el-button
              >
              <el-button size="small" @click="cancel('gender')">取消</el-button>
            </div>
          </div>
        </li>
        <li>
          <h3>手机号</h3>
          <div class="content" v-if="!infoObj.phone">
            <span>{{ infoData.phone }}</span>
            <div class="edit" @click="isEdit('phone')">
              <i class="el-icon-edit"></i> 修改
            </div>
          </div>
          <div class="form" v-else>
            <el-input class="input" v-model="formData.phone"></el-input>
            <div class="btn">
              <el-button size="small" type="primary" @click="onSubmit('phone')"
                >确定</el-button
              >
              <el-button size="small" @click="cancel('phone')">取消</el-button>
            </div>
          </div>
        </li>
        <li>
          <h3>学号</h3>
          <div class="content" v-if="!infoObj.sno">
            <span>{{ infoData.sno }}</span>
            <div class="edit" @click="isEdit('sno')">
              <i class="el-icon-edit"></i> 修改
            </div>
          </div>
          <div class="form" v-else>
            <el-input class="input" v-model="formData.sno"></el-input>
            <div class="btn">
              <el-button size="small" type="primary" @click="onSubmit('sno')"
                >确定</el-button
              >
              <el-button size="small" @click="cancel('sno')">取消</el-button>
            </div>
          </div>
        </li>
        <li>
          <h3>收货地址</h3>
          <div class="content" v-if="!infoObj.shipping_address">
            <span>{{ infoData.shipping_address }}</span>
            <div class="edit" @click="isEdit('shipping_address')">
              <i class="el-icon-edit"></i> 修改
            </div>
          </div>
          <div class="form" v-else>
            <el-input
              style="width: 500px"
              class="input"
              v-model="formData.shipping_address"
            ></el-input>
            <div class="btn">
              <el-button size="small" type="primary" @click="onSubmit('shipping_address')"
                >确定</el-button
              >
              <el-button size="small" @click="cancel('shipping_address')">取消</el-button>
            </div>
          </div>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
import { userInfo, userEdit } from "@/api/user";
import { mapGetters } from "vuex";

export default {
  name: "user-page",
  data() {
    return {
      infoObj: {
        username: false, // 用户名
        gender: false, // 性别
        phone: false, // 手机号
        real_name: false, // 真实姓名
        sno: false, // 学号
        shipping_address: false, // 收货地址
      },
      genderMap: {
        0: "其他",
        1: "男",
        2: "女",
      },
      infoData: {},
      formData: {},
    };
  },
  computed: {
    ...mapGetters("global", ["uid"]),
  },
  methods: {
    async getInit() {
      const res = await userInfo({
        uid: this.uid,
      });
      this.infoData = res || {};
      this.formData = JSON.parse(JSON.stringify(this.infoData));
    },

    isEdit(key) {
      this.infoObj[key] = true;
    },
    cancel(key) {
      this.formData[key] = this.infoData[key];
      this.infoObj[key] = false;
    },
    // 手机号校验
    checkPhone(phone) {
      if (
        !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
          Number(phone)
        )
      ) {
        this.$message.warning("手机号码有误，请重填");
        return false;
      } else {
        return true;
      }
    },
    async onSubmit(key) {
      if (key === "username" && !this.formatUsername(this.formData[key])) {
        return;
      }
      if (key === "phone" && !this.checkPhone(this.formData[key])) {
        return;
      }

      if (key === "sno" && `${this.formData[key]}`.length < 9) {
        this.$message.warning("请输入九位学号");
        return;
      }

      this.infoObj[key] = false;

      if (this.formData[key] === this.infoData[key]) return;
      await userEdit(this.formData);
      this.getInit();
    },
    formatUsername(username) {
      if (!username) {
        this.$message.warning("请输入用户名");
        return false;
      }
      const reg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){3,10}$/;
      if (!reg.test(username)) {
        this.$message.warning("请输入以字母开头的4~10位用户名");
        return false;
      }
      return true;
    },
  },
  mounted() {
    this.getInit();
  },
};
</script>
<style lang="less" scoped>
@import "./index";
</style>
