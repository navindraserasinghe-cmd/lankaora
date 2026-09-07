from pathlib import Path
import shutil, zipfile, re

src=Path('/mnt/data/v42work')
out=Path('/mnt/data/v43work')
if out.exists(): shutil.rmtree(out)
shutil.copytree(src,out)

# Remove build helper from distribution only if not needed? Keep project files.

# Add guide styles
css=out/'site-pages.css'
with css.open('a',encoding='utf-8') as f:
    f.write(r'''

/* V43 — editorial Sri Lanka Travel Guide */
.guide43-hero{padding:150px 7vw 85px;background:#17251f;color:#fff}.guide43-hero-inner,.guide43-body{max-width:1180px;margin:auto}.guide43-hero h1{font-size:clamp(54px,8vw,104px);line-height:.88;letter-spacing:-.06em;margin:12px 0 24px}.guide43-hero h1 em,.guide43-section h2 em{font-family:"Playfair Display",serif;font-weight:500}.guide43-hero p:last-child{max-width:760px;color:#d3d9d4;line-height:1.8;font-size:18px}.guide43-kicker{font-size:10px;letter-spacing:.16em;color:#cdb676}.guide43-body{padding:70px 7vw 100px}.guide43-intro{display:grid;grid-template-columns:1.1fr .9fr;gap:70px;padding-bottom:80px}.guide43-intro h2{font-size:clamp(38px,5vw,66px);line-height:.95;letter-spacing:-.05em;margin:0}.guide43-intro p{color:#5e6964;line-height:1.85;font-size:16px}.guide43-quick{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:35px}.guide43-quick a{padding:18px;border:1px solid #d8d2c7;text-decoration:none;color:inherit}.guide43-quick span{display:block;font-size:8px;letter-spacing:.14em;color:#9a895f}.guide43-quick strong{display:block;margin-top:8px;font-size:14px}.guide43-section{padding:75px 0;border-top:1px solid #ddd7cb}.guide43-section-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:65px}.guide43-section h2{font-size:clamp(38px,5vw,64px);line-height:.93;letter-spacing:-.05em;margin:0 0 16px}.guide43-section .lead{font-size:17px;line-height:1.8;color:#56635d}.guide43-copy p{font-size:15px;line-height:1.85;color:#626d68;margin:0 0 18px}.guide43-facts{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:25px}.guide43-fact{background:#f4f1e9;padding:18px}.guide43-fact span{display:block;font-size:8px;letter-spacing:.14em;color:#9a895f}.guide43-fact strong{display:block;margin-top:7px;font-size:14px;line-height:1.4}.guide43-links{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:28px}.guide43-links a{padding:16px;border:1px solid #d8d2c7;color:inherit;text-decoration:none;font-size:12px}.guide43-links a:hover{background:#f4f1e9}.guide43-season{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:30px}.guide43-season div{padding:20px;background:#f4f1e9}.guide43-season span{display:block;font-size:8px;letter-spacing:.14em;color:#9a895f}.guide43-season strong{display:block;margin:8px 0;font-size:14px}.guide43-season small{color:#6c7772;line-height:1.55}.guide43-cta{margin-top:70px;padding:55px;background:#17251f;color:#fff;display:flex;justify-content:space-between;gap:35px;align-items:end}.guide43-cta h2{font-size:clamp(38px,5vw,62px);line-height:.93;margin:0 0 12px}.guide43-cta p{max-width:680px;color:#cbd2cd;line-height:1.7}.guide43-cta a{display:inline-flex;padding:14px 18px;background:#fff;color:#17251f;text-decoration:none;white-space:nowrap}.guide43-note{font-size:11px;color:#7a837e;line-height:1.7;margin-top:20px}@media(max-width:800px){.guide43-hero{padding:125px 7vw 65px}.guide43-body{padding:55px 7vw 75px}.guide43-intro,.guide43-section-grid{grid-template-columns:1fr;gap:30px}.guide43-quick{grid-template-columns:1fr}.guide43-links{grid-template-columns:1fr}.guide43-season{grid-template-columns:1fr 1fr}.guide43-cta{display:block}.guide43-cta a{margin-top:20px}}@media(max-width:520px){.guide43-season{grid-template-columns:1fr}.guide43-facts{grid-template-columns:1fr}}
''')

nav_old='<a href="explore.html">Explore Sri Lanka</a><a href="regions.html">Regions</a>'
nav_new='<a href="explore.html">Explore Sri Lanka</a><a href="guide.html">Sri Lanka Guide</a><a href="regions.html">Regions</a>'
mobile_old='<a href="index.html">Home</a><a href="explore.html">Explore Sri Lanka</a><a href="regions.html">Regions</a>'
mobile_new='<a href="index.html">Home</a><a href="explore.html">Explore Sri Lanka</a><a href="guide.html">Sri Lanka Guide</a><a href="regions.html">Regions</a>'

# Root pages: add Guide to shared navigation.
for p in out.glob('*.html'):
    text=p.read_text(encoding='utf-8')
    if nav_old in text:
        text=text.replace(nav_old,nav_new,1)
    if mobile_old in text and 'href="guide.html"' not in text:
        text=text.replace(mobile_old,mobile_new,1)
    p.write_text(text,encoding='utf-8')

# Nested Kandy page if present: use relative link.
for p in out.glob('destinations/*.html'):
    text=p.read_text(encoding='utf-8')
    old='<a href="../explore.html">Explore Sri Lanka</a><a href="../regions.html">Regions</a>'
    new='<a href="../explore.html">Explore Sri Lanka</a><a href="../guide.html">Sri Lanka Guide</a><a href="../regions.html">Regions</a>'
    if old in text: text=text.replace(old,new,1)
    oldm='<a href="../index.html">Home</a><a href="../explore.html">Explore Sri Lanka</a><a href="../regions.html">Regions</a>'
    newm='<a href="../index.html">Home</a><a href="../explore.html">Explore Sri Lanka</a><a href="../guide.html">Sri Lanka Guide</a><a href="../regions.html">Regions</a>'
    if oldm in text and 'href="../guide.html"' not in text: text=text.replace(oldm,newm,1)
    p.write_text(text,encoding='utf-8')

# Add a guide card to Explore page after the existing 3 cards.
p=out/'explore.html'
text=p.read_text(encoding='utf-8')
needle='</div></main><footer class="footer-simple">'
if needle in text and 'guide.html' not in text:
    replacement='''<a class="page-card" href="guide.html"><span class="num">04</span><h2>Sri Lanka Guide</h2><p>Read the island before you plan it — history, landscapes, wildlife, coast, food, local life and seasons.</p><b>Read the guide →</b></a></div></main><footer class="footer-simple">'''
    text=text.replace(needle,replacement,1)
p.write_text(text,encoding='utf-8')

# Build the actual editorial guide page.
guide='''<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Sri Lanka Travel Guide | History, Nature, Wildlife, Beaches & Culture | Lankaora</title>
<meta name="description" content="Read Lankaora’s Sri Lanka travel guide: understand the island through its history, landscapes, wildlife, beaches, food, tea, culture and seasons before planning your journey.">
<link rel="canonical" href="https://www.lankaora.com/guide.html">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="stylesheet" href="style.css"><link rel="stylesheet" href="site-pages.css">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Sri Lanka Travel Guide","description":"A practical and inspiring guide to understanding Sri Lanka through its history, nature, wildlife, coast, food, local life, culture and seasons.","author":{"@type":"Organization","name":"Lankaora"},"publisher":{"@type":"Organization","name":"Lankaora"},"mainEntityOfPage":"https://www.lankaora.com/guide.html"}</script>
</head><body><a class="skip-link" href="#main-content">Skip to content</a>
<header class="nav"><a class="brand" href="index.html"><span class="brand-small">Sri Lanka Travel Guide</span><span class="brand-name">Lankaora</span></a><nav aria-label="Primary navigation"><a href="explore.html">Explore Sri Lanka</a><a href="guide.html">Sri Lanka Guide</a><a href="regions.html">Regions</a><a href="destinations.html">Destinations</a><a href="experiences.html">Experiences</a><a href="routes.html">Routes</a><a href="plan.html">Plan Your Trip</a><a href="map.html">Map</a></nav><button class="mobile-menu-btn" aria-label="Open menu">Menu</button><a class="nav-cta" href="build.html">Build My Trip</a></header>
<main id="main-content">
<section class="guide43-hero"><div class="guide43-hero-inner"><p class="guide43-kicker">LANKAORA / SRI LANKA TRAVEL GUIDE</p><h1>One island.<br><em>Many worlds.</em></h1><p>Before you choose a hotel, a route or a beach, understand the island. Sri Lanka is small enough to cross in a journey, yet different enough that the right experience depends on where you go, when you go and what you want to feel.</p></div></section>
<div class="guide43-body">
<section class="guide43-intro"><div><p class="eyebrow">START HERE</p><h2>Think of Sri Lanka<br><em>as a collection of worlds.</em></h2></div><div><p>Ancient cities rise from the dry zone. Tea-covered mountains bring cool air to the centre. Forests and national parks shelter wildlife. The coast changes character from one side of the island to another. And between all of it are food, faith, craft, markets and everyday life.</p><p>The best trip is rarely about ticking off every famous place. It is about choosing the parts of Sri Lanka that fit your time, your season and your curiosity.</p></div></section>
<div class="guide43-quick"><a href="#glance"><span>01</span><strong>At a Glance</strong></a><a href="#heritage"><span>02</span><strong>History & Heritage</strong></a><a href="#nature"><span>03</span><strong>Nature & Landscapes</strong></a><a href="#wildlife"><span>04</span><strong>Wildlife</strong></a><a href="#coast"><span>05</span><strong>Coasts & Beaches</strong></a><a href="#essence"><span>06</span><strong>Food, Tea & Local Life</strong></a><a href="#culture"><span>07</span><strong>Culture & Festivals</strong></a><a href="#seasons"><span>08</span><strong>When to Go</strong></a></div>

<section class="guide43-section" id="glance"><div class="guide43-section-grid"><div><p class="eyebrow">01 / AT A GLANCE</p><h2>A compact island<br><em>with remarkable range.</em></h2><p class="lead">Sri Lanka sits in the Indian Ocean, just south of India. Its compact size is one of its greatest travel advantages: beaches, highlands, wildlife areas and historic cities can be connected in one trip.</p><div class="guide43-facts"><div class="guide43-fact"><span>LOCATION</span><strong>Indian Ocean · South Asia</strong></div><div class="guide43-fact"><span>AREA</span><strong>65,610 km²</strong></div><div class="guide43-fact"><span>HERITAGE</span><strong>8 UNESCO World Heritage Sites</strong></div><div class="guide43-fact"><span>COAST</span><strong>About 1,330 km of coastline</strong></div></div></div><div class="guide43-copy"><p>Sri Lanka’s appeal is the contrast. A morning can begin among ancient stonework and end beside the sea. A train journey can move from warm lowlands into misty tea country. A wildlife-focused route can feel completely different from a slow coastal escape.</p><p>For travellers, that means you do not need to choose between “culture” and “nature” as if they belong to separate countries. The island lets you combine them — as long as the route is designed around the season and your pace.</p><div class="guide43-links"><a href="destinations.html">Browse destinations →</a><a href="regions.html">Understand the regions →</a></div></div></div></section>

<section class="guide43-section" id="heritage"><div class="guide43-section-grid"><div><p class="eyebrow">02 / HISTORY & HERITAGE</p><h2>Walk through<br><em>the layers of time.</em></h2><p class="lead">Sri Lanka’s history is not locked away in museums. It is visible in ancient cities, sacred places, temples, reservoirs, fortifications and living traditions.</p></div><div class="guide43-copy"><p>Anuradhapura and Polonnaruwa reveal the scale of ancient kingdoms. Sigiriya brings together a dramatic rock fortress and an extraordinary landscaped setting. Kandy carries the legacy of the island’s last kingdom and remains an important centre of Buddhist culture. Down south, Galle Fort shows a different layer: colonial architecture still woven into a living town.</p><p>What makes the heritage experience special is the continuity. Visitors are not simply looking at ruins; they encounter places that remain meaningful to communities today.</p><div class="guide43-links"><a href="experiences.html">Explore culture & heritage →</a><a href="destinations/sigiriya.html">Read about Sigiriya →</a><a href="destinations/kandy.html">Read about Kandy →</a><a href="destinations/galle.html">Read about Galle →</a></div></div></div></section>

<section class="guide43-section" id="nature"><div class="guide43-section-grid"><div><p class="eyebrow">03 / NATURE & LANDSCAPES</p><h2>From rainforest<br><em>to tea country.</em></h2><p class="lead">The island changes dramatically as you move inland: tropical lowlands give way to forests, waterfalls, mountains, mist and tea estates.</p></div><div class="guide43-copy"><p>The central highlands are one of Sri Lanka’s defining landscapes. Tea-covered slopes, cool weather, waterfalls and mountain viewpoints make the region ideal for travellers who enjoy scenery and a slower rhythm. Around the cultural heartland, dry-zone landscapes, ancient reservoirs and rock formations create a completely different atmosphere.</p><p>Then there is the rainforest and the wider network of forests, wetlands and protected areas. Nature here is not one single attraction; it is a sequence of landscapes that can shape an entire route.</p><div class="guide43-links"><a href="routes.html">Find scenic routes →</a><a href="destinations/ella.html">Explore Ella →</a><a href="destinations/nuwara-eliya.html">Explore Nuwara Eliya →</a><a href="experiences.html">See nature experiences →</a></div></div></div></section>

<section class="guide43-section" id="wildlife"><div class="guide43-section-grid"><div><p class="eyebrow">04 / WILDLIFE</p><h2>Wild Sri Lanka<br><em>is worth slowing down for.</em></h2><p class="lead">National parks and protected landscapes make wildlife one of the island’s signature experiences.</p></div><div class="guide43-copy"><p>Safari experiences can bring you close to elephants, leopards, birds and many other species, but the quality of the experience depends on timing, habitat and responsible viewing. A good wildlife trip is not about promising a particular animal; it is about entering a living ecosystem with patience.</p><p>Yala is one of the island’s best-known parks, while other protected areas offer different habitats and atmospheres. If wildlife is the main reason for your trip, choose the park and season first, then build the rest of the route around it.</p><div class="guide43-links"><a href="experiences.html">Explore wildlife experiences →</a><a href="destinations/yala.html">Explore Yala →</a><a href="destinations.html">Browse more destinations →</a><a href="build.html">Build a wildlife-focused trip →</a></div></div></div></section>

<section class="guide43-section" id="coast"><div class="guide43-section-grid"><div><p class="eyebrow">05 / COASTS & BEACHES</p><h2>Not every coast<br><em>feels the same.</em></h2><p class="lead">Sri Lanka’s beaches stretch around the island, but the best side for your trip depends strongly on the season.</p></div><div class="guide43-copy"><p>The southwest is a classic beach region, with places such as Galle, Mirissa and the wider southern coast offering different mixes of beaches, towns, food and ocean experiences. The east coast has its own rhythm, with destinations such as Trincomalee and Arugam Bay becoming especially relevant when the southwest monsoon affects the western and southern side.</p><p>That seasonal shift is one of the most useful things to understand before booking. Instead of asking “Which is the best beach?”, ask “Which coast makes sense for my dates?”</p><div class="guide43-links"><a href="experiences.html">Explore beach experiences →</a><a href="destinations/mirissa.html">Explore Mirissa →</a><a href="destinations/trincomalee.html">Explore Trincomalee →</a><a href="destinations/arugam-bay.html">Explore Arugam Bay →</a></div></div></div></section>

<section class="guide43-section" id="essence"><div class="guide43-section-grid"><div><p class="eyebrow">06 / FOOD, TEA & LOCAL LIFE</p><h2>The real journey<br><em>happens between sights.</em></h2><p class="lead">Sri Lanka is a place to taste, listen, watch and wander — not just photograph.</p></div><div class="guide43-copy"><p>Rice and curry, hoppers, sambols, fresh fruit, spices and regional dishes make food one of the easiest ways to experience the island’s character. Tea tells another story: the central highlands are shaped by estates, workers, cool weather and the long history of Ceylon tea.</p><p>Local life adds another layer. Markets, villages, craft, religious places and ordinary streets can tell you more about a destination than a checklist of attractions. Leave some space in the itinerary for the unplanned moments.</p><div class="guide43-links"><a href="experiences.html">Discover food & local experiences →</a><a href="destinations/nuwara-eliya.html">Explore tea country →</a><a href="experiences.html">Browse all experiences →</a><a href="routes.html">Connect the places →</a></div></div></div></section>

<section class="guide43-section" id="culture"><div class="guide43-section-grid"><div><p class="eyebrow">07 / CULTURE & FESTIVALS</p><h2>Culture is something<br><em>you experience.</em></h2><p class="lead">Religion, music, dance, food, craft and festivals give each region its own identity.</p></div><div class="guide43-copy"><p>Sri Lanka’s cultural landscape has been shaped by centuries of Buddhist, Hindu, Muslim and Christian traditions alongside many regional customs and colonial influences. Sacred cities and temples are important places of worship, while festivals can transform streets and public spaces into places of colour, music and gathering.</p><p>For visitors, the key is to approach cultural places with respect: dress appropriately where required, follow photography rules and remember that a sacred site is a living place first and a tourist attraction second.</p><div class="guide43-links"><a href="experiences.html">Explore culture →</a><a href="plan.html">See practical travel guidance →</a><a href="destinations/kandy.html">Explore Kandy →</a><a href="destinations/jaffna.html">Explore Jaffna →</a></div></div></div></section>

<section class="guide43-section" id="seasons"><div><p class="eyebrow">08 / WHEN TO GO</p><h2>Choose your region<br><em>with the weather.</em></h2><p class="lead">Sri Lanka has different weather patterns across the island. There is no single month that is perfect everywhere.</p><div class="guide43-season"><div><span>DEC — FEB</span><strong>South & West</strong><small>Often a strong period for beach-focused journeys on the southwest side.</small></div><div><span>MAY — SEP</span><strong>East & Dry Zone</strong><small>A useful period to consider the east and north/east side of the island.</small></div><div><span>MAR — APR</span><strong>Transition</strong><small>Warm and changeable; useful for flexible cultural and hill-country journeys.</small></div><div><span>OCT — NOV</span><strong>Inter-monsoon</strong><small>Conditions can change quickly, so leave room for flexibility.</small></div></div><p class="guide43-note">Season guidance is a planning starting point, not a guarantee of daily weather. Check the current forecast closer to your trip.</p></div></section>

<div class="guide43-cta"><div><p class="eyebrow">NOW MAKE IT YOURS</p><h2>Know the island.<br><em>Then build your route.</em></h2><p>Use the guide to decide what matters to you. Then explore destinations, compare routes and use Lankaora’s journey builder to turn that idea into a trip request.</p></div><a href="build.html">Build My Trip →</a></div>
</div></main>
<footer class="footer-simple"><strong>Lankaora</strong> — Explore Sri Lanka Now</footer>
<div class="mobile-menu" id="mobileMenu" aria-hidden="true"><button class="close" id="mobileClose" aria-label="Close menu">Close</button><a href="index.html">Home</a><a href="explore.html">Explore Sri Lanka</a><a href="guide.html">Sri Lanka Guide</a><a href="regions.html">Regions</a><a href="destinations.html">Destinations</a><a href="experiences.html">Experiences</a><a href="routes.html">Routes</a><a href="plan.html">Plan Your Trip</a><a href="map.html">Map</a><a href="build.html">Build My Trip</a></div>
<script>(function(){const path=location.pathname.replace(/\\/g,'/');document.querySelectorAll('.nav nav a').forEach(a=>{const href=(a.getAttribute('href')||'').split('#')[0].split('?')[0];const target=href.replace(/^\.\//,'');if(path.endsWith(target))a.setAttribute('aria-current','page')});const btn=document.querySelector('.mobile-menu-btn'),menu=document.getElementById('mobileMenu'),close=document.getElementById('mobileClose');if(!btn||!menu)return;const open=()=>{menu.classList.add('open');menu.setAttribute('aria-hidden','false');btn.setAttribute('aria-expanded','true');close&&close.focus()};const shut=()=>{menu.classList.remove('open');menu.setAttribute('aria-hidden','true');btn.setAttribute('aria-expanded','false');btn.focus()};btn.setAttribute('aria-expanded','false');btn.addEventListener('click',open);close&&close.addEventListener('click',shut);menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');menu.setAttribute('aria-hidden','true');btn.setAttribute('aria-expanded','false')}));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open'))shut()})})();</script></body></html>'''
(out/'guide.html').write_text(guide,encoding='utf-8')

# Sitemap add guide.
s=out/'sitemap.xml'
text=s.read_text(encoding='utf-8')
if '/guide.html' not in text:
    text=text.replace('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://www.lankaora.com/guide.html</loc></url>')
s.write_text(text,encoding='utf-8')

# README note
(out/'README-V43.txt').write_text('V43 — Sri Lanka Guide editorial layer. Added guide.html with tourist-friendly guide chapters, shared navigation, Explore link, SEO metadata and sitemap entry. Content is grounded in current official Sri Lanka Tourism themes and planning guidance.\n',encoding='utf-8')

# Validate local href targets for simple relative links.
htmls=list(out.rglob('*.html'))
missing=[]
for p in htmls:
    txt=p.read_text(encoding='utf-8')
    for href in re.findall(r'href=["\']([^"\'#?]+)',txt):
        if href.startswith(('http:','https:','mailto:','javascript:')): continue
        target=(p.parent/href).resolve()
        if not target.exists(): missing.append((str(p.relative_to(out)),href))
(out/'V43-LINK-AUDIT.txt').write_text('Missing local links: '+str(len(missing))+'\n'+('\n'.join(f'{a} -> {b}' for a,b in missing) if missing else ''),encoding='utf-8')

# zip
zip_path=Path('/mnt/data/Lankaora-website-v43-sri-lanka-guide.zip')
if zip_path.exists(): zip_path.unlink()
with zipfile.ZipFile(zip_path,'w',zipfile.ZIP_DEFLATED) as z:
    for p in out.rglob('*'):
        if p.is_file(): z.write(p,p.relative_to(out))
print(zip_path)
print((out/'V43-LINK-AUDIT.txt').read_text())
