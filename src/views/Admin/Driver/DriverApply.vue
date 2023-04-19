<template>
  <div class="container">
    <!-- 搜索、清除搜索、多选删除、添加 -->
    <div class="handle-box">
      <el-row>
        <el-col :span="16">
          <!--           搜索框 -->
          <el-input
            v-model="tableData.searchContent"
            placeholder="搜索订单"
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
      <!-- id: 1,
      createTime: "2023-04-13T12:03:13.000+0000",
      updateTime: "2023-04-13T12:03:13.000+0000",
      title: "病假申请",
      request: "管理员您好，我生病了，想请个假，您看行吗",
      driverId: 3,
      flag: null, -->
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column prop="title" label="申请名称" />
      <el-table-column prop="request" label="申请内容" />
      <el-table-column prop="driverId" label="司机ID" />
      <el-table-column prop="createTime" label="创建时间">
        <template #default="scope">
          <span>{{ FormatTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="flag" label="是否审核通过">
        <template #default="scope">
          <el-tag
            v-if="scope.row.flag == 0 || scope.row.flag == null"
            type="danger"
            >否</el-tag
          >
          <el-tag v-else type="success">是</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button type="success" size="small" @click="openEdit(scope.row)"
            >同意
          </el-button>
          <el-button type="danger" size="small" @click="deleteData(scope.row)"
            >拒绝</el-button
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
import { getApplyList, checkApply } from "@/api/Admin/Apply";
import { FormatTime } from "@/utils/FormatTime";
const store = useGlobalStore();

const page = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
  pageIndex: 1,
});

// 引入接口
const tableData = reactive({
  tableData: [
    {
      id: 1,
      createTime: "2023-04-13T12:03:13.000+0000",
      updateTime: "2023-04-13T12:03:13.000+0000",
      title: "病假申请",
      request: "管理员您好，我生病了，想请个假，您看行吗",
      driverId: 3,
      flag: null,
    },
  ],
  searchContent: "",
  checkApply: {
    ReqId: 0,
    flag: 0,
  },
});

const getTableData = () => {
  getApplyList().then((res) => {
    tableData.tableData = res.data;
    page.total = res.data.length;
  });
};
onMounted(() => {
  getTableData();
});
const handleSearch = () => {
  console.log(tableData.searchContent);
};

const openEdit = (row: any) => {
  tableData.checkApply.ReqId = row.id;
  tableData.checkApply.flag = 1;
  checkApply(tableData.checkApply).then((res) => {
    console.log(res);

    if (res.code == 200) {
      ElMessage.success("审核通过");
      getTableData();
    } else {
      ElMessage.error("审核失败");
    }
  });
};
const deleteData = (row: any) => {
  tableData.checkApply.ReqId = row.id;
  tableData.checkApply.flag = 0;
  checkApply(tableData.checkApply).then((res) => {
    if (res.code == 200) {
      ElMessage.success("拒绝");
      getTableData();
    } else {
      ElMessage.error("拒绝失败");
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
