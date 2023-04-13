<template>
  <ElConfigProvider :locale="locale">
    <router-view v-if="isRouterAlive" />
  </ElConfigProvider>
  <BackTop />
</template>

<script setup lang="ts">
import zhCn from "element-plus/lib/locale/lang/zh-cn";

const locale = ref(zhCn);
const isRouterAlive = ref(true);

const reload = () => {
  isRouterAlive.value = false;
  nextTick(() => {
    isRouterAlive.value = true;
  });
};
provide("reload", reload);
</script>

<style scoped>
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";
</style>
