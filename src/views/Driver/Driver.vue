<template>
  <div class="container">
    <!-- 搜索、清除搜索、多选删除、添加 -->
    <div class="handle-box">
      <el-row>
        <el-col :span="16">
          <!--           搜索框 -->
          <el-input
            v-model="tableData.searchContent"
            placeholder="搜索内容"
            class="grid-content handle-input mr10"
          />

          <!-- 搜索按钮 -->
          <el-button type="primary" :icon="Search" @click="handleSearch"
            >搜索
          </el-button>
          <!--添加按钮-->
          <el-button type="primary" :icon="Search" @click="openAdd"
            >添加
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
        <el-form-item label="员工号" prop="employee">
          <el-input
            v-model="tableData.addData.employee"
            placeholder="请输入员工号"
          />
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input
            v-model="tableData.addData.name"
            placeholder="请输入用户名"
            maxlength="20"
          />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="tableData.addData.phone"
            placeholder="请输入手机号"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item label="是否有运输危险品运输资格证" prop="credit">
          <el-input
            v-model="tableData.addData.credit"
            placeholder="是否有运输危险品运输资格证"
            maxlength="10"
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
        <el-form-item label="员工号" prop="employee">
          <el-input
            v-model="tableData.editData.employee"
            placeholder="请输入员工号"
          />
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input
            v-model="tableData.editData.name"
            placeholder="请输入用户名"
            maxlength="20"
          />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="tableData.editData.phone"
            placeholder="请输入手机号"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item label="是否有运输危险品运输资格证" prop="credit">
          <el-input
            v-model="tableData.editData.credit"
            placeholder="是否有运输危险品运输资格证"
            maxlength="10"
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
      <el-table-column prop="employee" label="员工号" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="phone" label="电话" />
      <el-table-column prop="credit" label="是否有运输危险品运输资格证" />
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button
            type="text"
            size="small"
            @click="openEdit(scope.$index, scope.row)"
            >编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="deleteData(scope.$index, scope.row)"
            >删除</el-button
          >
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
      employee: "",
      name: "111",
      phone: "111",
      credit: "111",
    },
  ],
  searchContent: "",
  addData: {
    employee: "",
    name: "",
    phone: "",
    credit: "",
  },
  editData: {
    employee: "",
    name: "",
    phone: "",
    credit: "",
  },
});

onMounted(() => {
  console.log(store);
});
const openAdd = () => {
  dialogVisible.isShowAdd = true;
  tableData.addData = {
    employee: "",
    name: "",
    phone: "",
    credit: "",
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
  console.log("添加数据", tableData.addData);
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
