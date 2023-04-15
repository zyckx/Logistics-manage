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
      <el-table-column prop="taskStart" label="起点" />
      <el-table-column prop="taskEnd" label="终点" />
      <el-table-column prop="taskName" label="货物名称" />
      <el-table-column prop="taskWeight" label="重量" />
      <el-table-column prop="isRisk" label="是否危险" />
      <el-table-column prop="customerName" label="客户名称" />
      <el-table-column prop="customerPhone" label="客户电话" />
      <el-table-column prop="freight" label="运费" />
      <el-table-column fixed="right" label="状态" width="150">
        <template #default="scope">
          <el-button
            type="success"
            size="small"
            @click="openEdit(scope.$index, scope.row)"
            >运输中
          </el-button>
          <!-- 完成按钮 -->

          <el-button
            type="warning"
            size="small"
            @click="openEdit(scope.$index, scope.row)"
            >完成
          </el-button>
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

const handleSearch = () => {
  console.log(tableData.searchContent);
};

const openEdit = (index: number, row: any) => {
  dialogVisible.isShowEdit = true;
  tableData.editData = row;
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
