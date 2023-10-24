"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_tool = require("../../utils/tool.js");
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  _easycom_uni_dateformat2();
}
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  _easycom_uni_dateformat();
}
const _sfc_main = {
  __name: "blog-item",
  props: {
    item: {
      type: Object
    }
  },
  setup(__props) {
    const props = __props;
    const clickPic = (index) => {
      common_vendor.index.previewImage({
        urls: props.item.picurls,
        count: index
      });
    };
    const goDetail = () => {
      common_vendor.index.navigateTo({
        url: "/pages/detail/detail?id=" + props.item._id
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(common_vendor.unref(utils_tool.getName)(__props.item)),
        b: common_vendor.p({
          date: __props.item.publish_date,
          format: "MM月dd hh:mm",
          threshold: [6e4, 36e5 * 24 * 30]
        }),
        c: common_vendor.t(__props.item.title),
        d: common_vendor.o(goDetail),
        e: __props.item.description
      }, __props.item.description ? {
        f: common_vendor.t(__props.item.description),
        g: common_vendor.o(goDetail)
      } : {}, {
        h: __props.item.picurls.length
      }, __props.item.picurls.length ? {
        i: common_vendor.f(__props.item.picurls, (pic, index, i0) => {
          return {
            a: pic,
            b: common_vendor.o(($event) => clickPic(index), pic),
            c: pic
          };
        }),
        j: common_vendor.n(__props.item.picurls.length == 1 ? "only" : "")
      } : {}, {
        k: common_vendor.t(__props.item.view_count),
        l: common_vendor.t(__props.item.comment_count ? __props.item.comment_count : "评论"),
        m: common_vendor.t(__props.item.like_count ? __props.item.like_count : "点赞")
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ed6c1afa"], ["__file", "D:/Hbuilder/Blogger/components/blog-item/blog-item.vue"]]);
wx.createComponent(Component);
