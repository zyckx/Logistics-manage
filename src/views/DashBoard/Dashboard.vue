<template>
  <div class="dashboard-wrap">
    <!-- 用户信息、访问量、语言详情、待办事项 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <!-- 用户信息 -->
        <el-card shadow="hover" class="mgb20" style="height: 252px">
          <div class="user-info">
            <img
              src="../../assets/userlogin01.svg"
              class="user-avator"
              alt="user-logo"
            />
            <div class="user-info-cont">
              <div class="user-info-name">{{}}</div>
              <div>当前身份：{{ UserInfo.roleName }}</div>
              <div style="font-size: 20px">欢迎您使用物流公司运营管理系统</div>
            </div>
          </div>
          <div class="user-info-list">
            当前登录时间：<span>{{ currentTime }}</span>
          </div>
          <div class="user-info-list">当前登录地点：<span>中国</span></div>
        </el-card>

        <!-- 语言详情 -->
        <el-card shadow="hover" v-if="store.userFlag == '2'">
          <template #header>
            <div class="clearfix">
              <span>公告</span>
            </div>
          </template>
          <ul class="notice-wrap">
            <li class="notice" v-for="notice in notices">
              <span class="notice-title">{{ notice.title }}</span>
              <span class="notice-time">{{
                notice.createTime.substring(0, 10)
              }}</span>
              <span class="notice-content">{{ notice.content }}</span>
            </li>
          </ul>
        </el-card>
      </el-col>

      <el-col :span="16">
        <!-- 待办 -->
        <el-card shadow="hover" style="height: 403px">
          <template #header>
            <div class="clearfix"><span>个人信息</span></div>
          </template>
          <template v-if="store.userFlag == '3'">
            <!-- 用户运输任务展示 -->
            <ul>
              <li>姓名：{{ store.userinfo.name }}</li>
              <li>电话：{{ store.userinfo.phoneNum }}</li>
              <li>账号：{{ store.userinfo.account }}</li>
            </ul>
          </template>
          <template v-else="store.userFlag == '2'">
            <!-- 用户运输任务展示 -->
            <ul>
              <li>姓名：{{ store.userinfo.name }}</li>
              <li>电话：{{ store.userinfo.phoneNum }}</li>
              <li>账号：{{ store.userinfo.numid }}</li>
              <li>
                是否拥有资格证 ：
                <el-tag>
                  {{ store.userinfo.hasDanger == 1 ? "是" : "否" }}
                </el-tag>
              </li>
            </ul>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/store/UserStore";
import { getCurrentTask } from "@/api/Customer";
import { getAllNotice } from "@/api/Driver";

const store = useGlobalStore();
const currentTime = ref("");
const router = useRouter();
const UserInfo = reactive({
  roleName: "",
});
const notices = ref([
  {
    id: 2,
    createTime: "2023-04-16T13:22:30.000+0000",
    updateTime: "2023-04-16T13:22:30.000+0000",
    title: "我是默认字符串",
    content: "我是默认字符串",
    isDeleted: 0,
  },
]);
const getNotice = () => {
  getAllNotice().then((res) => {
    notices.value = res.data;
  });
};
const getUserInfo = () => {
  switch (store.userFlag) {
    case "1":
      UserInfo.roleName = "管理员";
      break;
    case "2":
      UserInfo.roleName = "司机";
      break;
    case "3":
      UserInfo.roleName = "客户";
      break;
  }
};
const taskList = ref([]);
onMounted(() => {
  getCurrentTask().then((res) => {
    taskList.value = res.data;
  });
  getUserInfo();
});
// 当前登录时间
onMounted(() => {
  var aData = new Date();
  currentTime.value =
    aData.getFullYear() +
    "年" +
    (aData.getMonth() + 1) +
    "月" +
    aData.getDate() +
    "日";
});

const openEdit = (index: number, row: any) => {
  router.push({
    path: "/task-detail",
    query: {
      taskId: row.taskId,
    },
  });
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 112px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

/* 语言使用详情 */
.language {
  width: 100%;
  margin-top: -19px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.githubCard {
  width: 100%;
  margin: 20px 0px 0px 70px;
  justify-content: space-between;
}
ul li {
  list-style: none;
}
.notice {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
}

.notice .notice-title {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.notice .notice-time {
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 5px;
}

.notice .notice-content {
  font-size: 1rem;
  line-height: 1.5rem;
  text-align: justify;
}
</style>
