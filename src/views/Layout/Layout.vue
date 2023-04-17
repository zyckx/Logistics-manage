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
      return customerSiderbarList;
  }
});
const adminSidebarList = [
  {
    icon: "fa fa-dashboard",
    index: "/admin",
    title: "管理员首页",
  },
  {
    icon: "fa fa-tags",
    index: "/order",
    title: "订单",
    subs: [
      {
        index: "/order-verify",
        title: "订单审核",
      },
      {
        index: "/order-allocate",
        title: "订单分配",
      },
    ],
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
        index: "/drivers-apply",
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
    icon: "fa fa-home",
    index: "/driver",
    title: "司机首页",
  },
  {
    icon: "fa fa-tasks",
    index: "/driver-task",
    title: "任务查看",
  },
  {
    icon: "fa fa-drivers-license",
    index: "/driver-person",
    title: "个人信息",
  },
  {
    icon: "fa fa-pencil",
    index: "/driver-apply",
    title: "申请",
  },
];
const customerSiderbarList = [
  {
    icon: "fa fa-home",
    index: "/customer",
    title: "客户首页",
  },
  {
    icon: "fa fa-car",
    index: "2",
    title: "运输任务",
    subs: [
      {
        index: "/task-publish",
        title: "任务发布",
      },
      {
        index: "/current-task",
        title: "当前任务",
      },
    ],
  },
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
  background-size: 100% 100%;
}
</style>
