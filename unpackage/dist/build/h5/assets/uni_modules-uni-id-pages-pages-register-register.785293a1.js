import{D as a,x as e,K as s,z as o,o as t,c as r,w as i,i as l,f as u,a as n,A as m,l as d,r as c,B as p}from"./index-071c8e17.js";import{_ as f}from"./uni-match-media.b6e35257.js";import{r as h}from"./uni-app.es.af5b3bc2.js";import{_ as g}from"./uni-easyinput.06277378.js";import{_ as w}from"./uni-forms-item.43ba2202.js";import{_}from"./uni-captcha.3253655e.js";import{_ as k}from"./uni-id-pages-agreements.57117dab.js";import{_ as b}from"./uni-forms.4269e4f0.js";import{r as V}from"./validator.0d684bfd.js";import{m as D}from"./login-page.mixin.6cb7caa8.js";import"./store.7e8d93e4.js";import{_ as j}from"./_plugin-vue_export-helper.1b428a4d.js";import"./uni-icons.c3f4a5ee.js";import"./uni-popup-dialog.47a94e26.js";import"./uni-popup.8c668c17.js";import"./password.92a4b3ea.js";const x=a.importObject("uni-id-co");const y=j({mixins:[D],data:()=>({formData:{username:"",nickname:"",password:"",password2:"",captcha:""},rules:V,focusUsername:!1,focusNickname:!1,focusPassword:!1,focusPassword2:!1,logo:"/static/logo.png"}),onReady(){this.$refs.form.setRules(this.rules)},onShow(){document.onkeydown=a=>{var e=a||window.event;e&&13==e.keyCode&&this.submit()}},methods:{submit(){this.$refs.form.validate().then((a=>4!=this.formData.captcha.length?(this.$refs.captcha.focusCaptchaInput=!0,e({title:"请输入验证码",icon:"none",duration:3e3})):this.needAgreements&&!this.agree?this.$refs.agreements.popup((()=>{this.submitForm(a)})):void this.submitForm(a))).catch((a=>{let e=a[0].key;e=e.replace(e[0],e[0].toUpperCase()),this["focus"+e]=!0}))},submitForm(a){x.registerUser(this.formData).then((a=>{this.loginSuccess(a)})).catch((a=>{console.log(a.message),this.$refs.captcha.getImageCaptcha()}))},navigateBack(){s()},toLogin(){o({url:"/uni_modules/uni-id-pages/pages/login/login-withpwd"})},registerByEmail(){o({url:"/uni_modules/uni-id-pages/pages/register/register-by-email"})}}},[["render",function(a,e,s,o,V,D){const j=m,x=l,y=d,B=h(c("uni-match-media"),f),v=h(c("uni-easyinput"),g),C=h(c("uni-forms-item"),w),U=h(c("uni-captcha"),_),P=h(c("uni-id-pages-agreements"),k),$=p,F=h(c("uni-forms"),b);return t(),r(x,{class:"uni-content"},{default:i((()=>[u(B,{"min-width":690},{default:i((()=>[u(x,{class:"login-logo"},{default:i((()=>[u(j,{src:V.logo},null,8,["src"])])),_:1}),u(y,{class:"title title-box"},{default:i((()=>[n("用户名密码注册")])),_:1})])),_:1}),u(F,{ref:"form",value:V.formData,rules:V.rules,"validate-trigger":"submit","err-show-type":"toast"},{default:i((()=>[u(C,{name:"username",required:""},{default:i((()=>[u(v,{inputBorder:!1,focus:V.focusUsername,onBlur:e[0]||(e[0]=a=>V.focusUsername=!1),class:"input-box",placeholder:"请输入用户名",modelValue:V.formData.username,"onUpdate:modelValue":e[1]||(e[1]=a=>V.formData.username=a),trim:"both"},null,8,["focus","modelValue"])])),_:1}),u(C,{name:"nickname"},{default:i((()=>[u(v,{inputBorder:!1,focus:V.focusNickname,onBlur:e[2]||(e[2]=a=>V.focusNickname=!1),class:"input-box",placeholder:"请输入用户昵称",modelValue:V.formData.nickname,"onUpdate:modelValue":e[3]||(e[3]=a=>V.formData.nickname=a),trim:"both"},null,8,["focus","modelValue"])])),_:1}),u(C,{name:"password",modelValue:V.formData.password,"onUpdate:modelValue":e[6]||(e[6]=a=>V.formData.password=a),required:""},{default:i((()=>[u(v,{inputBorder:!1,focus:V.focusPassword,onBlur:e[4]||(e[4]=a=>V.focusPassword=!1),class:"input-box",maxlength:"20",placeholder:"请输入"+("weak"==a.config.passwordStrength?"6":"8")+"-16位密码",type:"password",modelValue:V.formData.password,"onUpdate:modelValue":e[5]||(e[5]=a=>V.formData.password=a),trim:"both"},null,8,["focus","placeholder","modelValue"])])),_:1},8,["modelValue"]),u(C,{name:"password2",modelValue:V.formData.password2,"onUpdate:modelValue":e[9]||(e[9]=a=>V.formData.password2=a),required:""},{default:i((()=>[u(v,{inputBorder:!1,focus:V.focusPassword2,onBlur:e[7]||(e[7]=a=>V.focusPassword2=!1),class:"input-box",placeholder:"再次输入密码",maxlength:"20",type:"password",modelValue:V.formData.password2,"onUpdate:modelValue":e[8]||(e[8]=a=>V.formData.password2=a),trim:"both"},null,8,["focus","modelValue"])])),_:1},8,["modelValue"]),u(C,null,{default:i((()=>[u(U,{ref:"captcha",scene:"register",modelValue:V.formData.captcha,"onUpdate:modelValue":e[10]||(e[10]=a=>V.formData.captcha=a)},null,8,["modelValue"])])),_:1}),u(P,{scope:"register",ref:"agreements"},null,512),u($,{class:"uni-btn",type:"primary",onClick:D.submit},{default:i((()=>[n("注册")])),_:1},8,["onClick"]),u($,{onClick:D.navigateBack,class:"register-back"},{default:i((()=>[n("返回")])),_:1},8,["onClick"]),u(B,{"min-width":690},{default:i((()=>[u(x,{class:"link-box"},{default:i((()=>[u(y,{class:"link",onClick:D.registerByEmail},{default:i((()=>[n("邮箱验证码注册")])),_:1},8,["onClick"]),u(y,{class:"link",onClick:D.toLogin},{default:i((()=>[n("已有账号？点此登录")])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1},8,["value","rules"])])),_:1})}],["__scopeId","data-v-7ae85e3a"]]);export{y as default};
