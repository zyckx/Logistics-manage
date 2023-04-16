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
        <el-form-item label="起点" prop="start">
          <el-input
            v-model="tableData.addData.start"
            placeholder="请输入起点"
          />
        </el-form-item>
        <el-form-item label="终点" prop="end">
          <el-input
            v-model="tableData.addData.end"
            placeholder="请输入终点"
            maxlength="20"
          />
        </el-form-item>
        <el-form-item label="货物名称" prop="name">
          <el-input
            v-model="tableData.addData.name"
            placeholder="请输入货物名称"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item label="重量" prop="weight">
          <el-input
            v-model="tableData.addData.weight"
            placeholder="请输入货物名称重量"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item label="是否危险" prop="isDanger">
          <el-input
            v-model="tableData.addData.isDanger"
            placeholder="是否危险"
            maxlength="10"
          />
        </el-form-item>

        <el-form-item label="运费" prop="fee">
          <el-input
            v-model="tableData.addData.fee"
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
            v-model="tableData.editData.start"
            placeholder="请输入员工号"
          />
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input
            v-model="tableData.editData.start"
            placeholder="请输入用户名"
            maxlength="20"
          />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="tableData.editData.start"
            placeholder="请输入手机号"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item label="是否有运输危险品运输资格证" prop="credit">
          <el-input
            v-model="tableData.editData.start"
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
      <el-table-column prop="start" label="起点" />
      <el-table-column prop="end" label="终点" />
      <el-table-column prop="name" label="货物名称" />
      <el-table-column prop="weight" label="重量" />
      <el-table-column prop="isDanger" label="是否危险" />
      <el-table-column prop="customerName" label="客户名称" />
      <el-table-column prop="customerPhone" label="客户电话" />
      <el-table-column prop="fee" label="运费" />
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
      start: "",
      end: "",
      name: "",
      weight: "",
      isDanger: "",

      fee: "",
    },
  ],
  searchContent: "",
  addData: {
    start: "",
    end: "",
    name: "",
    weight: "",
    isDanger: "",

    fee: "",
  },
  editData: {
    start: "",
    end: "",
    name: "",
    weight: "",
    isDanger: "",

    fee: "",
  },
});

onMounted(() => {
  console.log(store);
});
const openAdd = () => {
  dialogVisible.isShowAdd = true;
  tableData.addData = {
    start: "",
    end: "",
    name: "",
    weight: "",
    isDanger: "",

    fee: "",
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
