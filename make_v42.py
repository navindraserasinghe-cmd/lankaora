from pathlib import Path
import re, json, zipfile
root=Path('/mnt/data/v42work')

# Persistent, accessible builder
p=root/'builder-v41.js'
s=p.read_text()
s=s.replace("  let focus='nature',days=7,pace='balanced',where='Flexible',budgetKey='comfort';", "  const STORAGE='lankaoraJourneyBuilder';\n  let focus='nature',days=7,pace='balanced',where='Flexible',budgetKey='comfort';\n  try{const saved=JSON.parse(localStorage.getItem(STORAGE)||'{}');focus=saved.focus||focus;days=Number(saved.days)||days;pace=saved.pace||pace;where=saved.where||where;budgetKey=saved.budgetKey||budgetKey;}catch(e){}")
s=s.replace("    document.querySelectorAll('[data-choice-group]').forEach(group=>group.querySelectorAll('button').forEach(x=>x.classList.toggle('active',false)));", "    document.querySelectorAll('[data-choice-group]').forEach(group=>group.querySelectorAll('button').forEach(x=>x.classList.toggle('active',false)));\n    const active={focus,days:String(days),pace,where,budget:budgetKey};\n    Object.entries(active).forEach(([group,value])=>document.querySelectorAll(`[data-choice-group=\"${group}\"] button`).forEach(x=>x.classList.toggle('active',x.dataset.value===String(value))));\n    try{localStorage.setItem(STORAGE,JSON.stringify({focus,days,pace,where,budgetKey}))}catch(e){}")
# add reset support before final update
s=s.replace("  wire('focus',v=>focus=v); wire('days',v=>days=Number(v)); wire('pace',v=>pace=v); wire('where',v=>where=v); wire('budget',v=>budgetKey=v);", "  wire('focus',v=>focus=v); wire('days',v=>days=Number(v)); wire('pace',v=>pace=v); wire('where',v=>where=v); wire('budget',v=>budgetKey=v);\n  const reset=$('#planner-reset');\n  if(reset) reset.addEventListener('click',()=>{focus='nature';days=7;pace='balanced';where='Flexible';budgetKey='comfort';try{localStorage.removeItem(STORAGE)}catch(e){}update();});")
p.write_text(s)

# Add reset button to build page
bp=root/'build.html'; s=bp.read_text()
s=s.replace('<div class="planner-result">', '<div class="planner-tools"><button type="button" id="planner-reset">Reset choices</button><span>Your choices are saved on this device.</span></div><div class="planner-result">')
bp.write_text(s)

# Shared navigation/accessibility enhancement
css=root/'site-pages.css'
with css.open('a') as f:
 f.write('''\n/* V42 — shared navigation, accessibility and builder persistence */\n.skip-link{position:fixed;left:16px;top:-60px;z-index:10000;background:#172019;color:#fff;padding:10px 14px;text-decoration:none;border-radius:0 0 8px 8px}.skip-link:focus{top:0}.nav nav a[aria-current="page"]{font-weight:700;opacity:1}.nav nav a:focus-visible,.nav a:focus-visible,.nav button:focus-visible,.mobile-menu a:focus-visible{outline:2px solid currentColor;outline-offset:4px}.mobile-menu{z-index:9999}.mobile-menu.open{display:flex}.planner-tools{display:flex;justify-content:space-between;align-items:center;gap:15px;margin:0 0 12px}.planner-tools button{border:1px solid rgba(22,53,45,.18);background:transparent;padding:9px 13px;border-radius:999px;cursor:pointer;color:var(--ink)}.planner-tools span{font-size:11px;color:#77827c}@media(max-width:600px){.planner-tools{align-items:flex-start;flex-direction:column}}\n''')

# Page title/description/canonical metadata for primary pages where absent
meta={
 'explore.html':('Explore Sri Lanka | Destinations, Regions & Travel Ideas | Lankaora','Explore Sri Lanka with Lankaora: discover regions, destinations, experiences, scenic routes and practical ideas for planning a journey across the island.'),
 'regions.html':('Sri Lanka Regions | Explore the Island by Region | Lankaora','Explore Sri Lanka by region, from the western coast and south coast to the hill country, cultural triangle, east and north.'),
 'destinations.html':('Sri Lanka Destinations | Where to Go in Sri Lanka | Lankaora','Discover the best places to visit in Sri Lanka, from Sigiriya and Kandy to Ella, Galle, Yala, Mirissa and beyond.'),
 'experiences.html':('Things to Do in Sri Lanka | Experiences & Activities | Lankaora','Find things to do in Sri Lanka across nature, wildlife, beaches, adventure, culture, food, tea, wellness and local life.'),
 'routes.html':('Sri Lanka Itineraries & Scenic Routes | Lankaora','Explore Sri Lanka itineraries and scenic routes for 7, 10 and 14 day journeys, with ideas for different travel styles.'),
 'plan.html':('Plan Your Sri Lanka Trip | Travel Guide & Trip Planning | Lankaora','Plan a Sri Lanka trip with practical guidance on seasons, getting around, where to stay, travel essentials and trip inquiries.'),
 'map.html':('Sri Lanka Travel Map | Destinations, Experiences & Routes | Lankaora','Explore Sri Lanka on an interactive travel map with destinations, experiences, wildlife, beaches, heritage places and scenic routes.'),
 'build.html':('Build Your Sri Lanka Trip | Lankaora','Build a Sri Lanka trip around your interests, destinations, trip length, pace and planning budget, then send an inquiry to Lankaora.'),
}
for fn,(title,desc) in meta.items():
 f=root/fn; text=f.read_text()
 text=re.sub(r'<title>.*?</title>',f'<title>{title}</title>',text,count=1,flags=re.S)
 if '<meta name="description"' in text:
  text=re.sub(r'<meta name="description" content="[^"]*">',f'<meta name="description" content="{desc}">',text,count=1)
 else:
  text=text.replace('<title>',f'<meta name="description" content="{desc}"><title>',1)
 # canonical
 if 'rel="canonical"' not in text:
  canonical='https://www.lankaora.com/'+fn
  text=text.replace('</head>',f'<link rel="canonical" href="{canonical}"></head>',1)
 f.write_text(text)

# Add skip link and aria labels/current page to every HTML; robustly preserve relative paths
for f in root.rglob('*.html'):
 text=f.read_text(errors='ignore')
 if '<a class="skip-link"' not in text:
  text=text.replace('<body>', '<body><a class="skip-link" href="#main-content">Skip to content</a>',1)
 text=text.replace('<main class=', '<main id="main-content" class=',1)
 text=text.replace('<nav>', '<nav aria-label="Primary navigation">',1)
 # If no id was added because main has no class, fallback
 if 'id="main-content"' not in text and '<main' in text:
  text=text.replace('<main>', '<main id="main-content">',1)
 f.write_text(text)

# Add navigation active-state script once to every page
script='''<script>\n(function(){\n const path=location.pathname.replace(/\\\\/g,'/');\n document.querySelectorAll('.nav nav a').forEach(a=>{\n   const href=(a.getAttribute('href')||'').split('#')[0].split('?')[0];\n   const target=href.replace(/^\\.\\//,'').replace(/^\\.\\.\\//,'');\n   const current=path.endsWith(target)||((target==='index.html'||target==='')&&/\\/$/.test(path));\n   if(current)a.setAttribute('aria-current','page');\n });\n const btn=document.querySelector('.mobile-menu-btn'), menu=document.getElementById('mobileMenu'), close=document.getElementById('mobileClose');\n if(!btn||!menu)return;\n const open=()=>{menu.classList.add('open');menu.setAttribute('aria-hidden','false');btn.setAttribute('aria-expanded','true');close&&close.focus()};\n const shut=()=>{menu.classList.remove('open');menu.setAttribute('aria-hidden','true');btn.setAttribute('aria-expanded','false');btn.focus()};\n btn.setAttribute('aria-expanded','false'); btn.addEventListener('click',open);\n close&&close.addEventListener('click',shut);\n menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');menu.setAttribute('aria-hidden','true');btn.setAttribute('aria-expanded','false')}));\n document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open'))shut()});\n})();\n</script>'''
for f in root.rglob('*.html'):
 text=f.read_text(errors='ignore')
 # Remove old tiny mobile-menu IIFE only, then insert enhanced script
 text=re.sub(r'<script>\(function\(\)\{const b=document\.querySelector\("\.mobile-menu-btn"\).*?</script>', '', text, count=1, flags=re.S)
 if 'menu.classList.add' not in text[text.find('</body>')-5000:] if '</body>' in text else True:
  text=text.replace('</body>',script+'</body>',1)
 else:
  # Ensure script present if not
  if 'const path=location.pathname' not in text:
   text=text.replace('</body>',script+'</body>',1)
 f.write_text(text)

# Build a deterministic broken-link report (ignore dynamic template URLs)
missing=[]
for f in root.rglob('*.html'):
 text=f.read_text(errors='ignore')
 for h in re.findall(r'href=["\']([^"\']+)',text):
  if h.startswith(('http:','https:','#','mailto:','javascript:')) or '${' in h: continue
  q=h.split('#')[0].split('?')[0]
  if not q: continue
  if not (f.parent/q).resolve().exists(): missing.append((str(f.relative_to(root)),h))
(root/'V42-LINK-AUDIT.txt').write_text('Broken local links found: %d\n%s\n' % (len(missing),'\n'.join(f'{a} -> {b}' for a,b in missing)))

(root/'README-V42.txt').write_text('''Lankaora V42 — Navigation, Builder Persistence & Quality Audit\n\nChanges:\n- Shared navigation audited across all HTML pages.\n- Added skip link, navigation aria labels, active-page state, Escape-to-close mobile menu and focus-visible states.\n- Journey Builder choices persist in localStorage when moving between pages or returning later.\n- Added Reset choices control.\n- Primary pages received consistent SEO title/description/canonical metadata.\n- Broken local links audited; dynamic template URLs are excluded from the static audit.\n- No payment gateway added.\n- Planning budget remains an indicative range, not a live supplier quote.\n''')

# zip
out=Path('/mnt/data/Lankaora-website-v42-quality-navigation-builder.zip')
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as z:
 for f in root.rglob('*'):
  if f.is_file(): z.write(f, f.relative_to(root))
print(out, out.stat().st_size)
print((root/'V42-LINK-AUDIT.txt').read_text())
