"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_blog_item2 = common_vendor.resolveComponent("blog-item");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_u_tabs2 + _easycom_blog_item2 + _easycom_uni_load_more2)();
}
const _easycom_u_tabs = () => "../../uni_modules/vk-uview-ui/components/u-tabs/u-tabs.js";
const _easycom_blog_item = () => "../../components/blog-item/blog-item.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_u_tabs + _easycom_blog_item + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const list = common_vendor.ref([
      { name: "最新", type: "publish_date" },
      { name: "热点", type: "view_count" }
    ]);
    const navList = common_vendor.ref(0);
    const current = common_vendor.ref(0);
    common_vendor.ref(false);
    const itemList = common_vendor.ref([]);
    const goEdit = () => {
      common_vendor.index.navigateTo({
        url: "/pages/edit/edit"
      });
    };
    const db = common_vendor.Ds.database();
    const getData = async () => {
      let artTemp = await db.collection("quanzi_article").field(
        "title,user_id,description,picurls,comment_count,like_count,view_count,publish_date"
      ).getTemp();
      let userTemp = db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp();
      db.collection(artTemp, userTemp).orderBy("publish_date", "desc").get().then((res) => {
        itemList.value = res.result.data;
        console.log(itemList.value);
      });
    };
    const change = (e) => {
      navList.value = e;
      getData();
    };
    common_vendor.onMounted(() => {
      getData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(change),
        b: common_vendor.p({
          list: list.value,
          current: current.value
        }),
        c: common_vendor.f(itemList.value, (item, k0, i0) => {
          return {
            a: "1cf27b2a-1-" + i0,
            b: common_vendor.p({
              item
            }),
            c: item
          };
        }),
        d: common_vendor.o(goEdit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/Hbuilder/Blogger/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
