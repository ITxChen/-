<template>
  <view class="blogitem">
    <view class="head">
      <view class="userinfo">
        <view class="avatar">
          <image src="../../static/images/panda.jpg" mode="aspectFill"></image>
        </view>
        <view class="name">
          {{ getName(item) }}
        </view>
        <view class="time">
          <uni-dateformat
            :date="item.publish_date"
            format="MM月dd hh:mm"
            :threshold="[60000, 3600000 * 24 * 30]"></uni-dateformat>
        </view>
      </view>

      <view class="more" @click="show = true">
        <text class="iconfont icon-ellipsis"></text>
      </view>
    </view>

    <view class="body">
      <view class="title" @click="goDetail">{{ item.title }}</view>
      <view class="text" @click="goDetail" v-if="item.description">
        <view class="t">{{ item.description }}</view>
      </view>
      <view class="piclist" v-if="item.picurls.length">
        <view
          :class="item.picurls.length == 1 ? 'only' : ''"
          v-for="(pic, index) in item.picurls"
          :key="pic">
          <image
            class="pic"
            :src="pic"
            mode="aspectFill"
            @click="clickPic(index)"></image>
        </view>
      </view>
    </view>

    <view class="info">
      <view class="box">
        <text class="iconfont icon-a-27-liulan"></text>
        <text>{{ item.view_count }}</text>
      </view>
      <view class="box">
        <text class="iconfont icon-a-5-xinxi"></text>
        <text>
          {{
            item.comment_count && item.comment_count > 0
              ? item.comment_count
              : "评论"
          }}
        </text>
      </view>
      <view class="box" :class="item.isLike ? 'active' : ''" @click="clickLike">
        <text class="iconfont icon-a-106-xihuan"></text>
        <text>{{ item.like_count ? item.like_count : "点赞" }}</text>
      </view>
    </view>
    <u-action-sheet
      :list="list"
      v-model="show"
      @click="onSelect"></u-action-sheet>
  </view>
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue";
import { getName, giveAvatar } from "../../utils/tool.js";
import { store } from "../../uni_modules/uni-id-pages/common/store";
const emit = defineEmits(["delEvent"]);
const props = defineProps({
  item: {
    type: Object,
  },
});
// 1.定义弹出框
const show = ref(false);
const list = ref([
  {
    text: "删除",
    disabled: true,
  },
  {
    text: "修改",
    disabled: true,
  },
]);
// 2.判断权限
const compareUser = () => {
  // h获取登录账号
  const uid = uniCloud.getCurrentUserInfo().uid;
  //获取当前item的发布人的uid
  const itemUserUid = props.item.user_id[0]._id;
  if (uid == itemUserUid) {
    list.value.forEach((item) => {
      item.disabled = false;
    });
  }
};
// 3.弹出框操作
const db = uniCloud.database();
const onSelect = (e) => {
  // 删除
  if (e == 0) {
    uni.showLoading({
      title: "加载中",
    });
    db.collection("quanzi_article")
      .doc(props.item._id)
      .update({
        delState: true,
      })
      .then((res) => {
        uni.hideLoading();
        uni.showToast({
          title: "删除成功",
        });
        emit("delEvent");
      });
  }
};

// 4.点赞
const likeTime = ref(0);
const utilsObj = uniCloud.importObject("utilsObj");
// 4.点赞的请求数据库的函数
const likeFun = async () => {
  const count = await db
    .collection("quanzi_like")
    .where(`article_id  == "${props.item._id}" && user_id == $cloudEnv_uid`)
    .count();
  if (count.result.total) {
    db.collection("quanzi_like")
      .where(`article_id  == "${props.item._id}" && user_id == $cloudEnv_uid`)
      .remove();
    utilsObj.operation("quanzi_article", "like_count", props.item._id, -1);
  } else {
    db.collection("quanzi_like").add({
      article_id: props.item._id,
    });
    utilsObj.operation("quanzi_article", "like_count", props.item._id, 1);
  }
};
const clickLike = async () => {
  const time = Date.now();
  if (time - likeTime.value < 1000) {
    uni.showToast({
      title: "操作太频繁，请稍后！！",
      icon: "none",
    });
    return;
  }
  likeTime.value = time;
  props.item.isLike ? props.item.like_count-- : props.item.like_count++;
  props.item.isLike = !props.item.isLike;
  likeFun();
};
// 1.单击图片
const clickPic = (index) => {
  uni.previewImage({
    urls: props.item.picurls,
    count: index,
  });
};
// 2.跳转详情
const goDetail = () => {
  uni.navigateTo({
    url: "/pages/detail/detail?id=" + props.item._id,
  });
};
onMounted(() => {
  compareUser();
});
</script>

<style lang="scss" scoped>
.blogitem {
  .head {
    display: flex;
    font-size: 32rpx;
    align-items: center;
    justify-content: space-between;
    .userinfo {
      display: flex;
      align-items: center;
      .avatar {
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
        border-radius: 50%;
        overflow: hidden;
        image {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .name {
        color: #222;
        padding-left: 10rpx;
      }
      .time {
        color: #888;
        font-size: 22rpx;
        padding-left: 20rpx;
      }
    }
    .more {
      padding: 5rpx;
      .iconfont {
        font-size: 50rpx;
        color: #888;
      }
    }
  }

  .body {
    padding: 15rpx 0 30rpx;
    .title {
      font-size: 44rpx;
      color: #000;
      font-weight: 600;
      text-align: justify;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .text {
      padding-top: 10rpx;
      padding-bottom: 10rpx;
      font-size: 30rpx;
      text-align: justify;
      color: #888;
      .t {
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .piclist {
      display: flex;
      padding-top: 20rpx;
      .pic {
        width: 225rpx;
        height: 225rpx;
        margin-right: 6rpx;
        overflow: hidden;
        image {
          width: 100%;
          height: 100%;
        }
        &:first-child {
          border-radius: 20rpx 0 0 20rpx;
        }
        &:last-child {
          border-radius: 0 20rpx 20rpx 0;
        }
        &.only {
          border-radius: 20rpx;
        }
      }
    }
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 26rpx;
    color: #333;
    .box {
      display: flex;
      align-items: center;
      padding: 15rpx 0 5rpx;
      flex: 1;
      display: flex;
      justify-content: center;
      s .iconfont {
        font-size: 40rpx;
        padding-right: 10rpx;
      }
    }
    .box.active {
      color: #0199fe;
    }
  }
}
</style>
