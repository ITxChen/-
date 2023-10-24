<template>
  <view class="detail">
    <view class="container">
      <!-- <unicloud-db
        ref="dbRef"
        v-slot:default="{ data, loading, error, options }"
        collection="quanzi_article"
        :getone="true">
        {{ data }}
        <view class="title"></view>
        <view class="userinfo">
          <view class="avatar">
            <image
              src="../../static/images/panda.jpg"
              mode="aspectFill"></image>
          </view>
          <view class="text">
            <view class="name">王五</view>
            <view class="small">6天前 · 发布于北京市</view>
          </view>
        </view>
        <view class="content">
          <u-parse></u-parse>
        </view>
      </unicloud-db -->
      <!-- <view v-if="true">
        <u-skeleton rows="5" title loading=""></u-skeleton>
      </view> -->
      <view class="title">{{ dataArr.title }}</view>
      <view class="userinfo">
        <view class="avatar">
          <image src="../../static/images/panda.jpg" mode="aspectFill"></image>
        </view>
        <view class="text">
          <view class="name">{{ nickname }}</view>

          <view class="small">
            <uni-dateformat
              :date="dataArr.publish_date"
              format="MM月dd hh:mm"
              :threshold="[60000, 3600000 * 24 * 30]"></uni-dateformat>
            · 发布于{{ dataArr.province }}
          </view>
        </view>
      </view>
      <view class="content">
        <view v-html="dataArr.content"></view>
        <u-parse :content="dataArr.content" :selectable="true"></u-parse>
      </view>

      <view class="like">
        <view class="btn" @click="clickLike" :class="isLike ? 'active' : ''">
          <text class="iconfont icon-good-fill"></text>
          <text v-if="dataArr.like_count > 0">{{ dataArr.like_count }}</text>
        </view>
        <view class="users">
          <template v-for="item in likeUserArr" :key="item">
            <image :src="giveAvatar(item)" mode="aspectFill"></image>
          </template>
        </view>
        <view class="text">
          <text class="num">{{ dataArr.view_count }}</text>
          人看过
        </view>
      </view>
    </view>

    <view class="comment">
      <view v-if="!commentList.length">
        <u-empty text="所谓伊人，在水一方" mode="list"></u-empty>
      </view>

      <view class="content" v-if="commentList.length">
        <view class="item" v-for="item in commentList" :key="item">
          <comment-item :item="item" @removeEnv="removeEnv"></comment-item>
        </view>
      </view>
    </view>

    <comment-frame :comment="comment" @commentEnv="commentEnv"></comment-frame>
  </view>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { store } from "../../uni_modules/uni-id-pages/common/store";
import { giveAvatar } from "../../utils/tool.js";
import commentItem from "../../components/comment-item.vue";
import commentFrame from "../../components/comment-frame.vue";
const props = defineProps();
const artId = props.id;
// 1.发送网络请求获取数据
const db = uniCloud.database();
// 存储文章信息
const dataArr = ref({});
// 存储用户信息
const _id = dataArr.value.user_id;
const username = ref("拿个勾八，全是bug");
// 是否点赞
const isLike = ref(false);
// 获取云对象
const utilsObj = uniCloud.importObject("utilsObj");
const nickname = ref("");
// 1.获取数据
const getData = async () => {
  let artTemp = await db
    .collection("quanzi_article")
    .where(`_id=="${artId}"`)
    .getTemp();
  let userTemp = db
    .collection("uni-id-users")
    .field("_id,username,nickname,avatar_file")
    .getTemp();
  let likeTemp = db
    .collection("quanzi_like")
    .where(`article_id  == "${artId}" && user_id == $cloudEnv_uid`)
    .getTemp();
  let temArr = [artTemp, userTemp];
  if (store.hasLogin) temArr.push(likeTemp);
  db.collection(...temArr)
    .get({ getOne: true })
    .then((res) => {
      if (store.hasLogin)
        isLike.value = res.result.data._id.quanzi_like.length ? true : false;
      dataArr.value = res.result.data;
      nickname.value = dataArr.value.user_id[0].nickname;
      console.log(res);
    });
};
// 2.浏览量增加：
const readUpdate = () => {
  utilsObj.operation("quanzi_article", "view_count", artId, 1);
};

// 3.点赞
const likeTime = ref(0);
// 4.点赞的请求数据库的函数
const likeFun = async () => {
  const count = await db
    .collection("quanzi_like")
    .where(`article_id  == "${artId}" && user_id == $cloudEnv_uid`)
    .count();
  if (count.result.total) {
    db.collection("quanzi_like")
      .where(`article_id  == "${artId}" && user_id == $cloudEnv_uid`)
      .remove();
    utilsObj.operation("quanzi_article", "like_count", artId, -1);
  } else {
    db.collection("quanzi_like").add({
      article_id: artId,
    });
    utilsObj.operation("quanzi_article", "like_count", artId, 1);
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
  isLike.value ? dataArr.value.like_count-- : dataArr.value.like_count++;
  isLike.value = !isLike.value;
  likeFun();
};
// 4.获取点赞用户
const likeUserArr = ref([]);
const getLikeUser = () => {
  const likeTemp = db
    .collection("quanzi_like")
    .where(`article_id == "${props.id}"`)
    .getTemp();
  const userTemp = db
    .collection("uni-id-users")
    .field("_id,avatar_file")
    .getTemp();
  db.collection(likeTemp, userTemp)
    .get()
    .then((res) => {
      likeUserArr.value = res.result.data;
    });
};

// 5.评论模块传参
const comment = ref({
  article_id: props.id,
  comment_type: 0,
});
const commentList = ref([]);
const getComment = async () => {
  let commentTemp = db
    .collection("quanzi_comment")
    .where(`article_id == "${artId}" && comment_type == 0`)
    .orderBy("comment_date desc")
    // .limit(5)
    .getTemp();
  let userTemp = db
    .collection("uni-id-users")
    .field("_id,username,nickname,avatar_file")
    .getTemp();
  const res = await db.collection(commentTemp, userTemp).get();
  const idArr = res.result.data.map((item) => {
    return item._id;
  });
  const replyArr = await db
    .collection("quanzi_comment")
    .where({
      reply_comment_id: db.command.in(idArr),
    })
    .groupBy("reply_comment_id")
    .groupField("count(*) as totalReply")
    .get();
  res.result.data.forEach((item) => {
    const index = replyArr.result.data.findIndex((find) => {
      return find.reply_comment_id == item._id;
    });
    if (index > -1) {
      item.totalReply = replyArr.result.data[index].totalReply;
    }
  });
  commentList.value = res.result.data;
};
// 6.评论成功的回调
const commentEnv = (e) => {
  commentList.value.unshift({
    ...e,
    ...comment,
    user_id: [store.userInfo],
    // user_id: [],
  });
};

// 7.删除成功的回调
const removeEnv = (e) => {
  const index = commentList.value.findIndex((item) => {
    return item._id == e.id;
  });

  commentList.value.splice(index, 1);
};
onMounted(async () => {
  if (!props.id) {
    uni.showToast({
      title: "参数有误",
      icon: " none",
    });
    setTimeout(() => {
      uni.reLaunch({
        url: "/pages/index/index",
      });
    }, 500);
    return;
  }
  await getData();
  readUpdate();
  getLikeUser();
  getComment();
});
</script>

<style lang="scss">
.detail {
  background: #f8f8f8;
  min-height: calc(100vh - var(--window-top));
  .container {
    padding: 30rpx;
    background: #fff;
    .title {
      font-size: 46rpx;
      color: #333;
      line-height: 1.4em;
      font-weight: 600;
    }
    .userinfo {
      padding: 20rpx 0 50rpx;
      display: flex;
      align-items: center;
      .avatar {
        width: 60rpx;
        height: 60rpx;
        padding-right: 15rpx;
        image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .text {
        font-size: 28rpx;
        color: #555;
        .small {
          font-size: 20rpx;
          color: #999;
        }
      }
    }
    .content {
    }
    .like {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 80rpx 50rpx 50rpx;
      .btn {
        width: 260rpx;
        height: 120rpx;
        background: #e4e4e4;
        border-radius: 100rpx;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: 28rpx;
        .iconfont {
          font-size: 50rpx;
        }
        &.active {
          background: #0199fe;
        }
      }
      .text {
        font-size: 26rpx;
        color: #666;
        .num {
          color: #0199fe;
        }
        .spot {
          padding: 0 10rpx;
        }
      }
      .users {
        display: flex;
        justify-content: center;
        padding: 30rpx 0;
        image {
          width: 50rpx;
          height: 50rpx;
          border-radius: 50%;
          border: 3px solid #fff;
          margin-left: -20rpx;
        }
      }
    }
  }

  .comment {
    padding: 30rpx;
    padding-bottom: 120rpx;
    .item {
      padding: 10rpx 0;
    }
  }
}
</style>
