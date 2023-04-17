<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">欢迎使用物流公司运营管理系统</div>

      <el-form
        :model="Form.loginForm"
        :rules="rules"
        ref="login"
        label-width="0px"
        class="ms-content"
        v-show="IsLogin"
        @keyup.enter="submitForm"
      >
        <el-radio-group v-model="Form.userFlag" size="large">
          <el-radio-button label="1">管理</el-radio-button>
          <el-radio-button label="2">司机</el-radio-button>
          <el-radio-button label="3">用户</el-radio-button>
        </el-radio-group>
        <div style="height: 20px"></div>
        <el-form-item prop="account">
          <el-input v-model="Form.loginForm.account" placeholder="account">
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
            v-model="Form.loginForm.password"
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

        <div>
          <p>
            还没有账号？<span
              style="font-style: italic"
              @click="() => (IsLogin = !IsLogin)"
              >点击注册</span
            >
          </p>
        </div>
      </el-form>
      <el-form
        :model="Form.registerForm"
        :rules="rules"
        ref="login"
        label-width="0px"
        class="ms-content"
        @keyup.enter="submitForm"
        v-show="!IsLogin"
      >
        <el-radio-group v-model="Form.userFlag" size="large">
          <el-radio-button label="3">用户</el-radio-button>
        </el-radio-group>
        <div style="height: 20px"></div>
        <el-form-item prop="account">
          <el-input v-model="Form.registerForm.account" placeholder="account">
            <template #prepend>
              <el-icon :size="20">
                <Edit />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
       
        <el-form-item prop="name">
          <el-input
            type="text"
            placeholder="name"
            v-model="Form.registerForm.name"
          >
            <template #prepend>
              <el-icon :size="20">
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="phoneNum">
          <el-input
            type="text"
            placeholder="phoneNum"
            v-model.number="Form.registerForm.phoneNum"
          >
            <template #prepend>
              <el-icon :size="20">
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="Form.registerForm.password"
          >
            <template #prepend>
              <el-icon :size="20">
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="register">注册</el-button>
        </div>
        <div>
          <p>
            已有账号<span
              style="font-style: italic"
              @click="() => (IsLogin = !IsLogin)"
              >去登录</span
            >
          </p>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/store/UserStore";
import { customerLogin,customerRegister } from "@/api/Customer/index";
import { driverLogin } from "@/api/Driver/index";
import { adminLogin } from "@/api/Admin/index";
import { register } from "@/api/User/Register";
const router = useRouter();
const route = useRoute();
const IsLogin = ref(true);
const Form = reactive({
  loginForm: {
    account: "",
    password: "",
  },
  registerForm: {
    account: "",
    name: "",
    password: "",
    phoneNum: 0,
  },
  userFlag: "3",
  userId: "test",
  userName: "test",
});
// 用户校验
const rules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};
const login = ref(null);
// 状态管理
const store = useGlobalStore();
const submitForm = () => {
  store.setUserFlag(Form.userFlag);
  store.setUserId(Form.userId);
  // localStorage.setItem("token","true");
  console.log("yes");
  if (Form.userFlag == "1") {
    adminLogin(Form.loginForm).then((res) => {
      console.log(res);
      if (res.code == 200) {
        ElMessage.success("登录成功");
        router.push("/admin");
      } else {
        ElMessage.error("登录失败,请检查账号密码");
      }
    });
  } else if (Form.userFlag == "2") {
    driverLogin(Form.loginForm).then((res) => {
      console.log(res);
      if (res.code == 200) {
        ElMessage.success("登录成功");
        router.push("/driver");
      } else {
        ElMessage.error("登录失败,请检查账号密码");
      }
    });
  } else if (Form.userFlag == "3") {
    customerLogin(Form.loginForm).then((res) => {
      console.log(res);
      if (res.code == 200) {
        ElMessage.success("登录成功");
        router.push("/customer");
      } else {
        ElMessage.error("登录失败,请检查账号密码");
      }
    });
  }
};
const register = () => {
  customerRegister(Form.registerForm).then((res) => {
    console.log(res);
    if (res.code == 200) {
      ElMessage.success("注册成功");
      IsLogin.value = true;
    } else {
      ElMessage.error("注册失败");
    }
  });
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
