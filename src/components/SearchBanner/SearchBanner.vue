<template>
  <div class="news-banner">
    <div class="banner-title">
      <h2>{{ props.title }}</h2>
      <h3>{{ props.tip }}</h3>
    </div>
    <el-autocomplete
      class="search-input"
      popper-class="my-autocomplete"
      highlight-first-item
      v-model="searchQuery"
      clearable
      ref="autocomplete"
      @focus="(autocompleteFlag) => true"
      @blur="(autocompleteFlag) => false"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入发病关键词"
      :trigger-on-focus="false"
      @select="handleSelect"
    >
    </el-autocomplete>
  </div>
</template>
<script setup lang="ts">
import { getSuggestions } from "../../api/getSuggestions";
import { useThrottleFn } from "@vueuse/core";
import { ElMessage } from "element-plus";
const props = defineProps({
  title: String,
  tip: String,
});
const searchQuery = ref("");
interface SuggestItem {
  value: string;
  link: string;
}
const baiduSuggestions = ref<SuggestItem[]>([]);
const throttledQuerySearchAsync = useThrottleFn((queryStr: string, cb: any) => {
  getSuggestions(queryStr).then((res: any) => {
    console.log(res.data);

    if (res.data.g) {
      baiduSuggestions.value = res.data.g.map((item: any) => {
        return {
          value: item.q,
          link: `https://www.baidu.com/s?wd=${item.q}`,
        };
      });
      cb(baiduSuggestions.value);
    } else {
      cb([]);
      ElMessage({
        message: "暂无相关数据",
        type: "warning",
      });
      return;
    }
  });
}, 1000); // set the throttle delay to 1000ms (1 second)
const querySearchAsync = (queryStr: string, cb: any) => {
  throttledQuerySearchAsync(queryStr, cb);
};
const handleSelect = (item: any) => {
  window.open(item.link);
};
</script>

<style lang="less" scoped>
.news_header {
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
}

.news-banner {
  width: 100%;
  height: 280px;
  background: url("../../assets/img/news/newsbanner.jpg") 50% no-repeat;
  background-size: cover;
  text-align: center;
  padding-top: 70px;

  .banner-title {
    padding-bottom: 30px;

    h2 {
      font-size: 40px;
      line-height: 60px;
      font-weight: 600;
    }

    h3 {
      color: #828282;
      margin-top: 5px;
      font-size: 100%;
      font-weight: 400;
      font-variant: normal;
    }
  }

  :deep(.el-autocomplete) {
    width: 46%;

    .el-input__wrapper {
      border-radius: 30px;
    }

    .el-input {
      border-radius: 30px !important;
    }

    .el-input__inner {
      height: 46px;
      line-height: 46px;
      border-radius: 30px;
    }

    .el-input__icon {
      line-height: 46px;
      font-size: 16px;
    }
  }
}
</style>
