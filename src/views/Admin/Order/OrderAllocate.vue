<template>
  <div class="container">
    <!-- 搜索、清除搜索、多选删除、添加 -->
    <div class="handle-box">
      <el-row>
        <el-col :span="16">
          <!--           搜索框 -->

          <!--添加按钮-->
          <el-button type="primary" :icon="Search" @click="openAdd"
            >发布任务
          </el-button>
        </el-col>
      </el-row>
    </div>
    <!--添加弹窗-->
    <el-dialog
      v-model="dialogVisible.isShowAdd"
      title="分配车辆"
      width="30%"
      :before-close="handleClose"
    >
      <!-- 选择车辆 -->
      <el-select v-model="tableData.carSelected" placeholder="请选择">
        <el-option
          v-for="item in tableData.cardSelectOptions"
          :key="item.id"
          :label="item.carId"
          :value="item.id"
        ></el-option>
      </el-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible.isShowAdd = false">取消</el-button>
          <el-button type="primary" @click="addData">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <!--编辑弹窗-->
    <el-dialog
      v-model="dialogVisible.isShowEdit"
      title="分配司机"
      width="30%"
      :before-close="handleClose"
    >
      <!-- 选择司机 -->
      <el-select v-model="tableData.driverSelected" placeholder="请选择">
        <el-option
          v-for="item in tableData.driverSelectOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible.isShowEdit = false">取消</el-button>
          <el-button type="primary" @click="editData()">确认</el-button>
        </span>
      </template>
    </el-dialog>
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
            @click="openEdit(scope.row)"
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
            @click="openAdd(scope.row)"
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
import { getUnallocated } from "@/api/Admin";
import {
  getDriverList,
  getCarList,
  assignDriver,
  assignCar,
} from "@/api/Admin";

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
      carId: "",
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
      bands: "我是默认字符串",
      carId: "89",
      color: "我是默认字符串",
      createTime: "2023-04-19T02:39:44.000+0000",
      id: 12,
      isDeleted: 0,
      isUsed: 0,
      updateTime: "2023-04-19T02:39:44.000+0000",
    },
  ],
});

onMounted(() => {
  console.log(store);
});

const getTableData = () => {
  getUnallocated().then((res) => {
    tableData.tableData = res.data;
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

const addData = () => {
  dialogVisible.isShowAdd = false;
  assignCar(tableData.TaskId, tableData.carSelected).then((res) => {
    if (res.code == 200) {
      ElMessage.success("分配成功");
      getTableData();
    }
  });
};
const editData = () => {
  dialogVisible.isShowEdit = false;
  assignDriver(tableData.TaskId, tableData.driverSelected).then((res) => {
    if (res.code == 200) {
      ElMessage.success("分配成功");
      getTableData();
    }
  });
};
// 分页
const openAdd = (row: any) => {
  dialogVisible.isShowAdd = true;
  tableData.carSelected = "";
  tableData.TaskId = row.id;
  getCarOptions();
};
const openEdit = (row: any) => {
  dialogVisible.isShowEdit = true;
  tableData.driverSelected = "";
  tableData.TaskId = row.id;
  getDriverOptions();
};
function pageIndex(res: number) {
  page.currentPage = res;
}

const getDriverOptions = () => {
  getDriverList().then((res) => {
    tableData.driverSelectOptions = res.data;
  });
};
const getCarOptions = () => {
  getCarList().then((res) => {
    tableData.cardSelectOptions = res.data;
  });
};
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
