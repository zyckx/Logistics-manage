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

      <el-table-column prop="customName" label="客户名称" />
      <el-table-column prop="phoneNum" label="客户电话" />
      <el-table-column prop="fee" label="运费" />
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button
            type="success"
            size="small"
            @click="openEdit(scope.$index, scope.row)"
            >同意
          </el-button>
          <el-button
            type="danger"
            size="small"
            @click="deleteData(scope.$index, scope.row)"
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
import { CheckList, getCheckList } from "@/api/Admin";
const store = useGlobalStore();

const page = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
  pageIndex: 1,
});
// "id": 6,
//             "start": "我是默认字符串",
//             "end": null,
//             "name": "我是默认字符串",
//             "weight": 885,
//             "isDanger": 11,
//             "customId": 2,
//             "fee": 169,
//             "customName": "我是默认字符串",
//             "phoneNum": "2"
// 引入接口
const tableData = reactive({
  tableData: [
    {
      start: "",
      end: "",
      name: "",
      weight: "",
      isDanger: "",
      customId: null,
      fee: null,
      customName: "",
      phoneNum: "",
    },
  ],
  searchContent: "",
});

const getTableData = () => {
  getCheckList().then((res) => {
    tableData.tableData = res.data;
  });
};
onMounted(() => {
  getTableData();
});
const handleSearch = () => {
  console.log(tableData.searchContent);
};

const openEdit = (index: number, row: any) => {
  console.log(index, row);
  CheckList(row.id, 1).then((res) => {
    if (res.code == 200) {
      ElMessage.success("审核通过");
      getTableData();
    } else {
      ElMessage.error("审核失败");
    }
  });
};
const deleteData = (index: number, row: any) => {
  console.log(index, row);
  CheckList(row.id, 0).then((res) => {
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
