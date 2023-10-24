<script setup>
import { onMounted, ref } from "vue";
import { getImgSrc, getProvince } from "@/utils/tool.js";
const db = uniCloud.database();
// 1.初始化
const editorCtx = ref(null);
function onEditorReady() {
  uni
    .createSelectorQuery()
    .in(this)
    .select(".myEdit")
    .fields(
      {
        size: true,
        context: true,
      },
      (res) => {
        editorCtx.value = res.context;
      }
    )
    .exec();
}
// 2.添加分割线
const insertDivider = () => {
  editorCtx.value.insertDivider();
};
// 3.添加大标题
const headshow = ref(false);
const clickHead = () => {
  headshow.value = !headshow.value;
  editorCtx.value.format("header", headshow.value ? "H2" : false);
};
// 4.加粗
const boldShow = ref(false);
const clickBold = () => {
  boldShow.value = !boldShow.value;

  editorCtx.value.format("bold");
};
// 5.倾斜
const italicShow = ref(false);
const clickItalic = () => {
  italicShow.value = !italicShow.value;
  editorCtx.value.format("italic");
};
// 6.添加图像
const clickInsertImage = () => {
  uni.chooseImage({
    success: async (res) => {
      uni.showLoading({
        title: "上传中",
        mask: true,
      });
      for (let item of res.tempFiles) {
        await uniCloud
          .uploadFile({
            filePath: item.path,
            cloudPath: item.name,
          })
          .then((res) => {
            editorCtx.value.insertImage({
              src: res.fileID,
            });
          });
      }
      uni.hideLoading();
    },
  });
};

// 7.内容
const artObj = ref({
  title: "",
  content: "",
  picurls: "",
  description: "",
  province: "",
});
// 8.提交
const onSubmit = () => {
  editorCtx.value.getContents({
    success: (res) => {
      artObj.value.description = res.text.slice(0, 80);
      artObj.value.content = res.html;
      artObj.value.picurls = getImgSrc(res.html);
      uni.showLoading({
        title: "发布中",
      });
      addData();
    },
  });
};
// 9.添加数据
const addData = () => {
  db.collection("quanzi_article")
    .add({ ...artObj.value })
    .then((res) => {
      uni.hideLoading();
      uni.showToast({
        title: "发布成功",
      });
      setTimeout(() => {
        uni.reLaunch({
          url: "/pages/index/index",
        });
      }, 800);
    });
};
// 8.获取省份
const getProvinceData = () => {
  getProvince().then((res) => {
    artObj.value.province = res;
  });
};
onMounted(() => {
  getProvinceData();
});
</script>
<template>
  <view class="edit">
    <view class="title">
      <input type="text" placeholder="请输入完整标题" v-model="artObj.title" />
    </view>
    <view class="content">
      <editor
        ref="editorRef"
        placeholder="写点什么吧~~"
        class="myEdit"
        show-img-size
        show-img-toolbar
        show-img-resize
        @ready="onEditorReady"
        @statuschange="onStatuschange"></editor>
    </view>
    <view class="btnGroup">
      <u-button
        type="primary"
        :disabled="!artObj.title.length"
        @click="onSubmit">
        确认发表
      </u-button>
    </view>
    <view class="tools">
      <view class="item">
        <text
          class="iconfont icon-zitibiaoti"
          @click="clickHead"
          :class="headshow ? 'active' : ''"></text>
      </view>
      <view class="item">
        <text
          class="iconfont icon-zitijiacu"
          @click="clickBold"
          :class="boldShow ? 'active' : ''"></text>
      </view>
      <view class="item">
        <text
          class="iconfont icon-zitixieti"
          @click="clickItalic"
          :class="italicShow ? 'active' : ''"></text>
      </view>
      <view class="item" @click="insertDivider">
        <text class="iconfont icon-fengexian"></text>
      </view>
      <view class="item" @click="clickInsertImage">
        <text class="iconfont icon-charutupian"></text>
      </view>
      <view class="item">
        <text class="iconfont icon-duigou_kuai"></text>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.edit {
  padding: 30rpx;
  .title {
    input {
      height: 120rpx;
      font-size: 46rpx;
      border-bottom: 1px solid #e4e4e4;
      margin-bottom: 30rpx;
      color: #000;
    }
    .placeholderClass {
      color: #e0e0e0;
    }
  }
  .content {
    .myEdit {
      height: calc(100vh - 500rpx);
      margin-bottom: 30rpx;
    }
  }

  .tools {
    width: 100%;
    height: 80rpx;
    background: #fff;
    border-top: 1rpx solid #f4f4f4;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .iconfont {
      font-size: 36rpx;
      color: #333;
      &.active {
        color: #0199fe;
      }
    }
  }
}
</style>
