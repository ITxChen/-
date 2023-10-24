import{D as e,z as a,Z as o,o as s,c as t,w as r,i,f as l,a as u,A as m,l as d,r as n,B as p}from"./index-071c8e17.js";import{_ as c}from"./uni-match-media.b6e35257.js";import{r as f}from"./uni-app.es.af5b3bc2.js";import{_ as h}from"./uni-easyinput.06277378.js";import{_ as w}from"./uni-forms-item.43ba2202.js";import{_ as g}from"./uni-id-pages-email-form.391b6224.js";import{_}from"./uni-forms.4269e4f0.js";import{_ as b}from"./uni-popup-captcha.d6640cdd.js";import{m as D}from"./login-page.mixin.6cb7caa8.js";import{p as k}from"./password.92a4b3ea.js";import{_ as y}from"./_plugin-vue_export-helper.1b428a4d.js";import"./uni-icons.c3f4a5ee.js";import"./uni-captcha.3253655e.js";import"./uni-popup.8c668c17.js";import"./store.7e8d93e4.js";const j=e.importObject("uni-id-co",{errorOptions:{type:"toast"}});const C=y({mixins:[D],data:()=>({lock:!1,focusEmail:!0,focusPassword:!1,focusPassword2:!1,formData:{email:"",code:"",password:"",password2:"",captcha:""},rules:{email:{rules:[{required:!0,errorMessage:"请输入邮箱"},{format:"email",errorMessage:"邮箱格式不正确"}]},code:{rules:[{required:!0,errorMessage:"请输入邮箱验证码"},{pattern:/^.{6}$/,errorMessage:"请输入6位验证码"}]},...k.getPwdRules()},logo:"/static/logo.png"}),computed:{isEmail(){return/@/.test(this.formData.email)},isPwd(){return/^.{6,20}$/.test(this.formData.password)},isCode(){return/^\d{6}$/.test(this.formData.code)}},onLoad(e){e&&e.emailNumber&&(this.formData.email=e.emailNumber,e.lock&&(this.lock=e.lock,this.focusEmail=!0))},onReady(){this.formData.email&&this.$refs.shortCode.start(),this.$refs.form.setRules(this.rules)},onShow(){document.onkeydown=e=>{var a=e||window.event;a&&13==a.keyCode&&this.submit()}},methods:{submit(){this.$refs.form.validate().then((e=>{let{email:o,password:s,captcha:t,code:r}=this.formData;j.resetPwdByEmail({email:o,code:r,password:s,captcha:t}).then((e=>{a({url:"/uni_modules/uni-id-pages/pages/login/login-withpwd",complete:e=>{}})})).catch((e=>{"uni-id-captcha-required"==e.errCode&&this.$refs.popup.open()})).finally((e=>{this.formData.captcha=""}))})).catch((e=>{let a=e[0].key;if("code"==a)return this.$refs.shortCode.focusSmsCodeInput=!0;a=a.replace(a[0],a[0].toUpperCase()),this["focus"+a]=!0}))},retrieveByPhone(){a({url:"/uni_modules/uni-id-pages/pages/retrieve/retrieve"})},backLogin(){o({url:"/uni_modules/uni-id-pages/pages/login/login-withpwd"})}}},[["render",function(e,a,o,D,k,y){const j=m,C=i,V=d,v=f(n("uni-match-media"),c),x=f(n("uni-easyinput"),h),B=f(n("uni-forms-item"),w),P=f(n("uni-id-pages-email-form"),g),$=p,E=f(n("uni-forms"),_),U=f(n("uni-popup-captcha"),b);return s(),t(C,{class:"uni-content"},{default:r((()=>[l(v,{"min-width":690},{default:r((()=>[l(C,{class:"login-logo"},{default:r((()=>[l(j,{src:k.logo},null,8,["src"])])),_:1}),l(V,{class:"title title-box"},{default:r((()=>[u("通过邮箱验证码找回密码")])),_:1})])),_:1}),l(E,{ref:"form",value:k.formData,"err-show-type":"toast"},{default:r((()=>[l(B,{name:"email"},{default:r((()=>[l(x,{focus:k.focusEmail,onBlur:a[0]||(a[0]=e=>k.focusEmail=!1),class:"input-box",disabled:k.lock,inputBorder:!1,modelValue:k.formData.email,"onUpdate:modelValue":a[1]||(a[1]=e=>k.formData.email=e),placeholder:"请输入邮箱"},null,8,["focus","disabled","modelValue"])])),_:1}),l(B,{name:"code"},{default:r((()=>[l(P,{ref:"shortCode",email:k.formData.email,type:"reset-pwd-by-email",modelValue:k.formData.code,"onUpdate:modelValue":a[2]||(a[2]=e=>k.formData.code=e)},null,8,["email","modelValue"])])),_:1}),l(B,{name:"password"},{default:r((()=>[l(x,{focus:k.focusPassword,onBlur:a[3]||(a[3]=e=>k.focusPassword=!1),class:"input-box",type:"password",inputBorder:!1,modelValue:k.formData.password,"onUpdate:modelValue":a[4]||(a[4]=e=>k.formData.password=e),placeholder:"请输入新密码"},null,8,["focus","modelValue"])])),_:1}),l(B,{name:"password2"},{default:r((()=>[l(x,{focus:k.focusPassword2,onBlur:a[5]||(a[5]=e=>k.focusPassword2=!1),class:"input-box",type:"password",inputBorder:!1,modelValue:k.formData.password2,"onUpdate:modelValue":a[6]||(a[6]=e=>k.formData.password2=e),placeholder:"请再次输入新密码"},null,8,["focus","modelValue"])])),_:1}),l($,{class:"uni-btn send-btn-box",type:"primary",onClick:y.submit},{default:r((()=>[u("提交")])),_:1},8,["onClick"]),l(v,{"min-width":690},{default:r((()=>[l(C,{class:"link-box"},{default:r((()=>[l(V,{class:"link",onClick:y.retrieveByPhone},{default:r((()=>[u("通过手机验证码找回密码")])),_:1},8,["onClick"]),l(C),l(V,{class:"link",onClick:y.backLogin},{default:r((()=>[u("返回登录")])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1},8,["value"]),l(U,{onConfirm:y.submit,modelValue:k.formData.captcha,"onUpdate:modelValue":a[7]||(a[7]=e=>k.formData.captcha=e),scene:"reset-pwd-by-sms",ref:"popup"},null,8,["onConfirm","modelValue"])])),_:1})}],["__scopeId","data-v-b2bc532c"]]);export{C as default};