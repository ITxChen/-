import{$ as e,W as i,x as s,z as o,o as n,c as t,w as a,i as l,f as u,a as p,g as r,F as d,A as c,l as g,B as m,r as h}from"./index-071c8e17.js";import{_ as f}from"./uni-id-pages-agreements.57117dab.js";import{r as y}from"./uni-app.es.af5b3bc2.js";import{_ as b}from"./uni-easyinput.06277378.js";import{_}from"./uni-id-pages-fab-login.d43d6df1.js";import{c as k}from"./store.7e8d93e4.js";import{m as x}from"./login-page.mixin.6cb7caa8.js";import{_ as w}from"./_plugin-vue_export-helper.1b428a4d.js";import"./uni-popup-dialog.47a94e26.js";import"./uni-popup.8c668c17.js";import"./uni-icons.c3f4a5ee.js";const L=w({mixins:[x],data:()=>({type:"",phone:"",focusPhone:!1,logo:"/static/logo.png"}),computed:{loginTypes:async()=>k.loginTypes,isPhone(){return/^1\d{10}$/.test(this.phone)},imgSrc(){return"weixin"==this.type?"/uni_modules/uni-id-pages/static/login/weixin.png":"/uni_modules/uni-id-pages/static/app-plus/apple.png"}},async onLoad(i){let s=i.type||k.loginTypes[0];this.type=s,"univerify"!=s&&(this.focusPhone=!0),this.$nextTick((()=>{["weixin","apple"].includes(s)&&(this.$refs.uniFabLogin.servicesList=this.$refs.uniFabLogin.servicesList.filter((e=>e.id!=s)))})),e("uni-id-pages-setLoginType",(e=>{this.type=e}))},onShow(){document.onkeydown=e=>{var i=e||window.event;i&&13==i.keyCode&&this.toSmsPage()}},onUnload(){i("uni-id-pages-setLoginType")},onReady(){},methods:{showCurrentWebview(){undefined.setStyle({top:0})},quickLogin(e){var i,s;let o={};(null==(i=e.detail)?void 0:i.code)&&(o.phoneNumberCode=e.detail.code),("weixinMobile"!==this.type||(null==(s=e.detail)?void 0:s.code))&&this.$refs.uniFabLogin.login_before(this.type,!0,o)},toSmsPage(){return this.isPhone?this.needAgreements&&!this.agree?this.$refs.agreements.popup(this.toSmsPage):void o({url:"/uni_modules/uni-id-pages/pages/login/login-smscode?phoneNumber="+this.phone}):(this.focusPhone=!0,s({title:"手机号码格式不正确",icon:"none",duration:3e3}))},toPwdLogin(){o({url:"../login/password"})},chooseArea(){s({title:"暂不支持其他国家",icon:"none",duration:3e3})}}},[["render",function(e,i,s,o,k,x){const w=c,L=l,P=g,v=m,j=y(h("uni-id-pages-agreements"),f),C=y(h("uni-easyinput"),b),S=y(h("uni-id-pages-fab-login"),_);return n(),t(L,{class:"uni-content"},{default:a((()=>[u(L,{class:"login-logo"},{default:a((()=>[u(w,{src:k.logo},null,8,["src"])])),_:1}),u(P,{class:"title"},{default:a((()=>[p("请选择登录方式")])),_:1}),["apple","weixin","weixinMobile"].includes(k.type)?(n(),r(d,{key:0},[u(P,{class:"tip"},{default:a((()=>[p("将根据第三方账号服务平台的授权范围获取你的信息")])),_:1}),u(L,{class:"quickLogin"},{default:a((()=>["weixinMobile"!==k.type?(n(),t(w,{key:0,onClick:x.quickLogin,src:x.imgSrc,mode:"widthFix",class:"quickLoginBtn"},null,8,["onClick","src"])):(n(),t(v,{key:1,type:"primary","open-type":"getPhoneNumber",onGetphonenumber:x.quickLogin,class:"uni-btn"},{default:a((()=>[p("微信授权手机号登录")])),_:1},8,["onGetphonenumber"])),u(j,{scope:"register",ref:"agreements"},null,512)])),_:1})],64)):(n(),r(d,{key:1},[u(P,{class:"tip"},{default:a((()=>[p("未注册的账号验证通过后将自动注册")])),_:1}),u(L,{class:"phone-box"},{default:a((()=>[u(L,{onClick:x.chooseArea,class:"area"},{default:a((()=>[p("+86")])),_:1},8,["onClick"]),u(C,{focus:k.focusPhone,onBlur:i[0]||(i[0]=e=>k.focusPhone=!1),class:"input-box",type:"number",inputBorder:!1,modelValue:k.phone,"onUpdate:modelValue":i[1]||(i[1]=e=>k.phone=e),maxlength:"11",placeholder:"请输入手机号"},null,8,["focus","modelValue"])])),_:1}),u(j,{scope:"register",ref:"agreements"},null,512),u(v,{class:"uni-btn",type:"primary",onClick:x.toSmsPage},{default:a((()=>[p("获取验证码")])),_:1},8,["onClick"])],64)),u(S,{ref:"uniFabLogin"},null,512)])),_:1})}],["__scopeId","data-v-effbfe53"]]);export{L as default};
