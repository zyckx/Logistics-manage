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
              <div class="user-info-name">{{ name }}</div>
              <div>当前身份：{{ props.UserInfo.roleName }}</div>
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
            <div class="clearfix"><span>正在运输任务</span></div>
          </template>
          <template v-if="props.UserInfo.userFlag == '3'">
            <!-- 用户运输任务展示 -->
            <el-table
              :data="props.UserInfo.taskList"
              style="width: 100%; height: 100%"
              border
            >
              <el-table-column prop="taskStart" label="起点" />
              <el-table-column prop="taskEnd" label="终点" />
              <el-table-column prop="taskName" label="货物名称" />
              <el-table-column prop="taskWeight" label="重量" />
              <el-table-column prop="isRisk" label="是否危险" />
              <el-table-column prop="customerName" label="客户名称" />
              <el-table-column prop="customerPhone" label="客户电话" />
              <el-table-column prop="freight" label="运费" />
              <el-table-column fixed="right" label="操作" width="150">
                <template #default="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="openEdit(scope.$index, scope.row)"
                    >查看详情</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
          <template v-else="props.UserInfo.userFlag == '2'">
            <!-- 用户运输任务展示 -->
            <el-table
              :data="props.UserInfo.taskList"
              style="width: 100%; height: 100%"
              border
            >
              <el-table-column prop="taskStart" label="起点" />
              <el-table-column prop="taskEnd" label="终点" />
              <el-table-column prop="taskName" label="货物名称" />
              <el-table-column prop="taskWeight" label="重量" />
              <el-table-column prop="isRisk" label="是否危险" />
              <el-table-column prop="customerName" label="客户名称" />
              <el-table-column prop="customerPhone" label="客户电话" />
              <el-table-column prop="freight" label="运费" />
              <el-table-column fixed="right" label="操作" width="150">
                <template #default="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="openEdit(scope.$index, scope.row)"
                    >查看详情</el-button
                  >
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
const name = localStorage.getItem("ms_username");
const currentTime = ref("");
const router = useRouter();
const props = defineProps({
  UserInfo: {
    type: Object,
    default: () => {},
  },
});

onMounted(() => {
  console.log(props.UserInfo);
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
