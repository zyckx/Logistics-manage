<template>
  <div class="container">
    <!-- 搜索、清除搜索、多选删除、添加 -->
    <div class="handle-box">
      <el-row>
        <el-col :span="16">
          <!--           搜索框 -->

          <!--添加按钮-->
          <el-button type="primary" :icon="Search" @click="openAdd"
            >发布公告
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
        <el-form-item label="公告标题" prop="title">
          <el-input
            v-model="tableData.addData.title"
            placeholder="请输入公告标题"
          />
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input
            v-model="tableData.addData.content"
            placeholder="请输入公告内容"
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
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column prop="title" label="公告名称" />
      <el-table-column prop="content" label="公告内容" />
      <el-table-column prop="createTime" label="创建时间">
        <template #default="scope">
          {{ FormatTime(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template #default="scope">
          <el-button type="danger" size="small" @click="deleteData(scope.row)"
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
import { addNotice, deleteNotice } from "@/api/Admin";
import { getAllNotice } from "@/api/Driver";
import { FormatTime } from "@/utils/FormatTime";
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
      content: "我是默认字符串",
      createTime: "2023-04-16T13:31:04.000+0000",
      id: 3,
      isDeleted: 0,
      title: "我是默认字符串",
      updateTime: "2023-04-16T13:31:04.000+0000",
    },
  ],
  searchContent: "",
  addData: {
    title: "",
    content: "",
  },
});
const updateTableData = () => {
  getAllNotice().then((res) => {
    if (res.code === 200) {
      console.log(res);
      tableData.tableData = res.data;
      console.log(res);
      page.total = res.data.length;
    } else {
      ElMessage.error(res.msg);
    }
  });
};

onMounted(() => {
  updateTableData();
});
const openAdd = () => {
  dialogVisible.isShowAdd = true;
  tableData.addData = {
    title: "",
    content: "",
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
  addNotice(JSON.stringify(tableData.addData)).then((res) => {
    if (res.code === 200) {
      ElMessage.success("添加成功");
      dialogVisible.isShowAdd = false;
      updateTableData();
    } else {
      ElMessage.error(res.msg);
    }
  });
};

const deleteData = (row: any) => {
  deleteNotice(row.id).then((res) => {
    if (res.code === 200) {
      ElMessage.success("删除成功");
      updateTableData();
    } else {
      ElMessage.error(res.msg);
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
