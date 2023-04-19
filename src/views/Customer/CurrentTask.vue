<template>
  <div class="container">
    <!-- 搜索、清除搜索、多选删除、添加 -->
    <div class="handle-box">
      <el-row>
        <el-col :span="16">
          <!--           搜索框 -->
         
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
      <el-table-column prop="name" label="货物名称" />
      <el-table-column prop="weight" label="重量/kg" />
      <el-table-column prop="isDanger" label="是否危险">
          <template #default="scope">
            <el-tag v-if="scope.row.isDanger == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </template>
      </el-table-column>>
      <el-table-column prop="driverId" label="司机ID" />
      <el-table-column prop="carId" label="车辆ID" />
      <el-table-column prop="flag" label="类型">
                <template #default="scope">
          <el-tag v-if="scope.row.flag === 1" type="success">审核通过</el-tag>
          <el-tag v-else-if="scope.row.flag === 0" type="danger"
            >审核未通过</el-tag
          >
          <el-tag v-else-if="scope.row.flag === null" type="warning"
            >未审核</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="fee" label="运费/元" />
      <el-table-column fixed="right" label="状态" width="150">
        <template #default="scope">
          <el-button
            type="success"
            size="small"
            @click="openEdit(scope.$index, scope.row)"
            >运输中
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
import { getCurrentTask } from "@/api/Customer/index";
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
      weight: 0,
      isDanger: 0,
      fee: 0,
      customId: "",
      isDeleted: 0,
      flag: "",
      
      driverId: "",
      carId: "",
    },
  ],
  searchContent: "",
  addData: {
    start: "",
    end: "",
    name: "",
    weight: 0,
    isDanger: 0,
    fee: 0,
  },
  editData: {
    start: "",
    end: "",
    name: "",
    weight: 0,
    isDanger: 0,
    fee: 0,
  },
});

onMounted(() => {
  getCurrentTask().then((res) => {
    tableData.tableData = res.data;
    page.total = res.data.length;
  });
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
