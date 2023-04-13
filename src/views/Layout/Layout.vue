<template>
  <div class="about">
    <Header :roleName="roleName" />
    <Siderbar :adminSidebarList="SidebarList" />
    <div class="content-box" :class="{ 'content-collapse': collapse }">
      <Tags />
      <div class="content">
        <router-view v-slot="{ Component }">
          <transition name="move" mode="out-in">
            <keep-alive :include="tagsList">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
        <!-- <el-backtop target=".content"></el-backtop> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "@components/Header/Header.vue";
import { useGlobalStore } from "@/store/UserStore";
const store = useGlobalStore();
const tagsList = computed(() => store.tagsList.map((item) => item.title));
const collapse = computed(() => store.collapse);
const router = useRouter();

onMounted(() => {
  console.log(router);
});
const roleName = computed(() => {
  switch (store.userFlag) {
    case "1":
      return "管理员";
    case "2":
      return "司机";
    case "3":
      return "客户";
  }
});
const SidebarList = computed(() => {
  switch (store.userFlag) {
    case "1":
      return adminSidebarList;
    case "2":
      return driverSiderbarList;
    case "3":
      return cunstomSiderbarList;
  }
});
const adminSidebarList = [
  {
    icon: "fa fa-dashboard",
    index: "/admin",
    title: "管理员首页",
  },
  {
    icon: "fa fa-user",
    index: "/drivers",
    title: "司机管理",
    subs: [
      {
        icon: "fa fa-user",
        index: "/drivers",
        title: "司机信息",
      },
      {
        icon: "fa fa-user",
        index: "/driver-apply",
        title: "司机申请",
      },
      {
        icon: "fa fa-user",
        index: "/announcement",
        title: "发布公告",
      },
    ],
  },
  {
    icon: "fa fa-taxi",
    index: "/vehicles",
    title: "车辆管理",
    subs: [
      { index: "/vehicles", title: "车辆信息" },
      { index: "/transport-tasks", title: "车辆申请" },
      { index: "/announcement", title: "发布公告" },
    ],
  },
];
const driverSiderbarList = [
  {
    icon: "el-icon-ali-home",
    index: "/dashboard",
    title: "系统首页",
  },
  {
    icon: "el-icon-ali-cascades",
    index: "2",
    title: "信息表格",
    subs: [
      { index: "/department", title: "院系表" },
      { index: "/major", title: "专业表1" },
      { index: "/teacher", title: "教师表" },
      { index: "/student", title: "学生表" },
      { index: "/course", title: "课程表" },
      { index: "/selectcourse", title: "选课表" },
      { index: "/basetable", title: "基础表格" },
    ],
  },
  { icon: "el-icon-ali-test", index: "/test", title: "测试页面" },
];
const cunstomSiderbarList = [
  {
    icon: "el-icon-ali-home",
    index: "/dashboard",
    title: "系统首页",
  },
  {
    icon: "el-icon-ali-cascades",
    index: "2",
    title: "信息表格",
    subs: [
      { index: "/department", title: "院系表" },
      { index: "/major", title: "专业表1" },
      { index: "/teacher", title: "教师表" },
      { index: "/student", title: "学生表" },
      { index: "/course", title: "课程表" },
      { index: "/selectcourse", title: "选课表" },
      { index: "/basetable", title: "基础表格" },
    ],
  },
  { icon: "el-icon-ali-test", index: "/test", title: "测试页面" },
];

// defineExpose 可以省略
defineExpose({
  tagsList,
  collapse,
});
</script>
<style scoped>
.content {
  width: 100%;
  height: 100%;
  background: url("@/assets/img/220228-162964094837fa.jpg") no-repeat;
  background-size: 100% 100%;
}
</style>
