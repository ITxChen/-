<template>
  <view>
    <view class="comment-item" @click="goReplay">
      <view class="avatar">
        <u-avatar :src="pubImgUrl" size="26"></u-avatar>
      </view>

      <view class="wrap">
        <view class="username">
          {{ getName(props.item) }}
          <text v-if="!closeBtn" class="iconfont" @click.stop="delComment">
            x
          </text>
        </view>
        <view class="comment-content">{{ props.item.comment_content }}</view>
        <view class="info">
          <view class="reply-btn">{{ props.item.totalReply }}回复</view>
          <view>
            <uni-dateformat
              :date="props.item.comment_date"
              :threshold="[60000, 3600000 * 24 * 30]"></uni-dateformat>
          </view>
          <view>{{ props.item.province }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { getImgSrc, getProvince, getName } from "@/utils/tool.js";
import { onMounted } from "vue";
const db = uniCloud.database();
const utilsObj = uniCloud.importObject("utilsObj", { customUI: true });
const emit = defineEmits(["removeEnv"]);
const props = defineProps({
  item: {},
});
const pubImgUrl = props.item.user_id[0].avatar_file.url;
// console.log(pubName);
const delComment = () => {
  const uid = uniCloud.getCurrentUserInfo().uid;
  if (uid == props.item.user_id[0]._id) {
    uni.showModal({
      title: "是否确定删除?",
      success: (res) => {
        if (res.confirm) {
          db.collection("quanzi_comment")
            .doc(props.item._id)
            .remove()
            .then((res) => {
              uni.showToast({
                title: "删除成功",
              });
              emit("removeEnv", { id: props.item._id });
              if (props.item.comment_count > 0) {
                utilsObj.operation(
                  "quanzi_article",
                  "comment_count",
                  props.item.article_id,
                  -1
                );
              }
            });
        }
      },
    });
  } else {
    uni.showToast({
      title: "权限未通过",
      icon: "none",
    });
  }
};
// 跳转恢复页面
const goReplay = () => {
  uni.setStorageSync("replyItem", props.item);
  uni.navigateTo({
    url: "/pages/replay/replay",
  });
};
</script>

<style lang="scss" scoped>
.comment-item {
  display: flex;
  .wrap {
    flex: 1;
    padding-left: 20rpx;
    padding-bottom: 20rpx;

    .username {
      font-size: 26rpx;
      color: #666;
      padding: 10rpx 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .iconfont {
        font-size: 20rpx;
        padding: 10rpx;
        color: #999;
      }
    }

    .comment-content {
      font-size: 34rpx;
      color: #111;
      line-height: 1.8em;
    }

    .info {
      font-size: 26rpx;
      color: #666;
      display: flex;
      padding: 10rpx 0;
      align-items: center;

      view {
        margin-right: 25rpx;
      }

      .reply-btn {
        padding: 6rpx 18rpx;
        background: #e4e4e4;
        border-radius: 30rpx;
      }
    }
  }
}
</style>
