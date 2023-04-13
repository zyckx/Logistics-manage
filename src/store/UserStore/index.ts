import { defineStore } from "pinia";
import type { ITagList, ITagsItem } from "@/types/index";
export const useGlobalStore = defineStore({
  id: "Global",
  state: () => ({
    userFlag: "", //用户标志 1 管理员 2司机 3顾客
    userId: "",
    tagsList: [] as ITagList[], // 标签列表
    collapse: false, // 侧边栏是否折叠
  }),
  actions: {
    setUserFlag(Flag: string) {
      this.userFlag = Flag;
    },
    setUserId(Id: string) {
      this.userId = Id;
    },
    delTagsItem(index: number) {
      this.tagsList.splice(index, 1);
    },
    setTagsItem(TagsItem: ITagsItem) {
      this.tagsList.push(TagsItem);
    },
    clearTags(): void {
      this.tagsList = [];
    },
    closeTagsOther(data) {
      this.tagsList = data;
    },
    closeCurrentTag(data) {
      for (let i = 0, len = this.tagsList.length; i < len; i++) {
        const item = this.tagsList[i];
        if (item.path === data.$route.fullPath) {
          if (i < len - 1) {
            data.$router.push(this.tagsList[i + 1].path);
          } else if (i > 0) {
            data.$router.push(this.tagsList[i - 1].path);
          } else {
            data.$router.push("/");
          }
          this.tagsList.splice(i, 1);
          break;
        }
      }
    },
    // 侧边栏折叠
    handleCollapse(data: any) {
      this.collapse = data;
    },
    // 存储数据
    handleData(data: any) {
      // console.log( data);

      this.userFlag = data.userFlag;
    },
  },
  persist: {
    enabled: true, // 这个配置代表存储生效，而且是整个store都存储
  },
});
