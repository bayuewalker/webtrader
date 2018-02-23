define(["exports","babel-runtime/regenerator","lodash","jquery","moment","windows/windows","common/rivetsExtra","websockets/binary_websockets","charts/chartingRequestMap","text!trade/tradeDialog.html","help/help","css!trade/tradeDialog.css","timepicker","jquery-ui","common/util"],function(a,b,c,d,e,f,g,h,i,j,k){"use strict";function l(a){return a&&a.__esModule?a:{"default":a}}function m(a){return function(){var b=a.apply(this,arguments);return new Promise(function(a,c){function d(e,f){try{var g=b[e](f),h=g.value}catch(i){return void c(i)}return g.done?void a(h):Promise.resolve(h).then(function(a){d("next",a)},function(a){d("throw",a)})}return d("next")})}}function n(a){return u["default"](a).filter({contract_category:"callput",barrier_category:"euro_atm",barriers:0,sentiment:"up"}).each(E("contract_display","rise")),u["default"](a).filter({contract_category:"callput",barrier_category:"euro_atm",barriers:0,sentiment:"down"}).each(E("contract_display","fall")),u["default"](a).filter(["contract_category","endsinout"]).each(E("contract_category_display","In/Out")),u["default"](a).filter(["contract_category","staysinout"]).each(E("contract_category_display","In/Out")),u["default"](a).filter(["contract_category","digits"]).each(E("barriers",0)),u["default"](a).filter({contract_type:"EXPIRYMISS"}).each(E("contract_display","ends outside")),u["default"](a).filter({contract_type:"EXPIRYRANGE"}).each(E("contract_display","ends between")),u["default"](a).filter({contract_type:"RANGE"}).each(E("contract_display","stays between")),u["default"](a).filter({contract_type:"UPORDOWN"}).each(E("contract_display","goes outside")),u["default"](a).filter({contract_type:"ONETOUCH"}).each(E("contract_display","touch")),u["default"](a).filter({contract_type:"NOTOUCH"}).each(E("contract_display","no touch")),a=u["default"].sortBy(a,function(a){var b=u["default"].find({"Up/Down":1,"Touch/No Touch":2,"In/Out":3,Digits:4,Asians:5,Spreads:6},function(b,c){return c.i18n()==a.contract_category_display||c==a.contract_category_display?b:void 0});return 4===b&&(b={odd:4,even:4.5}[a.contract_display]||3.5),b})}function o(a,b){return z["default"].cached.send({trading_times:a}).then(function(a){var c={open:"--",close:"--"};return a.trading_times.markets.forEach(function(a){a.submarkets.forEach(function(a){a.symbols.forEach(function(a){a.symbol===b&&(c={open:a.times.open[0],close:a.times.close[0]})})})}),c})["catch"](function(a){return{open:"--",close:"--"}})}function p(a){return{name:a.template.name,categories_value:a.categories.value,categoriy_displays_selected:a.category_displays.selected,date_start_value:a.date_start.value,digits_value:a.digits.value,duration_value:a.duration.value,duration_count_value:a.duration_count.value,duration_unit_value:a.duration_unit.value,expiry_value_hour:a.date_expiry.value_hour,expiry_value_date:a.date_expiry.value_date,expiry_value:a.date_expiry.value,barriers_barrier_count:a.barriers.barrier_count,barriers_barrier:a.barriers.barrier,barriers_high_barrier:a.barriers.high_barrier,barriers_low_barrier:a.barriers.low_barrier,basis_value:a.basis.value,currency_value:a.currency.value,basis_amount:a.basis.amount,spreads_amount_per_point:a.spreads.amount_per_point,spreads_stop_type:a.spreads.stop_type,spreads_stop_loss:a.spreads.stop_loss,spreads_stop_profit:a.spreads.stop_profit}}function q(a,b){a.template.name=b.name;var c=function(a){v["default"].growl.warning({message:a||"Template applied partially.".i18n()})};return u["default"].find(a.categories.array,b.categories_value)?(a.categories.selected=b.categories_value.contract_category,void u["default"].defer(function(){return u["default"].find(a.category_displays.array,function(a){return a.name===b.categoriy_displays_selected.name&&a.sentiment===b.categoriy_displays_selected.sentiment})?(a.category_displays.selected=b.categoriy_displays_selected,void u["default"].defer(function(){a.date_start.visible&&u["default"].defer(function(){a.date_start.value="now"!==b.date_start_value&&u["default"].some(a.date_start.array,{value:1*b.date_start_value})?1*b.date_start_value:"now"}),a.digits.visible&&(a.digits.value=b.digits_value),"spreads"!==a.categories.value.contract_category&&(a.duration.value=b.duration_value,"Duration"===a.duration.value&&u["default"].defer(function(){a.duration_unit.value=b.duration_unit_value,u["default"].defer(function(){a.duration_count.value=b.duration_count_value})}),"End Time"===a.duration.value&&u["default"].defer(function(){a.date_expiry.value_date=b.expiry_value_date;var c=!w["default"].utc(a.date_expiry.value_date).isAfter(w["default"].utc(),"day");c&&u["default"].defer(function(){a.date_expiry.value_hour=b.expiry_value_hour})})),a.barriers.barrier_count=b.barriers_barrier_count,1===a.barriers.barrier_count&&u["default"].defer(function(){a.barriers.barrier=b.barriers_barrier}),2===a.barriers.barrier_count&&u["default"].defer(function(){a.barriers.high_barrier=b.barriers_high_barrier,a.barriers.low_barrier=b.barriers_low_barrier}),"spreads"!==a.categories.value.contract_category&&u["default"].defer(function(){a.basis.value=b.basis_value,a.currency.value=b.currency_value,a.basis.amount=b.basis_amount}),"spreads"===a.categories.value.contract_category&&(a.currency.value=b.currency_value,a.spreads.amount_per_point=b.spreads_amount_per_point,a.spreads.stop_type=b.spreads_stop_type,a.spreads.stop_loss=b.spreads_stop_loss,a.spreads.stop_profit=b.spreads_stop_profit)})):void c()})):void v["default"].growl.error({message:"Template is not applicable.".i18n()})}function r(a,b,c,d,e){var f={duration:{array:["Duration","End Time"],value:"Duration"},duration_unit:{array:[""],ranges:[{min:1,max:365}],value:""},duration_count:{value:1,min:1,max:365},date_start:{value:"now",array:[{text:"Now",value:"now"}],visible:!1},date_expiry:{value_date:w["default"].utc().format("YYYY-MM-DD"),value_hour:w["default"].utc().format("HH:mm"),value:0,today_times:{open:"--",close:"--",disabled:!1},onHourShow:function(a){var b=f.date_expiry.today_times;if("--"===b.open)return!0;var c=w["default"].utc(),d=w["default"](b.close,"HH:mm:ss").hour(),e=w["default"](b.open,"HH:mm:ss").hour();return c.hour()>=e&&c.hour()<=d&&(e=c.hour()),a>=e&&d>=a||d>=a&&e>=d||a>=e&&e>=d},onMinuteShow:function(a,b){var c=f.date_expiry.today_times;if("--"===c.open)return!0;var d=w["default"].utc(),e=w["default"](c.close,"HH:mm:ss").hour(),g=w["default"](c.close,"HH:mm:ss").minute(),h=w["default"](c.open,"HH:mm:ss").hour(),i=w["default"](c.open,"HH:mm:ss").minute();return d.hour()>=h&&d.hour()<=e&&(h=d.hour(),i=d.minute()),h===a?b>=i:e===a?g>=b:a>h&&e>a||e>a||a>h}},categories:{array:[],value:"",paddingTop:function(){var a={asian:"26px",callput:"8px",digits:"14px",endsinout:"4px",staysinout:"4px",touchnotouch:"12px",spreads:"5px"};return a[f.categories.value.contract_category]||"3px"}},category_displays:{array:[],selected:""},barriers:{barrier_count:0,barrier:"",perv_barrier:"",was_perv_barrier_daily:!1,high_barrier:"",perv_high_barrier:"",was_perv_high_barrier_daily:!1,low_barrier:"",perv_low_barrier:"",was_perv_low_barrier_daily:!1,barrier_live:function(){return 1*this.barrier+1*f.tick.quote},high_barrier_live:function(){return 1*this.high_barrier+1*f.tick.quote},low_barrier_live:function(){return 1*this.low_barrier+1*f.tick.quote}},digits:{array:["0","1","2","3","4","5","6","7","8","9"],value:"0",visible:!1,text:"Last Digit Prediction".i18n()},currency:{array:["USD"],value:"USD",decimal:currencyFractionalDigits()},basis:{array:["Payout","Stake"],value:"payout",amount:8===currencyFractionalDigits()?.1:10,limit:null},spreads:{amount_per_point:1,stop_type:"point",stop_loss:(u["default"].find(a,"stop_loss")||{stop_loss:10}).stop_loss,stop_profit:(u["default"].find(a,"stop_profit")||{stop_profit:10}).stop_profit,spread:0,spot:"0.0",spot_time:"0",deposit_:function(){return"point"===this.stop_type?this.stop_loss*this.amount_per_point:this.stop_loss}},tick:{epoch:"0",quote:e,perv_quote:"0",down:function(){var a=1*this.quote<1*this.perv_quote;return a}},ticks:{array:[],loading:!0},proposal:{symbol:d.symbol,symbol_name:d.display_name,last_promise:null,id:"",ask_price:"0.0",date_start:0,display_value:"0.0",message:"Loading ...".i18n(),payout:0,spot:"0.0",spot_time:"0",error:"",loading:!0,netprofit_:function(){return formatPrice(this.payout-this.ask_price||0,f.currency.value)},payout_:function(){return formatPrice(+this.payout||0,f.currency.value)}},purchase:{loading:!1},tooltips:{barrier:{my:"left-215 top+10",at:"left bottom",collision:"flipfit"},barrier_p:{my:"left-5 top+10",at:"left bottom",collision:"flipfit"}},template:{name:"",visible:!1},openHelp:function(){v["default"].growl.notice({message:"Loading help text for ".i18n()+f.categories.value.contract_category_display}),C["default"].showSpecificContent(f.categories.value.contract_category_display)}},g=function(){z["default"].is_authenticated()&&z["default"].send({payout_currencies:1}).then(function(a){f.currency.value=a.payout_currencies[0],f.currency.array=a.payout_currencies})["catch"](function(a){})};f.template.hide=function(a){0===v["default"](a.target).closest(".trade-template-manager").length&&(f.template.visible=!1)},f.template.toggle=function(){f.template.visible=!f.template.visible},f.barriers.root=f,f.date_expiry.update_times=function(){o(f.date_expiry.value_date,f.proposal.symbol).then(function(a){var b=f.date_expiry;b.today_times.open=a.open,b.today_times.close=a.close;var c=u["default"](f.duration_unit.ranges).filter(["type","minutes"]).head();b.today_times.disabled=!c;var d=c?w["default"].utc().add(c.min+1,"m").format("HH:mm"):"00:00";b.value_hour=d>b.value_hour?d:b.value_hour})},f.categories.update=function(){f.categories.value=u["default"].find(f.categories.array,{contract_category:f.categories.selected});var b=f.categories.value.contract_category,c=function(a){return-1!==["staysinout","endsinout"].indexOf(a)},d=c(b)?function(a){return c(a.contract_category)}:function(a){return a.contract_category==b};f.category_displays.array=[],u["default"](a).filter(d).map("contract_display").uniq().value().forEach(function(b){var c={};c.name=b;var d=u["default"].find(a,{contract_display:b});d&&(c.sentiment=d.sentiment),f.category_displays.array.push(c)}),f.category_displays.selected=u["default"].head(f.category_displays.array)},f.category_displays.onclick=function(a){f.category_displays.selected={},f.category_displays.selected.name=v["default"](a.target).attr("data-name"),f.category_displays.selected.sentiment=v["default"](a.target).attr("data-sentiment")},f.date_start.update=function(){var b=u["default"](a).filter({contract_category_display:f.categories.value.contract_category_display,contract_display:f.category_displays.selected.name,start_type:"forward"}).head(),c=u["default"](a).filter({contract_category_display:f.categories.value.contract_category_display,contract_display:f.category_displays.selected.name,start_type:"spot"}).head();if(!b)return void u["default"].assign(f.date_start,{visible:!1,array:[],value:"now"});b=b.forward_starting_options;var d=(f.date_start,[]);c&&(d=[{text:"Now",value:"now"}]);for(var e=((new Date).getTime()+3e5)/1e3,g=0;g<b.length;g++)for(var h=b[g],i=300,j=Math.ceil(Math.max(e,h.open)/i)*i,k=j;k<h.close;k+=i){var l=new Date(1e3*k),m=("00"+l.getUTCHours()).slice(-2)+":"+("00"+l.getUTCMinutes()).slice(-2)+" "+["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][l.getUTCDay()];d.push({text:m,value:k})}var n={value:d[0].value,array:d,visible:!0};u["default"].some(d,{value:1*f.date_start.value})&&(n.value=f.date_start.value),u["default"].assign(f.date_start,n)},f.date_expiry.update=function(a){var b=f.date_expiry,c=!w["default"].utc(b.value_date).isAfter(w["default"].utc(),"day");c?(a!==b.value_hour&&b.update_times(),b.value=w["default"].utc(b.value_date+" "+b.value_hour).unix(),f.barriers.update(),F(b.value,f.proposal.onchange)):(b.today_times.disabled=!0,o(b.value_date,f.proposal.symbol).then(function(a){var c="--"!==a.close?a.close:"00:00:00";b.value_hour=w["default"](c,"HH:mm:ss").format("HH:mm"),b.value=w["default"].utc(b.value_date+" "+c).unix(),f.barriers.update(),F(b.value,f.proposal.onchange)}))},f.duration.update=function(){var a=f.categories.value.contract_category;u["default"](["callput","endsinout","staysinout","touchnotouch"]).includes(a)?2!==f.duration.array.length&&(f.duration.array=["Duration","End Time"]):(f.duration.value="Duration",1!==f.duration.array.length&&(f.duration.array=["Duration"]))},f.duration_unit.update=function(){var b="now"!==f.date_start.value?"forward":"spot",c=u["default"](a).filter({contract_category_display:f.categories.value.contract_category_display,contract_display:f.category_displays.selected.name,start_type:b}).map(function(a){return{min:a.min_contract_duration+"",max:a.max_contract_duration+"",type:a.expiry_type}}).value(),d=[],e=[];u["default"].each(c,function(a){if(u["default"](["tick","daily"]).includes(a.type))return d.push({tick:"ticks",daily:"days"}[a.type]),void e.push({min:0|a.min.replace("d","").replace("t",""),max:0|a.max.replace("d","").replace("t",""),type:{tick:"ticks",daily:"days"}[a.type]});var b=a.min.replace("s","").replace("m","").replace("h",""),c=a.max.replace("s","").replace("m","").replace("h","").replace("d",""),f=u["default"](a.min).last(),g=u["default"](a.max).last();b*={s:1,m:60,h:3600}[f],c*={s:1,m:60,h:3600,d:86400}[g],"s"===f&&(d.push("seconds"),e.push({min:b,max:c,type:"seconds"})),u["default"](["s","m"]).includes(f)&&c>=60&&(d.push("minutes"),e.push({min:Math.max(b/60,1),max:c/60,type:"minutes"})),u["default"](["s","m","h"]).includes(f)&&c>=3600&&(d.push("hours"),e.push({min:Math.max(b/3600,1),max:c/3600,type:"hours"}))});var g={ticks:0,seconds:1,minutes:2,hours:3,days:4};return d.sort(function(a,b){return g[a]-g[b]}),e.sort(function(a,b){return g[a.type]-g[b.type]}),d.length?(f.duration_unit.ranges=e,u["default"].includes(d,f.duration_unit.value)?f.duration_count.update(!0):f.duration_unit.value=u["default"].head(d),f.duration_unit.array=d,f.barriers.update(),void f.date_expiry.update_times()):void f.barriers.update()},f.duration_count.update=function(a){var b=u["default"](f.duration_unit.ranges).filter({type:f.duration_unit.value}).head();b&&(f.duration_count.min=b.min,f.duration_count.max=b.max,a!==!0?f.duration_count.value=b.min:(f.duration_count.value<b.min||f.duration_count.value>b.max)&&(f.duration_count.value=b.min))},f.digits.update=function(){var a=f.category_displays.selected.sentiment;if("digits"!==f.categories.value.contract_category||"odd"===a||"even"===a)return void(f.digits.visible=!1);var b={match:["0","1","2","3","4","5","6","7","8","9"],differ:["0","1","2","3","4","5","6","7","8","9"],under:["1","2","3","4","5","6","7","8","9"],over:["0","1","2","3","4","5","6","7","8"]}[a],c={match:"Last Digit Prediction".i18n(),differ:"Last Digit Prediction".i18n(),under:"Last Digit is Under".i18n(),over:"Last Digit is Over".i18n()}[a];u["default"].includes(b,f.digits.value)||(f.digits.value=b[0]),f.digits.array=b,f.digits.text=c,f.digits.visible=!0},f.barriers.update=function(){var b=f.duration_unit.value,c=u["default"](["seconds","minutes","hours"]).includes(b)?"intraday":"days"===b?"daily":"tick",d=u["default"](a).filter({contract_category_display:f.categories.value.contract_category_display,contract_display:f.category_displays.selected.name,expiry_type:c}).filter(function(a){return a.barriers>=1}).head();if(f.barriers.barrier_count=d?d.barriers:0,d){var e=function(a,b,d,e,g){var h="daily"===c&&"End Time"!==f.duration.value||"End Time"===f.duration.value&&w["default"].utc(f.date_expiry.value_date).isAfter(w["default"].utc(),"day");if(h)e&&(b=a),a=(e?a:0)||d,e=!0;else{var i=(1*d>=0?g:"")+1*d;e&&/^[+-]/.test(b)?a=b:/^[+-]/.test(a)||(a=i),b=a,e=!1}return{barrier:a,perv_barrier:b,was_perv_barrier_daily:e}};if(d.barrier){var g=e(f.barriers.barrier,f.barriers.perv_barrier,d.barrier,f.barriers.was_perv_barrier_daily,"+");f.barriers.barrier=g.barrier,f.barriers.perv_barrier=g.perv_barrier,f.barriers.was_perv_barrier_daily=g.was_perv_barrier_daily}if(d.high_barrier){var g=e(f.barriers.high_barrier,f.barriers.perv_high_barrier,d.high_barrier,f.barriers.was_perv_high_barrier_daily,"+");f.barriers.high_barrier=g.barrier,f.barriers.perv_high_barrier=g.perv_barrier,f.barriers.was_perv_high_barrier_daily=g.was_perv_barrier_daily}if(d.low_barrier){var g=e(f.barriers.low_barrier,f.barriers.perv_low_barrier,d.low_barrier,f.barriers.was_perv_low_barrier_daily,"-");f.barriers.low_barrier=g.barrier,f.barriers.perv_low_barrier=g.perv_barrier,f.barriers.was_perv_low_barrier_daily=g.was_perv_barrier_daily}}},f.basis.update_limit=function(){var b=f.basis,c=u["default"](a).filter({contract_category_display:f.categories.value.contract_category_display,contract_display:f.category_displays.selected.name}).head();c=c&&c.payout_limit||null,b.limit=c?1*c:null,b.limit&&(b.amount=Math.min(b.amount,b.limit))},f.proposal.onchange=function(){var b=f.duration_unit.value,d=u["default"](["seconds","minutes","hours"]).includes(b)?"intraday":"days"===b?"daily":"tick";"spreads"===f.categories.value.contract_category&&(d="intraday");var e=u["default"](a).filter({contract_category_display:f.categories.value.contract_category_display,contract_display:f.category_displays.selected.name,expiry_type:d}).head(),g={proposal:1,subscribe:1,contract_type:e.contract_type,currency:f.currency.value,symbol:f.proposal.symbol};if("spreads"!==f.categories.value.contract_category?(g.amount=1*f.basis.amount,g.basis=f.basis.value):(g.amount_per_point=f.spreads.amount_per_point,g.stop_type=f.spreads.stop_type,g.stop_loss=f.spreads.stop_loss,g.stop_profit=f.spreads.stop_profit),1==f.barriers.barrier_count&&(g.barrier=f.barriers.barrier),2==f.barriers.barrier_count&&(g.barrier=f.barriers.high_barrier,g.barrier2=f.barriers.low_barrier+""),"digits"===f.categories.value.contract_category&&(g.barrier=f.digits.value+""),"now"!==f.date_start.value&&(g.date_start=1*f.date_start.value),"Duration"===f.duration.value){if(g.duration_unit=u["default"](f.duration_unit.value).head(),f.duration_count.value<1)return void(f.duration_count.value=1);g.duration=1*f.duration_count.value}else g.date_expiry=f.date_expiry.value;f.proposal.loading=!0,f.proposal.last_promise&&f.proposal.last_promise.then(function(a){var b=a&&a.proposal&&a.proposal.id;b&&z["default"].send({forget:b})});var h=z["default"].send(g).then(function(a){if(h===f.proposal.last_promise){var b=a.proposal&&a.proposal.id;f.proposal.error="",f.proposal.id=b}return a})["catch"](function(a){return f.proposal.error=a.message,f.proposal.message="",f.proposal.loading=!1,a});f.proposal.last_promise=h,f.proposal.id="",c.update_track(c.get_template())},f.purchase.onclick=m(t["default"].mark(function i(){var a,c,e,g,h,j,k;return t["default"].wrap(function(i){for(;;)switch(i.prev=i.next){case 0:if(f.purchase.loading=!0,a=function(a){a.appendTo(b),b.find(".trade-fields").css({left:"400px"}),b.find(".trade-conf").css({left:"0"})},c=function(a){b.find(".trade-fields").css({left:"0"}),b.find(".trade-conf").css({left:"-400px"}),f.purchase.loading=!1,a.remove(),f.proposal.onchange()},e={currency:f.currency.value,symbol:f.proposal.symbol,symbol_name:f.proposal.symbol_name,category:f.categories.value,category_display:f.category_displays.selected,duration_unit:f.duration_unit.value,pip:d.pip},e.show_tick_chart=!1,u["default"](["digits","callput","asian"]).includes(e.category.contract_category)&&"Duration"===f.duration.value&&"ticks"===e.duration_unit&&(e.digits_value=f.digits.value,e.tick_count=1*f.duration_count.value,"digits"!==e.category.contract_category&&("asian"!==e.category.contract_category&&(e.tick_count+=1),"callput"!==e.category.contract_category||u["default"](["rise","fall"]).includes(e.category_display.name)||(e.barrier=f.barriers.barrier),e.show_tick_chart=!0)),z["default"].is_authenticated()){i.next=10;break}return v["default"].growl.warning({message:"Please log in".i18n()}),f.purchase.loading=!1,i.abrupt("return");case 10:return i.prev=10,i.next=13,require(["trade/tradeConf"]);case 13:return g=i.sent,h=D(g,1),j=h[0],i.next=18,z["default"].send({buy:f.proposal.id,price:1*f.proposal.ask_price});case 18:k=i.sent,e.contract_id=k.buy.contract_id,e.transaction_id=k.buy.transaction_id,(e.show_tick_chart||"digits"===e.category.contract_category)&&z["default"].proposal_open_contract.subscribe(e.contract_id),j.init(k,e,a,c,d),i.next=31;break;case 25:i.prev=25,i.t0=i["catch"](10),f.purchase.loading=!1,v["default"].growl.error({message:i.t0.message}),"InvalidToken"===i.t0.code?z["default"].invalidate():f.proposal.onchange();case 31:case"end":return i.stop()}},i,this,[[10,25]])})),u["default"](a).map("contract_category_display").uniq().value().filter(function(a){return"Lookbacks"!==a}).forEach(function(b){var c={};c.contract_category_display=b;var d=u["default"].find(a,{contract_category_display:b});d&&(c.contract_category=d.contract_category,f.categories.array.push(c))}),f.categories.value=u["default"](f.categories.array).head(),f.categories.selected=f.categories.value.contract_category;var h=!1;return z["default"].events.on("tick",function(a){a.tick&&a.tick.symbol==f.proposal.symbol&&(h=!0,f.tick.perv_quote=f.tick.quote,f.tick.epoch=a.tick.epoch,f.tick.quote=a.tick.quote,f.ticks.loading=!1,f.ticks.array.length>25&&f.ticks.array.shift(),f.ticks.array.push(a.tick))}),z["default"].events.on("proposal",function(a){u["default"].defer(function(){if(a.proposal&&a.proposal.id===f.proposal.id){if(a.error)return f.proposal.error=a.error.message,void(f.proposal.message="");if(!f.purchase.loading){var b=a.proposal;f.proposal.ask_price=b.ask_price,f.proposal.date_start=b.date_start,f.proposal.display_value=b.display_value,f.proposal.message=b.longcode,f.proposal.payout=b.payout,f.proposal.spot=b.spot,f.proposal.spot_time=b.spot_time,f.spreads.spread=b.spread||0,f.spreads.spot=b.spot||"0.0",f.spreads.spot_time=b.spot_time||"0",f.proposal.loading=!1,!h&&b.spot&&(f.tick.epoch=b.spot_time,f.tick.quote=b.spot)}}})}),z["default"].events.on("set_account_currency",g),g(),f}function s(a,b,c,d){var e=v["default"](B["default"]).i18n(),f=n(b.available),g=x["default"].createBlankWindow(e,{title:a.display_name,resizable:!1,collapsable:!1,minimizable:!0,maximizable:!1,width:400,"data-authorized":"true",isTrackerInitiated:d,relativePosition:!0,close:function(){k.proposal.last_promise&&k.proposal.last_promise.then(function(a){var b=a.proposal&&a.proposal.id;b&&z["default"].send({forget:b})}),A["default"].unregister(i),l.unbind(),g.destroy()}}),h=g.track({module_id:"tradeDialog",is_unique:!1,data:{symbol:a,template:c||{}}}),i=A["default"].keyFor(a.symbol,0),j=u["default"](f).map("min_contract_duration").some(function(a){return/^\d+$/.test(a)||"t"===u["default"].last(a)});A["default"][i]?A["default"].subscribe(i):A["default"].register({symbol:a.symbol,subscribe:1,granularity:0,style:"ticks"})["catch"](function(a){j&&(v["default"].growl.error({message:a.message}),u["default"].delay(function(){g.dialog("close")},2e3))});var k=r(f,e,g,a,b.spot);j||(k.ticks.loading=!1);var l=y["default"].bind(e[0],k);return k.categories.update(),g.dialog("open"),g.update_track=function(b){h({symbol:a,template:b})},g.get_template=p.bind(void 0,k),g.set_template=q.bind(void 0,k),c&&void 0!==c.name&&g.set_template(c),g.hide_template_menu=function(){k.template.visible=!1},require(["trade/tradeTemplateManager"],function(a){a.init(e.find(".trade-template-manager-root"),g)}),g}Object.defineProperty(a,"__esModule",{value:!0}),a.init=s;var t=l(b),u=l(c),v=l(d),w=l(e),x=l(f),y=l(g),z=l(h),A=l(i),B=l(j),C=l(k),D=function(){function a(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!b||c.length!==b);d=!0);}catch(i){e=!0,f=i}finally{try{!d&&h["return"]&&h["return"]()}finally{if(e)throw f}}return c}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();require(["trade/tradeConf"]);var E=function(a,b){return function(c){return c[a]=b,c}},F=y["default"].formatters.debounce;a["default"]={init:s}});