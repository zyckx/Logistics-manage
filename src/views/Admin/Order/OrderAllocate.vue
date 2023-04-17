<template>
  <div class="container">
    <!-- 搜索、清除搜索、多选删除、添加 -->
    <div class="handle-box">
      <el-row>
        <el-col :span="16">
          <!--           搜索框 -->
          <el-input
            v-model="tableData.searchContent"
            placeholder="搜索"
            class="grid-content handle-input mr10"
          />

          <!-- 搜索按钮 -->
          <el-button type="primary" :icon="Search" @click="handleSearch"
            >搜索
          </el-button>
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
      title="添加信息"
      width="30%"
      :before-close="handleClose"
    >
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
      <!-- <el-select v-model="value" class="m-2" placeholder="Select" size="large">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select> -->

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
      <el-table-column prop="weight" label="重量" />
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
      <el-table-column prop="fee" label="运费" />
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
// "id": 3,
//             "createTime": "2023-04-16T14:45:18.000+0000",
//             "updateTime": "2023-04-17T10:39:22.000+0000",
//             "start": "我是默认字符串",
//             "end": "我是默认字符串",
//             "name": "我是默认字符串",
//             "weight": 885,
//             "isDanger": 11,
//             "customId": 2,
//             "fee": 169,
//             "isDeleted": 0,
//             "flag": 1,
//             "situation": null,
//             "driverId": null,
//             "carId": null
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
  driverSelectOptions: {
    value: "",
    label: "",
  },
  carSelected: "",
  cardSelectOptions: {
    value: "",
    label: "",
  },
});

onMounted(() => {
  console.log(store);
});
const openAdd = (row: any) => {
  dialogVisible.isShowAdd = true;
  tableData.driverSelected = "";
};
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
const addData = (row: any) => {
  // console.log(tableData.addData);
  dialogVisible.isShowAdd = false;
  console.log("添加数据", row);
};
const editData = () => {
  console.log(tableData.driverSelected);
  dialogVisible.isShowEdit = false;
};
const openEdit = (row: any) => {
  console.log("编辑数据", row);
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
