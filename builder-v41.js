(function(){
  const data={
    nature:{title:'The Wild Heart',routes:{5:['Sigiriya','Kandy','Ella','South Coast'],7:['Sigiriya','Kandy','Nuwara Eliya','Ella','South Coast'],10:['Sigiriya','Kandy','Nuwara Eliya','Ella','Yala','South Coast'],14:['Sigiriya','Kandy','Knuckles','Nuwara Eliya','Ella','Yala','Mirissa','Galle']}},
    beach:{title:'The Coastline Escape',routes:{5:['Negombo','Bentota','Galle','Unawatuna'],7:['Negombo','Bentota','Galle','Unawatuna','Mirissa'],10:['Negombo','Bentota','Galle','Mirissa','Weligama','Hiriketiya'],14:['Negombo','Bentota','Galle','Unawatuna','Mirissa','Hiriketiya','Trincomalee','Nilaveli']}},
    culture:{title:'Ancient Sri Lanka',routes:{5:['Dambulla','Sigiriya','Kandy','Colombo'],7:['Anuradhapura','Sigiriya','Dambulla','Kandy','Galle'],10:['Anuradhapura','Polonnaruwa','Sigiriya','Dambulla','Kandy','Galle'],14:['Jaffna','Anuradhapura','Polonnaruwa','Sigiriya','Kandy','Nuwara Eliya','Galle']}},
    wildlife:{title:'Into the Wild',routes:{5:['Sigiriya','Minneriya','Yala','South Coast'],7:['Sigiriya','Minneriya','Kandy','Yala','Udawalawe'],10:['Sigiriya','Minneriya','Knuckles','Ella','Yala','Udawalawe'],14:['Wilpattu','Sigiriya','Minneriya','Kandy','Ella','Yala','Udawalawe','Galle']}},
    luxury:{title:'Sri Lanka, Refined',routes:{5:['Colombo','Kandy','Galle'],7:['Colombo','Sigiriya','Kandy','Galle','Mirissa'],10:['Colombo','Sigiriya','Kandy','Nuwara Eliya','Galle','Mirissa'],14:['Colombo','Sigiriya','Kandy','Nuwara Eliya','Ella','Yala','Galle','Mirissa']}},
    adventure:{title:'Made for Adventure',routes:{5:['Kithulgala','Ella','South Coast'],7:['Kithulgala','Kandy','Ella','Arugam Bay'],10:['Sigiriya','Kithulgala','Nuwara Eliya','Ella','Arugam Bay','South Coast'],14:['Sigiriya','Kithulgala','Knuckles','Nuwara Eliya','Ella','Yala','Arugam Bay','Galle']}}
  };
  const regionRoutes={
    'Cultural Triangle':['Anuradhapura','Sigiriya','Dambulla','Polonnaruwa','Kandy'],
    'Hill Country':['Kandy','Nuwara Eliya','Ella','Haputale'],
    'South Coast':['Galle','Unawatuna','Mirissa','Weligama','Hiriketiya'],
    'East Coast':['Trincomalee','Nilaveli','Arugam Bay'],
    'North':['Jaffna','Anuradhapura'],
    'Wildlife':['Yala','Udawalawe','Minneriya','Wilpattu'],
    'West Coast':['Colombo','Negombo','Bentota']
  };
  const budget={budget:{label:'Smart',min:700,max:1100},comfort:{label:'Comfort',min:1000,max:1500},premium:{label:'Premium',min:1500,max:2300}};
  const STORAGE='lankaoraJourneyBuilder';
  let focus='nature',days=7,pace='balanced',where='Flexible',budgetKey='comfort';
  try{const saved=JSON.parse(localStorage.getItem(STORAGE)||'{}');focus=saved.focus||focus;days=Number(saved.days)||days;pace=saved.pace||pace;where=saved.where||where;budgetKey=saved.budgetKey||budgetKey;}catch(e){}
  const $=s=>document.querySelector(s);
  function buildRoute(){
    let route=[...(data[focus]?.routes[days]||data.nature.routes[days])];
    if(where!=='Flexible' && regionRoutes[where]){
      const wanted=regionRoutes[where];
      const keep=route.filter(x=>wanted.includes(x));
      const add=wanted.filter(x=>!keep.includes(x)).slice(0,Math.max(0,days-keep.length));
      route=(keep.concat(add));
      if(!route.length) route=wanted.slice(0,Math.min(days,wanted.length));
    }
    if(pace==='slow' && route.length>3) route=route.slice(0,Math.max(3,Math.ceil(route.length*.75)));
    if(pace==='more'){
      const extra={nature:'Horton Plains',beach:'Bentota',culture:'Dambulla',wildlife:'Minneriya',luxury:'Bentota',adventure:'Kithulgala'}[focus];
      if(extra && !route.includes(extra)) route.splice(Math.min(2,route.length),0,extra);
    }
    return route;
  }
  function update(){
    const route=buildRoute(), b=budget[budgetKey];
    $('#planner-result-title').textContent=`${data[focus].title} · ${days} days`;
    $('#planner-route').textContent=route.join(' → ');
    $('#planner-meta').textContent=`${where} · ${b.label} · ${pace==='slow'?'Slow & Easy':pace==='more'?'See More':'Balanced'}`;
    $('#planner-budget').textContent=`US$ ${Math.round(b.min*days/7).toLocaleString()} – ${Math.round(b.max*days/7).toLocaleString()}*`;
    $('#planner-note').textContent='Planning range only — final itinerary, suppliers and quote are confirmed by email.';
    $('#planner-inquiry').href=`plan.html#build-trip`;
    document.querySelectorAll('[data-choice-group]').forEach(group=>group.querySelectorAll('button').forEach(x=>x.classList.toggle('active',false)));
    const active={focus,days:String(days),pace,where,budget:budgetKey};
    Object.entries(active).forEach(([group,value])=>document.querySelectorAll(`[data-choice-group="${group}"] button`).forEach(x=>x.classList.toggle('active',x.dataset.value===String(value))));
    try{localStorage.setItem(STORAGE,JSON.stringify({focus,days,pace,where,budgetKey}))}catch(e){}
  }
  function wire(group,fn){document.querySelectorAll(`[data-choice-group="${group}"] button`).forEach(btn=>btn.addEventListener('click',()=>{fn(btn.dataset.value);btn.parentElement.querySelectorAll('button').forEach(x=>x.classList.remove('active'));btn.classList.add('active');update();}));}
  wire('focus',v=>focus=v); wire('days',v=>days=Number(v)); wire('pace',v=>pace=v); wire('where',v=>where=v); wire('budget',v=>budgetKey=v);
  const reset=$('#planner-reset');
  if(reset) reset.addEventListener('click',()=>{focus='nature';days=7;pace='balanced';where='Flexible';budgetKey='comfort';try{localStorage.removeItem(STORAGE)}catch(e){}update();});
  document.querySelectorAll('[data-choice-group="focus"] button').forEach(b=>b.classList.toggle('active',b.dataset.value===focus));
  document.querySelectorAll('[data-choice-group="days"] button').forEach(b=>b.classList.toggle('active',Number(b.dataset.value)===days));
  update();
})();
