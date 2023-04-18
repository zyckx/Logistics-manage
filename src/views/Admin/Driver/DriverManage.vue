<template>
  <div class="container">
    <!-- 搜索、清除搜索、多选删除、添加 -->
    <div class="handle-box">
      <el-row>
        <el-col :span="16">
          <!--           搜索框 -->
          <el-input
            v-model="tableData.searchContent"
            placeholder="搜索任务"
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
      <el-form
        status-icon
        label-width="6.25rem"
        ref="formRef"
        :model="tableData.addData"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="tableData.addData.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="账号" prop="numid">
          <el-input
            v-model="tableData.addData.numid"
            placeholder="请输入账号"
            maxlength="20"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="tableData.addData.password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNum">
          <el-input
            v-model="tableData.addData.phoneNum"
            placeholder="请输入手机号"
          />
        </el-form-item>
        <el-form-item label="是否拥有资格证" prop="hasDanger">
          <el-select v-model="tableData.addData.hasDanger" placeholder="请选择">
            <el-option label="是" value="1" />
            <el-option label="否" value="0" />
          </el-select>
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
        <el-form-item label="姓名" prop="name">
          <el-input v-model="tableData.addData.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="账号" prop="numid">
          <el-input
            v-model="tableData.addData.numid"
            placeholder="请输入账号"
            maxlength="20"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="tableData.addData.password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item label="是否拥有资格证" prop="hasDanger">
          <el-select v-model="tableData.addData.hasDanger" placeholder="请选择">
            <el-option label="是" value="1" />
            <el-option label="否" value="0" />
          </el-select>
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
      <!--  hasDanger: 1,
      name: "我是默认字符串",
      numid: 521,
      password: "我是默认字符串",
      phoneNum: 2, -->
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="numid" label="账号" />
      <el-table-column prop="password" label="密码" />
      <el-table-column prop="phoneNum" label="手机号" />

      <el-table-column prop="hasDanger" label="是否拥有资格证">
        <template #default="{ row }">
          <el-tag v-if="row.hasDanger == 1" type="success">是</el-tag>
          <el-tag v-else type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="customId" label="客户ID" />
      <el-table-column prop="driverId" label="司机ID" />
      <el-table-column prop="carId" label="车辆ID" />
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
import { addDriver } from "@/api/Admin";

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
// "id": 3,
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
      hasDanger: 1,
      name: "我是默认字符串",
      numid: 521,
      password: "我是默认字符串",
      phoneNum: 2,
    },
  ],
  searchContent: "",
  addData: {
    hasDanger: 1,
    name: "我是默认字符串",
    numid: 521,
    password: "我是默认字符串",
    phoneNum: 2,
  },
  editData: {
    hasDanger: 1,
    name: "我是默认字符串",
    numid: 521,
    password: "我是默认字符串",
    phoneNum: 2,
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
    hasDanger: 1,
    name: "我是默认字符串",
    numid: 521,
    password: "我是默认字符串",
    phoneNum: 2,
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
  addDriver(JSON.stringify(tableData.addData)).then((res) => {
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
