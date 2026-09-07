// V26 — Sri Lanka Content Foundation
const lankaoraContent = {
  regions: [
    {name:'South Coast', kicker:'OCEAN · FORTS · VILLAGES', text:'Historic Galle, surf bays, whale-watching waters and slow coastal towns.', places:'Galle · Unawatuna · Weligama · Mirissa · Hiriketiya'},
    {name:'Hill Country', kicker:'TEA · MIST · MOUNTAINS', text:'Cool highlands, tea estates, viewpoints, forests and scenic rail journeys.', places:'Kandy · Nuwara Eliya · Ella · Knuckles'},
    {name:'Cultural Triangle', kicker:'ANCIENT · SACRED · TIMELESS', text:'Rock fortresses, cave temples and the great ancient cities of Sri Lanka.', places:'Sigiriya · Dambulla · Anuradhapura · Polonnaruwa'},
    {name:'East Coast', kicker:'SUN · SURF · OPEN WATER', text:'Long beaches, warm seas, surf culture and a different rhythm of island life.', places:'Trincomalee · Nilaveli · Arugam Bay'},
    {name:'North', kicker:'IDENTITY · FOOD · HISTORY', text:'A distinct northern landscape shaped by history, culture and local flavours.', places:'Jaffna · Northern islands · Cultural sites'},
    {name:'Western Gateway', kicker:'CITY · COAST · ARRIVAL', text:'The practical starting point for many journeys, with city life and nearby coast.', places:'Colombo · Negombo · Bentota'},
    {name:'Wild Sri Lanka', kicker:'FORESTS · WILDLIFE · WILDERNESS', text:'Large national parks, rainforests and landscapes where the island feels truly wild.', places:'Yala · Wilpattu · Udawalawe · Sinharaja · Minneriya'},
    {name:'Sabaragamuwa & Uva', kicker:'GREEN · REMOTE · ADVENTURE', text:'Waterfalls, valleys, forests and quieter routes away from the classic circuit.', places:'Kithulgala · Ratnapura · Uva highlands'}
  ],
  routes: [
    {name:'Southern Coast Road', meta:'4–7 DAYS · COAST', stops:'Galle → Unawatuna → Weligama → Mirissa → Hiriketiya', text:'Follow the coast slowly, mixing heritage, surf and beach towns.'},
    {name:'Tea & Mountain Journey', meta:'4–6 DAYS · HIGHLANDS', stops:'Kandy → Nuwara Eliya → Ella', text:'Move from cultural heartland into tea country and mountain scenery.'},
    {name:'Ancient Sri Lanka', meta:'4–6 DAYS · HERITAGE', stops:'Kandy → Dambulla → Sigiriya → Polonnaruwa', text:'A heritage-focused route through temples, rock landscapes and ancient cities.'},
    {name:'Wild Heart of Sri Lanka', meta:'5–8 DAYS · WILDLIFE', stops:'Sigiriya → Minneriya → Ella → Yala', text:'Pair dry-zone wildlife with mountains and the southern wilderness.'},
    {name:'Island Highlights', meta:'8–12 DAYS · CLASSIC', stops:'Colombo → Sigiriya → Kandy → Ella → South Coast', text:'A first-timer route connecting several of the island’s most memorable landscapes.'}
  ],
  experiences: [
    ['Nature','Mountains, forests, waterfalls, tea country and quiet landscapes.','Explore nature →'],
    ['Wildlife','Safari, birdlife, elephants, leopards and protected wilderness.','Meet the wild →'],
    ['Beaches','South and east coast bays, swimming, surf and slow seaside days.','Find the coast →'],
    ['Adventure','Hiking, surfing, rafting, diving and active days outdoors.','Go further →'],
    ['Culture & Heritage','Ancient cities, temples, forts, crafts and living traditions.','Go deeper →'],
    ['Food & Tea','Rice and curry, hoppers, street food, tea country and local markets.','Taste Sri Lanka →'],
    ['Wellness','Ayurveda, yoga, spa, retreats and slower island experiences.','Slow down →'],
    ['Local Life','Villages, rail journeys, markets and everyday island moments.','See the real island →']
  ],
  suggestions: [
    ['5 Days','First Taste of Sri Lanka','Colombo → Sigiriya → Kandy → Ella','A compact introduction for a first visit.'],
    ['7 Days','Classic Island Journey','Sigiriya → Kandy → Ella → South Coast','A balanced mix of heritage, mountains and coast.'],
    ['7 Days','Wild Sri Lanka','Sigiriya → Minneriya → Ella → Yala','For travellers who want nature and wildlife at the centre.'],
    ['8 Days','South Coast Slow Travel','Galle → Unawatuna → Weligama → Mirissa → Hiriketiya','Stay longer in fewer places and let the coast set the pace.'],
    ['10 Days','Culture + Mountains','Anuradhapura → Sigiriya → Kandy → Nuwara Eliya → Ella','Ancient Sri Lanka followed by the highlands.'],
    ['14 Days','The Complete Island','Colombo → Cultural Triangle → Hill Country → East/South Coast','More time means more room for the island’s different personalities.']
  ],
  guides: [
    ['When to Visit','Sri Lanka has different weather patterns across regions. Pick your month, then choose the side of the island that fits.','season-planner'],
    ['Getting Around','Private driver, trains, buses and local transfers each suit different journeys.','getting-around'],
    ['Travel Essentials','Visa, money, connectivity, packing, local customs and practical arrival information.','travel-guide'],
    ['Responsible Travel','Respect wildlife, communities, temples, beaches and the places that make Sri Lanka special.','responsible-travel']
  ]
};

function renderV26Content(){
  const regions = document.getElementById('v26-regions');
  if(regions) regions.innerHTML = lankaoraContent.regions.map((r,i)=>`<article class="v26-region"><span class="v26-index">${String(i+1).padStart(2,'0')}</span><div><span class="v26-kicker">${r.kicker}</span><h3>${r.name}</h3><p>${r.text}</p><small>${r.places}</small></div><b>Explore region ↗</b></article>`).join('');
  const routes = document.getElementById('v26-routes-grid');
  if(routes) routes.innerHTML = lankaoraContent.routes.map(r=>`<article class="v26-route"><span>${r.meta}</span><h3>${r.name}</h3><strong>${r.stops}</strong><p>${r.text}</p><button data-route="${r.name}">Explore route →</button></article>`).join('');
  const ex = document.getElementById('v26-experiences');
  if(ex) ex.innerHTML = lankaoraContent.experiences.map(e=>`<article class="v26-exp"><span>${e[0]}</span><h3>${e[0]}</h3><p>${e[1]}</p><button>${e[2]}</button></article>`).join('');
  const sug = document.getElementById('v26-suggestions-grid');
  if(sug) sug.innerHTML = lankaoraContent.suggestions.map(s=>`<article class="v26-suggestion"><span>${s[0]}</span><h3>${s[1]}</h3><strong>${s[2]}</strong><p>${s[3]}</p><button data-suggest="${s[1]}">Use this idea →</button></article>`).join('');
  const guides = document.getElementById('v26-guides');
  if(guides) guides.innerHTML = lankaoraContent.guides.map(g=>`<article class="v26-guide"><span>TRAVEL GUIDE</span><h3>${g[0]}</h3><p>${g[1]}</p><a href="#${g[2]}">Open guide →</a></article>`).join('');

  document.querySelectorAll('[data-route]').forEach(btn=>btn.addEventListener('click',()=>{ document.getElementById('v26-routes-grid')?.scrollIntoView({behavior:'smooth'}); }));
  document.querySelectorAll('[data-suggest]').forEach(btn=>btn.addEventListener('click',()=>{ document.getElementById('journey')?.scrollIntoView({behavior:'smooth'}); }));
}

document.addEventListener('DOMContentLoaded',renderV26Content);
