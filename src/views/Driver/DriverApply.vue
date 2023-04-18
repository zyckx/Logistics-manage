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
            >创建申请
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
        <el-form-item label="申请名称" prop="title">
          <el-input
            v-model="tableData.addData.title"
            placeholder="请输入申请名称"
          />
        </el-form-item>
        <el-form-item label="申请内容" prop="request">
          <el-input
            v-model="tableData.addData.request"
            placeholder="请输入申请内容"
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
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="title" label="申请名称" />
      <el-table-column prop="request" label="申请内容" />
      <el-table-column prop="driverId" label="申请id" />
      <el-table-column prop="flag" label="是否通过">
        <template #default="{ row }">
          <el-tag v-if="row.flag === 1" type="success">通过</el-tag>
          <el-tag v-else type="danger">未通过</el-tag>
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
import { PublishApply, getApply } from "@/api/Driver";
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
// "id": 2,
//             "createTime": "2023-04-18T04:22:44.000+0000",
//             "updateTime": "2023-04-18T04:22:44.000+0000",
//             "title": "我是默认字符串",
//             "request": "我是默认字符串",
//             "driverId": 5,
//             "flag": null
const tableData = reactive({
  tableData: [
    {
      id: 2,
      createTime: "2023-04-18T04:22:44.000+0000",
      updateTime: "2023-04-18T04:22:44.000+0000",
      title: "我是默认字符串",
      request: "我是默认字符串",
      driverId: 5,
      flag: null,
    },
  ],
  searchContent: "",
  addData: {
    title: "我是默认字符串",
    request: "我是默认字符串",
  },
  editData: {
    title: "我是默认字符串",
    request: "我是默认字符串",
  },
});
const getTableData = () => {
  getApply().then((res) => {
    console.log(res);
    if (res.code === 200) {
      tableData.tableData = res.data;
      page.total = res.data.length;
    }
  });
};
onMounted(() => {
  getTableData();
  console.log(store);
});
const openAdd = () => {
  dialogVisible.isShowAdd = true;
  tableData.addData = {
    title: "我是默认字符串",
    request: "我是默认字符串",
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
  console.log(tableData.addData);
  PublishApply(tableData.addData).then((res) => {
    if (res.code === 200) {
      ElMessage.success("添加成功");

      getTableData();
      dialogVisible.isShowAdd = false;
    }
  });
  dialogVisible.isShowAdd = false;
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
