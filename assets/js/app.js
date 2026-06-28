/* ---- inline script 1/4 (de v9) ---- */
(function(){if(typeof Chart==='undefined')return;var COL={rf:'#2563c9',ac:'#10b981',mm:'#f59e0b',prev:'#ec4899',fip:'#14b8a6',fidc:'#6366f1',fii:'#8b5cf6',out:'#94a3b8'};function fmtMn(x){if(x>=1e6)return 'R$ '+(x/1e6).toFixed(2)+'tn';if(x>=1e3)return 'R$ '+(x/1e3).toFixed(0)+'bn';return 'R$ '+Math.round(x)+'mn';}function fmtBi(x){if(x>=1000)return 'R$ '+(x/1000).toFixed(1)+'tn';return 'R$ '+Math.round(x)+'bn';}function tcol(h){var r=parseInt(h.substr(1,2),16),g=parseInt(h.substr(3,2),16),b=parseInt(h.substr(5,2),16);return (0.299*r+0.587*g+0.114*b)>155?'#1b2430':'#ffffff';}var TOTAL1=8589164;var TOP=[{k:'Fixed Income',v:5135730,c:COL.rf,drill:[['CDB/RDB',1331120],['Fundos de Renda Fixa',1014015],['Poupança',961409],['LCA',538775],['LCI',453709],['Títulos Públicos',263592],['Debêntures',149651],['CRA',136771],['LIG',100350],['CRI',100227],['FIDC',51906],['LF',24368],['Compromissadas',8904],['LC',820],['LH',105],['LAM',8]]},{k:'Pension',v:1545811,c:COL.prev,drill:null},{k:'Equities',v:1051331,c:COL.ac,drill:[['Ações',807270],['Fundos de Ações',244060]]},{k:'Hedge Funds',v:536028,c:COL.mm,drill:null},{k:'Others',v:191814,c:COL.out,drill:[['COE',103285],['FIP',45503],['Outros Fundos',29074],['Outros',13952]]},{k:'FIIs',v:128451,c:COL.fii,drill:null}];var SHADES={'Fixed Income':['#16307a','#1d4ed8','#2563c9','#2f6fd6','#3b82f6','#4f8fe6','#60a5fa','#73b0f7','#1e40af','#264fb0','#3068c9','#4582dd','#5f9ae6','#7fb1ee','#9cc4f4','#bcd6f8'],'Equities':['#0e8f67','#34d399'],'Others':['#64748b','#94a3b8','#b8c2cf','#dbe1e8']};var centerPlugin={id:'bwCenter',afterDraw:function(ch){var d=ch.$cur;if(!d)return;var a=ch.chartArea,x=(a.left+a.right)/2,y=(a.top+a.bottom)/2,ctx=ch.ctx;ctx.save();ctx.textAlign='center';ctx.textBaseline='middle';var big=(a.right-a.left)>320?1:0;ctx.font='700 '+(big?22:16)+'px Segoe UI,sans-serif';ctx.fillStyle='#1b2430';ctx.fillText(fmtMn(d.total),x,y-(big?9:6));ctx.font='600 '+(big?11:9)+'px Segoe UI,sans-serif';ctx.fillStyle='#93a0b0';ctx.fillText(d.center.toUpperCase(),x,y+(big?14:11));var meta=ch.getDatasetMeta(0);meta.data.forEach(function(arc,i){var pct=d.vals[i]/d.total*100;if(pct<5)return;var ang=(arc.startAngle+arc.endAngle)/2,r=(arc.innerRadius+arc.outerRadius)/2,px=arc.x+Math.cos(ang)*r,py=arc.y+Math.sin(ang)*r;ctx.font='700 '+(big?13:11)+'px Segoe UI,sans-serif';ctx.fillStyle=tcol(d.colors[i]);ctx.fillText(pct.toFixed(0)+'%',px,py);});ctx.restore();}};function makeDonut(canvas,legendEl,backBtn){var state={level:'top'};function cur(){if(state.level==='top')return {labels:TOP.map(function(d){return d.k;}),vals:TOP.map(function(d){return d.v;}),colors:TOP.map(function(d){return d.c;}),total:TOTAL1,center:'Total'};var cat=TOP.filter(function(d){return d.k===state.level;})[0];var sh=SHADES[cat.k]||['#888'];return {labels:cat.drill.map(function(z){return z[0];}),vals:cat.drill.map(function(z){return z[1];}),colors:cat.drill.map(function(z,i){return sh[i%sh.length];}),total:cat.v,center:cat.k};}function legend(d){legendEl.innerHTML=d.labels.map(function(l,i){var pct=d.vals[i]/d.total*100;var cl=(state.level==='top'&&TOP[i].drill);return '<div class="bw-row" data-i="'+i+'" style="display:flex;align-items:center;gap:8px;padding:2.5px 0;font-size:11.5px;'+(cl?'cursor:pointer':'')+'"><span style="width:10px;height:10px;border-radius:3px;background:'+d.colors[i]+';flex:0 0 auto"></span><span style="flex:1;color:#1b2430">'+l+(cl?' <span style=\'color:#93a0b0\'>&rsaquo;</span>':'')+'</span><span style="color:#5d6b7d;font-variant-numeric:tabular-nums">'+pct.toFixed(1)+'%</span><span style="width:74px;text-align:right;color:#1b2430;font-weight:600;font-variant-numeric:tabular-nums">'+fmtMn(d.vals[i])+'</span></div>';}).join('');if(state.level==='top'){var rows=legendEl.querySelectorAll('.bw-row');for(var i=0;i<rows.length;i++){(function(row){var idx=+row.getAttribute('data-i');if(TOP[idx].drill)row.onclick=function(){state.level=TOP[idx].k;apply();};})(rows[i]);}}}var chart=new Chart(canvas,{type:'doughnut',data:{labels:[],datasets:[{data:[],backgroundColor:[],borderColor:'#ffffff',borderWidth:2}]},options:{responsive:true,maintainAspectRatio:false,cutout:'60%',animation:{duration:420},plugins:{legend:{display:false},tooltip:{callbacks:{label:function(c){return ' '+c.label+': '+fmtMn(c.parsed)+' ('+(c.parsed/chart.$cur.total*100).toFixed(1)+'%)';}}}},onClick:function(e,els){if(state.level!=='top'||!els.length)return;var i=els[0].index;if(TOP[i].drill){state.level=TOP[i].k;apply();}}},plugins:[centerPlugin]});function apply(){var d=cur();chart.$cur=d;chart.data.labels=d.labels;chart.data.datasets[0].data=d.vals;chart.data.datasets[0].backgroundColor=d.colors;chart.update();legend(d);if(backBtn)backBtn.style.display=(state.level==='top'?'none':'inline-block');canvas.style.cursor=(state.level==='top'?'pointer':'default');}if(backBtn)backBtn.onclick=function(){state.level='top';apply();};apply();return chart;}var anosPL=['2017','2018','2019','2020','2021','2022','2023','2024','2025','May/26'];var BAR=[{label:'Fixed Income',data:[1917,2045,2149,2200,2566,2840,3141,3734,4336,4695],c:COL.rf},{label:'Pension',data:[734,812,929,1005,1045,1182,1360,1533,1742,1832],c:COL.prev},{label:'Hedge Funds',data:[837,974,1183,1415,1575,1626,1662,1509,1626,1551],c:COL.mm},{label:'Equities',data:[228,306,496,613,584,522,629,578,666,684],c:COL.ac},{label:'Private Equity (FIP)',data:[213,237,301,400,554,611,764,886,1127,868],c:COL.fip},{label:'Receivables (FIDC)',data:[105,122,204,180,284,337,444,637,754,754],c:COL.fidc},{label:'Real Estate (FII)',data:[65,85,127,173,214,248,301,342,396,400],c:COL.fii},{label:'Others',data:[51,58,86,100,94,88,96,107,188,218],c:COL.out}];function makeBar(canvas){return new Chart(canvas,{type:'bar',data:{labels:anosPL,datasets:BAR.map(function(d){return {label:d.label,data:d.data,backgroundColor:d.c,borderWidth:0};})},options:{responsive:true,maintainAspectRatio:false,animation:{duration:420},scales:{x:{stacked:true,grid:{display:false},ticks:{font:{size:10},color:'#5d6b7d'}},y:{stacked:true,grid:{color:'#eef1f5'},ticks:{font:{size:10},color:'#5d6b7d',callback:function(v){return 'R$'+(v/1000).toFixed(0)+'tn';}}}},plugins:{legend:{position:'bottom',labels:{boxWidth:10,boxHeight:10,font:{size:10},color:'#1b2430',padding:7}},tooltip:{callbacks:{label:function(c){return c.dataset.label+': '+fmtBi(c.raw);}}}}}});}var inited=false,dSmall;function initSmall(){if(inited)return;inited=true;dSmall=makeDonut(document.getElementById('bwDonutSmall'),document.getElementById('bwLegSmall'),document.getElementById('bwBackSmall'));makeBar(document.getElementById('bwBarSmall'));}var radio=document.getElementById('ftab-exec');if(radio){radio.addEventListener('change',function(){if(radio.checked)setTimeout(initSmall,40);});if(radio.checked)setTimeout(initSmall,40);}var modal=document.getElementById('bwModal'),mInst=null;function closeModal(){if(mInst){mInst.destroy();mInst=null;}modal.style.display='none';}function openModal(which){var legEl=document.getElementById('bwModalLegend'),backEl=document.getElementById('bwModalBack'),noteEl=document.getElementById('bwModalNote'),cv=document.getElementById('bwModalCanvas');document.getElementById('bwModalTitle').textContent=(which==='c1'?'ANBIMA: Private and Retail Allocation By Asset Class — Dec-2025':'ANBIMA: Fund Industry Net Assets By Asset Class — R$ bn, 2017–May 2026');if(mInst){mInst.destroy();mInst=null;}modal.style.display='flex';if(which==='c1'){legEl.style.display='';noteEl.textContent='Direct exposure only; individuals also hold indirect fixed income through funds. Click a slice or legend row to drill into Fixed Income, Equities or Others.';mInst=makeDonut(cv,legEl,backEl);}else{legEl.style.display='none';backEl.style.display='none';noteEl.textContent='Net assets (PL) of the Brazilian fund industry by asset class. Source: ANBIMA fund industry statistics, R$ bn.';mInst=makeBar(cv);}}var zb=document.querySelectorAll('.bw-zoom');for(var i=0;i<zb.length;i++){(function(b){b.onclick=function(){openModal(b.getAttribute('data-which'));};})(zb[i]);}document.getElementById('bwModalClose').onclick=closeModal;modal.onclick=function(e){if(e.target===modal)closeModal();};document.addEventListener('keydown',function(e){if(e.key==='Escape'&&modal.style.display==='flex')closeModal();});})();

/* ---- inline script 2/4 (de v9) ---- */
(function(){try{
 document.documentElement.classList.remove('no-js');document.documentElement.classList.add('js');
 var KEY='decade_case_tab';
 var s=sessionStorage.getItem(KEY);
 if(s){var r=document.getElementById('ftab-'+s);if(r)r.checked=true;}
 document.querySelectorAll('input[name=ftab]').forEach(function(r){
   r.addEventListener('change',function(){sessionStorage.setItem(KEY,this.id.replace('ftab-',''));window.scrollTo(0,0);});
 });
 document.querySelectorAll('.tab').forEach(function(t){
   t.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();this.click();}});
 });
 window.openCls=function(slug){var d=document.getElementById('cls-'+slug);if(d){d.open=true;}};
}catch(e){}})();
/* B-M2 active rail highlight (enhancement; anchors work without it) */
(function(){try{
 var rail=document.querySelectorAll('.class-rail a[data-rail]');
 if(!rail.length||!('IntersectionObserver' in window))return;
 var map={};rail.forEach(function(a){map[a.getAttribute('data-rail')]=a;});
 var io=new IntersectionObserver(function(es){es.forEach(function(e){
   if(e.isIntersecting){var slug=e.target.id.replace('cls-','');
     rail.forEach(function(a){a.classList.remove('active');});
     if(map[slug])map[slug].classList.add('active');}
 });},{rootMargin:'-45% 0px -50% 0px',threshold:0});
 document.querySelectorAll('details.cls').forEach(function(d){io.observe(d);});
}catch(e){}})();
/* B-M6 donut hover sync (enhancement only; CSS-only floor handles toggling) */
(function(){try{
 document.querySelectorAll('.donut-wrap').forEach(function(wrap){
   function sync(seg,on){
     wrap.querySelectorAll('[data-seg="'+seg+'"]').forEach(function(el){
       if(el.classList.contains('d-leg-row'))el.style.background=on?'#fbfcfe':'';});
     if(on){wrap.querySelectorAll('.d-seg').forEach(function(p){
       if(p.getAttribute('data-seg')!==seg)p.style.opacity='0.35';});}
     else{wrap.querySelectorAll('.d-seg').forEach(function(p){p.style.opacity='';});}
   }
   wrap.querySelectorAll('.d-seg,.d-leg-row').forEach(function(el){
     var seg=el.getAttribute('data-seg');
     el.addEventListener('mouseenter',function(){sync(seg,true);});
     el.addEventListener('mouseleave',function(){sync(seg,false);});
   });
 });
}catch(e){}})();
/* B-M1 / B-D2 inline edit + export-HTML (progressive; content stays CSS-only) */
(function(){try{
 var EDITABLE_SEL='.sec-md, .exec-intro, .glance-thesis, .md-p, .flow-conf-list, .tbd-p, .subt-body, .tl-note, .tl-org, .tl-role, .tl-when, .why-b, .why-h';
 var editing=false;
 var btnEdit=document.getElementById('ed-toggle');var btnExport=document.getElementById('ed-export');
 if(!btnEdit||!btnExport)return;
 function setEditable(on){
   editing=on;document.body.classList.toggle('editing',on);
   btnEdit.setAttribute('aria-pressed',on?'true':'false');
   btnEdit.textContent=on?'Done editing':'Edit text';
   document.querySelectorAll(EDITABLE_SEL).forEach(function(el){
     if(on){el.setAttribute('contenteditable','true');el.spellcheck=false;}
     else{el.removeAttribute('contenteditable');}});
 }
 btnEdit.addEventListener('click',function(){setEditable(!editing);});
 btnExport.addEventListener('click',function(){
   var doc=document.documentElement.cloneNode(true);
   var bar=doc.querySelector('.edbar');if(bar)bar.remove();
   var body=doc.querySelector('body');if(body)body.classList.remove('editing');
   doc.querySelectorAll('[contenteditable]').forEach(function(el){el.removeAttribute('contenteditable');});
   doc.classList.remove('js');doc.classList.add('no-js');
   var html='<!DOCTYPE html>\n'+doc.outerHTML;
   var blob=new Blob([html],{type:'text/html;charset=utf-8'});
   var url=URL.createObjectURL(blob);var a=document.createElement('a');
   a.href=url;a.download='decade_tax_exempt_case_edited.html';
   document.body.appendChild(a);a.click();a.remove();
   setTimeout(function(){URL.revokeObjectURL(url);},1500);
 });
}catch(e){}})();
/* interactive chart tooltips (progressive enhancement; native <title> is the JS-off floor) */
(function(){try{
 var tip=document.createElement('div');tip.className='charttip';document.body.appendChild(tip);
 function pos(e){tip.style.left=e.clientX+'px';tip.style.top=e.clientY+'px';}
 function bind(root){
   root.addEventListener('mouseover',function(e){var d=e.target.closest('.dpt');if(!d||!root.contains(d))return;
     var t=d.getAttribute('data-tip');if(!t)return;tip.textContent=t;pos(e);tip.classList.add('on');});
   root.addEventListener('mousemove',function(e){if(tip.classList.contains('on'))pos(e);});
   root.addEventListener('mouseout',function(e){if(e.target.closest('.dpt'))tip.classList.remove('on');});
 }
 document.querySelectorAll('svg.chart').forEach(bind);
 /* B-A3: the selection-funnel stage bars are HTML .dpt (not in an SVG) — bind them too,
    so the same styled charttip + native <title> floor applies. */
 document.querySelectorAll('.funnel-bars').forEach(bind);
}catch(e){}})();

/* ---- inline script 3/4 (de v9) ---- */
/*ASSET-LINK-OPEN*/document.addEventListener("click",function(e){var a=e.target.closest('a[href^="#asset-"]');if(!a)return;var t=document.getElementById(a.getAttribute("href").slice(1));if(!t)return;var tab=document.getElementById("ftab-assets");if(tab)tab.checked=true;var d=t.closest("details");if(d)d.open=true;setTimeout(function(){t.scrollIntoView({behavior:"smooth",block:"start"});},30);});

/* ---- inline script 4/4 (de v9) ---- */
document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll(".tl-note,.tl-org,.tl-role,.tl-when,.exec-intro,.my-approach,.exm-b,.stmt-body p,.md-p,.why-note,.why-body p").forEach(function(el){el.contentEditable="true";el.spellcheck=true;});});function exportHTML(){var blob=new Blob([document.documentElement.outerHTML],{type:"text/html;charset=utf-8"});var a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="frontier_investment_case_edited.html";document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);document.body.removeChild(a);},100);}

