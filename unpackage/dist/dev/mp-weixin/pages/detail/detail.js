"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
require("../../uni_modules/uni-id-pages/config.js");
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_u_parse2 = common_vendor.resolveComponent("u-parse");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  const _component_comment_item = common_vendor.resolveComponent("comment-item");
  const _component_comment_frame = common_vendor.resolveComponent("comment-frame");
  (_easycom_uni_dateformat2 + _easycom_u_parse2 + _easycom_u_empty2 + _component_comment_item + _component_comment_frame)();
}
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_u_parse = () => "../../uni_modules/vk-uview-ui/components/u-parse/u-parse.js";
const _easycom_u_empty = () => "../../uni_modules/vk-uview-ui/components/u-empty/u-empty.js";
if (!Math) {
  (_easycom_uni_dateformat + _easycom_u_parse + _easycom_u_empty)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const props = __props;
    const artId = props.id;
    const db = common_vendor.Ds.database();
    const dataArr = common_vendor.ref({});
    dataArr.value.user_id;
    common_vendor.ref("拿个勾八，全是bug");
    const isLike = common_vendor.ref(false);
    const utilsObj = common_vendor.Ds.importObject("utilsObj");
    const nickname = common_vendor.ref("");
    const getData = async () => {
      let artTemp = await db.collection("quanzi_article").where(`_id=="${artId}"`).getTemp();
      let userTemp = db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp();
      let likeTemp = db.collection("quanzi_like").where(`article_id  == "${artId}" && user_id == $cloudEnv_uid`).getTemp();
      let temArr = [artTemp, userTemp];
      if (uni_modules_uniIdPages_common_store.store.hasLogin)
        temArr.push(likeTemp);
      db.collection(...temArr).get({ getOne: true }).then((res) => {
        if (uni_modules_uniIdPages_common_store.store.hasLogin)
          isLike.value = res.result.data._id.quanzi_like.length ? true : false;
        dataArr.value = res.result.data;
        nickname.value = dataArr.value.user_id[0].nickname;
        console.log(res);
      });
    };
    const readUpdate = () => {
      utilsObj.operation("quanzi_article", "view_count", artId, 1);
    };
    const likeTime = common_vendor.ref(0);
    const likeFun = async () => {
      const count = await db.collection("quanzi_like").where(`article_id  == "${artId}" && user_id == $cloudEnv_uid`).count();
      if (count.result.total) {
        db.collection("quanzi_like").where(`article_id  == "${artId}" && user_id == $cloudEnv_uid`).remove();
        utilsObj.operation("quanzi_article", "like_count", artId, -1);
      } else {
        db.collection("quanzi_like").add({
          article_id: artId
        });
        utilsObj.operation("quanzi_article", "like_count", artId, 1);
      }
    };
    const clickLike = async () => {
      const time = Date.now();
      if (time - likeTime.value < 1e3) {
        common_vendor.index.showToast({
          title: "操作太频繁，请稍后！！",
          icon: "none"
        });
        return;
      }
      likeTime.value = time;
      isLike.value ? dataArr.value.like_count-- : dataArr.value.like_count++;
      isLike.value = !isLike.value;
      likeFun();
    };
    common_vendor.onMounted(() => {
      if (!props.id) {
        common_vendor.index.showToast({
          title: "参数有误",
          icon: " none"
        });
        setTimeout(() => {
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
          });
        }, 500);
        return;
      }
      getData();
      readUpdate();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(dataArr.value.title),
        b: common_vendor.t(nickname.value),
        c: common_vendor.p({
          date: dataArr.value.publish_date,
          format: "MM月dd hh:mm",
          threshold: [6e4, 36e5 * 24 * 30]
        }),
        d: common_vendor.t(dataArr.value.province),
        e: dataArr.value.content,
        f: common_vendor.p({
          content: dataArr.value.content,
          selectable: true
        }),
        g: dataArr.value.like_count > 0
      }, dataArr.value.like_count > 0 ? {
        h: common_vendor.t(dataArr.value.like_count)
      } : {}, {
        i: common_vendor.o(clickLike),
        j: common_vendor.n(isLike.value ? "active" : ""),
        k: common_vendor.t(dataArr.value.view_count),
        l: common_vendor.p({
          mode: "comment",
          icon: "https://cdn.uviewui.com/uview/empty/comment.png"
        }),
        m: common_vendor.f(3, (item, k0, i0) => {
          return {
            a: "3c2542b4-3-" + i0,
            b: item
          };
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Hbuilder/Blogger/pages/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
