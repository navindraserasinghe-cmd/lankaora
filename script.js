const data = {
  nature:{
    title:"The Wild Heart",
    routes:{
      5:["Sigiriya","Kandy","Ella","South Coast"],
      7:["Sigiriya","Kandy","Nuwara Eliya","Ella","South Coast"],
      10:["Sigiriya","Kandy","Nuwara Eliya","Ella","Yala","South Coast"],
      14:["Sigiriya","Kandy","Knuckles","Nuwara Eliya","Ella","Yala","Mirissa","Galle"]
    }
  },
  beach:{
    title:"The Coastline Escape",
    routes:{
      5:["Negombo","Bentota","Galle","Unawatuna"],
      7:["Negombo","Bentota","Galle","Unawatuna","Mirissa"],
      10:["Negombo","Bentota","Galle","Mirissa","Weligama","Hiriketiya"],
      14:["Negombo","Bentota","Galle","Unawatuna","Mirissa","Hiriketiya","Trincomalee","Nilaveli"]
    }
  },
  culture:{
    title:"Ancient Sri Lanka",
    routes:{
      5:["Dambulla","Sigiriya","Kandy","Colombo"],
      7:["Anuradhapura","Sigiriya","Dambulla","Kandy","Galle"],
      10:["Anuradhapura","Polonnaruwa","Sigiriya","Dambulla","Kandy","Galle"],
      14:["Jaffna","Anuradhapura","Polonnaruwa","Sigiriya","Kandy","Nuwara Eliya","Galle"]
    }
  },
  wildlife:{
    title:"Into the Wild",
    routes:{
      5:["Sigiriya","Minneriya","Yala","South Coast"],
      7:["Sigiriya","Minneriya","Kandy","Yala","Udawalawe"],
      10:["Sigiriya","Minneriya","Knuckles","Ella","Yala","Udawalawe"],
      14:["Wilpattu","Sigiriya","Minneriya","Kandy","Ella","Yala","Udawalawe","Galle"]
    }
  },
  luxury:{
    title:"Sri Lanka, Refined",
    routes:{
      5:["Colombo","Kandy","Galle"],
      7:["Colombo","Sigiriya","Kandy","Galle","Mirissa"],
      10:["Colombo","Sigiriya","Kandy","Nuwara Eliya","Galle","Mirissa"],
      14:["Colombo","Sigiriya","Kandy","Nuwara Eliya","Ella","Yala","Galle","Mirissa"]
    }
  },
  adventure:{
    title:"Made for Adventure",
    routes:{
      5:["Kithulgala","Ella","South Coast"],
      7:["Kithulgala","Kandy","Ella","Arugam Bay"],
      10:["Sigiriya","Kithulgala","Nuwara Eliya","Ella","Arugam Bay","South Coast"],
      14:["Sigiriya","Kithulgala","Knuckles","Nuwara Eliya","Ella","Yala","Arugam Bay","Galle"]
    }
  }
};

const placeDetails = {
  Colombo:{tag:"CITY",morning:"Settle in and explore the city at an easy pace.",afternoon:"Walk the historic streets and waterfront.",evening:"Sunset by the ocean and a relaxed dinner.",stay:"Colombo",travel:"Arrival / local travel"},
  Negombo:{tag:"COAST",morning:"Ease into the island beside the lagoon.",afternoon:"Explore the fishing coast and beach.",evening:"Golden-hour walk along the shore.",stay:"Negombo",travel:"~30 min from Colombo"},
  Kandy:{tag:"CULTURE",morning:"Explore the hill-country city.",afternoon:"Visit the Temple of the Tooth and lake area.",evening:"Experience Kandy after the crowds soften.",stay:"Kandy",travel:"~3–4 hrs from Cultural Triangle"},
  Sigiriya:{tag:"HERITAGE",morning:"Climb and explore the iconic rock fortress.",afternoon:"Discover the surrounding gardens and village landscape.",evening:"Sunset over the dry-zone countryside.",stay:"Sigiriya / Dambulla",travel:"~3–4 hrs from Colombo"},
  Dambulla:{tag:"HERITAGE",morning:"Explore the cave temple complex.",afternoon:"Take a relaxed countryside drive.",evening:"Local dinner and early rest.",stay:"Dambulla / Sigiriya",travel:"~25 min to Sigiriya"},
  Anuradhapura:{tag:"HERITAGE",morning:"Discover the ancient sacred city.",afternoon:"Explore major ruins and reservoirs.",evening:"Quiet evening in the heritage zone.",stay:"Anuradhapura",travel:"~4–5 hrs from Colombo"},
  Polonnaruwa:{tag:"HERITAGE",morning:"Cycle or walk through the ancient city.",afternoon:"Explore monuments and historic landscapes.",evening:"Relax near the cultural triangle.",stay:"Polonnaruwa / Sigiriya",travel:"~1–1.5 hrs from Sigiriya"},
  Nuwara_Eliya:{tag:"HIGHLANDS",morning:"Travel into cool tea country.",afternoon:"Visit a tea estate and scenic viewpoints.",evening:"Slow evening in the highlands.",stay:"Nuwara Eliya",travel:"~2.5–3 hrs from Kandy"},
  Ella:{tag:"HIGHLANDS",morning:"Choose a scenic hike or viewpoint.",afternoon:"Explore Ella and its tea-country scenery.",evening:"Mountain sunset and relaxed local evening.",stay:"Ella",travel:"~2.5–3 hrs from Nuwara Eliya"},
  Galle:{tag:"COAST + HISTORY",morning:"Enter the historic Galle Fort.",afternoon:"Explore lanes, ramparts and galleries.",evening:"Watch the sun set over the fort walls.",stay:"Galle",travel:"~2–3 hrs from Yala / ~1.5 hrs from Ella"},
  Unawatuna:{tag:"BEACH",morning:"Start with a quiet beach morning.",afternoon:"Swim, snorkel or explore the coast.",evening:"Relax by the sea.",stay:"Unawatuna",travel:"~15 min from Galle"},
  Mirissa:{tag:"COAST",morning:"Optional whale-watching experience.",afternoon:"Slow beach time and coastal exploration.",evening:"Sunset by the bay.",stay:"Mirissa",travel:"~1 hr from Galle"},
  Yala:{tag:"WILDLIFE",morning:"Wildlife-focused safari experience.",afternoon:"Relax and enjoy the surrounding landscape.",evening:"Quiet evening near the park.",stay:"Yala / Tissamaharama",travel:"~2–3 hrs from Ella"},
  Udawalawe:{tag:"WILDLIFE",morning:"Explore the national-park landscape.",afternoon:"Wildlife-focused experience or rest.",evening:"Relax in the countryside.",stay:"Udawalawe",travel:"~1.5–2 hrs from Ella"},
  Minneriya:{tag:"WILDLIFE",morning:"Explore the dry-zone landscape.",afternoon:"Wildlife experience around the park.",evening:"Relax near Sigiriya.",stay:"Sigiriya / Habarana",travel:"~30–45 min from Sigiriya"},
  Wilpattu:{tag:"WILDLIFE",morning:"Enter Sri Lanka’s large wilderness landscape.",afternoon:"Wildlife-focused park experience.",evening:"Rest near the park.",stay:"Wilpattu area",travel:"Long transfer; plan an early start"},
  Kithulgala:{tag:"ADVENTURE",morning:"Outdoor adventure in the rainforest.",afternoon:"River, forest and village scenery.",evening:"Relax in the green valley.",stay:"Kithulgala",travel:"~2.5–3 hrs from Colombo"},
  Knuckles:{tag:"NATURE",morning:"Head into the mountain landscape.",afternoon:"Hike through forest and highland scenery.",evening:"Quiet mountain stay.",stay:"Knuckles / Matale area",travel:"Mountain transfer; allow extra time"},
  Arugam_Bay:{tag:"SURF COAST",morning:"Beach and surf-focused morning.",afternoon:"Explore the bay and nearby coast.",evening:"Slow evening by the ocean.",stay:"Arugam Bay",travel:"Long east-coast transfer"},
  Bentota:{tag:"COAST",morning:"Easy beach start.",afternoon:"Water-based or river experience.",evening:"Relaxed coastal evening.",stay:"Bentota",travel:"~1.5–2 hrs from Colombo"},
  Trincomalee:{tag:"EAST COAST",morning:"Explore the historic harbour area.",afternoon:"Coastal viewpoints and local culture.",evening:"Sunset by the east coast.",stay:"Trincomalee",travel:"Long transfer from south/west"},
  Nilaveli:{tag:"BEACH",morning:"Quiet beach morning.",afternoon:"Sea and island experiences.",evening:"Slow evening beside the water.",stay:"Nilaveli",travel:"~20–30 min from Trincomalee"},
  Weligama:{tag:"SURF COAST",morning:"Begin with the bay and surf scene.",afternoon:"Explore the south coast.",evening:"Beach sunset.",stay:"Weligama",travel:"~30 min from Mirissa"},
  Hiriketiya:{tag:"HIDDEN COAST",morning:"Slow morning in the bay.",afternoon:"Surf, swim or explore nearby coves.",evening:"Relaxed coastal evening.",stay:"Hiriketiya / Dikwella",travel:"~45 min from Mirissa"},
  Jaffna:{tag:"NORTH",morning:"Discover northern Sri Lankan culture.",afternoon:"Explore historic and local landmarks.",evening:"Taste northern flavours.",stay:"Jaffna",travel:"Long northern transfer"},
  South_Coast:{tag:"COAST",morning:"Choose a quiet beach or coastal village.",afternoon:"Slow travel along the southern shoreline.",evening:"Final ocean sunset.",stay:"South Coast",travel:"Flexible coastal transfer"}
};
const detailFor = name => placeDetails[name.replaceAll(" ","_")] || {tag:"SRI LANKA",morning:"Explore the destination at your own pace.",afternoon:"Discover a local experience.",evening:"Relax and enjoy the evening.",stay:name,travel:"Local transfer"};


const places = {
  "Colombo":[6.9271,79.8612,"Coast"],"Negombo":[7.2083,79.8358,"Coast"],"Kandy":[7.2906,80.6337,"Heritage"],
  "Sigiriya":[7.9570,80.7603,"Heritage"],"Dambulla":[7.8731,80.7718,"Heritage"],"Anuradhapura":[8.3114,80.4037,"Heritage"],
  "Polonnaruwa":[7.9403,81.0188,"Heritage"],"Nuwara Eliya":[6.9497,80.7891,"Nature"],"Ella":[6.8667,81.0466,"Nature"],
  "Galle":[6.0329,80.2168,"Coast"],"Unawatuna":[6.0090,80.2490,"Coast"],"Mirissa":[5.9483,80.4716,"Coast"],
  "Yala":[6.3725,81.5185,"Wildlife"],"Udawalawe":[6.4759,80.8886,"Wildlife"],"Minneriya":[8.0352,80.9147,"Wildlife"],
  "Wilpattu":[8.5167,80.0833,"Wildlife"],"Kithulgala":[6.9900,80.4170,"Nature"],"Knuckles":[7.4167,80.8000,"Nature"],
  "Arugam Bay":[6.8400,81.8350,"Coast"],"Bentota":[6.4211,80.0000,"Coast"],"Trincomalee":[8.5874,81.2152,"Coast"],
  "Nilaveli":[8.6913,81.1890,"Coast"],"Jaffna":[9.6615,80.0255,"Heritage"],"Weligama":[5.9739,80.4298,"Coast"],
  "Hiriketiya":[5.9667,80.7000,"Coast"],"South Coast":[6.03,80.30,"Coast"]
};

const map=L.map("map",{scrollWheelZoom:false}).setView([7.6,80.7],7.3);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors"}).addTo(map);

const markers={};
Object.entries(places).forEach(([name,[lat,lng,type]])=>{
  const color={Nature:"#4d875e",Coast:"#238c9a",Heritage:"#9A895F",Wildlife:"#5a5140"}[type]||"#16352D";
  const icon=L.divIcon({className:"custom-marker",html:`<span style="display:block;width:14px;height:14px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 1px 6px rgba(0,0,0,.25)"></span>`,iconSize:[14,14],iconAnchor:[7,7]});
  markers[name]=L.marker([lat,lng],{icon}).addTo(map).bindPopup(`<div class="popup-title">${name}</div><div class="popup-type">${type}</div>`);
});

let selectedType="nature", days=5, pace="balanced";
const routeTitle=document.getElementById("result-title"), routeText=document.getElementById("result-text"), paceText=document.getElementById("result-pace");

function render(){
  const item=data[selectedType];
  let route=[...item.routes[days]];
  if(pace==="slow" && route.length>4) route=route.slice(0,Math.max(3,Math.ceil(route.length*.8)));
  if(pace==="more"){
    const extras={nature:["Horton Plains"],beach:["Bentota"],culture:["Dambulla"],wildlife:["Minneriya"],luxury:["Bentota"],adventure:["Kithulgala"]};
    const extra=extras[selectedType]?.find(x=>!route.includes(x));
    if(extra) route.splice(Math.min(2,route.length),0,extra);
  }
  routeTitle.textContent=`${item.title} · ${days} days`;
  routeText.textContent=route.join(" → ");
  paceText.textContent=pace==="slow"?"Slow & easy pace":pace==="more"?"See more · fuller route":"Balanced pace";
  document.getElementById("trip-summary").textContent=`${days} DAYS · ${pace==="slow"?"SLOW & EASY":pace==="more"?"SEE MORE":"BALANCED"}`;

  Object.values(markers).forEach(m=>m.setOpacity(.28));
  route.forEach(name=>{if(markers[name]) markers[name].setOpacity(1);});
  const coords=route.map(n=>places[n]).filter(Boolean).map(p=>[p[0],p[1]]);
  if(coords.length>1) map.fitBounds(coords,{padding:[45,45],maxZoom:8});

  const list=document.getElementById("itinerary-list");
  list.innerHTML="";
  for(let i=0;i<days;i++){
    const name=route[i % route.length];
    const d=detailFor(name);
    const card=document.createElement("article");
    card.className="day-card";
    card.innerHTML=`
      <div class="day-num">DAY ${String(i+1).padStart(2,"0")}</div>
      <div class="day-main">
        <div class="day-top"><span class="day-tag">${d.tag}</span><h4>${name}</h4></div>
        <div class="day-columns">
          <div><b>Morning</b><p>${d.morning}</p></div>
          <div><b>Afternoon</b><p>${d.afternoon}</p></div>
          <div><b>Evening</b><p>${d.evening}</p></div>
        </div>
      </div>
      <div class="day-side"><span>STAY</span><strong>${d.stay}</strong><small>${d.travel}</small></div>`;
    card.addEventListener("click",()=>{ if(markers[name]){markers[name].openPopup(); map.setView(markers[name].getLatLng(),8);}});
    list.appendChild(card);
  }
}

document.querySelectorAll(".experience-card").forEach(card=>card.addEventListener("click",()=>{
  document.querySelectorAll(".experience-card").forEach(c=>c.classList.remove("active"));
  card.classList.add("active"); selectedType=card.dataset.type; render();
}));
document.querySelectorAll("#days .choice").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll("#days .choice").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active"); days=Number(btn.dataset.days); render();
}));
document.querySelectorAll("#pace .choice").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll("#pace .choice").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active"); pace=btn.dataset.pace; render();
}));
render();

const priceBase = {5:[750,1050],7:[950,1350],10:[1250,1750],14:[1650,2350]};
let stayLevel="comfort", transport="driver";

function updateEstimate(){
  let [lo,hi]=priceBase[days];
  const stayMult={comfort:1,boutique:1.35,luxury:1.85}[stayLevel];
  const transportMult={driver:1.15,mix:1.0}[transport];
  lo=Math.round(lo*stayMult*transportMult/10)*10;
  hi=Math.round(hi*stayMult*transportMult/10)*10;
  document.getElementById("estimate").textContent=`US$ ${lo.toLocaleString()} – ${hi.toLocaleString()}`;
}
document.querySelectorAll("#stay-level .mini-choice").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll("#stay-level .mini-choice").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active"); stayLevel=btn.dataset.stay; updateEstimate();
}));
document.querySelectorAll("#transport .mini-choice").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll("#transport .mini-choice").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active"); transport=btn.dataset.transport; updateEstimate();
}));
document.getElementById("save-btn").addEventListener("click",()=>{
  localStorage.setItem("lankaoraJourney",JSON.stringify({selectedType,days,pace,stayLevel,transport}));
  const b=document.getElementById("save-btn"); b.textContent="✓ Journey saved"; setTimeout(()=>b.textContent="♡ Save journey",1800);
});
document.getElementById("share-btn").addEventListener("click",async()=>{
  const share={title:"My Lankaora Journey",text:`${data[selectedType].title} · ${days} days · ${pace}`};
  try{
    if(navigator.share) await navigator.share(share);
    else { await navigator.clipboard.writeText(`${share.title}
${share.text}`); const b=document.getElementById("share-btn"); b.textContent="✓ Copied"; setTimeout(()=>b.textContent="↗ Share journey",1800); }
  }catch(e){}
});
const oldRender = render;
render = function(){ oldRender(); updateEstimate(); };
render();

const destinationProfiles={
 Sigiriya:{tag:"HERITAGE + NATURE",title:"Sigiriya",intro:"A dramatic rock fortress rising from the heart of Sri Lanka’s cultural landscape.",experiences:["Rock fortress","Ancient gardens","Village landscapes","Sunset viewpoints"],stay:"1–2 nights",best:"Dry-zone seasons vary; check conditions before travel."},
 Kandy:{tag:"CULTURE + HIGHLANDS",title:"Kandy",intro:"A historic hill-country city shaped by sacred places, lake views and living traditions.",experiences:["Temple of the Tooth","Kandy Lake","Cultural traditions","Hill-country gateways"],stay:"1–2 nights",best:"A flexible stop on a central highlands route."},
 Ella:{tag:"HIGHLANDS",title:"Ella",intro:"Mountain scenery, tea country and slow mornings make Ella a natural pause in the journey.",experiences:["Nine Arches Bridge","Little Adam’s Peak","Tea country","Scenic train journey"],stay:"2–3 nights",best:"Great for travellers who want scenery and an active-but-relaxed pace."},
 Galle:{tag:"COAST + HISTORY",title:"Galle",intro:"A historic fort city where colonial-era streets meet the Indian Ocean.",experiences:["Galle Fort","Ramparts","Old-town streets","South-coast beaches"],stay:"1–2 nights",best:"Works especially well as a southern-coast base."},
 Yala:{tag:"WILDLIFE",title:"Yala",intro:"A gateway to Sri Lanka’s wild landscapes and one of the island’s best-known national parks.",experiences:["National park","Wild landscapes","Birdlife","Safari experience"],stay:"1–2 nights",best:"Park access and wildlife conditions can vary by season and official rules."},
 Mirissa:{tag:"COAST",title:"Mirissa",intro:"A compact south-coast escape built around beaches, ocean views and coastal experiences.",experiences:["Beach","Whale watching","Coastal walks","South-coast food"],stay:"2 nights",best:"The south coast has seasonal differences; choose the coast that fits your travel dates."},
 "Nuwara Eliya":{tag:"TEA COUNTRY",title:"Nuwara Eliya",intro:"Cooler air, rolling tea country and a slower rhythm high above the coast.",experiences:["Tea estates","Highland viewpoints","Gardens","Scenic drives"],stay:"1–2 nights",best:"Ideal when you want a cooler highland break."},
 Dambulla:{tag:"HERITAGE",title:"Dambulla",intro:"A practical cultural base connecting cave temples, Sigiriya and the wider Cultural Triangle.",experiences:["Cave temple","Cultural Triangle","Countryside","Sigiriya gateway"],stay:"1 night",best:"Useful as a flexible base when combining several heritage sites."}
};
function openDestination(name){
 const d=destinationProfiles[name]; if(!d) return;
 const box=document.getElementById("destination-detail");
 box.hidden=false;
 const imgs={
Sigiriya:"https://images.unsplash.com/photo-1586613832948-5a3a6a2c2a1f?auto=format&fit=crop&w=1800&q=85",
Kandy:"https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1800&q=85",
Ella:"https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1800&q=85",
Galle:"https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1800&q=85",
Yala:"https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1800&q=85",
Mirissa:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85",
"Nuwara Eliya":"https://images.unsplash.com/photo-1596323707777-5d4c2f8b7e44?auto=format&fit=crop&w=1800&q=85",
Dambulla:"https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1800&q=85"
};
const img=imgs[name]||imgs.Ella;
box.innerHTML=`<div class="detail-hero" style="background-image:linear-gradient(180deg,rgba(0,0,0,.04),rgba(0,0,0,.62)),url('${img}')"><button class="detail-close" aria-label="Close">×</button><div class="detail-hero-copy"><span>${d.tag}</span><h3>${d.title}</h3><p>${d.intro}</p></div></div><div class="detail-body"><div><span>EXPERIENCES</span><div class="experience-pills">${d.experiences.map(x=>`<i>${x}</i>`).join("")}</div></div><div class="detail-facts"><div><small>RECOMMENDED STAY</small><strong>${d.stay}</strong></div><div><small>GOOD TO KNOW</small><strong>${d.best}</strong></div></div></div><div class="detail-actions"><button class="add-destination">＋ Add to my journey</button><button class="view-map">View on map ↗</button></div>`;
 box.querySelector(".detail-close").onclick=()=>box.hidden=true;
 box.querySelector(".add-destination").onclick=()=>{
   const current=data[selectedType].routes[days]; if(!current.includes(name)) current.push(name);
   render(); box.querySelector(".add-destination").textContent="✓ Added to journey";
 };
 box.querySelector(".view-map").onclick=()=>{if(markers[name]){markers[name].openPopup();map.setView(markers[name].getLatLng(),8);document.getElementById("map-section").scrollIntoView({behavior:"smooth"});}};
 box.scrollIntoView({behavior:"smooth",block:"center"});
}
document.querySelectorAll(".destination-card").forEach(c=>c.addEventListener("click",()=>{location.hash=encodeURIComponent(c.dataset.place);openDestination(c.dataset.place)}));

window.addEventListener("hashchange",()=>{const n=decodeURIComponent(location.hash.slice(1));if(destinationProfiles[n])openDestination(n)});

// V11 — production backend adapter with local fallback for static preview
const API_BASE = window.LANKAORA_API_BASE || "";
async function api(path, options={}){
  const res=await fetch(API_BASE+path,{headers:{"Content-Type":"application/json",...(options.headers||{})},...options});
  const body=await res.json().catch(()=>({}));
  if(!res.ok) throw new Error(body.error||`Request failed (${res.status})`);
  return body;
}
function syncTripForm(){
  const r=document.getElementById("form-route"), sm=document.getElementById("form-summary");
  if(r) r.textContent=`${data[selectedType].title} · ${days} days`;
  if(sm) sm.textContent=`${pace==="slow"?"Slow & easy":pace==="more"?"See more":"Balanced"} · ${transport==="mix"?"Driver + train":"Private driver"}`;
}
const buildLink=document.querySelector('.nav-cta');
if(buildLink){buildLink.textContent="Build My Trip";buildLink.href="#build-trip";}
document.querySelectorAll('.hero-button').forEach(b=>b.addEventListener('click',()=>setTimeout(syncTripForm,50)));
const tripForm=document.getElementById("trip-form"), success=document.getElementById("form-success");
tripForm?.addEventListener("submit",async e=>{
 e.preventDefault();
 const req={arrival:document.getElementById("arrival-date").value,travellers:document.getElementById("travellers").value,name:document.getElementById("guest-name").value,email:document.getElementById("guest-email").value,country:document.getElementById("guest-country").value,style:document.getElementById("trip-style").value,message:document.getElementById("guest-message").value,route:data[selectedType].title,days,pace,transport};
 const submit=tripForm.querySelector('button[type="submit"]'); if(submit) {submit.disabled=true;submit.textContent="Sending…";}
 try{
   const result=await api('/api/trip-requests',{method:'POST',body:JSON.stringify(req)});
   localStorage.removeItem('lankaoraTripRequest'); localStorage.removeItem('lankaoraTripRequests');
   tripForm.hidden=true; success.hidden=false; success.scrollIntoView({behavior:"smooth",block:"center"});
   if(success.querySelector('p:last-of-type')) success.querySelector('p:last-of-type').textContent=`Request #${result.id} received. We’ll use your route and preferences to prepare a personalised proposal.`;
 }catch(err){
   // Static preview remains usable without a backend.
   req.created=new Date().toISOString();req.status='New';
   localStorage.setItem('lankaoraTripRequest',JSON.stringify(req));
   const a=JSON.parse(localStorage.getItem('lankaoraTripRequests')||'[]');a.unshift(req);localStorage.setItem('lankaoraTripRequests',JSON.stringify(a));
   tripForm.hidden=true;success.hidden=false;success.scrollIntoView({behavior:"smooth",block:"center"});
 }
 if(submit){submit.disabled=false;submit.innerHTML='Send trip request <span>↗</span>';}
});
document.getElementById("edit-request")?.addEventListener("click",()=>{success.hidden=true;tripForm.hidden=false;tripForm.scrollIntoView({behavior:"smooth",block:"center"});});
syncTripForm();

// Admin dashboard: secure server session when running V11, local demo only when opened as a static file.
const ADMIN_KEY='lankaora_admin_session';
let serverAuthenticated=false;
function localRequests(){return JSON.parse(localStorage.getItem('lankaoraTripRequests')||'[]');}
function renderAdminRows(rows){
 const list=document.getElementById('requestList'); if(!list)return;
 list.innerHTML=rows.length?rows.map(r=>`<div class="request-card"><div><h3>${r.name||'Traveller'}</h3><p>${r.email||''} · ${r.country||''}</p><p>${r.days||''} days · ${r.travellers||r.travelers||''} travellers · ${r.style||r.stayLevel||''}</p></div><div><p><strong>Journey</strong></p><p>${r.route||r.journey||r.selectedType||'Custom Sri Lanka journey'}</p><p>${r.message||''}</p></div><select data-id="${r.id||''}" data-index="${r._index??''}" class="request-status"><option ${r.status==='New'?'selected':''}>New</option><option ${r.status==='Reviewing'?'selected':''}>Reviewing</option><option ${r.status==='Quoted'?'selected':''}>Quoted</option><option ${r.status==='Closed'?'selected':''}>Closed</option></select></div>`).join(''):'<div class="request-card"><p>No trip requests yet.</p></div>';
 list.querySelectorAll('.request-status').forEach(sel=>sel.addEventListener('change',async e=>{
   try{if(serverAuthenticated){await api('/api/trip-requests/'+e.target.dataset.id,{method:'PATCH',body:JSON.stringify({status:e.target.value})});await renderAdmin();}
   else{const a=localRequests();a[+e.target.dataset.index].status=e.target.value;localStorage.setItem('lankaoraTripRequests',JSON.stringify(a));renderAdmin();}}
   catch(err){alert(err.message)}
 }));
}
async function renderAdmin(){
 const q=(document.getElementById('adminSearch')?.value||'').toLowerCase(), f=document.getElementById('statusFilter')?.value||'all';
 let all=[];
 try{if(serverAuthenticated){all=(await api('/api/trip-requests?q='+encodeURIComponent(q)+'&status='+encodeURIComponent(f))).requests;}}
 catch(e){serverAuthenticated=false;}
 if(!serverAuthenticated){all=localRequests().map((r,i)=>({...r,_index:i})).filter(r=>(f==='all'||r.status===f)&&(!q||JSON.stringify(r).toLowerCase().includes(q)));}
 document.getElementById('newCount').textContent=all.filter(r=>r.status==='New').length;
 document.getElementById('reviewCount').textContent=all.filter(r=>r.status==='Reviewing').length;
 document.getElementById('quotedCount').textContent=all.filter(r=>r.status==='Quoted').length;
 document.getElementById('totalCount').textContent=all.length;
 renderAdminRows(all);
}
async function openAdmin(){document.getElementById('adminDashboard').classList.add('active');await renderAdmin();}
document.getElementById('openAdmin')?.addEventListener('click',()=>document.getElementById('adminGate').classList.add('active'));
document.getElementById('adminLogin')?.addEventListener('click',async()=>{
 const email=document.getElementById('adminEmail').value.trim(), password=document.getElementById('adminPassword').value;
 try{await api('/api/auth/login',{method:'POST',body:JSON.stringify({email,password})});serverAuthenticated=true;document.getElementById('adminGate').classList.remove('active');openAdmin();}
 catch(err){
   // Never accept credentials in production preview. Static mode only shows local demo data.
   if(!API_BASE && location.protocol==='file:'){localStorage.setItem(ADMIN_KEY,'1');document.getElementById('adminGate').classList.remove('active');openAdmin();}
   else alert(err.message);
 }
});
document.getElementById('adminLogout')?.addEventListener('click',async()=>{try{if(serverAuthenticated)await api('/api/auth/logout',{method:'POST'});}catch(e){} serverAuthenticated=false;localStorage.removeItem(ADMIN_KEY);document.getElementById('adminDashboard').classList.remove('active');});
document.getElementById('adminSearch')?.addEventListener('input',renderAdmin);document.getElementById('statusFilter')?.addEventListener('change',renderAdmin);
(async()=>{try{const me=await api('/api/auth/me');serverAuthenticated=me.authenticated;if(serverAuthenticated)openAdmin();}catch(e){}})();

// Restore the selected builder settings from the saved journey when available.
try{const saved=JSON.parse(localStorage.getItem('lankaoraJourney')||'null');if(saved){selectedType=saved.selectedType||selectedType;days=Number(saved.days)||days;pace=saved.pace||pace;stayLevel=saved.stayLevel||'comfort';transport=saved.transport||'driver';}}catch(e){}
render();

let inventoryKind='stay';
async function loadInventory(){
  const dest=document.getElementById('inventory-destination').value;
  const tier=document.getElementById('inventory-tier').value;
  const res=await fetch(`/api/inventory?kind=${encodeURIComponent(inventoryKind)}&destination=${encodeURIComponent(dest)}&tier=${encodeURIComponent(tier)}`);
  const data=await res.json(); const grid=document.getElementById('inventory-grid');
  const opts=[...new Set(data.items.map(x=>x.destination).filter(x=>!['Island-wide','Island routes'].includes(x)))];
  const ds=document.getElementById('inventory-destination'); const old=ds.value;
  if(ds.options.length===1){opts.forEach(x=>ds.add(new Option(x,x)))}
  if([...ds.options].some(o=>o.value===old)) ds.value=old;
  grid.innerHTML=data.items.length?data.items.map(x=>`<article class="inventory-card"><div class="inventory-icon">${x.kind==='stay'?'STAY':'MOVE'}</div><div><span class="inventory-kicker">${x.tier||'OPTION'} · ${x.destination}</span><h3>${x.name}</h3><p>${x.description}</p></div><div class="inventory-price"><strong>US$ ${Number(x.price_from).toLocaleString()}–${Number(x.price_to).toLocaleString()}</strong><small>${x.unit}</small></div><button class="inventory-add" data-id="${x.id}">Add to journey</button></article>`).join(''):'<div class="inventory-empty">No options match these filters yet.</div>';
  grid.querySelectorAll('.inventory-add').forEach(btn=>btn.addEventListener('click',()=>{localStorage.setItem('lankaoraInventoryChoice',JSON.stringify({kind:inventoryKind,id:Number(btn.dataset.id)}));btn.textContent='✓ Added';setTimeout(()=>btn.textContent='Add to journey',1300)}));
}
document.querySelectorAll('.inventory-tab').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.inventory-tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');inventoryKind=b.dataset.kind;document.getElementById('inventory-tier').value='all';loadInventory();}));
document.getElementById('inventory-destination').addEventListener('change',loadInventory);document.getElementById('inventory-tier').addEventListener('change',loadInventory);loadInventory();

// V14 — Smart Journey Engine
const smartProfiles={
 nature:["Ella","Nuwara Eliya","Knuckles","Sigiriya","Mirissa","Yala"],
 beach:["Mirissa","Unawatuna","Galle","Weligama","Hiriketiya","Bentota","Nilaveli"],
 culture:["Sigiriya","Kandy","Dambulla","Anuradhapura","Polonnaruwa","Galle","Jaffna"],
 wildlife:["Yala","Udawalawe","Minneriya","Wilpattu","Sigiriya","Ella"],
 luxury:["Galle","Nuwara Eliya","Sigiriya","Kandy","Mirissa","Ella"],
 adventure:["Ella","Kithulgala","Knuckles","Arugam Bay","Sigiriya","Yala"]
};
const smartTags={Ella:"Mountains · Scenic",Nuwara_Eliya:"Tea · Highlands",Knuckles:"Hiking · Wilderness",Sigiriya:"Heritage · Nature",Mirissa:"Beach · Coast",Yala:"Wildlife · Safari",Unawatuna:"Beach · Snorkel",Galle:"Fort · Coast",Weligama:"Surf · Coast",Hiriketiya:"Hidden coast · Surf",Bentota:"Beach · River",Nilaveli:"Beach · East coast",Kandy:"Culture · Hills",Dambulla:"Heritage · Cave temple",Anuradhapura:"Ancient city · Heritage",Polonnaruwa:"Ancient city · Heritage",Jaffna:"North · Culture",Udawalawe:"Wildlife · Nature",Minneriya:"Wildlife · Dry zone",Wilpattu:"Wilderness · Wildlife",Kithulgala:"Rainforest · Adventure",Arugam_Bay:"Surf · Adventure"};
function smartRank(){
  const base=smartProfiles[selectedType]||smartProfiles.nature;
  const current=new Set(data[selectedType].routes[days]||[]);
  let limit=days<=5?4:days<=7?5:6;
  let list=base.filter(x=>!current.has(x)).slice(0,limit);
  if(pace==="slow") list=list.slice(0,Math.max(3,limit-1));
  if(pace==="more") list=base.filter(x=>!current.has(x)).slice(0,Math.min(7,limit+1));
  return list;
}
function renderSmart(){
 const grid=document.getElementById("smart-grid"),count=document.getElementById("smart-count"),label=document.getElementById("smart-label");
 if(!grid)return;
 const list=smartRank(); count.textContent=`${list.length} ${list.length===1?"place":"places"}`;
 label.textContent=`MATCHED TO ${data[selectedType].title.toUpperCase()} · ${days} DAYS · ${pace==="slow"?"SLOW & EASY":pace==="more"?"SEE MORE":"BALANCED"}`;
 grid.innerHTML=list.map((name,i)=>{const key=name.replaceAll(" ","_");return `<article class="smart-card"><div class="smart-number">0${i+1}</div><div><span>${smartTags[key]||"Sri Lanka · Experience"}</span><h3>${name}</h3><p>${detailFor(name).morning}</p></div><button data-smart="${name}">＋ Add</button></article>`}).join("") || `<div class="smart-empty">Your current route already covers the strongest matches. Try a longer trip or another travel style.</div>`;
 grid.querySelectorAll("button[data-smart]").forEach(btn=>btn.addEventListener("click",()=>{
   const name=btn.dataset.smart,route=data[selectedType].routes[days]; if(!route.includes(name)) route.push(name); render(); renderSmart(); btn.textContent="✓ Added"; btn.disabled=true;
 }));
}
const originalRenderForSmart=render;
render=function(){ originalRenderForSmart(); renderSmart(); };
render();

const seasonProfiles={
1:["South & west are calling.","South Coast|West Coast|Hill Country","Mirissa|Galle|Bentota|Ella|Nuwara Eliya"],
2:["Coast + highlands work beautifully.","South Coast|West Coast|Hill Country","Mirissa|Galle|Bentota|Ella|Nuwara Eliya"],
3:["A flexible island month.","South Coast|Cultural Triangle|Hill Country","Galle|Mirissa|Sigiriya|Kandy|Ella"],
4:["Warm and transition-friendly.","Cultural Triangle|Hill Country|Flexible Coast","Sigiriya|Kandy|Ella|Galle"],
5:["Look east for the coast.","East Coast|North East|Cultural Triangle","Trincomalee|Nilaveli|Arugam Bay|Sigiriya"],
6:["East-coast season.","East Coast|Dry Zone|Cultural Triangle","Trincomalee|Nilaveli|Pasikudah|Arugam Bay|Sigiriya"],
7:["East + culture make a strong route.","East Coast|Dry Zone|Culture","Trincomalee|Nilaveli|Pasikudah|Arugam Bay|Sigiriya"],
8:["Follow the sun east.","East Coast|Cultural Triangle|Inland","Trincomalee|Pasikudah|Arugam Bay|Sigiriya|Kandy"],
9:["Keep the route adaptable.","East Coast|Dry Zone|Flexible Route","Trincomalee|Arugam Bay|Sigiriya|Kandy"],
10:["The island is changing seasons.","Culture|Highlands|Flexible Route","Sigiriya|Kandy|Ella|Galle"],
11:["Transition toward south & west.","Culture|Hill Country|South Coast","Sigiriya|Kandy|Ella|Galle|Mirissa"],
12:["Southwest season begins.","South Coast|West Coast|Hill Country","Mirissa|Galle|Bentota|Ella|Kandy"]};
function renderSeason(m){if(!m)return;const p=seasonProfiles[m],r=document.getElementById("season-result"),t=document.getElementById("season-tags");r.innerHTML=`<span>SMART SEASON MATCH</span><h3>${p[0]}</h3><p>Season-aware suggestions are now prioritised for this journey.</p>`;t.innerHTML=p[1].split("|").map((x,i)=>`<span class="${i===0?"best":""}">${x}</span>`).join("");localStorage.setItem("lankaoraTravelMonth",m);document.querySelectorAll(".smart-card,[data-place]").forEach(c=>{let n=(c.dataset.place||c.textContent).toLowerCase();c.classList.toggle("season-match",p[2].split("|").some(x=>n.includes(x.toLowerCase())))})}
document.addEventListener("DOMContentLoaded",()=>{const s=document.getElementById("travel-month");if(!s)return;let m=localStorage.getItem("lankaoraTravelMonth");if(m){s.value=m;renderSeason(+m)}s.addEventListener("change",()=>renderSeason(+s.value))});

// V16 — route intelligence. Uses approximate straight-line distances for planning logic.
const routeCoords={
Colombo:[6.9271,79.8612],Negombo:[7.2083,79.8358],Kandy:[7.2906,80.6337],
Sigiriya:[7.9570,80.7603],Dambulla:[7.8731,80.7718],NuwaraEliya:[6.9497,80.7891],
Ella:[6.8667,81.0466],Yala:[6.3728,81.5185],Mirissa:[5.9483,80.4587],
Galle:[6.0329,80.2168],Bentota:[6.4210,80.0000],Trincomalee:[8.5874,81.2152],
Nilaveli:[8.6936,81.1890],ArugamBay:[6.8400,81.8350],Pasikudah:[7.9225,81.5630]
};
const routeAliases={"Nuwara Eliya":"NuwaraEliya","Arugam Bay":"ArugamBay","Nilaveli Beach":"Nilaveli"};
function coord(name){return routeCoords[routeAliases[name]||name]||null}
function dist(a,b){const A=coord(a),B=coord(b);if(!A||!B)return 0;const R=6371,rad=Math.PI/180,dLat=(B[0]-A[0])*rad,dLon=(B[1]-A[1])*rad;const x=Math.sin(dLat/2)**2+Math.cos(A[0]*rad)*Math.cos(B[0]*rad)*Math.sin(dLon/2)**2;return 2*R*Math.asin(Math.sqrt(x))}
function getJourneyPlaces(){
  // Read common V14/V15 state shapes without breaking the existing engine.
  const candidates=[window.selectedPlaces,window.journeyPlaces,window.route,window.selectedDestinations];
  for(const c of candidates) if(Array.isArray(c)&&c.length) return c.map(x=>typeof x==="string"?x:(x.name||x.title)).filter(Boolean);
  const saved=localStorage.getItem("lankaoraJourney");
  try{const o=JSON.parse(saved||"{}"); if(Array.isArray(o.destinations)) return o.destinations.map(x=>x.name||x).filter(Boolean)}catch(e){}
  return [];
}
function renderRouteIntel(){
  const el=document.getElementById("route-stops"),alert=document.getElementById("route-alert"),score=document.getElementById("route-score"),note=document.getElementById("route-score-note");
  if(!el)return;
  const places=getJourneyPlaces();
  if(!places.length){el.innerHTML='<div class="route-stop"><b>Start building</b><span>Add destinations to see route intelligence.</span></div>';score.textContent="—";note.textContent="No route yet.";return}
  el.innerHTML=places.map((p,i)=>`<div class="route-stop"><b>${i+1}. ${p}</b><span>${i===0?"Starting point":i===places.length-1?"Journey end":"On your route"}</span></div>`).join("");
  let km=0; for(let i=1;i<places.length;i++) km+=dist(places[i-1],places[i]);
  let value=100;
  if(places.length>1){
    const avg=km/(places.length-1);
    if(avg>180)value-=25; else if(avg>120)value-=12;
    if(places.length>7)value-=10;
    if(places.length>10)value-=12;
  }
  value=Math.max(45,Math.min(100,value));
  score.textContent=value+"/100";
  note.textContent=km?`Approx. ${Math.round(km)} km between selected stops.`:"Distance data available for some stops.";
  if(value<75){alert.classList.add("show");alert.textContent="This route is a little spread out. Consider removing one stop or grouping nearby destinations to spend more time experiencing Sri Lanka and less time travelling."}
  else {alert.classList.remove("show");alert.textContent=""}
}
document.addEventListener("DOMContentLoaded",()=>{renderRouteIntel();setTimeout(renderRouteIntel,700)});

// V17 — route comparison and selection.
window.lankaoraActiveRoute = window.lankaoraActiveRoute || null;
const routePresets={
 relaxed:{name:"Relaxed",days:[5,7,10],message:"A slower route with fewer stops and more time in each place."},
 classic:{name:"Classic Island",days:[7,10],message:"A balanced route mixing culture, highlands, wildlife and coast."},
 explore:{name:"Explore More",days:[10,14],message:"A fuller route for travellers who want more regions and experiences."}
};
document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll(".choose-route").forEach(btn=>btn.addEventListener("click",()=>{
    const card=btn.closest(".route-option"), key=card.dataset.route, p=routePresets[key];
    document.querySelectorAll(".route-option").forEach(c=>c.classList.remove("selected"));
    card.classList.add("selected");
    const picked=document.getElementById("route-picked");
    picked.innerHTML=`<strong>${p.name} selected.</strong> ${p.message} Recommended trip lengths: ${p.days.join(" / ")} days. Your current journey stays intact until you choose to replace it.`;
    picked.classList.add("show");
    localStorage.setItem("lankaoraRoutePreset",key); window.lankaoraActiveRoute=(document.getElementById("result-text")?.textContent||"").split(" → ").filter(Boolean);
  }));
  const saved=localStorage.getItem("lankaoraRoutePreset");
  if(saved){const c=document.querySelector(`[data-route="${saved}"]`);if(c)c.classList.add("selected")}
});

// V19 — verified supplier marketplace foundation.
let marketKind='all';
async function loadSuppliers(){
 const dest=document.getElementById('market-destination')?.value||'all'; const grid=document.getElementById('supplier-grid'); if(!grid)return;
 try{const r=await fetch(`/api/suppliers?kind=${encodeURIComponent(marketKind)}&destination=${encodeURIComponent(dest)}&status=Verified`);const d=await r.json();
 grid.innerHTML=d.items.length?d.items.map(x=>`<article class="supplier-card"><div class="supplier-top"><span class="supplier-kind">${x.kind}</span><span class="supplier-status">✓ Verified</span></div><h3>${x.business_name}</h3><p>${x.description||'Verified tourism supplier profile.'}</p><span class="supplier-location">${x.destination}</span><div class="supplier-verify"><span>Licence <b>${x.licence_no||'On file'}</b></span><span>Valid <b>${x.licence_valid_until||'Check'}</b></span></div></article>`).join(''):'<div class="inventory-empty">No verified suppliers match these filters yet.</div>';}catch(e){grid.innerHTML='<div class="inventory-empty">Marketplace is unavailable in preview mode.</div>'}
}
document.querySelectorAll('.market-tab').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.market-tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');marketKind=b.dataset.kind;loadSuppliers()}));
document.getElementById('market-destination')?.addEventListener('change',loadSuppliers);
document.getElementById('supplier-apply')?.addEventListener('click',()=>document.getElementById('build-trip')?.scrollIntoView({behavior:'smooth'}));
loadSuppliers();

// V20 — supplier portal UI.
function supplierMsg(id,text){const e=document.getElementById(id);if(e)e.textContent=text||''}
async function supplierMe(){try{const r=await fetch('/api/supplier/me');if(!r.ok)throw 0;const d=await r.json();showSupplierDash(d.supplier);return true}catch{return false}}
function showSupplierDash(s){document.getElementById('supplier-auth-card')?.classList.add('hidden');document.getElementById('supplier-dashboard')?.classList.remove('hidden');document.getElementById('supplier-apply')?.classList.add('hidden');document.getElementById('supplierDashName').textContent=s.business_name;document.getElementById('supplierDashStatus').textContent=s.status;['name','destination','reg','licence','valid','website','desc'].forEach(k=>{const map={name:s.business_name,destination:s.destination,reg:s.registration_no||'',licence:s.licence_no||'',valid:s.licence_valid_until||'',website:s.website||'',desc:s.description||''};const e=document.getElementById('sp-'+k);if(e)e.value=map[k]});loadSupplierBookings()}
async function loadSupplierBookings(){const box=document.getElementById('supplier-bookings-list');if(!box)return;try{const r=await fetch('/api/supplier/bookings');const d=await r.json();box.innerHTML=d.items.length?d.items.map(b=>`<div class="booking-row"><strong>${b.service}</strong><br>${b.customer_name} · ${b.customer_email}<br>${b.arrival||'Date not set'} · ${b.travellers} traveller(s)<br><span>${b.message||''}</span><div class="booking-actions">${['Reviewing','Confirmed','Declined','Completed'].map(st=>`<button data-booking="${b.id}" data-status="${st}">${st}</button>`).join('')}</div></div>`).join(''):'No booking requests yet.';box.querySelectorAll('[data-booking]').forEach(x=>x.onclick=async()=>{await fetch('/api/supplier/bookings/'+x.dataset.booking,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({status:x.dataset.status})});loadSupplierBookings()})}catch{box.textContent='Unable to load booking requests.'}}
document.addEventListener('DOMContentLoaded',()=>{
 document.getElementById('supplierLoginBtn')?.addEventListener('click',async()=>{const email=document.getElementById('supplierLoginEmail').value,password=document.getElementById('supplierLoginPassword').value;const r=await fetch('/api/supplier/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});const d=await r.json();if(!r.ok)return supplierMsg('supplier-login-msg',d.error||'Sign in failed');supplierMsg('supplier-login-msg','');await supplierMe()});
 document.getElementById('supplierLogout')?.addEventListener('click',async()=>{await fetch('/api/supplier/logout',{method:'POST'});location.reload()});
 document.getElementById('show-supplier-apply')?.addEventListener('click',()=>document.getElementById('supplier-apply')?.classList.toggle('hidden'));
 document.getElementById('supplier-apply-form')?.addEventListener('submit',async e=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.target).entries());const r=await fetch('/api/supplier/apply',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const d=await r.json();if(!r.ok)return supplierMsg('apply-msg',d.error||'Application failed');supplierMsg('apply-msg','Application received. Your supplier account is ready to sign in; public listing stays Pending until review.');e.target.reset()});
 document.getElementById('save-supplier-profile')?.addEventListener('click',async()=>{const body={business_name:document.getElementById('sp-name').value,destination:document.getElementById('sp-destination').value,registration_no:document.getElementById('sp-reg').value,licence_no:document.getElementById('sp-licence').value,licence_valid_until:document.getElementById('sp-valid').value,website:document.getElementById('sp-website').value,description:document.getElementById('sp-desc').value};const r=await fetch('/api/supplier/profile',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});supplierMsg('profile-msg',r.ok?'Profile saved.':'Could not save profile.');if(r.ok)supplierMe()});
 document.querySelectorAll('.dash-tab').forEach(t=>t.addEventListener('click',()=>{document.querySelectorAll('.dash-tab').forEach(x=>x.classList.remove('active'));t.classList.add('active');document.getElementById('supplier-profile-panel')?.classList.toggle('hidden',t.dataset.panel!=='profile');document.getElementById('supplier-bookings-panel')?.classList.toggle('hidden',t.dataset.panel!=='bookings');if(t.dataset.panel==='bookings')loadSupplierBookings()}));
 supplierMe();
});

// V22 — Customer My Trip / booking tracking
(function(){
 const form=document.getElementById('trip-track-form'); const dash=document.getElementById('trip-dashboard'); if(!form||!dash)return;
 const labels=['Requested','Reviewing','Quoted','Confirmed','Completed'];
 form.addEventListener('submit',async e=>{e.preventDefault(); const id=document.getElementById('track-booking-id').value.trim(); if(!id)return;
   dash.innerHTML='<div class="trip-empty"><strong>Looking up booking…</strong><small>Checking the Lankaora booking record.</small></div>';
   try{const r=await fetch('/api/bookings/'+encodeURIComponent(id)); if(!r.ok)throw new Error('not found'); const b=await r.json(); render(b); localStorage.setItem('lankaoraLastBookingId',id);}
   catch(err){dash.innerHTML='<div class="trip-empty"><strong>Booking not found.</strong><small>Check the Booking ID and try again. For a new request, use Build My Trip.</small></div>';}
 });
 function render(b){const status=(b.status||'Requested').toLowerCase(); const idx=Math.max(0,labels.findIndex(x=>x.toLowerCase()===status)); const esc=x=>String(x??'—').replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
  dash.innerHTML=`<div class="trip-card"><div class="trip-card-top"><div><span class="trip-id">BOOKING ${esc(b.booking_id||b.id)}</span><h3>${esc(b.service_name||b.supplier_name||'Sri Lanka Journey')}</h3><small>${esc(b.supplier_name||'Lankaora supplier')}</small></div><span class="trip-status">${esc(b.status||'Requested')}</span></div><div class="trip-grid"><div class="trip-cell"><span>Trip date</span><b>${esc(b.start_date||b.arrival_date)}</b></div><div class="trip-cell"><span>Travellers</span><b>${esc(b.travellers||b.guests)}</b></div><div class="trip-cell"><span>Quote</span><b>${b.quote_amount?esc((b.currency||'USD')+' '+b.quote_amount):'Awaiting quote'}</b></div><div class="trip-cell"><span>Payment</span><b>${esc(b.payment_status||'Not started')}</b></div></div><div class="trip-timeline">${labels.map((x,i)=>`<div class="trip-step ${i<idx?'done ':''}${i===idx?'current':''}">${x}</div>`).join('')}</div></div>`;
 }
 const last=localStorage.getItem('lankaoraLastBookingId'); if(last){document.getElementById('track-booking-id').value=last;}
})();

// V23 — customer account, saved journeys and booking history.
(function(){
 const auth=document.getElementById('account-auth'), dash=document.getElementById('account-dashboard'); if(!auth||!dash)return;
 const msg=(id,t)=>{const e=document.getElementById(id);if(e)e.textContent=t||''};
 async function api(url,opts={}){const r=await fetch(url,{credentials:'same-origin',...opts});let d={};try{d=await r.json()}catch{};if(!r.ok)throw new Error(d.error||'Request failed');return d}
 async function refresh(){try{const d=await api('/api/customer/me');show(d.customer);await loadJourneys();}catch{auth.classList.remove('hidden');dash.classList.add('hidden');document.getElementById('account-status').textContent='Not signed in'}}
 function show(c){auth.classList.add('hidden');dash.classList.remove('hidden');document.getElementById('account-status').textContent='Signed in · '+c.email;document.getElementById('account-name').textContent=c.name}
 async function loadJourneys(){const box=document.getElementById('saved-journeys-list');try{const d=await api('/api/customer/journeys');box.innerHTML=d.items.length?d.items.map(x=>{const j=x.journey||{};return `<article class="saved-card"><span class="saved-meta">SAVED JOURNEY</span><h4>${safe(x.title)}</h4><p>${safe(j.route||j.summary||'Your Lankaora journey is saved here.')}</p><p>${safe(j.days||'')} ${j.days?'days':''} ${j.pace?'· '+safe(j.pace):''}</p><div class="saved-buttons"><button data-load="${x.id}">Continue planning</button><button class="danger" data-delete="${x.id}">Delete</button></div></article>`}).join(''):'<div class="trip-empty"><strong>No saved journeys yet.</strong><small>Build a route above, then save it to your account.</small></div>';box.querySelectorAll('[data-delete]').forEach(b=>b.onclick=async()=>{await api('/api/customer/journeys/'+b.dataset.delete,{method:'DELETE'});loadJourneys()});box.querySelectorAll('[data-load]').forEach(b=>b.onclick=()=>{document.getElementById('journey')?.scrollIntoView({behavior:'smooth'});msg('save-journey-msg','Journey loaded as a planning reference. Adjust your choices above as needed.')});}catch(e){box.textContent=e.message}}
 async function loadBookings(){const box=document.getElementById('account-bookings-list');try{const d=await api('/api/customer/bookings');box.innerHTML=d.items.length?d.items.map(b=>`<article class="booking-mini"><strong>${safe(b.service)}</strong><small>${safe(b.business_name)} · ${safe(b.destination||'Sri Lanka')}<br>${safe(b.arrival||'Date not set')} · ${safe(b.travellers)} traveller(s)<br>Status: ${safe(b.status)} · Payment: ${safe(b.payment_status||'Not started')}${b.quoted_amount?' · '+safe((b.currency||'USD')+' '+b.quoted_amount):''}</small></article>`).join(''):'<div class="trip-empty"><strong>No bookings yet.</strong><small>Your confirmed or requested bookings will appear here.</small></div>'}catch(e){box.textContent=e.message}}
 function safe(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
 document.getElementById('customer-login-form')?.addEventListener('submit',async e=>{e.preventDefault();try{const d=await api('/api/customer/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:document.getElementById('customer-login-email').value,password:document.getElementById('customer-login-password').value})});msg('customer-login-msg','');show(d.customer);await loadJourneys()}catch(e){msg('customer-login-msg',e.message)}});
 document.getElementById('customer-signup-form')?.addEventListener('submit',async e=>{e.preventDefault();try{const d=await api('/api/customer/signup',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:document.getElementById('customer-signup-name').value,email:document.getElementById('customer-signup-email').value,password:document.getElementById('customer-signup-password').value})});msg('customer-signup-msg','');show(d.customer);await loadJourneys()}catch(e){msg('customer-signup-msg',e.message)}});
 document.getElementById('customer-logout')?.addEventListener('click',async()=>{await api('/api/customer/logout',{method:'POST'});location.reload()});
 document.querySelectorAll('.account-tab').forEach(t=>t.addEventListener('click',()=>{document.querySelectorAll('.account-tab').forEach(x=>x.classList.remove('active'));t.classList.add('active');const journeys=t.dataset.accountPanel==='journeys';document.getElementById('saved-journeys-panel').classList.toggle('hidden',!journeys);document.getElementById('account-bookings-panel').classList.toggle('hidden',journeys);if(!journeys)loadBookings()}));
 document.getElementById('save-current-journey')?.addEventListener('click',async()=>{try{const route=window.lankaoraActiveRoute||null;const data={route:route?route.join(' → '):document.getElementById('result-text')?.textContent,days:document.getElementById('trip-summary')?.textContent,pace:document.getElementById('result-pace')?.textContent,style:document.querySelector('.experience-card.active .card-title')?.textContent||''};await api('/api/customer/journeys',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title:(data.style||'My')+' Sri Lanka Journey',journey:data})});msg('save-journey-msg','Journey saved to your account.');loadJourneys()}catch(e){msg('save-journey-msg',e.message)}});
 refresh();
})();

// V24 — Journey Workspace. Uses the existing client-side journey state and customer booking API.
(function(){
 const root=document.getElementById('journey-workspace'); if(!root)return;
 const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
 function activeRoute(){return window.lankaoraActiveRoute||window.selectedPlaces||window.journeyPlaces||[];}
 function routeNames(){return activeRoute().map(x=>typeof x==='string'?x:(x?.name||x?.title)).filter(Boolean)}
 function update(){
   const r=routeNames();
   document.getElementById('ws-route').textContent=r.length?r.join(' → '):'Build a route above to see it here.';
   document.getElementById('ws-stops').textContent=r.length;
   document.getElementById('ws-flow').textContent=r.length?r.join('  →  '):'Start → Add destinations → Build your trip';
   const days=document.getElementById('trip-summary')?.textContent||document.getElementById('days')?.value||'—';
   document.getElementById('ws-days').textContent=days;
   document.getElementById('ws-pace').textContent=document.getElementById('result-pace')?.textContent||'Balanced';
   document.getElementById('ws-score').textContent=document.getElementById('route-score')?.textContent||'—';
   document.getElementById('ws-title').textContent=(r[0]?r[0]+' → Sri Lanka Journey':'My Sri Lanka Journey');
   const list=document.getElementById('ws-itinerary-list');
   list.innerHTML=r.length?r.map((x,i)=>`<div class="workspace-item"><strong>Day ${i+1} · ${esc(x)}</strong><small>${i===0?'Arrival / first experience':i===r.length-1?'Final stop / departure flow':'Explore, experience and continue your journey.'}</small></div>`).join(''):'<div class="workspace-empty">Your day-by-day plan will appear here after you build a journey.</div>';
 }
 document.querySelectorAll('.workspace-nav-btn').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.workspace-nav-btn').forEach(x=>x.classList.remove('active'));document.querySelectorAll('.workspace-panel').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.getElementById('workspace-'+b.dataset.workspaceTab)?.classList.add('active');if(b.dataset.workspaceTab==='bookings')loadBookings()}));
 async function loadBookings(){const box=document.getElementById('ws-bookings-list');try{const r=await fetch('/api/customer/bookings',{credentials:'same-origin'});if(!r.ok)throw 0;const d=await r.json();box.innerHTML=d.items.length?d.items.map(b=>`<div class="workspace-item"><strong>${esc(b.service)}</strong><small>${esc(b.business_name)} · ${esc(b.destination||'Sri Lanka')}<br>${esc(b.arrival||'Date not set')} · ${esc(b.travellers)} traveller(s) · Status: ${esc(b.status)} · Payment: ${esc(b.payment_status||'Not started')}</small></div>`).join(''):'<div class="workspace-empty">No bookings yet.</div>'}catch{box.innerHTML='<div class="workspace-empty">Sign in to load your booking history.</div>'}}
 document.getElementById('workspace-print')?.addEventListener('click',()=>window.print());
 document.getElementById('workspace-share')?.addEventListener('click',async()=>{const data={title:document.getElementById('ws-title').textContent,text:document.getElementById('ws-route').textContent,url:location.href};try{if(navigator.share)await navigator.share(data);else{await navigator.clipboard.writeText(location.href);alert('Journey link copied.')}}catch{}});
 update(); setInterval(update,1000);
})();

// V25 — Inquiry only. Follow-up is handled by email for now.
document.addEventListener("DOMContentLoaded",()=>{
 const form=document.getElementById("lankaoraInquiryForm"); const status=document.getElementById("inquiryStatus");
 if(!form)return; form.addEventListener("submit",async(e)=>{e.preventDefault(); status.textContent="Sending your inquiry…"; const data=Object.fromEntries(new FormData(form).entries());
   try{ const r=await fetch("/api/trip-requests",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}); const j=await r.json().catch(()=>({})); if(!r.ok)throw new Error(j.error||"Unable to send"); status.textContent=`Inquiry received${j.id?` — reference #${j.id}`:""}. We’ll continue by email.`; form.reset(); }catch(err){ status.textContent="Could not send right now. Please try again or contact us by email."; }
 });
});
