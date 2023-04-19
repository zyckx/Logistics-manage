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
    "carId": 89,
    "color": "我是默认字符串" -->
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
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/store/UserStore";
import { Search } from "@element-plus/icons-vue";
import Pagination from "@components/tables/Pagination.vue";
import { addCar } from "@/api/Admin";

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
//             "createTime": "2023-04-16T14:45:18.000+0000",
//             "updateTime": "2023-04-16T14:45:18.000+0000",
//             "start": "我是默认字符串",
//             "end": "我是默认字符串",
//             "name": "我是默认字符串",
//             "weight": 885,
//             "isDanger": 11,
//             "customId": 2,
//             "fee": 169,
//             "isDeleted": 0,
//             "flag": null,
//             "situation": null,
//             "driverId": null,
//             "carId": null
// 引入接口
const tableData = reactive({
  tableData: [
    {
      bands: "我是默认字符串",
      carId: 89,
      color: "我是默认字符串",
    },
  ],
  searchContent: "",
  addData: {
    bands: "我是默认字符串",
    carId: 89,
    color: "我是默认字符串",
  },
  editData: {
    bands: "我是默认字符串",
    carId: 89,
    color: "我是默认字符串",
  },
});
const updateTableData = () => {
  /* getTaskList().then((res) => {
    if (res.code === 200) {
      tableData.tableData = res.data;
      console.log(res);

      page.total = res.data.length;
    } else {
      ElMessage.error(res.msg);
    }
  }); */
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
    bands: "我是默认字符串",
    carId: 89,
    color: "我是默认字符串",
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
