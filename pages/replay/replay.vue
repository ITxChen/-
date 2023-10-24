<template>
  <view class="reply">
    <view class="top">
      <comment-item :item="replyItem"></comment-item>
    </view>
    <view class="list">
      <view class="row" v-for="item in commentChList" :key="item">
        <comment-item :item="item"></comment-item>
      </view>
    </view>

    <view>
      <comment-frame
        @commentEnv="commentEnv"
        :placeholder="`回复:${getName(replyItem)}`"
        :comment="comment"></comment-frame>
    </view>
  </view>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { giveAvatar, getName } from "../../utils/tool.js";
import commentItem from "../../components/comment-item.vue";
import commentFrame from "../../components/comment-frame.vue";
const db = uniCloud.database();
const replyItem = ref({});
replyItem.value = uni.getStorageSync("replyItem");
// 存储二级回复信息
const comment = ref({
  article_id: replyItem.value.article_id,
  comment_type: 1,
  reply_user_id: replyItem.value.user_id[0]._id,
  reply_comment_id: replyItem.value._id,
});
// 获取评论
const commentChList = ref([]);
const getComment = () => {
  let commentTemp = db
    .collection("quanzi_comment")
    .where(
      `article_id == "${replyItem.value.article_id}" && comment_type == 1 && 
reply_comment_id == "${replyItem.value._id}" `
    )
    .orderBy("comment_date desc")
    // .limit(5)
    .getTemp();
  let userTemp = db
    .collection("uni-id-users")
    .field("_id,username,nickname,avatar_file")
    .getTemp();
  db.collection(commentTemp, userTemp)
    .get()
    .then((res) => {
      console.log(res);
      commentChList.value = res.result.data;
    });
};
const commentEnv = () => {
  commentChList.value = [];
  getComment();
};
onMounted(() => {
  getComment();
});
</script>

<style lang="scss">
.reply {
  .top {
    padding: 30rpx;
    border-bottom: 15rpx solid #eee;
  }
  .list {
    padding: 30rpx;
    padding-bottom: 120rpx;
    .row {
      padding-bottom: 15rpx;
    }
  }
}
</style>
