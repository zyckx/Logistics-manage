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
        <el-card shadow="hover" style="height: 252px">
          <template #header>
            <div class="clearfix">
              <span>公告</span>
            </div>
          </template>
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
            <!-- "id": 3, 
        "createTime": "2023-04-17T05:12:06.000+0000", 
        "updateTime": "2023-04-17T05:12:06.000+0000", 
        "name": "zy", 
        "phoneNum": "15133807162", 
        "password": "794274c59b02039a17ee3d1c20910488", 
        "account": "test" -->
            <el-table
              :data="UserInfo.tableData"
              style="width: 100%; height: 100%"
              border
            >
              <el-table-column prop="id" label="用户id" />
              <el-table-column prop="account" label="账号" />
              <el-table-column prop="name" label="姓名" />
              <el-table-column prop="phoneNum" label="联系方式" />
            </el-table>
          </template>
          <template v-else="store.userFlag == '2'">
            <!-- 用户运输任务展示 -->
            <el-table
              :data="UserInfo.tableData"
              style="width: 100%; height: 100%"
              border
            >
              <el-table-column prop="id" label="用户id" />
              <el-table-column prop="numid" label="账号" />
              <el-table-column prop="name" label="姓名" />
              <el-table-column prop="phoneNum" label="联系方式" />
              <el-table-column prop="hasDanger" label="资格证">
                <template #default="{ row }">
                  <el-tag v-if="row.hasDanger == 1" type="success">有</el-tag>
                  <el-tag v-else type="danger">无</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/store/UserStore";
import { getCurrentTask, getPersonInfo } from "@/api/Customer";
import { getAllNotice } from "@/api/Driver";
import { getInfo } from "@/api/Driver";
const store = useGlobalStore();
const currentTime = ref("");
const router = useRouter();
const UserInfo = reactive({
  roleName: "",
  tableData: [
    {
      id: 5,
      createTime: "2023-04-16T15:50:26.000+0000",
      updateTime: "2023-04-16T15:50:26.000+0000",
      numid: "15",
      name: "我是默认字符串",
      phoneNum: "2",
      hasDanger: 8,
      password: "ac632e568953aa62a40737422bafee68",
      isDelete: 0,
      isUsed: 0,
    },
  ],
});
const notice = reactive({
  id: 2,
  createTime: "2023-04-16T13:22:30.000+0000",
  updateTime: "2023-04-16T13:22:30.000+0000",
  title: "我是默认字符串",
  content: "我是默认字符串",
  isDeleted: 0,
});
const getNotice = () => {
  getAllNotice().then((res) => {
    notice.id = res.data.id;
    notice.createTime = res.data.createTime;
    notice.updateTime = res.data.updateTime;
    notice.title = res.data.title;
    notice.content = res.data.content;
    notice.isDeleted = res.data.isDeleted;
  });
};
const getUserInfo = () => {
  switch (store.userFlag) {
    case "1":
      UserInfo.roleName = "管理员";
      break;
    case "2":
      getInfo().then((res) => {
        UserInfo.tableData = res.data;
      });
      getNotice();
      UserInfo.roleName = "司机";
      break;
    case "3":
      getPersonInfo().then((res) => {
        UserInfo.tableData = res.data;
      });
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
</style>
