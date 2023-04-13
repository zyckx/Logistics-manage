<template>
  <div>{{ props }}</div>
</template>
<script setup lang="ts">
const props = defineProps<{
  title: string;
  content: string;
}>();
</script>

<style lang="scss" scoped></style>
