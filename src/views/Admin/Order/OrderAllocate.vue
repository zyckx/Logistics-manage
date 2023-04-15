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
      <el-form
        status-icon
        label-width="6.25rem"
        ref="formRef"
        :model="tableData.addData"
      >
        <el-form-item label="起点" prop="taskStart">
          <el-input
            v-model="tableData.addData.taskStart"
            placeholder="请输入起点"
          />
        </el-form-item>
        <el-form-item label="终点" prop="taskEnd">
          <el-input
            v-model="tableData.addData.taskEnd"
            placeholder="请输入终点"
            maxlength="20"
          />
        </el-form-item>
        <el-form-item label="货物名称" prop="taskName">
          <el-input
            v-model="tableData.addData.taskName"
            placeholder="请输入货物名称"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item label="重量" prop="taskWeight">
          <el-input
            v-model="tableData.addData.taskWeight"
            placeholder="请输入货物名称重量"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item label="是否危险" prop="isRisk">
          <el-input
            v-model="tableData.addData.isRisk"
            placeholder="是否危险"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item label="客户姓名" prop="customerName">
          <el-input
            v-model="tableData.addData.customerName"
            placeholder="请输入客户姓名"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item label="客户电话" prop="customerPhone">
          <el-input
            v-model="tableData.addData.customerPhone"
            placeholder="请输入客户电话"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item label="运费" prop="freight">
          <el-input
            v-model="tableData.addData.freight"
            placeholder="请输入运费"
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
            v-model="tableData.editData.taskStart"
            placeholder="请输入员工号"
          />
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input
            v-model="tableData.editData.taskStart"
            placeholder="请输入用户名"
            maxlength="20"
          />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="tableData.editData.taskStart"
            placeholder="请输入手机号"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item label="是否有运输危险品运输资格证" prop="credit">
          <el-input
            v-model="tableData.editData.taskStart"
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
      <el-table-column prop="taskStart" label="起点" />
      <el-table-column prop="taskEnd" label="终点" />
      <el-table-column prop="taskName" label="货物名称" />
      <el-table-column prop="taskWeight" label="重量" />
      <el-table-column prop="isRisk" label="是否危险" />
      <el-table-column prop="customerName" label="客户名称" />
      <el-table-column prop="customerPhone" label="客户电话" />
      <el-table-column prop="freight" label="运费" />
      <el-table-column fixed="right" label="分配司机" width="150">
        <template #default="scope">
          <el-button
            type="danger"
            size="small"
            @click="openEdit(scope.$index, scope.row)"
            >编辑
          </el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="分配车辆" width="150">
        <template #default="scope">
          <el-button type="danger" size="small" @click="openAdd()"
            >分配</el-button
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
      taskStart: "",
      taskEnd: "",
      taskName: "",
      taskWeight: "",
      isRisk: "",
      customerName: "",
      customerPhone: "",
      freight: "",
    },
  ],
  searchContent: "",
  addData: {
    taskStart: "",
    taskEnd: "",
    taskName: "",
    taskWeight: "",
    isRisk: "",
    customerName: "",
    customerPhone: "",
    freight: "",
  },
  editData: {
    taskStart: "",
    taskEnd: "",
    taskName: "",
    taskWeight: "",
    isRisk: "",
    customerName: "",
    customerPhone: "",
    freight: "",
  },
});

onMounted(() => {
  console.log(store);
});
const openAdd = () => {
  dialogVisible.isShowAdd = true;
  tableData.addData = {
    taskStart: "",
    taskEnd: "",
    taskName: "",
    taskWeight: "",
    isRisk: "",
    customerName: "",
    customerPhone: "",
    freight: "",
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
  tableData.tableData.push(tableData.addData);
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
