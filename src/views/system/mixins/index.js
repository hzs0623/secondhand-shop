export default {
  methods: {
    formValid(form = {}) {
      const { username, password } = form;
      if (!this.formatUsername(username) || !this.formatPassword(password)) {
        return false;
      } else {
        return true;
      }

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

    formatPassword(str) {
      if (!str) {
        this.$message.warning("请输入密码");
        return false;
      }
      const reg = /^[a-zA-Z0-9]{1}([a-zA-Z0-9]|[._]){5,18}$/;
      if (!reg.test(str)) {
        this.$message.warning("请输入6～18位密码");
        return false;
      }
      return true;
    },
  },
}