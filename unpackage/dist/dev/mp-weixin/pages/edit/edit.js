"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_tool = require("../../utils/tool.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  _easycom_u_button2();
}
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
if (!Math) {
  _easycom_u_button();
}
const _sfc_main = {
  __name: "edit",
  setup(__props) {
    const db = common_vendor.Ds.database();
    const editorCtx = common_vendor.ref(null);
    function onEditorReady() {
      common_vendor.index.createSelectorQuery().in(this).select(".myEdit").fields(
        {
          size: true,
          context: true
        },
        (res) => {
          editorCtx.value = res.context;
        }
      ).exec();
    }
    const insertDivider = () => {
      editorCtx.value.insertDivider();
    };
    const headshow = common_vendor.ref(false);
    const clickHead = () => {
      headshow.value = !headshow.value;
      editorCtx.value.format("header", headshow.value ? "H2" : false);
    };
    const boldShow = common_vendor.ref(false);
    const clickBold = () => {
      boldShow.value = !boldShow.value;
      editorCtx.value.format("bold");
    };
    const italicShow = common_vendor.ref(false);
    const clickItalic = () => {
      italicShow.value = !italicShow.value;
      editorCtx.value.format("italic");
    };
    const clickInsertImage = () => {
      common_vendor.index.chooseImage({
        success: async (res) => {
          common_vendor.index.showLoading({
            title: "上传中",
            mask: true
          });
          for (let item of res.tempFiles) {
            await common_vendor.Ds.uploadFile({
              filePath: item.path,
              cloudPath: item.name
            }).then((res2) => {
              editorCtx.value.insertImage({
                src: res2.fileID
              });
            });
          }
          common_vendor.index.hideLoading();
        }
      });
    };
    const artObj = common_vendor.ref({
      title: "",
      content: "",
      picurls: "",
      description: "",
      province: ""
    });
    const onSubmit = () => {
      editorCtx.value.getContents({
        success: (res) => {
          artObj.value.description = res.text.slice(0, 80);
          artObj.value.content = res.html;
          artObj.value.picurls = utils_tool.getImgSrc(res.html);
          common_vendor.index.showLoading({
            title: "发布中"
          });
          addData();
        }
      });
    };
    const addData = () => {
      db.collection("quanzi_article").add({ ...artObj.value }).then((res) => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "发布成功"
        });
        setTimeout(() => {
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
          });
        }, 800);
      });
    };
    const getProvinceData = () => {
      utils_tool.getProvince().then((res) => {
        artObj.value.province = res;
      });
    };
    common_vendor.onMounted(() => {
      getProvinceData();
    });
    return (_ctx, _cache) => {
      return {
        a: artObj.value.title,
        b: common_vendor.o(($event) => artObj.value.title = $event.detail.value),
        c: common_vendor.o(onEditorReady),
        d: common_vendor.o((...args) => _ctx.onStatuschange && _ctx.onStatuschange(...args)),
        e: common_vendor.o(onSubmit),
        f: common_vendor.p({
          type: "primary",
          disabled: !artObj.value.title.length
        }),
        g: common_vendor.o(clickHead),
        h: common_vendor.n(headshow.value ? "active" : ""),
        i: common_vendor.o(clickBold),
        j: common_vendor.n(boldShow.value ? "active" : ""),
        k: common_vendor.o(clickItalic),
        l: common_vendor.n(italicShow.value ? "active" : ""),
        m: common_vendor.o(insertDivider),
        n: common_vendor.o(clickInsertImage)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Hbuilder/Blogger/pages/edit/edit.vue"]]);
wx.createPage(MiniProgramPage);
