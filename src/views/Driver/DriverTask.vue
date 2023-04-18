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
      <el-table-column prop="start" label="起点" />
      <el-table-column prop="end" label="终点" />
      <el-table-column prop="carId" label="车辆id" />
      <el-table-column prop="phoneNum" label="客户电话" />
      <el-table-column fixed="right" label="状态" width="150">
        <template #default="scoped">
          <el-button type="primary">正在运输中 </el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scoped">
          <el-button
            type="primary"
            @click="openEdit(scoped.$index, scoped.row)"
            >标记为完成
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
import { getTask, updateTaskStatus } from "@/api/Driver";
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
const updateTable = () => {
  getTask().then((res) => {
    console.log(res);
    page.total = res.data.length;
    tableData.tableData = res.data;
  });
};
// 引入接口

const tableData = reactive({
  tableData: [
    {
      carId: null,
      end: null,
      phoneNum: null,
      start: null,
    },
  ],
  searchContent: "",
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
  updateTable();
});

const handleSearch = () => {
  console.log(tableData.searchContent);
};

const openEdit = (index: number, row: any) => {
  dialogVisible.isShowEdit = true;
  updateTaskStatus(row.id).then((res) => {
   if(res.code === 200){
    ElMessage.success("标记成功");
     updateTable();
    }
  });
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
