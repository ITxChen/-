"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
require("../../uni_modules/uni-id-pages/config.js");
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  _easycom_uni_dateformat2();
}
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  _easycom_uni_dateformat();
}
const _sfc_main = {
  __name: "self",
  setup(__props) {
    const userInfo = common_vendor.computed(() => {
      return uni_modules_uniIdPages_common_store.store.userInfo;
    });
    const hasLogin = common_vendor.computed(() => {
      return uni_modules_uniIdPages_common_store.store.hasLogin;
    });
    const logout = () => {
      common_vendor.index.showModal({
        title: "是否确定退出",
        success: (res) => {
          uni_modules_uniIdPages_common_store.mutations.logout();
        }
      });
    };
    const toUserInfo = () => {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/userinfo/userinfo"
      });
    };
    const myArticle = () => {
      common_vendor.index.navigateTo({
        url: "/pages/quanzi_article/list"
      });
    };
    const myLike = () => {
      common_vendor.index.navigateTo({
        url: "/pages/quanzi_like/list"
      });
    };
    const goFeedBack = () => {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-feedback/pages/opendb-feedback/opendb-feedback"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(hasLogin) && common_vendor.unref(userInfo).avatar_file && common_vendor.unref(userInfo).avatar_file.url
      }, common_vendor.unref(hasLogin) && common_vendor.unref(userInfo).avatar_file && common_vendor.unref(userInfo).avatar_file.url ? {
        b: common_vendor.unref(userInfo).avatar_file.url
      } : {}, {
        c: common_vendor.unref(hasLogin)
      }, common_vendor.unref(hasLogin) ? {
        d: common_vendor.t(common_vendor.unref(userInfo).nickname || common_vendor.unref(userInfo).username || common_vendor.unref(userInfo).mobile),
        e: common_vendor.p({
          date: common_vendor.unref(userInfo).register_date,
          threshold: [3600, 99 * 365 * 24 * 60 * 60 * 1e3]
        })
      } : {}, {
        f: common_vendor.o(toUserInfo),
        g: common_vendor.unref(hasLogin) && common_vendor.unref(userInfo).avatar_file && common_vendor.unref(userInfo).avatar_file.url
      }, common_vendor.unref(hasLogin) && common_vendor.unref(userInfo).avatar_file && common_vendor.unref(userInfo).avatar_file.url ? {
        h: common_vendor.unref(userInfo).avatar_file.url
      } : {}, {
        i: common_vendor.o(myArticle),
        j: common_vendor.o(myLike),
        k: common_vendor.o(goFeedBack),
        l: common_vendor.o(logout)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Hbuilder/Blogger/pages/self/self.vue"]]);
wx.createPage(MiniProgramPage);
