import{D as o,x as s,o as e,c as t,w as n,i,f as a,a as p,A as r,l as u,r as c,B as l}from"./index-071c8e17.js";import{_ as m}from"./uni-id-pages-sms-form.c2c57a94.js";import{r as d}from"./uni-app.es.af5b3bc2.js";import{_ as h}from"./uni-forms.4269e4f0.js";import{_ as f}from"./uni-popup-captcha.d6640cdd.js";import{m as g}from"./login-page.mixin.6cb7caa8.js";import{_}from"./_plugin-vue_export-helper.1b428a4d.js";import"./uni-captcha.3253655e.js";import"./uni-icons.c3f4a5ee.js";import"./uni-easyinput.06277378.js";import"./uni-popup.8c668c17.js";import"./store.7e8d93e4.js";const j=_({mixins:[g],data:()=>({code:"",phone:"",captcha:"",logo:"/static/logo.png"}),computed:{tipText(){return"验证码已通过短信发送至"+this.phone}},onLoad({phoneNumber:o}){this.phone=o},onShow(){document.onkeydown=o=>{var s=o||window.event;s&&13==s.keyCode&&this.submit()}},methods:{submit(){const e=o.importObject("uni-id-co",{errorOptions:{type:"toast"}});if(6!=this.code.length)return this.$refs.smsCode.focusSmsCodeInput=!0,s({title:"验证码不能为空",icon:"none",duration:3e3});e.loginBySms({mobile:this.phone,code:this.code,captcha:this.captcha}).then((o=>{this.loginSuccess(o)})).catch((o=>{"uni-id-captcha-required"==o.errCode?this.$refs.popup.open():console.log(o.errMsg)})).finally((o=>{this.captcha=""}))}}},[["render",function(o,s,g,_,j,b){const y=r,C=i,x=u,V=d(c("uni-id-pages-sms-form"),m),w=l,k=d(c("uni-forms"),h),v=d(c("uni-popup-captcha"),f);return e(),t(C,{class:"uni-content"},{default:n((()=>[a(C,{class:"login-logo"},{default:n((()=>[a(y,{src:j.logo},null,8,["src"])])),_:1}),a(x,{class:"title"},{default:n((()=>[p("请输入验证码")])),_:1}),a(x,{class:"tip"},{default:n((()=>[p("先输入图形验证码，再获取短信验证码")])),_:1}),a(k,null,{default:n((()=>[a(V,{focusCaptchaInput:"",modelValue:j.code,"onUpdate:modelValue":s[0]||(s[0]=o=>j.code=o),type:"login-by-sms",ref:"smsCode",phone:j.phone},null,8,["modelValue","phone"]),a(w,{class:"uni-btn send-btn",type:"primary",onClick:b.submit},{default:n((()=>[p("登录")])),_:1},8,["onClick"])])),_:1}),a(v,{onConfirm:b.submit,modelValue:j.captcha,"onUpdate:modelValue":s[1]||(s[1]=o=>j.captcha=o),scene:"login-by-sms",ref:"popup"},null,8,["onConfirm","modelValue"])])),_:1})}],["__scopeId","data-v-93225fe2"]]);export{j as default};
