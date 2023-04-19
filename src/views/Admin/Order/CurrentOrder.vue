<template>
  <div class="container">
    <!-- 搜索、清除搜索、多选删除、添加 -->
    <div class="handle-box">
      <el-row>
        <el-col :span="16">
          <!--           搜索框 -->
        </el-col>
      </el-row>
    </div>
    <!--数据展示-->
    <el-table
      :data="
        tableData.tableData.slice(
          (page.currentPage - 1) * page.pageSize,
          page.currentPage * page.pageSize
        )
      "
      border
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column prop="start" label="起点" />
      <el-table-column prop="end" label="终点" />
      <el-table-column prop="name" label="货物名称" />
      <el-table-column prop="weight" label="重量/kg" />
      <el-table-column prop="isDanger" label="是否危险">
        <template #default="scope">
          <el-tag v-if="scope.row.isDanger == 1" type="success">是</el-tag>
          <el-tag v-else type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="customId" label="客户ID" />

      <el-table-column prop="isDeleted" label="是否删除">
        <template #default="scope">
          <el-tag v-if="scope.row.isDeleted == 1" type="success">是</el-tag>
          <el-tag v-else type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="fee" label="运费/元" />
      <el-table-column prop="driverId" label="司机">
        <template #default="scope">
          <el-tag
            v-if="scope.row.driverId == 0 || scope.row.driverId == null"
            type="success"
            >未分配</el-tag
          >
          <el-tag v-else type="danger">已分配</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="carId" label="车辆">
        <template #default="scope">
          <el-tag
            v-if="scope.row.carId == null || scope.row.carId == 0"
            type="success"
            >未分配</el-tag
          >
          <el-tag v-else type="danger">已分配</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 0.625rem; text-align: right">
      <pagination
        :page-size="page.pageSize"
        :page-total="page.total"
        :disabled="false"
        @page-index="pageIndex"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/store/UserStore";
import { Search } from "@element-plus/icons-vue";
import Pagination from "@components/tables/Pagination.vue";
import { getDoingList } from "@/api/Admin";

const store = useGlobalStore();
const page = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
  pageIndex: 1,
});
const dialogVisible = reactive({
  isShowEdit: false,
  isShowAdd: false,
});
// 引入接口
const tableData = reactive({
  tableData: [
    {
      start: "",
      end: "",
      name: "",
      weight: "",
      isDanger: "",
      fee: "",
      customId: "",
      isDeleted: 0,
      flag: 1,
      situation: null,
      driverId: null,
      carId: null,
    },
  ],
  searchContent: "",
  driverSelected: "",
  driverSelectOptions: [
    {
      id: 13,
      createTime: "2023-04-18T04:53:18.000+0000",
      updateTime: "2023-04-18T04:53:18.000+0000",
      numid: "521",
      name: "我是默认字符串",
      phoneNum: "2",
      hasDanger: 1,
      password: "ac632e568953aa62a40737422bafee68",
      isDelete: 0,
      isUsed: 0,
    },
  ],
  carSelected: "",
  TaskId: "",
  cardSelectOptions: [
    {
      id: 13,
      createTime: "2023-04-18T04:53:18.000+0000",
      updateTime: "2023-04-18T04:53:18.000+0000",
      numid: "521",
      name: "我是默认字符串",
      phoneNum: "2",
      hasDanger: 1,
      password: "ac632e568953aa62a40737422bafee68",
      isDelete: 0,
      isUsed: 0,
    },
  ],
});

onMounted(() => {
  console.log(store);
});

const getTableData = () => {
  getDoingList().then((res) => {
    tableData.tableData = res.data;
    page.total = res.data.length;
  });
};
onMounted(() => {
  getTableData();
});
const handleSearch = () => {
  console.log(tableData.searchContent);
};
const handleClose = () => {
  dialogVisible.isShowAdd = false;
  dialogVisible.isShowEdit = false;
};

function pageIndex(res: number) {
  page.currentPage = res;
}
</script>

<style scoped>
.table {
  width: 100%;
  font-size: 0.875rem;
  max-height: 36.125rem;
}

.red {
  color: #ff0000;
}

.table-td-thumb {
  display: block;
  margin: auto;
  width: 2.5rem;
  height: 2.5rem;
}

.handle-box {
  margin-bottom: 1.25rem;
}

.handle-input {
  width: 11.25rem;
  display: inline-block;
}

.mr10 {
  margin-right: 0.625rem;
}

.grid-content {
  border-radius: 0.25rem;
  min-height: 2.25rem;
}

.float-right {
  float: right;
}
</style>
