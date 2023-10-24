"use strict";
const common_vendor = require("../common/vendor.js");
function getImgSrc(richtext, num = 3) {
  let imgList = [];
  richtext.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
    imgList.push(capture);
  });
  imgList = imgList.slice(0, num);
  return imgList;
}
function getProvince() {
  return new Promise((resolve, reject) => {
    let historyProvince = common_vendor.index.getStorageSync("historyProvince");
    if (historyProvince) {
      if (Date.now() - historyProvince.time > 1e3 * 60 * 60) {
        getIp().then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      } else {
        resolve(historyProvince.province);
      }
    } else {
      getIp().then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    }
  });
}
function getIp() {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: "https://restapi.amap.com/v3/ip?Key=0c807e057e6b17db95b453dbdd25a825",
      success: (res) => {
        let str = "";
        typeof res.data.province == "string" ? str = res.data.province : str = "火星";
        resolve(str);
        let obj = {
          province: str,
          time: Date.now()
        };
        common_vendor.index.setStorageSync("historyProvince", obj);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
function getName(item) {
  return item.user_id[0].nickname || item.user_id[0].username || item.user_id[0].mobile || "请输入昵称";
}
exports.getImgSrc = getImgSrc;
exports.getName = getName;
exports.getProvince = getProvince;
