<template>
  <div class="container">
    <!-- 搜索、清除搜索、多选删除、添加 -->
    <div class="handle-box">
      <el-row>
        <el-col :span="16">
          <!--添加按钮-->
          <el-button type="primary" :icon="Search" @click="openAdd"
            >添加车辆
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
      <el-form
        status-icon
        label-width="6.25rem"
        ref="formRef"
        :model="tableData.addData"
      >
        <!-- "bands": "我是默认字符串",
    "carId": 0,
    "color": "我是默认字符串" -->
        <el-form-item label="车牌品牌" prop="bands">
          <el-input
            v-model="tableData.addData.bands"
            placeholder="请输入车辆品牌"
          />
        </el-form-item>
        <el-form-item label="车牌号" prop="carId">
          <el-input
            v-model="tableData.addData.carId"
            placeholder="请输入车牌号"
          />
        </el-form-item>
        <el-form-item label="车辆颜色" prop="color">
          <el-input
            v-model="tableData.addData.color"
            placeholder="请输入车辆颜色"
          />
        </el-form-item>
      </el-form>

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
      title="编辑信息"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        status-icon
        label-width="6.25rem"
        ref="formRef"
        :model="tableData.editData"
      >
        <el-form-item label="车牌号" prop="bands">
          <el-input
            v-model="tableData.addData.bands"
            placeholder="请输入车牌号"
          />
        </el-form-item>
        <el-form-item label="车辆ID" prop="carId">
          <el-input
            v-model="tableData.addData.carId"
            placeholder="请输入车辆ID"
          />
        </el-form-item>
        <el-form-item label="车辆颜色" prop="color">
          <el-input
            v-model="tableData.addData.color"
            placeholder="请输入车辆颜色"
          />
        </el-form-item>
      </el-form>

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
      <!-- id: 1,
      createTime: "2023-04-13T12:33:58.000+0000",
      updateTime: "2023-04-14T04:35:05.000+0000",
      bands: "奥迪",
      color: "red",
      carId: "鲁B2S19J",
      isDeleted: 0,
      isUsed: 1, -->
      <el-table-column prop="id" label="车辆ID" />
      <el-table-column prop="bands" label="车辆品牌" />
      <el-table-column prop="color" label="车辆颜色" />
      <el-table-column prop="carId" label="车牌号" />
      <el-table-column prop="isUsed" label="是否使用">
        <template #default="{ row }">
          <el-tag v-if="row.isUsed === 1" type="success">使用中</el-tag>
          <el-tag v-else type="danger">未使用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间">
        <template #default="{ row }">
          <span>{{ FormatTime(row.createTime) }}</span>
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
import { addCar, findAllCars } from "@/api/Admin";
import { FormatTime } from "@/utils/FormatTime";
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
      id: 1,
      createTime: "2023-04-13T12:33:58.000+0000",
      updateTime: "2023-04-14T04:35:05.000+0000",
      bands: "奥迪",
      color: "red",
      carId: "鲁B2S19J",
      isDeleted: 0,
      isUsed: 1,
    },
  ],
  searchContent: "",
  addData: {
    bands: "",
    carId: "",
    color: "",
  },
  editData: {
    bands: "",
    carId: "",
    color: "",
  },
});
const updateTableData = () => {
  findAllCars().then((res) => {
    if (res.code === 200) {
      tableData.tableData = res.data;
      console.log(res);

      page.total = res.data.length;
    } else {
      ElMessage.error(res.msg);
    }
  });
};
/* "end": "我是默认字符串",
    "fee": 169,
    "isDanger": 11,
    "name": "我是默认字符串",
    "start": "我是默认字符串",
    "weight": 885 */
onMounted(() => {
  updateTableData();
});
const openAdd = () => {
  dialogVisible.isShowAdd = true;
  tableData.addData = {
    bands: "",
    carId: "",
    color: "",
  };
};

const handleSearch = () => {
  console.log(tableData.searchContent);
};
const handleClose = () => {
  dialogVisible.isShowAdd = false;
  dialogVisible.isShowEdit = false;
};
const addData = () => {
  addCar(JSON.stringify(tableData.addData)).then((res) => {
    if (res.code === 200) {
      ElMessage.success("添加成功");
      dialogVisible.isShowAdd = false;
      updateTableData();
    } else {
      ElMessage.error(res.msg);
    }
  });
};
const editData = () => {
  console.log(tableData.editData);
  // dialogVisible.isShowEdit = false;
};
const openEdit = (index: number, row: any) => {
  dialogVisible.isShowEdit = true;
  tableData.editData = row;
};
const deleteData = (index: number, row: any) => {
  console.log("删除数据", row);
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
