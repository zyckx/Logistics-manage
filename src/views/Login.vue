<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">欢迎使用物流公司运营管理系统</div>

      <el-form
        :model="param"
        :rules="rules"
        ref="login"
        label-width="0px"
        class="ms-content"
      >
        <el-radio-group v-model="param.userFlag" size="large">
          <el-radio-button label="1">管理</el-radio-button>
          <el-radio-button label="2">司机</el-radio-button>
          <el-radio-button label="3">用户</el-radio-button>
        </el-radio-group>
        <div style="height: 20px"></div>
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="username">
            <template #prepend>
              <el-icon :size="20">
                <Edit />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="param.password"
          >
            <template #prepend>
              <el-icon :size="20">
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/store/UserStore";
const router = useRouter();
const route = useRoute();
const param = reactive({
  username: null,
  password: null,
  userFlag: "1",
  userId: "test",
  userName: "test",
});
console.log(router, route);
// 用户校验
const rules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};
const login = ref(null);
// 状态管理
const store = useGlobalStore();
const submitForm = () => {
  store.setUserFlag(param.userFlag);
  store.setUserId(param.userId);
  // localStorage.setItem("token","true");
  console.log("yes");
  if (param.userFlag == "1") {
    router.push("/admin");
    ElMessage.success("登录成功");
  } else if (param.userFlag == "2") {
    router.push("/driver");
    ElMessage.success("登录成功");
  } else if (param.userFlag == "3") {
    router.push("/customer");
    ElMessage.success("登录成功");
  }
};

store.clearTags(); // 清空标签

// defineExpose 可以省略
defineExpose({
  rules,
  submitForm,
});
</script>

<style>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("@/assets/img/background.jpeg");
  background-size: cover;
  object-fit: cover;
}

.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #000000;
  border-bottom: 1px solid #ddd;
}

.ms-login {
  width: 600px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.ms-content {
  padding: 30px 30px;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}

.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}

@media screen and (max-width: 768px) {
  .ms-login {
    width: 100%;
  }

  .el-radio-button__inner {
    padding: 12px 16px;
  }
}
</style>
