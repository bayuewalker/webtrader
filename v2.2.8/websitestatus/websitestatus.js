define(["jquery","../websockets/binary_websockets","../accountstatus/accountstatus"],function(e,t,s){"use strict";var a=u(e),i=u(t),n=u(s);function u(e){return e&&e.__esModule?e:{default:e}}var o=function(e){(0,a.default)(".webtrader-dialog").parent().each(function(){1*(0,a.default)(this).css("top").replace("px","")<=e&&(0,a.default)(this).animate({top:e},300)})},c=function(e){if(e.website_status){if("up"===e.website_status.site_status.toLowerCase()){var t=(0,a.default)("#msg-notification");t.is(":visible")&&!n.default.is_shown()&&t.slideUp(500)&&o(110)}else{var s=(0,a.default)("#msg-notification"),i=(0,a.default)('<div class="error-msg"/>').append(e.website_status.message||"Seems like our servers are down, we are working on fixing it.".i18n());s.html(i)&&s.slideDown(500)&&o(140)}r(e.website_status)}},r=function(e){e.currencies_config&&local_storage.set("currencies_config",e.currencies_config)};i.default.events.on("website_status",c),i.default.cached.send({website_status:1,subscribe:1}).then(c)});