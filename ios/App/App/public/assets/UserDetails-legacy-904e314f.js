System.register(["./index-legacy-4ec23ca4.js"],(function(e,l){"use strict";var a,u,n,t,o,d,r,s,c,v,i,m,f,p,_,y,g,k,b,h,V,U,x,E,C;return{setters:[e=>{a=e.i,u=e.B,n=e.r,t=e.k,o=e.W,d=e.o,r=e.c,s=e.w,c=e.u,v=e.a,i=e.E,m=e.a1,f=e.b,p=e.f,_=e.K,y=e.ad,g=e.J,k=e.v,b=e.Q,h=e.e,V=e.x,U=e.g,x=e.t,E=e.O,C=e.P}],execute:function(){const l={key:0,alt:"User photo",src:"https://ionicframework.com/docs/img/demos/avatar.svg"},w=["src"],P={class:"container",style:{"margin-top":"10%"}},S=k("br",null,null,-1),$=k("br",null,null,-1),B=k("p",null,"Your changes have been updated successfully!",-1),N=k("p",null,"There was an error updating your changes. Please try again.",-1);e("default",{__name:"UserDetails",props:{phone:{type:String,required:!0}},setup(e){const j=a("axios"),q=a("serverBaseUrl");u();const D=e,J=n(""),K=n(""),O=n(!1),Q=n(D.phone),T=n(!0),W=n({}),Y=n("");t((()=>{j.get(`vcard/${D.phone}`).then((e=>{W.value=e.data.data,console.log(W.value),T.value=!1,null==W.value.photo_url?Y.value=null:Y.value=`${q}/storage/fotos/${W.value.photo_url}`,J.value=W.value.name,K.value=W.value.email,O.value=!1})).catch((e=>{console.log(e)}))})),n(""),n("");const z=n(!1),A=n(!1),F=n(!1),G=async()=>{if(z.value)try{await j.put(`vcard/${D.phone}`,{name:W.value.name,email:W.value.email}),A.value=!0,J.value=W.value.name,K.value=W.value.email,O.value=!1}catch(e){console.error("Error saving changes:",e),F.value=!0,W.value.name=J.value,W.value.email=K.value}else O.value=z.value;z.value=!z.value},H=()=>{A.value=!1,F.value=!1};return(e,a)=>{const u=o("ion-title"),n=o("ion-toolbar"),t=o("ion-header"),j=o("ion-card-title"),q=o("ion-card-content"),D=o("ion-card"),J=o("ion-modal");return d(),r(c(C),null,{default:s((()=>[v(t,null,{default:s((()=>[v(n,null,{default:s((()=>[v(c(i),{slot:"start"},{default:s((()=>[v(c(m))])),_:1}),v(u,null,{default:s((()=>[f("User details")])),_:1})])),_:1})])),_:1}),v(c(E),{fullscreen:!0,class:"ion-padding"},{default:s((()=>[T.value?(d(),r(c(p),{key:0},{default:s((()=>[v(c(_))])),_:1})):(d(),r(c(y),{key:1},{default:s((()=>[null==Y.value?(d(),g("img",l)):(d(),g("img",{key:1,alt:"User photo",src:Y.value},null,8,w))])),_:1})),k("div",P,[z.value?(d(),r(c(b),{key:1,class:"list-container"},{default:s((()=>[v(c(p),null,{default:s((()=>[v(c(h),{label:"Phone number",modelValue:Q.value,"onUpdate:modelValue":a[3]||(a[3]=e=>Q.value=e),"label-placement":"stacked",readonly:!0},null,8,["modelValue"])])),_:1}),v(c(p),null,{default:s((()=>[v(c(h),{label:"Name",modelValue:W.value.name,"onUpdate:modelValue":a[4]||(a[4]=e=>W.value.name=e),"label-placement":"stacked",readonly:!1},null,8,["modelValue"])])),_:1}),v(c(p),null,{default:s((()=>[v(c(h),{label:"Email",modelValue:W.value.email,"onUpdate:modelValue":a[5]||(a[5]=e=>W.value.email=e),"label-placement":"stacked",readonly:!1},null,8,["modelValue"])])),_:1})])),_:1})):(d(),r(c(b),{key:0,class:"list-container"},{default:s((()=>[z.value?V("",!0):(d(),r(c(p),{key:0},{default:s((()=>[v(c(h),{label:"Phone number",modelValue:Q.value,"onUpdate:modelValue":a[0]||(a[0]=e=>Q.value=e),"label-placement":"stacked",readonly:!0},null,8,["modelValue"])])),_:1})),v(c(p),null,{default:s((()=>[v(c(h),{label:"Name",modelValue:W.value.name,"onUpdate:modelValue":a[1]||(a[1]=e=>W.value.name=e),"label-placement":"stacked",readonly:!0},null,8,["modelValue"])])),_:1}),v(c(p),null,{default:s((()=>[v(c(h),{label:"Email",modelValue:W.value.email,"onUpdate:modelValue":a[2]||(a[2]=e=>W.value.email=e),"label-placement":"stacked",readonly:!0},null,8,["modelValue"])])),_:1})])),_:1})),S,$,v(c(U),{expand:"block",color:z.value?"secondary":"primary",onClick:G},{default:s((()=>[f(x(z.value?"Save":"Edit"),1)])),_:1},8,["color"])]),A.value?(d(),r(J,{key:2,"is-open":A.value},{default:s((()=>[v(c(E),{class:"ion-text-center"},{default:s((()=>[v(D,null,{default:s((()=>[v(q,null,{default:s((()=>[v(j,null,{default:s((()=>[f("Success")])),_:1}),B])),_:1})])),_:1}),v(c(U),{expand:"full",color:"success",onClick:H},{default:s((()=>[f("Close")])),_:1})])),_:1})])),_:1},8,["is-open"])):V("",!0),F.value?(d(),r(J,{key:3,"is-open":F.value},{default:s((()=>[v(c(E),{class:"ion-text-center"},{default:s((()=>[v(D,null,{default:s((()=>[v(q,null,{default:s((()=>[v(j,null,{default:s((()=>[f("Error")])),_:1}),N])),_:1})])),_:1}),v(c(U),{expand:"full",color:"danger",onClick:H},{default:s((()=>[f("Close")])),_:1})])),_:1})])),_:1},8,["is-open"])):V("",!0)])),_:1})])),_:1})}}})}}}));
