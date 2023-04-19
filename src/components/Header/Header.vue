<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <el-icon v-if="!collapse" :size="20">
        <fold />
      </el-icon>
      <el-icon v-else :size="20">
        <expand />
      </el-icon>
    </div>

    <!-- logo名 -->
    <div class="logo">
      物流公司运营管理系统
      <span class="role-name">({{ props.roleName }})</span>
    </div>

    <!-- 头部右侧 -->
    <div class="header-right">
      <div class="header-user-con">
        <!-- 消息中心 -->
        <div class="btn-bell">
          <!-- <el-tooltip
            effect="dark"
            :content="message ? `有${message}条未读消息` : `消息中心`"
            placement="bottom"
          >
            <router-link to="/tabs">
              <el-icon :size="20" color="#409EFC">
                <bell />
              </el-icon>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span> -->
        </div>

        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="../../assets/userlogin01.svg" />
        </div>

        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ store.userinfo.name }}
            <el-icon :size="20">
              <caret-bottom />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="user">个人中心</el-dropdown-item>
              <el-dropdown-item divided command="loginout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/store/UserStore";
import { adminLogout } from "@/api/Admin";
import { customerLogout } from "@/api/Customer";
import { driverLogout } from "@/api/Driver";
const message = 2;
const props = defineProps<{
  roleName: {
    type: string;
    default: "";
  };
}>(); // 传入角色名
const store = useGlobalStore();
const collapse = computed(() => store.collapse); // 设置侧边栏是否折叠

// 侧边栏折叠
const collapseChage = () => {
  store.handleCollapse(!collapse.value);
};

// 当屏幕宽度超多1500,折叠侧边栏
onMounted(() => {
  if (document.body.clientWidth < 1500) {
    collapseChage();
  }
});

// 用户名下拉菜单选择事件
const router = useRouter();
const handleCommand = (command: string) => {
  if (command == "loginout") {
    switch (store.userFlag) {
      case "1":
        adminLogout().then((res) => {
          if (res.code == 200) {
            ElNotification({
              title: "退出成功",
              message: h("i", { style: "color: teal" }, "请重新登录"),
            });
            router.push("/login");
          }
        });
        break;
      case "2":
        driverLogout().then((res) => {
          if (res.code == 200) {
            ElNotification({
              title: "退出成功",
              message: h("i", { style: "color: teal" }, "请重新登录"),
            });
            router.push("/login");
          }
        });

        break;
      case "3":
        customerLogout().then((res) => {
          if (res.code == 200) {
            ElNotification({
              title: "退出成功",
              message: h("i", { style: "color: teal" }, "请重新登录"),
            });
            router.push("/login");
          }
        });
        break;
    }
  } else if (command == "user") {
    switch (store.userFlag) {
      case "1":
        router.push("/admin");
        break;
      case "2":
        router.push("/driver");
        break;
      case "3":
        router.push("/customer");
        break;
    }
  }
};
</script>

<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  background: #000;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 74px;
}
.header .logo {
  float: left;
  width: 300px;
  line-height: 70px;
}
.role-name {
  font-size: 14px;
  color: #409efc;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
  margin-top: 10px;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin: 0px 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.el-dropdown-link .el-icon {
  margin-left: 4px;
}

.el-dropdown-menu__item {
  text-align: center;
}
</style>
