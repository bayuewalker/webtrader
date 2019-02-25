define(["exports","jquery","moment","lodash","../websockets/binary_websockets","../common/rivetsExtra","text!./navigation.html","../workspace/workspace.js","../common/util","css!navigation/navigation.css"],function(e,a,n,t,o,i,l,u){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.init=e.getLandingCompany=void 0;var c=_(a),r=_(n),g=_(t),s=_(o),d=_(i),f=_(l),m=_(u);function _(e){return e&&e.__esModule?e:{default:e}}var h=function(e){var a=e.loginid||e.id;if(e&&a)return{MLT:"Gaming",MF:"Investment",VRTC:"Virtual",REAL:(e.currency||"").toUpperCase()||"Real"}[a=a.match(/^(MLT|MF|VRTC)/i)?a.match(/^(MLT|MF|VRTC)/i)[0]:"REAL"]+" Account"},v=e.getLandingCompany=function(){return s.default.cached.authorize().then(function(e){return Promise.all([s.default.cached.send({landing_company:e.authorize.country}),s.default.cached.send({landing_company_details:e.authorize.landing_company_name})]).then(function(e){var a=e[0],n="virtual"===a.landing_company.virtual_company?a.landing_company.financial_company||{}:e[1].landing_company_details||{},t=a.landing_company.financial_company,o=a.landing_company.gaming_company,i=loginids(),l=local_storage.get("oauth")[0];if(l.is_mlt=/MLT/.test(l.id),o&&t&&"maltainvest"===t.shortcode)return!g.default.some(i,{is_mlt:!0})||!g.default.some(i,{is_mf:!0})&&l.is_mlt?g.default.some(i,{is_mlt:!0})?"upgrade-mf":"upgrade-mlt":"do-nothing";if(t&&"maltainvest"===t.shortcode&&!o)return g.default.some(i,{is_mf:!0})?"do-nothing":"upgrade-mf";if(g.default.some(i,{is_mlt:!0})||g.default.some(i,{is_mx:!0}))return"do-nothing";var u=g.default.filter(i,{is_cr:!0});if(u.length&&n.legal_allowed_currencies){var c=local_storage.get("currencies_config")||{},r=g.default.some(u,{type:"fiat"}),s=g.default.difference(n.legal_allowed_currencies.filter(function(e){return"crypto"===c[e].type}),g.default.filter(u,{type:"crypto"}).map(function(e){return e.currency})),d=s.length&&s.length!==(n.legal_allowed_currencies.filter(function(e){return"crypto"===c[e].type})||[]).length,f=!s.length;return!r&&d||r&&!f?"new-account":"do-nothing"}return"upgrade-mlt"})})},p=e.init=function(e){var a=(0,c.default)(f.default).i18n();(0,c.default)("body").prepend(a),function(e){var a=e.find(".account-menu"),n=e.find("span.time"),t={show_login:!local_storage.get("oauth"),login_disabled:!1,currency:"",logout_disabled:!1,account:{show:!1,type:"",id:"",balance:"",is_virtual:0},show_submenu:!1,show_new_account_link:!1,openRealAccount:function(){var e=getBinaryUrl("new_account/realws");window.open(e,"_blank")},openFinancialAccountMF:function(){var e=getBinaryUrl("new_account/maltainvestws");window.open(e,"_blank")}},o=function(e){(0,c.default)(".webtrader-dialog["+e+"]").each(function(e,a){var n=(0,c.default)(a);n.dialog("close"),n.one("dialogclose",function(){g.default.defer(function(){return n.dialog("instance")&&n.dialog("destroy")&&n.remove()})})})};t.oauth=local_storage.get("oauth")||[],t.oauth=t.oauth.map(function(e){return e.type=h(e),e}),t.showLoginWin=function(){t.login_disabled=!0,require(["oauth/login"],function(e){t.login_disabled=!1,e.init()})},t.toggleVisibility=function(e){t.show_submenu=e},t.logout=function(){s.default.invalidate(),t.logout_disabled=!0},t.switchAccount=function(e){o("data-account-specific=true"),s.default.switch_account(e).catch(function(e){c.default.growl.error({message:e.message}),"SelfExclusion"===e.code&&s.default.invalidate()})},d.default.bind(a,t);var i=function(e){if(!t.currency){if(!local_storage.get("currency"))return;t.currency=local_storage.get("currency")}var a="0";a=e.authorize?e.authorize.balance:e.balance?e.balance.balance:"0",t.account.balance=formatPrice(a,t.currency)};s.default.events.on("balance",i),s.default.events.on("logout",function(){o("data-authorized=true"),o("data-account-specific=true"),t.logout_disabled=!1,t.account.show=!1,t.show_login=!0,t.account.id="",t.account.balance="",t.account.type="",t.currency="",local_storage.remove("currency")}),s.default.events.on("login",function(e){o("data-authorized=true"),t.show_login=!1,t.account.show=!0,t.account.id=e.authorize.loginid,t.account.is_virtual=e.authorize.is_virtual,t.oauth=local_storage.get("oauth")||[],t.oauth=t.oauth.map(function(e){return e.type=h(e),e}),t.account.type=h(e.authorize),t.currency=e.authorize.currency,local_storage.set("currency",t.currency),i(e),e.authorize.is_virtual,v().then(function(e){t.show_financial_link="upgrade-mf"===e,t.show_realaccount_link="upgrade-mlt"===e;var a=loginids();if(t.has_real_account=g.default.some(a,{is_real:!0}),t.has_mf_or_mlt=g.default.some(a,{is_mf:!0})||g.default.some(a,{is_mlt:!0}),t.show_new_account_link="new-account"===e,t.has_disabled_account=g.default.some(a,{is_disabled:!0}),g.default.some(oAuthLoginIds(),{is_disabled:!0})){var n=g.default.filter(a,{is_disabled:!0}).map(function(e){return e.id}).join(",");c.default.growl.error({fixed:!0,message:"<a href='"+getBinaryUrl("contact.html")+"' target='_blank'>\n                "+"Your account (%) is locked, please contact customer support for more info.".i18n().replace("%",n)+"\n               </a>"})}})}),(0,c.default)(".login").on("login-error",function(e){t.show_login=!0}),n.text(r.default.utc().format("YYYY-MM-DD HH:mm:ss")+" GMT"),setInterval(function(){n.text(r.default.utc().format("YYYY-MM-DD HH:mm:ss")+" GMT")},1e3)}(a),function(e){e=e.find("#topbar").addBack("#topbar");var t={lang:{value:"en",name:"English"},confirm:{visible:!1},languages:[{value:"en",name:"English"},{value:"de",name:"Deutsch"},{value:"es",name:"Español"},{value:"fr",name:"Français"},{value:"id",name:"Indonesia"},{value:"it",name:"Italiano"},{value:"pl",name:"Polish"},{value:"pt",name:"Português"},{value:"ru",name:"Русский"},{value:"th",name:"Thai"},{value:"vi",name:"Tiếng Việt"},{value:"zh_cn",name:"简体中文"},{value:"zh_tw",name:"繁體中文"}],onclick:function(e){t.confirm.visible=!1;var a=g.default.find(t.languages,{value:e});a&&t.lang&&a.value==t.lang.value||(local_storage.set("i18n",{value:a.value}),window.location.reload())},toggleVisibility:function(e){t.confirm.visible=e}},a=(local_storage.get("i18n")||{value:"en"}).value;t.lang=g.default.find(t.languages,{value:a});var n=document.getElementById("contact-us"),o=document.getElementById("logo-container");n.href=getBinaryUrl("contact.html"),o.href=getBinaryUrl("home.html"),d.default.bind(e[0],t),s.default.cached.send({website_status:1}).then(function(e){var a=(e.website_status||{}).supported_languages||[];a=g.default.map(a,function(e){return{value:e.toLowerCase()}});var n=g.default.intersectionBy(t.languages,a,"value")||[];t.languages.length=0,n.forEach(function(e){return t.languages.push(e)})}).catch(console.error)}(a),require(["themes/themes"]),(0,c.default)("#nav-menu .resources > ul").menu(),m.default.init((0,c.default)("#nav-menu .workspace")),e&&e((0,c.default)("#nav-menu")),is_beta()&&a.find("a.config").closest("li").show()};e.default={init:p,getLandingCompany:v}});