"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uniFeedback_js_sdk_validator_opendbFeedback = require("../../js_sdk/validator/opendb-feedback.js");
const _sfc_main = {
  data() {
    return {
      queryWhere: "",
      loadMore: {
        contentdown: "",
        contentrefresh: "",
        contentnomore: ""
      },
      options: {
        // 将scheme enum 属性静态数据中的value转成text
        ...uni_modules_uniFeedback_js_sdk_validator_opendbFeedback.enumConverter
      }
    };
  },
  onLoad(e) {
    this._id = e.id;
  },
  onReady() {
    if (this._id) {
      this.queryWhere = '_id=="' + this._id + '"';
    }
  },
  methods: {
    handleUpdate() {
      common_vendor.index.navigateTo({
        url: "./edit?id=" + this._id,
        events: {
          // 监听修改页面成功修改数据后, 刷新当前页面数据
          refreshData: () => {
            this.$refs.udb.loadData({
              clear: true
            });
          }
        }
      });
    },
    handleDelete() {
      this.$refs.udb.remove(this._id, {
        success: (res) => {
          common_vendor.index.navigateTo({
            url: "./list"
          });
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _component_uni_file_picker = common_vendor.resolveComponent("uni-file-picker");
  const _component_uni_link = common_vendor.resolveComponent("uni-link");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_easycom_uni_load_more2 + _component_uni_file_picker + _component_uni_link + _easycom_unicloud_db2)();
}
const _easycom_uni_load_more = () => "../../../uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_unicloud_db = () => "../../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_uni_load_more + _easycom_unicloud_db)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.w(({
      data,
      loading,
      error,
      options
    }, s0, i0) => {
      return common_vendor.e({
        a: error
      }, error ? {
        b: common_vendor.t(error.message)
      } : loading ? {
        d: "58556039-1-" + i0 + ",58556039-0",
        e: common_vendor.p({
          contentText: $data.loadMore,
          status: "loading"
        })
      } : data ? {
        g: common_vendor.t(data.content),
        h: common_vendor.f(data.imgs, (file, j, i1) => {
          return common_vendor.e({
            a: file.fileType == "image"
          }, file.fileType == "image" ? {
            b: "58556039-2-" + i0 + "-" + i1 + ",58556039-0",
            c: common_vendor.p({
              value: file,
              ["file-mediatype"]: file.fileType,
              ["return-type"]: "object",
              readonly: true
            })
          } : {
            d: "58556039-3-" + i0 + "-" + i1 + ",58556039-0",
            e: common_vendor.p({
              href: file.url,
              text: file.url
            })
          });
        }),
        i: common_vendor.t(data.contact),
        j: common_vendor.t(data.mobile)
      } : {}, {
        c: loading,
        f: data,
        k: i0,
        l: s0
      });
    }, {
      name: "d",
      path: "a",
      vueId: "58556039-0"
    }),
    b: common_vendor.sr("udb", "58556039-0"),
    c: common_vendor.p({
      options: $data.options,
      collection: "opendb-feedback",
      field: "content,imgs,contact,mobile",
      where: $data.queryWhere,
      getone: true,
      manual: true
    }),
    d: common_vendor.o((...args) => $options.handleUpdate && $options.handleUpdate(...args)),
    e: common_vendor.o((...args) => $options.handleDelete && $options.handleDelete(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Hbuilder/Blogger/uni_modules/uni-feedback/pages/opendb-feedback/detail.vue"]]);
wx.createPage(MiniProgramPage);
