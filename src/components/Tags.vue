<template>
  <div class="tags" v-if="showTags">
    <!-- 标签列表 -->
    <ul>
      <li
        class="tags-li"
        v-for="(item, index) in tagsList"
        :class="{ active: isActive(item.path) }"
        :key="index"
      >
        <router-link :to="item.path" class="tags-li-title">{{
          item.title
        }}</router-link>
        <span class="tags-li-icon" @click="closeTags(index)">
          <el-icon color="#606266">
            <close />
          </el-icon>
        </span>
      </li>
    </ul>

    <!-- 标签选项 -->
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="small" type="primary">
          标签选项
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu size="small">
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
            <!--            <el-dropdown-item command="all">关闭所有</el-dropdown-item>-->
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/store/UserStore";
import type { RouteLocationNormalized } from "vue-router";
const route = useRoute();
const router = useRouter();
const isActive = (path: string) => {
  return path === route.fullPath;
};

// 获取标签列表
const store = useGlobalStore();
const tagsList = computed(() => store.tagsList);
const showTags = computed(() => tagsList.value.length > 0);

// 关闭单个标签
const closeTags = (index: number) => {
  // console.log("-------")
  // console.log(tagsList)
  // console.log(tagsList.value[index])
  // console.log("-------")
  const delItem = tagsList.value[index];
  store.delTagsItem(index);
  const item = tagsList.value[index]
    ? tagsList.value[index]
    : tagsList.value[index - 1];
  // console.log(item)
  // console.log(item)
  if (item) {
    delItem.path === route.fullPath && router.push(item.path);
  } else {
    router.push("/");
  }
};

// 设置标签
const setTags = (route: RouteLocationNormalized) => {
  // console.log("tagsList");
  // console.log(tagsList);
  // console.log("router");
  // console.log(route);
  // console.log(route.fullPath);
  // console.log("--------");
  const isExist = tagsList.value.some((item) => {
    // console.log(item.path);
    return item.path === route.fullPath;
  });
  if (!isExist) {
    if (tagsList.value.length >= 8) {
      store.delTagsItem(0);
    }
    store.setTagsItem({
      title: route.meta.title as string,
      path: route.fullPath,
    });
  }
};

setTags(route);
onBeforeRouteUpdate((to) => {
  setTags(to);
});

// 关闭全部标签
const closeAll = () => {
  store.clearTags();
  router.push("/");
};

// 关闭其他标签
const closeOther = () => {
  const curItem = tagsList.value.filter((item) => {
    return item.path === route.fullPath;
  });
  store.closeTagsOther(curItem);
};

// 标签操作
const handleTags = (command: string) => {
  command === "other" ? closeOther() : closeAll();
};

// 关闭当前页面的标签页
// store.commit("closeCurrentTag", {
//     $router: router,
//     $route: route
// });

// defineExpose 可以省略
defineExpose({
  isActive,
  showTags,
  closeTags,
  handleTags,
});
</script>

<style>
.tags {
  position: relative;
  height: 30px;
  overflow: hidden;
  background: #fff;
  padding-right: 120px;
  box-shadow: 0 5px 10px #ddd;
}

.tags ul {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.tags-li {
  float: left;
  margin: 3px 5px 2px 3px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 23px;
  line-height: 23px;
  border: 1px solid #e9eaec;
  background: #fff;
  padding: 0 5px 0 12px;
  vertical-align: middle;
  color: #666;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
  background: #f8f8f8;
}

.tags-li.active {
  color: #fff;
  background-color: #409eff;
}

.tags-li-title {
  float: left;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
  color: #666;
}

.tags-li.active .tags-li-title {
  color: #fff;
}

/* 标签后面的关闭图标 */
.tags-li-icon .el-icon {
  padding-top: 3px;
}

.tags-close-box {
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  text-align: center;
  width: 110px;
  height: 30px;
  background: #fff;
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
</style>
