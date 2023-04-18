import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Layout from "@views/layout/Layout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    meta: { title: "登录" },
    component: () => import("@views/Login.vue"),
  },
  {
    path: "/",
    name: "Layout",
    // 重定向
    redirect: "/login",
    component: Layout,
    meta: {
      // 需要权限
      requireAuth: true,
    },
    children: [
      {
        path: "/admin",
        name: "admin",
        meta: {
          title: "管理员管理",
        },
        component: () => import("@views/DashBoard/DashBoard.vue"),
      },
      {
        path: "/order-verify",
        name: "order-verify",
        meta: {
          title: "订单审核",
        },
        component: () => import("@views/Admin/Order/OrderVerify.vue"),
      },
      {
        path: "//order-allocate",
        name: "/order-allocate",
        meta: {
          title: "订单分配",
        },
        component: () => import("@views/Admin/Order/OrderAllocate.vue"),
      },
      {
        path: "/drivers",
        name: "drivers",
        meta: {
          title: "司机管理",
        },
        component: () => import("../views/Admin/Driver/DriverManage.vue"),
      },
      {
        path: "/drivers-apply",
        name: "driver-apply",
        meta: {
          title: "司机申请",
        },
        component: () => import("../views/Admin/Driver/DriverApply.vue"),
      },
      {
        path: "/driver-view/:id",
        name: "driver-view",
        meta: {
          title: "司机详情",
        },
        component: () => import("@views/DashBoard/DashBoard.vue"),
      },
      {
        path: "/announcement",
        name: "announcement",
        meta: {
          title: "公告管理",
        },
        component: () => import("../views/Admin/Driver/Announcement.vue"),
      },
      {
        path: "/vehicles",
        name: "vehicles",
        meta: {
          title: "车辆管理",
        },
        component: () => import("@views/Admin/Vehicles/VehiclesManage.vue"),
      },
      {
        path: "/vehicle-view/:id",
        name: "admin-vehicle-view",
        component: () => import("@views/DashBoard/DashBoard.vue"),
      },
      {
        path: "/transport-tasks",
        name: "admin-transport-tasks",
        meta: {
          title: "运输任务管理",
        },
        component: () => import("@views/Admin/Vehicles/TransportTasks.vue"),
      },
      {
        path: "/transport-task-detail/:id",
        name: "admin-transport-task-detail",
        component: () => import("@components/Announcement/Announcement.vue"),
      },
      {
        path: "/announcements",
        name: "admin-announcements",
        meta: {
          title: "公告管理",
        },
        component: () => import("@components/Announcement/Announcement.vue"),
      },
      // 司机路由
      {
        path: "/driver",
        name: "司机主页",
        meta: { title: "司机主页" },
        component: () => import("@views/DashBoard/DashBoard.vue"),
      },

      {
        path: "/driver-task",
        name: "任务查看",
        meta: { title: "任务查看" },
        component: () => import("@views/Driver/DriverTask.vue"),
      },
      {
        path: "/driver-apply",
        name: "申请",
        meta: { title: "申请" },
        component: () => import("@views/Driver/DriverApply.vue"),
      },
      // 客户路由
      {
        path: "/customer",
        name: "客户主页",
        meta: { title: "客户主页" },
        component: () => import("@views/DashBoard/DashBoard.vue"),
      },
      {
        path: "/task-publish",
        name: "任务发布",
        meta: { title: "任务发布" },
        component: () => import("@views/Customer/TaskPublish.vue"),
      },
      {
        path: "/current-task",
        name: "当前任务",
        meta: { title: "当前任务" },
        component: () => import("@views/Customer/CurrentTask.vue"),
      },

      {
        path: "/404",
        name: "404",
        meta: { title: "找不到页面" },
        component: () => import("@views/404.vue"),
      },
      {
        path: "/403",
        name: "403",
        meta: { title: "没有权限" },
        component: () => import("@views/403.vue"),
      },
    ],
  },

  {
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import("../views/404/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//全局开启路由守卫，检验cookie
router.beforeEach((to, from, next) => {
  //跳转到登录页
  if (to.path === "/login") {
    next();
  } else {
    // 检查权限路由
    /* if (to.meta.requireAuth) {
      // 检查cookie
      if (document.cookie.indexOf("ticket") === -1) {
        ElMessage.error("请登录");
        next("/login");
      } else {
        next();
      }
    } */
    next();
  }
});
export default router;
