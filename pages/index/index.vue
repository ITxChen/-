<template>
  <view class="home">
    <view class="topnav">
      <u-tabs :list="list" :current="current" @change="change"></u-tabs>
    </view>

    <!-- <view class="loadingState" v-show="true">
      <u-skeleton
        :loading="false"
        :animation="true"
        bgColor="#FFF"></u-skeleton>
    </view> -->

    <view class="content">
      <view class="item" v-for="item in itemList" :key="item">
        <!-- <blog-item :item="item"></blog-item> -->
        <!-- {{items}} -->
        <blog-item :item="item" @delEvent="delEvent"></blog-item>
      </view>
    </view>

    <view>
      <uni-load-more></uni-load-more>
    </view>

    <view class="edit" @click="goEdit">
      <text class="iconfont icon-a-21-xiugai"></text>
    </view>
  </view>
</template>

<script setup>
import { store, mutations } from "@/uni_modules/uni-id-pages/common/store.js";
import { onMounted, ref } from "vue";
import { onReachBottom } from "@dcloudio/uni-app";
// tab
const list = ref([
  { name: "最新", type: "publish_date" },
  { name: "热点", type: "view_count" },
]);
// 存储tarb的index
const navList = ref(0);
const current = ref(0);
const loadState = ref(false);
const itemList = ref([]);
// 1.点击跳转编辑页面
const goEdit = () => {
  uni.navigateTo({
    url: "/pages/edit/edit",
  });
};
// 2.获取数据
const db = uniCloud.database();
const dbCmd = db.command;
const getData = async () => {
  let artTemp = await db
    .collection("quanzi_article")
    .where({
      delState: false,
    })
    .field(
      "title,user_id,description,picurls,comment_count,like_count,view_count,publish_date"
    )
    .getTemp();

  let userTemp = db
    .collection("uni-id-users")
    .field("_id,username,nickname,avatar_file")
    .getTemp();

  db.collection(artTemp, userTemp)
    .orderBy("publish_date", "desc")
    // .skip(itemList.length)
    // .limit(5)
    .get()
    .then(async (res) => {
      itemList.value = res.result.data;
      if (store.hasLogin) {
        // 首页点赞高亮逻辑
        const idArr = res.result.data.map((item) => item._id);
        // console.log(idArr);
        const likeArr = await db
          .collection("quanzi_like")
          .where({
            article_id: dbCmd.in(idArr),
            user_id: uniCloud.getCurrentUserInfo().uid,
          })
          .get();
        likeArr.result.data.forEach((item) => {
          // 如果相同，返回index
          const findIndex = idArr.findIndex((find) => {
            return item.article_id == find;
          });
          itemList.value[findIndex].isLike = true;
        });
      }
    });
};

// 3.切换tar
const change = (e) => {
  navList.value = e;
  getData();
};
// 4.emit刷新
const delEvent = () => {
  itemList.value = [];
  getData();
};
// 触低
onReachBottom(() => {
  // console.log(itemList.value.length);
  // console.log(typeof itemList.value);
  // console.log(itemList.value);
});
onMounted(() => {
  getData();
});
</script>

<style lang="scss" scoped>
.home {
  .topnav {
    margin-bottom: 30rpx;
  }
  .loadingState {
    padding: 30rpx;
  }
  .content {
    .item {
      padding: 30rpx;
      border-bottom: #f7f7f7 15rpx solid;
    }
  }
  .edit {
    width: 120rpx;
    height: 120rpx;
    background: #0199fe;
    border-radius: 50%;
    color: #fff;
    position: fixed;
    z-index: 100;
    bottom: 150rpx;
    right: 50rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 20rpx rgba(1, 153, 254, 0.8);
    .iconfont {
      font-size: 50rpx;
    }
  }
}
</style>
