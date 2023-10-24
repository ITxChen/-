"use strict";
const common_vendor = require("../../common/vendor.js");
const db = common_vendor.Ds.database();
const _sfc_main = {
  data() {
    return {
      collectionList: [
        db.collection("quanzi_like").where(`user_id==$cloudEnv_uid`).getTemp(),
        db.collection("quanzi_article").getTemp()
      ],
      loadMore: {
        contentdown: "",
        contentrefresh: "",
        contentnomore: ""
      }
    };
  },
  onPullDownRefresh() {
    this.$refs.udb.loadData(
      {
        clear: true
      },
      () => {
        common_vendor.index.stopPullDownRefresh();
      }
    );
  },
  onReachBottom() {
    this.$refs.udb.loadMore();
  },
  methods: {
    handleItemClick(id) {
      common_vendor.index.navigateTo({
        url: "/pages/detail/detail?id=" + id
      });
    },
    fabClick() {
      common_vendor.index.navigateTo({
        url: "./add",
        events: {
          // 监听新增数据成功后, 刷新当前页面数据
          refreshData: () => {
            this.$refs.udb.loadData({
              clear: true
            });
          }
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  const _component_uni_fab = common_vendor.resolveComponent("uni-fab");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_load_more2 + _easycom_unicloud_db2 + _component_uni_fab)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_unicloud_db = () => "../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_load_more + _easycom_unicloud_db)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.w(({
      data,
      pagination,
      loading,
      hasMore,
      error
    }, s0, i0) => {
      return common_vendor.e({
        a: error
      }, error ? {
        b: common_vendor.t(error.message)
      } : data ? {
        d: common_vendor.f(data, (item, index, i1) => {
          return {
            a: common_vendor.t(item.article_id[0].title),
            b: index,
            c: common_vendor.o(($event) => $options.handleItemClick(item.article_id[0]._id), index),
            d: "eec7e460-2-" + i0 + "-" + i1 + "," + ("eec7e460-1-" + i0)
          };
        }),
        e: common_vendor.p({
          showArrow: true,
          clickable: true
        }),
        f: "eec7e460-1-" + i0 + ",eec7e460-0"
      } : {}, {
        c: data,
        g: "eec7e460-3-" + i0 + ",eec7e460-0",
        h: common_vendor.p({
          status: loading ? "loading" : hasMore ? "more" : "noMore"
        }),
        i: i0,
        j: s0
      });
    }, {
      name: "d",
      path: "a",
      vueId: "eec7e460-0"
    }),
    b: common_vendor.sr("udb", "eec7e460-0"),
    c: common_vendor.p({
      where: `user_id==$cloudEnv_uid`,
      collection: $data.collectionList,
      orderby: "publish_date desc",
      field: "article_id,publish_date,user_id,comment_ip"
    }),
    d: common_vendor.sr("fab", "eec7e460-4"),
    e: common_vendor.o($options.fabClick),
    f: common_vendor.p({
      horizontal: "right",
      vertical: "bottom",
      ["pop-menu"]: false
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Hbuilder/Blogger/pages/quanzi_like/list.vue"]]);
wx.createPage(MiniProgramPage);
