<template>
  <view>
    <view class="commentFrame">
      <uni-easyinput
        ref="uipt"
        @confirm="goComment"
        suffixIcon="paperplane"
        v-model="replyContent"
        :placeholder="props.placeholder"
        @iconClick="goComment"></uni-easyinput>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { getProvince } from "@/utils/tool.js";
const replyContent = ref("");
const db = uniCloud.database();
const utilsObj = uniCloud.importObject("utilsObj", { customUI: true });
const emit = defineEmits(["commentEnv"]);
// 接受props
const props = defineProps({
  comment: Object,
  placeholder: {
    default: "键盘侠,开始吧!",
  },
});
const goComment = async () => {
  if (!replyContent.value) {
    uni.showToast({
      title: "内容不能为空",
      icon: "none",
    });
    return;
  }
  const province = await getProvince();
  db.collection("quanzi_comment")
    .add({
      comment_content: replyContent.value,
      province: province,
      ...props.comment,
    })
    .then((res) => {
      uni.showToast({
        title: "发布成功",
      });
      emit("commentEnv", {
        _id: res.result.id,
        comment_content: replyContent.value,
        province: province,

        comment_date: Date.now(),
      });
      replyContent.value = "";
      // 追加评论数量
      utilsObj.operation(
        "quanzi_article",
        "comment_count",
        props.comment.article_id,
        1
      );
    });
};
</script>

<style lang="scss" scoped>
.commentFrame {
  width: 100%;
  background: #fff;
  padding: 20rpx 30rpx;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
}
</style>
