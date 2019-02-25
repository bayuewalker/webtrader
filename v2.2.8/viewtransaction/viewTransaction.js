define(["exports","jquery","windows/windows","websockets/binary_websockets","charts/chartingRequestMap","common/rivetsExtra","moment","../charts/chartSettings","trade/lookback","common/util"],function(e,t,r,a,o,i,n,c,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.init=void 0;var p=u(t),s=u(r),m=u(a),v=u(o),d=u(i),y=u(n),g=function(e){{if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}}(c),_=u(l);function u(e){return e&&e.__esModule?e:{default:e}}var f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},h=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],a=!0,o=!1,i=void 0;try{for(var n,c=e[Symbol.iterator]();!(a=(n=c.next()).done)&&(r.push(n.value),!t||r.length!==t);a=!0);}catch(e){o=!0,i=e}finally{try{!a&&c.return&&c.return()}finally{if(o)throw i}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};require(["css!viewtransaction/viewTransaction.css"]),require(["text!viewtransaction/viewTransaction.html"]);var b={},x={EXPIRED:"This contract has expired".i18n(),MARKET_RATE:"Note: Contract will be sold at the prevailing market price when the request is received by our servers. This price may differ from the indicated price.".i18n(),NO_RESALE:"Resale of this contract is not offered".i18n(),FINISHED:"This contract has expired".i18n()},w=null,k=e.init=function(e,a){return new Promise(function(r,t){if(b[a])return b[a].moveToTop(),void r();m.default.send({proposal_open_contract:1,contract_id:e}).then(function(e){var t=e.proposal_open_contract;void 0!==t.underlying||void 0!==t.shortcode?(t.transaction_id=a,P(t),r()):function(){if(w)w.moveToTop();else{var e="There was a market data disruption during the contract period. For real-money accounts we will attempt to correct this and settle the contract properly, otherwise the contract will be cancelled and refunded. Virtual-money contracts will be cancelled and refunded.".i18n(),t=(0,p.default)('<div class="data-disruption-dialog">'+e+"</div>");(w=s.default.createBlankWindow(t,{title:" There was an error ".i18n(),height:200,resizable:!1,collapsable:!1,minimizable:!1,maximizable:!1,destroy:function(){w&&w.dialog("destroy").remove(),w=null},"data-authorized":"true"})).dialog("open"),window.dd=w}}()}).catch(function(e){t(e)})})},L=function(e,r){var t,a,o,i=e.proposal_open_contract;a=r,o=(t=i).is_path_dependent&&"sold"!==t.status?t.exit_tick_time:parseInt(t.sell_time),a.proposal_open_contract.is_sold_before_expiry=o<t.date_expiry,a.proposal_open_contract.current_spot=t.current_spot,a.proposal_open_contract.current_spot_time=t.current_spot_time,a.proposal_open_contract.bid_price=t.bid_price,a.proposal_open_contract.entry_tick=t.entry_tick,a.proposal_open_contract.entry_tick_time=t.entry_tick_time,a.proposal_open_contract.status=t.status,a.proposal_open_contract.is_sold=t.is_sold,a.proposal_open_contract.exit_tick=t.exit_tick,a.proposal_open_contract.exit_tick_time=t.exit_tick_time,a.proposal_open_contract.date_expiry=t.date_expiry,a.proposal_open_contract.sell_price=t.sell_price,a.proposal_open_contract.is_valid_to_sell=t.is_valid_to_sell,a.proposal_open_contract.barrier=t.barrier,a.proposal_open_contract.high_barrier=t.high_barrier,a.proposal_open_contract.low_barrier=t.low_barrier,a.note=T(t),function(e,t){z(e,t);var r=t.chart.chart;if(!r)return;(function(e,n,c){var t=e.entry_tick_time,r=e.exit_tick_time,a=e.tick_count,o=e.is_path_dependent,i=n.proposal_open_contract.is_sold_before_expiry;if(a)return;t&&l({spot_time:t,label:"entry_tick_time",color:"white"});o&&r&&l({spot_time:r,label:"exit_tick_time",color:"orange"});i||l({spot_time:r,label:"exit_tick_time",color:"orange"});function l(e){var t=e.spot_time,r=e.label,a=e.color;if(t&&!n.chart.hasLabel(r)){var o=c.series[0].data.find(function(e){return+e.x==1e3*+t});if(o){var i=g.getMarkerSettings(a);o.update({marker:i})}}}})(e,t,r),function(e,i,n){var t=e.entry_tick_time,a=e.exit_tick_time,r=e.date_start,o=e.date_expiry,c=e.tick_count,l=e.sell_time;if(c)return s({line_time:t,label:"start_time"}),s({line_time:a,label:"end_time",dashStyle:"Dash"});function s(e){var t=e.line_time,r=e.label,a=e.dashStyle,o=e.color;if(!t||i.chart.hasLabel(r))return!1;n.addPlotLineX({value:1e3*+t,dashStyle:a,color:o})}s({line_time:r,label:"start_time"}),function(e){var t=e.is_path_dependent,r=i.proposal_open_contract.is_sold_before_expiry;t&&a&&r&&s({line_time:a,label:"end_time",dashStyle:"Dash"});r&&s({line_time:l,label:"end_time",dashStyle:"Dash"});t||s({line_time:o,label:"end_time",dashStyle:"Dash"})}(e),_=e,d=_.purchase_time,d<r&&s({line_time:d,label:"purchase_time",color:"#7cb5ec"});var _,d}(e,t,r),R(e,t),function(e,o,i){var t=e.entry_tick_time,r=e.exit_tick_time,a=e.date_expiry,n=e.sell_time,c=o.proposal_open_contract.is_sold_before_expiry;l({spot_time:t,label:"entry_zone",zone_idx:0}),c&&l({spot_time:r||n,label:"exit_zone",zone_idx:1});function l(e){var t=e.spot_time,r=e.label,a=e.zone_idx;t&&!o.chart.hasLabel(r)&&(i.series[0].zones[a].value=1e3*+t)}l({spot_time:r||a,label:"exit_zone",zone_idx:1})}(e,t,r)}(i,r),"open"!==i.status?S(r):(!function(){if(i.bid_price){r.sell.bid_price.value=i.bid_price;var e=i.bid_price.toString().split(/[\.,]+/),t=h(e,2);r.sell.bid_price.unit=t[0],r.sell.bid_price.cent=t[1]}}(),function(){if(i.is_forward_starting&&+i.date_start>+i.current_spot_time)return r.fwd_starting="* Contract has not started yet".i18n();r.fwd_starting=""}(),r.chart.manualReflow())};var S=function(e){e.proposal_open_contract.is_ended=!0,e.sell.sell_at_market_enabled=!1},T=function(e){return e.validation_error?e.validation_error:"open"!==e.status?x.FINISHED:e.is_expired||e.is_sold?x.EXPIRED:e.is_valid_to_sell?x.MARKET_RATE:e.is_valid_to_sell?void 0:x.NO_RESALE},z=function(e,t){40<t.sell.bid_prices.length&&t.sell.bid_prices.shift(),t.sell.bid_prices.push(e.bid_price)},P=function(i){require(["text!viewtransaction/viewTransaction.html"],function(e){var t=(0,p.default)(e).i18n(),r=E(i,t),a=s.default.createBlankWindow(t,{title:i.display_name+" ("+i.transaction_id+")",width:700,minWidth:630,minHeight:480,height:480,destroy:function(){},close:function(){o&&o.unbind(),m.default.proposal_open_contract.forget(i.contract_id),m.default.events.off("proposal_open_contract",M);for(var e=0;e<r.onclose.length;++e)r.onclose[e]();(0,p.default)(this).dialog("destroy").remove(),b[i.transaction_id]=void 0},open:function(){m.default.proposal_open_contract.forget(i.contract_id)},resize:function(){r.chart.manualReflow()},"data-authorized":"true"});a.dialog("open");var o=d.default.bind(t[0],r);b[i.transaction_id]=a})},E=function(e,o){var t=e.is_path_dependent&&"sold"!==e.status?e.exit_tick_time:parseInt(e.sell_time),i={route:{value:"table",update:function(e){i.route.value=e}},note:T(e),chart:{chart:null,loading:"Loading "+e.display_name+" ...",added_labels:[],hasLabel:function(e){return!!i.chart.added_labels.includes(e)||(i.chart.added_labels.push(e),!1)},type:"ticks",manualReflow:function(){if(i.chart.chart){var e=-1*(o.find(".longcode").height()+o.find(".tabs").height()+o.find(".footer").height())-16,t=o,r=t.width()-10,a=t.height();i.chart.chart.setSize(r,a+e,!1),i.chart.chart.hasUserSize=null,i.chart.chart.series[0]&&0===i.chart.chart.series[0].data.length?i.chart.chart.showLoading():i.chart.chart.hideLoading()}}},proposal_open_contract:f({},e,{currency:(e.currency||"USD")+" ",is_ended:e.is_settleable||e.is_sold||"open"!==e.status,is_sold_at_market:!1,is_sold_before_expiry:t<e.date_expiry,isLookback:_.default.isLookback(e.contract_type),lb_formula:_.default.formula(e.contract_type,e.multiplier&&formatPrice(e.multiplier,e.currency||"USD"))}),sell:{bid_prices:[],bid_price:{unit:void 0,cent:void 0,value:void 0},sell:function(){return _=o,(s=i).sell.sell_at_market_enabled=!1,require(["text!viewtransaction/viewTransactionConfirm.html","css!viewtransaction/viewTransactionConfirm.css"]),void m.default.send({sell:s.proposal_open_contract.contract_id,price:0}).then(function(e){s.proposal_open_contract.is_sold_before_expiry=!0;var l=e.sell;require(["text!viewtransaction/viewTransactionConfirm.html","css!viewtransaction/viewTransactionConfirm.css"],function(e){var t=s.proposal_open_contract,r=t.buy_price,a=t.longcode,o=t.currency,i={longcode:a,buy_price:r,sell_price:l.sold_for,return_percent:(100*(l.sold_for-r)/r).toFixed(2)+"%",transaction_id:l.transaction_id,balance:l.balance_after,currency:o},n=(0,p.default)(e).i18n();_.after(n);var c=d.default.bind(n[0],i);s.onclose.push(function(){c&&c.unbind()})})}).catch(function(e){p.default.growl.error({message:e.message})});var s,_},sell_at_market_enabled:!0},onclose:[]};return C(i,o),i},M=void 0;function A(r,e){M=function(e){if(+e.proposal_open_contract.contract_id!=+r.proposal_open_contract.contract_id)return;if(e.error)return t=e.error.message,p.default.growl.error({message:t}),m.default.proposal_open_contract.forget(data.echo_req.contract_id),void m.default.proposal_open_contract.subscribe(data.echo_req.contract_id);var t;L(e,r)},m.default.proposal_open_contract.subscribe(e.contract_id),m.default.events.on("proposal_open_contract",M)}var R=function(e,t){var o=t.chart.chart,r=t.proposal_open_contract,a=r.barrier,i=r.high_barrier,n=r.low_barrier,c=r.tick_count;!function(e,t,r){e&&o.yAxis[0].removePlotLine("barrier");t&&o.yAxis[0].removePlotLine("high_barrier");r&&o.yAxis[0].removePlotLine("low_barrier")}(a,i,n),function(e,t,r){var a=c?"":"dot";e&&o.addPlotLineY({id:"barrier",value:e,dashStyle:a});t&&o.addPlotLineY({id:"high_barrier",value:t,dashStyle:a});r&&o.addPlotLineY({id:"low_barrier",value:r,dashStyle:a})}(a,i,n)},C=function(d,i){var e,t,r=Math.min(+d.proposal_open_contract.date_expiry,y.default.utc().unix())-(d.proposal_open_contract.purchase_time||d.proposal_open_contract.date_start),a=function(e){var t=0;t=e<=3600?0:e<=7200?60:e<=21600?120:e<=86400?300:3600;return t}(r),o=function(e,t){var r=d.proposal_open_contract,a=r.date_start,o=r.current_spot_time,i=r.purchase_time,n=r.exit_tick_time,c=void 0;if(+i<+a)c=i;else{var l=+o<+a||+n<+a;c=l?+i:+a||+i}var s=n<c||!n?"latest":+n+t,_={adjust_start_time:1,ticks_history:d.proposal_open_contract.underlying,start:c-t,end:s,style:"ticks",count:4999};0!==e&&(_.granularity=e,_.style="candles",d.chart.type="candles");return _}(a,(e=r,0===(t=a)?Math.max(3,30*e/3600|0):3*t));d.proposal_open_contract.is_ended||function(u,r){var f=v.default.keyFor(u.proposal_open_contract.underlying,r);!function(){if(v.default[f])v.default.subscribe(f);else{var e=(t=r,{symbol:u.proposal_open_contract.underlying,subscribe:1,granularity:t,style:0===t?"ticks":"candles"});v.default.register(e).catch(function(e){p.default.growl.error({message:e.message})})}var t}();var e=void 0,t=void 0,a=!1;function h(){a||(a=!0,v.default.unregister(f),e&&m.default.events.off("tick",e),t&&m.default.events.off("candles",t))}u.onclose.push(h),0!==r?t=m.default.events.on("ohlc",function(e){var t=v.default.keyFor(e.ohlc.symbol,e.ohlc.granularity);if(f===t){var r=u.chart.chart;if(r){var a=r.series[0],o=a.data[a.data.length-1],i=e.ohlc,n=[1e3*i.open_time,1*i.open,1*i.high,1*i.low,1*i.close];o.x!==n[0]?a.addPoint(n,!0,!0):o.update(n,!0);var c=u.proposal_open_contract,l=c.status,s=(c.is_sold,c.exit_tick),_=c.exit_tick_time,d=c.date_expiry,p=1*i.epoch>1*d||"open"!==l||s||_;p&&h()}}}):e=m.default.events.on("tick",function(e){if(e.tick&&e.tick.symbol===u.proposal_open_contract.underlying){var t=u.chart.chart,r=u.proposal_open_contract,a=r.status,o=r.is_sold,i=r.exit_tick,n=r.exit_tick_time,c=e.tick,l=o||"open"!==a||i||n;l?h():(_=c,(s=t)&&s.series[0].addPoint([1e3*_.epoch,1*_.quote,"gray"]))}var s,_})}(d,a),m.default.send(o).then(function(e){!function(e){d.chart.loading="";var t=(a=e,o=d.proposal_open_contract.display_name,f({title:o},a)),r=function(e,t,r){var a=[],o="",i=3;if(r.history){o="line";for(var n=r.history,c=n.times,l=n.prices,s=0;s<c.length;++s)a.push([1e3*c[s],1*l[s]]),i=Math.max(i,l[s].substring(l[s].indexOf(".")+1).length)}r.candles&&(o="candlestick",a=r.candles.map(function(e){return[1e3*e.epoch,1*e.open,1*e.high,1*e.low,1*e.close]}));var _=r.title,d=e.find(".transaction-chart")[0],p=g.getChartLabels(t.proposal_open_contract),u=t.proposal_open_contract,f=u.entry_tick_time,h=u.date_start,m=f||h,v={credits:{href:"#",text:""},chart:{type:"line",renderTo:d,backgroundColor:null,width:0,height:0,marginLeft:65,marginRight:20},title:{text:""},subtitle:{text:g.getLabelEl(p),useHTML:!0},tooltip:{useHTML:!0,formatter:function(){var e=addComma(this.y,i);return"<div class='tooltip-body'>"+y.default.utc(this.x).format("dddd, MMM D, HH:mm:ss")+" GMT<br/>"+this.series.name+" "+e+"</div>"}},xAxis:{type:"datetime",categories:null,startOnTick:!1,endOnTick:!1,min:a.length?a[0][0]:null,max:a.length?a[a.length-1][0]:null,labels:{overflow:"justify",format:"{value:%H:%M:%S}"}},yAxis:{labels:{align:"left",x:-65,y:-2,formatter:function(){return addComma(this.value,i)}},title:""},series:[{name:_,data:a,type:o,zIndex:10,zoneAxis:"x",zones:[{value:m?1e3*+m:"",color:"#ccc"},{color:""},{color:"#ccc"}]}],exporting:{enabled:!1,enableImages:!1},legend:{enabled:!1},navigator:{enabled:!0},plotOptions:{line:{marker:{radius:2}},candlestick:{lineColor:"black",color:"red",upColor:"green",upLineColor:"black",shadow:!0}},rangeSelector:{enabled:!1}},b=new Highcharts.Chart(v);return b.addPlotLineX=function(e){b.xAxis[0].addPlotLine({value:e.value,id:e.id||e.value,color:e.color||"#e98024",zIndex:0,width:e.width||2,dashStyle:e.dashStyle})},b.addPlotLineY=function(e){b.yAxis[0].addPlotLine({id:e.id,value:e.value,color:e.color||"green",zIndex:0,width:2,dashStyle:e.dashStyle})},d.chart=b}(i,d,t);var a,o;d.chart.chart=r,d.chart.manualReflow()}(e),A(d,d.proposal_open_contract)}).catch(function(e){var t;t=e,d.chart.loading=t.message})};e.default={init:k}});