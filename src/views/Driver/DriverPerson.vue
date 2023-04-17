<template>
  <div class="container">
    <!-- 个人信息 -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>个人信息</span>
        </div>
      </template>
      <el-table
        :data="tableData.tableData"
        style="width: 100%"
        class="table"
        border
      >
        <el-table-column
          prop="employee"
          label="员工编号"
          width="180"
        ></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="credit"
          label="信用分"
          width="180"
        ></el-table-column>
        <el-table-column prop="credit" label="操作" width="180">
          <template #default="{ row }">
            <el-button @click="handleEdit(row)"> 编辑 </el-button>
            <el-button @click="handleDelete(row)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/store/UserStore";

const store = useGlobalStore();

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
const handleEdit = (row: any) => {
  console.log(row);
};
const handleDelete = (row: any) => {
  console.log(row);
};
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
