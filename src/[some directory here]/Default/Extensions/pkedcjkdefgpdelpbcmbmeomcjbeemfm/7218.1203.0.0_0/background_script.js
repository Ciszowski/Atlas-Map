'use strict';fb("mr.TestProvider");var lx,Kw,mx=fb("mr.Init"),nx=function(a){void 0!==a&&mx.info("Using the "+(a?"Views (Harmony)":"WebUI")+" dialog.")};wp().init();lx=new ub("MediaRouter.Provider.WakeDuration");Kw=new Zw;
var ox=(new Promise(function(a,b){switch(window.location.host){case "enhhojjnijigcajfphajepfemndkmdlo":a();break;case "pkedcjkdefgpdelpbcmbmeomcjbeemfm":chrome.management.get("enhhojjnijigcajfphajepfemndkmdlo",function(c){chrome.runtime.lastError||!c.enabled?a():b(Error("Dev extension is enabled"))});break;default:b(Error("Unknown extension id"))}})).then(function(){return chrome.mojoPrivate&&chrome.mojoPrivate.requireAsync?new Promise(function(a){chrome.mojoPrivate.requireAsync("media_router_bindings").then(function(b){mojo=b.getMojoExports&&
b.getMojoExports();b.start().then(function(c){a({mrService:b,mrInstanceId:c.instance_id||c,mrConfig:c.config})})})}):Promise.reject(Error("No mojo service loaded"))}).then(function(a){if(!a.mrService)throw Error("Failed to get MR service");var b=a.mrInstanceId;if(!b)throw Error("Failed to get MR instance ID.");mx.info("MR instance ID: "+b);nx(a.mrConfig.use_views_dialog);var c=a.mrService;if(!Kw)throw Error("providerManager not initialized.");c.setHandlers(Kw);lj(b)&&(lx.f="MediaRouter.Provider.FirstWakeDuration");
chrome.runtime.onSuspend.addListener(lx.b.bind(lx));pj(b);zp();b=Jw();window.addEventListener("unhandledrejection",function(a){a=a.reason;a.stack||(a=Error(a));mx.error("Unhandled promise rejection.",a)});Kw.Za(c,b,a.mrConfig)}).then(void 0,function(a){mx.F(a.message);throw a;});[].concat(m([Iw(),Fw()].concat(m(Mm()),m([tt(),pt()])))).forEach(function(a){jj(a)});Iw().addListener();Fw().addListener();chrome.runtime.onStartup.addListener(function(){});ox.then(void 0,function(){return window.close()});
