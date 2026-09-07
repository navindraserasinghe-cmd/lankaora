const places=[
{name:'Colombo',lat:6.9271,lng:79.8612,type:'destination',tag:'CITY',desc:'The island’s commercial capital and an easy arrival or departure point.'},
{name:'Kandy',lat:7.2906,lng:80.6337,type:'heritage',tag:'CULTURE',desc:'A historic hill-country city shaped by sacred places and living traditions.'},
{name:'Sigiriya',lat:7.957,lng:80.7603,type:'heritage',tag:'HERITAGE',desc:'Ancient landscapes, rock fortress views and a gateway to the Cultural Triangle.'},
{name:'Dambulla',lat:7.8731,lng:80.7718,type:'heritage',tag:'HERITAGE',desc:'A practical base for cave temples and nearby Cultural Triangle sites.'},
{name:'Ella',lat:6.8667,lng:81.0466,type:'nature',tag:'HIGHLANDS',desc:'Mountain scenery, tea country, viewpoints and scenic rail.'},
{name:'Galle',lat:6.0329,lng:80.2168,type:'heritage',tag:'COAST + HISTORY',desc:'Historic fort streets meeting the Indian Ocean.'},
{name:'Yala',lat:6.3725,lng:81.5185,type:'wildlife',tag:'WILDLIFE',desc:'A gateway to national-park landscapes and safari experiences.'},
{name:'Mirissa',lat:5.9483,lng:80.4716,type:'beach',tag:'COAST',desc:'South-coast beaches and ocean experiences.'},
{name:'Nuwara Eliya',lat:6.9497,lng:80.7891,type:'nature',tag:'TEA COUNTRY',desc:'Cooler highlands, tea estates and scenic viewpoints.'},
{name:'Trincomalee',lat:8.5874,lng:81.2152,type:'beach',tag:'EAST COAST',desc:'A quieter eastern-coast base with beaches and ocean landscapes.'},
{name:'Jaffna',lat:9.6615,lng:80.0255,type:'heritage',tag:'NORTH',desc:'A distinctive northern cultural landscape with its own character.'},
{name:'Arugam Bay',lat:6.84,lng:81.835,type:'beach',tag:'SURF',desc:'An east-coast destination known for surf and a relaxed coastal rhythm.'}
];
const routes=[
['Classic Island',['Colombo','Sigiriya','Kandy','Ella','Galle']],
['Cultural Heart',['Dambulla','Sigiriya','Kandy']],
['Highlands & Coast',['Nuwara Eliya','Ella','Galle','Mirissa']],
['Wild Sri Lanka',['Sigiriya','Yala','Galle']],
['East Coast Escape',['Kandy','Trincomalee','Arugam Bay']]
];
const map=L.map('map',{scrollWheelZoom:false}).setView([7.6,80.7],7.3);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap contributors'}).addTo(map);
const layer=L.layerGroup().addTo(map), routeLayer=L.layerGroup().addTo(map);
const list=document.getElementById('mapList'),count=document.getElementById('mapCount');let active='all';
const routeObjects=[];
routes.forEach(([name,names])=>{const coords=names.map(n=>places.find(p=>p.name===n)).filter(Boolean).map(p=>[p.lat,p.lng]);const line=L.polyline(coords,{weight:3,opacity:.55}).bindTooltip(name);line.addTo(routeLayer);routeObjects.push(line)});
function drawPlaces(){layer.clearLayers();list.innerHTML='';const visible=places.filter(p=>active==='all'||p.type===active);count.textContent=`${visible.length} ${visible.length===1?'place':'places'}`;visible.forEach((p,i)=>{const marker=L.marker([p.lat,p.lng]).addTo(layer).bindPopup(`<strong>${p.name}</strong><br><small>${p.desc}</small>`);const card=document.createElement('button');card.className='map-place';card.innerHTML=`<span>${String(i+1).padStart(2,'0')}</span><div><small>${p.tag}</small><strong>${p.name}</strong><p>${p.desc}</p></div>`;card.onclick=()=>{map.flyTo([p.lat,p.lng],9,{duration:.6});marker.openPopup()};list.appendChild(card)});}
function drawRoutes(){layer.clearLayers();list.innerHTML='';count.textContent=`${routes.length} routes`;routes.forEach(([name,names],i)=>{const card=document.createElement('button');card.className='map-place route-place';card.innerHTML=`<span>${String(i+1).padStart(2,'0')}</span><div><small>SCENIC ROUTE</small><strong>${name}</strong><p>${names.join(' → ')}</p></div>`;card.onclick=()=>map.fitBounds(routeObjects[i].getBounds(),{padding:[35,35]});list.appendChild(card)});routeLayer.addTo(map);}
document.querySelectorAll('[data-filter]').forEach(btn=>btn.onclick=()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');active=btn.dataset.filter;if(active==='route')drawRoutes();else drawPlaces();});
drawPlaces();
