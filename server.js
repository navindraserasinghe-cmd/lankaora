import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import Database from 'better-sqlite3';
import crypto from 'node:crypto';
import nodemailer from 'nodemailer';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname=path.dirname(fileURLToPath(import.meta.url));
const app=express();
const port=Number(process.env.PORT||3000);
const db=new Database(path.join(__dirname,'lankaora.db'));
db.pragma('journal_mode = WAL');
for (const sql of [
  "ALTER TABLE booking_requests ADD COLUMN quoted_amount REAL",
  "ALTER TABLE booking_requests ADD COLUMN currency TEXT DEFAULT 'USD'",
  "ALTER TABLE booking_requests ADD COLUMN payment_status TEXT NOT NULL DEFAULT 'Not required'",
  "ALTER TABLE booking_requests ADD COLUMN payment_reference TEXT"
]) { try { db.prepare(sql).run(); } catch(e) {} }
try { db.prepare("ALTER TABLE inventory ADD COLUMN category TEXT").run(); } catch(e) {}
db.exec(`CREATE TABLE IF NOT EXISTS inventory (\n id INTEGER PRIMARY KEY AUTOINCREMENT, kind TEXT NOT NULL, name TEXT NOT NULL, destination TEXT NOT NULL, tier TEXT, description TEXT, price_from REAL, price_to REAL, unit TEXT, category TEXT, active INTEGER NOT NULL DEFAULT 1\n);\nCREATE TABLE IF NOT EXISTS suppliers (
 id INTEGER PRIMARY KEY AUTOINCREMENT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
 business_name TEXT NOT NULL, kind TEXT NOT NULL, destination TEXT NOT NULL,
 registration_no TEXT, licence_no TEXT, licence_valid_until TEXT, contact_email TEXT, website TEXT,
 description TEXT, status TEXT NOT NULL DEFAULT 'Pending', active INTEGER NOT NULL DEFAULT 1
);
CREATE TABLE IF NOT EXISTS supplier_accounts (
 id INTEGER PRIMARY KEY AUTOINCREMENT, supplier_id INTEGER NOT NULL UNIQUE, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, created_at TEXT NOT NULL,
 FOREIGN KEY(supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS booking_requests (
 id INTEGER PRIMARY KEY AUTOINCREMENT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, supplier_id INTEGER NOT NULL, customer_name TEXT NOT NULL, customer_email TEXT NOT NULL, arrival TEXT, travellers INTEGER DEFAULT 1, service TEXT NOT NULL, message TEXT, status TEXT NOT NULL DEFAULT 'New', quoted_amount REAL, currency TEXT DEFAULT 'USD', payment_status TEXT NOT NULL DEFAULT 'Not required', payment_reference TEXT,
 FOREIGN KEY(supplier_id) REFERENCES suppliers(id)
);
CREATE TABLE IF NOT EXISTS customer_accounts (
 id INTEGER PRIMARY KEY AUTOINCREMENT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
 name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS saved_journeys (
 id INTEGER PRIMARY KEY AUTOINCREMENT, customer_id INTEGER NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
 title TEXT NOT NULL, journey_json TEXT NOT NULL, FOREIGN KEY(customer_id) REFERENCES customer_accounts(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS trip_requests (
 id INTEGER PRIMARY KEY AUTOINCREMENT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
 arrival TEXT, travellers TEXT, name TEXT NOT NULL, email TEXT NOT NULL, country TEXT,
 style TEXT, message TEXT, route TEXT, days INTEGER, pace TEXT, transport TEXT, status TEXT NOT NULL DEFAULT 'New'
);`);


const seedInventory=[
 {kind:'stay',name:'Comfort Stay',destination:'Ella',tier:'Comfort',description:'Well-rated guesthouses and comfortable local stays.',price_from:45,price_to:85,unit:'room / night'},
 {kind:'stay',name:'Boutique Retreat',destination:'Ella',tier:'Boutique',description:'Characterful boutique stays close to the hills.',price_from:90,price_to:180,unit:'room / night'},
 {kind:'stay',name:'Luxury Escape',destination:'Ella',tier:'Luxury',description:'High-end hill-country stays with elevated comfort.',price_from:220,price_to:450,unit:'room / night'},
 {kind:'stay',name:'Comfort Stay',destination:'Galle',tier:'Comfort',description:'Comfortable coastal accommodation near Galle.',price_from:50,price_to:90,unit:'room / night'},
 {kind:'stay',name:'Boutique Retreat',destination:'Galle',tier:'Boutique',description:'Design-led stays around the historic coast.',price_from:110,price_to:210,unit:'room / night'},
 {kind:'stay',name:'Luxury Escape',destination:'Galle',tier:'Luxury',description:'Refined coastal stays with premium service.',price_from:240,price_to:500,unit:'room / night'},
 {kind:'stay',name:'Comfort Stay',destination:'Sigiriya',tier:'Comfort',description:'Easy-going stays around the Cultural Triangle.',price_from:40,price_to:80,unit:'room / night'},
 {kind:'stay',name:'Boutique Retreat',destination:'Sigiriya',tier:'Boutique',description:'Small character stays surrounded by nature.',price_from:90,price_to:170,unit:'room / night'},
 {kind:'transport',name:'Private Driver',destination:'Island-wide',tier:'Private',description:'Flexible point-to-point travel with a dedicated driver.',price_from:70,price_to:120,unit:'vehicle / day'},
 {kind:'transport',name:'Driver + Scenic Train',destination:'Kandy → Ella',tier:'Mixed',description:'Private transfers combined with the iconic hill-country rail journey.',price_from:80,price_to:140,unit:'travel day'},
 {kind:'transport',name:'Train + Local Transfer',destination:'Island routes',tier:'Mixed',description:'Rail for selected legs with local transfers at each end.',price_from:25,price_to:70,unit:'travel day'}
];

const seedExperiences=[
 {kind:'experience',name:'Sunrise at Little Adam’s Peak',destination:'Ella',category:'Nature',description:'A gentle early-morning hill walk with wide views over Ella’s valley.',price_from:0,price_to:15,unit:'per person'},
 {kind:'experience',name:'Tea Country Walk',destination:'Nuwara Eliya',category:'Nature',description:'Explore tea country landscapes with a local guide and a relaxed tasting.',price_from:20,price_to:45,unit:'per person'},
 {kind:'experience',name:'Sigiriya at First Light',destination:'Sigiriya',category:'Culture',description:'An early visit to the ancient rock fortress before the busiest hours.',price_from:30,price_to:65,unit:'per person'},
 {kind:'experience',name:'Kandy Cultural Evening',destination:'Kandy',category:'Culture',description:'Discover Kandyan traditions through an evening cultural programme.',price_from:15,price_to:35,unit:'per person'},
 {kind:'experience',name:'Galle Fort Story Walk',destination:'Galle',category:'Culture',description:'A slow walk through the fort’s streets, architecture and coastal history.',price_from:15,price_to:35,unit:'per person'},
 {kind:'experience',name:'Yala Safari',destination:'Yala',category:'Nature',description:'A guided national-park safari focused on wildlife and responsible viewing.',price_from:45,price_to:90,unit:'per person'},
 {kind:'experience',name:'Southern Coast Whale Watch',destination:'Mirissa',category:'Nature',description:'A morning ocean excursion with a licensed local operator, subject to sea conditions.',price_from:35,price_to:70,unit:'per person'},
 {kind:'experience',name:'Sri Lankan Cooking Session',destination:'Galle',category:'Food',description:'Learn the foundations of a home-style Sri Lankan meal with local ingredients.',price_from:30,price_to:65,unit:'per person'},
 {kind:'experience',name:'Hill Country Scenic Rail',destination:'Kandy → Ella',category:'Adventure',description:'A classic rail journey through tea country, paired with a planned transfer.',price_from:10,price_to:30,unit:'per person'}
];

if(db.prepare('SELECT COUNT(*) c FROM inventory').get().c===0){const st=db.prepare('INSERT INTO inventory(kind,name,destination,tier,description,price_from,price_to,unit,category) VALUES(@kind,@name,@destination,@tier,@description,@price_from,@price_to,@unit,@category)');const tx=db.transaction(rows=>rows.forEach(r=>st.run(r)));tx(seedInventory);}
if(db.prepare("SELECT COUNT(*) c FROM inventory WHERE kind='experience'").get().c===0){const st=db.prepare('INSERT INTO inventory(kind,name,destination,tier,description,price_from,price_to,unit,category) VALUES(@kind,@name,@destination,@tier,@description,@price_from,@price_to,@unit,@category)');const tx=db.transaction(rows=>rows.forEach(r=>st.run({...r,tier:''})));tx(seedExperiences); }
if(db.prepare('SELECT COUNT(*) c FROM suppliers').get().c===0){const st=db.prepare('INSERT INTO suppliers(created_at,updated_at,business_name,kind,destination,registration_no,licence_no,licence_valid_until,contact_email,website,description,status) VALUES(@created_at,@updated_at,@business_name,@kind,@destination,@registration_no,@licence_no,@licence_valid_until,@contact_email,@website,@description,@status)');const now=new Date().toISOString();st.run({created_at:now,updated_at:now,business_name:'Lankaora Demo Stay',kind:'Accommodation',destination:'Ella',registration_no:'DEMO/ACCOM/001',licence_no:'DEMO/2026/001',licence_valid_until:'2026-12-31',contact_email:'demo@lankaora.com',website:'',description:'Demo supplier record for marketplace testing.',status:'Pending'});st.run({created_at:now,updated_at:now,business_name:'Lankaora Demo Experience',kind:'Experience',destination:'Galle',registration_no:'DEMO/EXP/001',licence_no:'DEMO/2026/002',licence_valid_until:'2026-12-31',contact_email:'demo@lankaora.com',website:'',description:'Demo experience provider record.',status:'Pending'});}

app.use(helmet({contentSecurityPolicy:false}));
app.use(express.json({limit:'32kb'}));
app.use(express.urlencoded({extended:false,limit:'32kb'}));

app.use(express.static(__dirname,{index:'index.html'}));

const sessions=new Map();
const supplierSessions=new Map();
function supplierAuthed(req){const raw=req.headers.cookie||'';const m=raw.match(/lankaora_supplier=([^;]+)/);return m&&supplierSessions.has(m[1]);}
function requireSupplier(req,res,next){if(!supplierAuthed(req))return res.status(401).json({error:'Supplier authentication required'});req.supplier=supplierSessions.get((req.headers.cookie||'').match(/lankaora_supplier=([^;]+)/)[1]);next()}
const customerSessions=new Map();
const customerCookie='lankaora_customer';
function customerAuthed(req){const m=(req.headers.cookie||'').match(/lankaora_customer=([^;]+)/);return m&&customerSessions.has(m[1])}
function requireCustomer(req,res,next){if(!customerAuthed(req))return res.status(401).json({error:'Customer authentication required'});req.customer=customerSessions.get((req.headers.cookie||'').match(/lankaora_customer=([^;]+)/)[1]);next()}
function setCustomerCookie(res,value){res.setHeader('Set-Cookie',`lankaora_customer=${value}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${60*60*24*30}`)}
function clearCustomerCookie(res){res.setHeader('Set-Cookie','lankaora_customer=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0')}

const sessionCookie='lankaora_session';
function token(){return crypto.randomBytes(32).toString('hex')}
function setCookie(res,value,maxAge=60*60*8){res.setHeader('Set-Cookie',`${sessionCookie}=${value}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAge}`)}
function clearCookie(res){res.setHeader('Set-Cookie',`${sessionCookie}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`)}
function authed(req){const raw=req.headers.cookie||'';const m=raw.match(new RegExp(`${sessionCookie}=([^;]+)`));return m&&sessions.has(m[1])}
function requireAuth(req,res,next){if(!authed(req))return res.status(401).json({error:'Unauthorized'});next()}
function verifyPassword(password,stored){try{const [scheme,salt,hex]=String(stored||'').split('$');if(scheme!=='scrypt'||!salt||!hex)return false;const actual=crypto.scryptSync(password,salt,64);const expected=Buffer.from(hex,'hex');return expected.length===actual.length&&crypto.timingSafeEqual(actual,expected)}catch{return false}}
function mailer(){if(!process.env.SMTP_HOST||!process.env.SMTP_USER||!process.env.SMTP_PASS)return null;return nodemailer.createTransport({host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT||587),secure:String(process.env.SMTP_SECURE)==='true',auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}})}

app.post('/api/auth/login',(req,res)=>{
 const {email,password}=req.body||{};
 if(!email||!password||email.toLowerCase()!==String(process.env.ADMIN_EMAIL||'').toLowerCase()||!verifyPassword(password,process.env.ADMIN_PASSWORD_HASH))return res.status(401).json({error:'Invalid credentials'});
 const t=token();sessions.set(t,{created:Date.now()});setCookie(res,t);res.json({ok:true});
});
app.post('/api/auth/logout',(req,res)=>{const raw=req.headers.cookie||'';const m=raw.match(new RegExp(`${sessionCookie}=([^;]+)`));if(m)sessions.delete(m[1]);clearCookie(res);res.json({ok:true})});
app.get('/api/auth/me',(req,res)=>res.json({authenticated:Boolean(authed(req))}));

app.post('/api/trip-requests',(req,res)=>{
 const b=req.body||{};
 const required=['name','email','arrival'];
 if(required.some(k=>!String(b[k]||'').trim()))return res.status(400).json({error:'Name, email and arrival date are required.'});
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email))return res.status(400).json({error:'Please enter a valid email.'});
 const now=new Date().toISOString();
 const info=db.prepare(`INSERT INTO trip_requests(created_at,updated_at,arrival,travellers,name,email,country,style,message,route,days,pace,transport) VALUES(@created_at,@updated_at,@arrival,@travellers,@name,@email,@country,@style,@message,@route,@days,@pace,@transport)`).run({...b,created_at:now,updated_at:now,days:Number(b.days)||null});
 const request={id:info.lastInsertRowid,...db.prepare('SELECT * FROM trip_requests WHERE id=?').get(info.lastInsertRowid)};
 const transport=mailer();
 if(transport&&process.env.NOTIFY_TO){transport.sendMail({from:process.env.SMTP_USER,to:process.env.NOTIFY_TO,subject:`New Lankaora trip request #${request.id} — ${request.name}`,text:`New trip request\n\nName: ${request.name}\nEmail: ${request.email}\nCountry: ${request.country||'-'}\nArrival: ${request.arrival}\nTravellers: ${request.travellers||'-'}\nRoute: ${request.route||'-'}\nDays: ${request.days||'-'}\nStyle: ${request.style||'-'}\nTransport: ${request.transport||'-'}\nMessage: ${request.message||'-'}`}).catch(()=>{});
 }
 res.status(201).json({ok:true,id:request.id});
});

app.get('/api/trip-requests',requireAuth,(req,res)=>{
 const q=String(req.query.q||'').trim().toLowerCase(),status=String(req.query.status||'all');
 let rows=db.prepare('SELECT * FROM trip_requests ORDER BY created_at DESC').all();
 if(status!=='all')rows=rows.filter(r=>r.status===status);
 if(q)rows=rows.filter(r=>[r.name,r.email,r.country,r.route].join(' ').toLowerCase().includes(q));
 res.json({requests:rows});
});
app.patch('/api/trip-requests/:id',requireAuth,(req,res)=>{
 const allowed=['New','Reviewing','Quoted','Closed'];const status=req.body?.status;
 if(!allowed.includes(status))return res.status(400).json({error:'Invalid status'});
 const now=new Date().toISOString();const info=db.prepare('UPDATE trip_requests SET status=?,updated_at=? WHERE id=?').run(status,now,Number(req.params.id));
 if(!info.changes)return res.status(404).json({error:'Request not found'});
 res.json({ok:true});
});


// V21 — customer booking engine foundation.
app.post('/api/bookings', (req,res)=>{
 const b=req.body||{};
 if(!b.supplier_id||!b.customer_name||!b.customer_email||!b.service) return res.status(400).json({error:'Supplier, customer name, email and service are required'});
 const supplier=db.prepare("SELECT id,business_name,status,active FROM suppliers WHERE id=?").get(Number(b.supplier_id));
 if(!supplier||supplier.status!=='Verified'||!supplier.active) return res.status(400).json({error:'This supplier is not currently available for booking'});
 const travellers=Math.max(1,Math.min(50,Number(b.travellers)||1));
 const now=new Date().toISOString();
 const info=db.prepare('INSERT INTO booking_requests(created_at,updated_at,supplier_id,customer_name,customer_email,arrival,travellers,service,message,status,payment_status) VALUES(?,?,?,?,?,?,?,?,?,?,?)').run(now,now,supplier.id,String(b.customer_name).trim(),String(b.customer_email).trim().toLowerCase(),b.arrival||'',travellers,String(b.service).trim(),b.message||'','New','Not required');
 res.status(201).json({ok:true,booking_id:info.lastInsertRowid,status:'New',message:'Booking request sent. The supplier will review the request before any payment is requested.'});
});
app.get('/api/bookings/:id', (req,res)=>{
 const row=db.prepare(`SELECT b.id,b.created_at,b.updated_at,b.customer_name,b.customer_email,b.arrival,b.travellers,b.service,b.message,b.status,b.quoted_amount,b.currency,b.payment_status,b.payment_reference,s.business_name,s.destination FROM booking_requests b JOIN suppliers s ON s.id=b.supplier_id WHERE b.id=?`).get(Number(req.params.id));
 if(!row)return res.status(404).json({error:'Booking not found'}); res.json({booking:row});
});
app.post('/api/bookings/:id/payment-intent', (req,res)=>{
 const row=db.prepare('SELECT id,status,quoted_amount,currency,payment_status FROM booking_requests WHERE id=?').get(Number(req.params.id));
 if(!row)return res.status(404).json({error:'Booking not found'});
 if(row.status!=='Confirmed'||!row.quoted_amount)return res.status(400).json({error:'Payment becomes available only after the supplier confirms the booking and provides a quote'});
 // Payment-provider-neutral architecture: no card details are accepted or stored here.
 const reference='PAY-'+crypto.randomBytes(8).toString('hex').toUpperCase();
 db.prepare("UPDATE booking_requests SET payment_status='Payment pending',payment_reference=?,updated_at=? WHERE id=?").run(reference,new Date().toISOString(),row.id);
 res.json({ok:true,booking_id:row.id,payment_status:'Payment pending',payment_reference:reference,amount:row.quoted_amount,currency:row.currency||'USD',next:'Connect a PCI-compliant payment provider checkout here.'});
});

// V20 — supplier portal and booking requests.
app.post('/api/supplier/apply',(req,res)=>{
 const b=req.body||{}; if(!b.business_name||!b.kind||!b.destination||!b.contact_email||!b.password)return res.status(400).json({error:'Business name, type, destination, email and password are required'});
 const email=String(b.contact_email).trim().toLowerCase();
 if(db.prepare('SELECT 1 FROM supplier_accounts WHERE email=?').get(email))return res.status(409).json({error:'An account with this email already exists'});
 const now=new Date().toISOString(); const info=db.prepare('INSERT INTO suppliers(created_at,updated_at,business_name,kind,destination,registration_no,licence_no,licence_valid_until,contact_email,website,description,status) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)').run(now,now,b.business_name,b.kind,b.destination,b.registration_no||'',b.licence_no||'',b.licence_valid_until||'',email,b.website||'',b.description||'','Pending');
 const hash=crypto.scryptSync(String(b.password),crypto.randomBytes(16).toString('hex'),64).toString('hex');
 // store salt alongside hash in the same compact format used by admin credentials
 const salt=crypto.randomBytes(16).toString('hex'); const actual=crypto.scryptSync(String(b.password),salt,64).toString('hex');
 db.prepare('INSERT INTO supplier_accounts(supplier_id,email,password_hash,created_at) VALUES(?,?,?,?)').run(info.lastInsertRowid,email,`scrypt$${salt}$${actual}`,now);
 res.status(201).json({ok:true,supplier_id:info.lastInsertRowid,status:'Pending'});
});
app.post('/api/supplier/login',(req,res)=>{const email=String(req.body?.email||'').trim().toLowerCase(),password=String(req.body?.password||'');const a=db.prepare('SELECT * FROM supplier_accounts WHERE email=?').get(email);if(!a||!verifyPassword(password,a.password_hash))return res.status(401).json({error:'Invalid supplier credentials'});const t=token();supplierSessions.set(t,{supplierId:a.supplier_id});res.setHeader('Set-Cookie',`lankaora_supplier=${t}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${60*60*12}`);res.json({ok:true});});
app.post('/api/supplier/logout',(req,res)=>{const m=(req.headers.cookie||'').match(/lankaora_supplier=([^;]+)/);if(m)supplierSessions.delete(m[1]);res.setHeader('Set-Cookie','lankaora_supplier=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0');res.json({ok:true});});
app.get('/api/supplier/me',requireSupplier,(req,res)=>{res.json({supplier:db.prepare('SELECT id,business_name,kind,destination,registration_no,licence_no,licence_valid_until,contact_email,website,description,status,active FROM suppliers WHERE id=?').get(req.supplier.supplierId)});});
app.patch('/api/supplier/profile',requireSupplier,(req,res)=>{const b=req.body||{},id=req.supplier.supplierId;const old=db.prepare('SELECT * FROM suppliers WHERE id=?').get(id);if(!old)return res.status(404).json({error:'Supplier not found'});db.prepare('UPDATE suppliers SET business_name=?,destination=?,registration_no=?,licence_no=?,licence_valid_until=?,website=?,description=?,updated_at=? WHERE id=?').run(b.business_name||old.business_name,b.destination||old.destination,b.registration_no??old.registration_no,b.licence_no??old.licence_no,b.licence_valid_until??old.licence_valid_until,b.website??old.website,b.description??old.description,new Date().toISOString(),id);res.json({ok:true});});
app.get('/api/supplier/bookings',requireSupplier,(req,res)=>res.json({items:db.prepare('SELECT * FROM booking_requests WHERE supplier_id=? ORDER BY created_at DESC').all(req.supplier.supplierId)}));
app.post('/api/supplier/bookings',requireSupplier,(req,res)=>{const b=req.body||{};if(!b.customer_name||!b.customer_email||!b.service)return res.status(400).json({error:'Customer name, email and service are required'});const now=new Date().toISOString();const info=db.prepare('INSERT INTO booking_requests(created_at,updated_at,supplier_id,customer_name,customer_email,arrival,travellers,service,message,status) VALUES(?,?,?,?,?,?,?,?,?,?)').run(now,now,req.supplier.supplierId,b.customer_name,b.customer_email,b.arrival||'',Math.max(1,Number(b.travellers)||1),b.service,b.message||'','New');res.status(201).json({ok:true,id:info.lastInsertRowid});});
app.patch('/api/supplier/bookings/:id',requireSupplier,(req,res)=>{const status=['New','Reviewing','Confirmed','Declined','Completed'].includes(req.body?.status)?req.body.status:'Reviewing';const info=db.prepare('UPDATE booking_requests SET status=?,updated_at=? WHERE id=? AND supplier_id=?').run(status,new Date().toISOString(),Number(req.params.id),req.supplier.supplierId);if(!info.changes)return res.status(404).json({error:'Booking request not found'});res.json({ok:true});});
app.get('/api/bookings/admin',requireAuth,(req,res)=>res.json({items:db.prepare(`SELECT b.*,s.business_name FROM booking_requests b JOIN suppliers s ON s.id=b.supplier_id ORDER BY b.created_at DESC`).all()}));
app.patch('/api/bookings/admin/:id',requireAuth,(req,res)=>{const b=req.body||{},status=['New','Reviewing','Confirmed','Declined','Completed'].includes(b.status)?b.status:null;if(!status)return res.status(400).json({error:'Invalid status'});const amount=b.quoted_amount===''||b.quoted_amount==null?null:Number(b.quoted_amount);if(amount!==null&&(!Number.isFinite(amount)||amount<0))return res.status(400).json({error:'Invalid quote amount'});const info=db.prepare("UPDATE booking_requests SET status=?,quoted_amount=?,currency=?,payment_status=CASE WHEN ?='Confirmed' AND ? IS NOT NULL THEN 'Ready for payment' ELSE payment_status END,updated_at=? WHERE id=?").run(status,amount,b.currency||'USD',status,amount,new Date().toISOString(),Number(req.params.id));if(!info.changes)return res.status(404).json({error:'Booking not found'});res.json({ok:true});});

// V23 — customer accounts and saved journeys.
app.post('/api/customer/signup',(req,res)=>{
 const b=req.body||{}, name=String(b.name||'').trim(), email=String(b.email||'').trim().toLowerCase(), password=String(b.password||'');
 if(name.length<2||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||password.length<8)return res.status(400).json({error:'Name, valid email and an 8+ character password are required'});
 if(db.prepare('SELECT 1 FROM customer_accounts WHERE email=?').get(email))return res.status(409).json({error:'An account with this email already exists'});
 const salt=crypto.randomBytes(16).toString('hex'), hash=crypto.scryptSync(password,salt,64).toString('hex'), now=new Date().toISOString();
 const info=db.prepare('INSERT INTO customer_accounts(created_at,updated_at,name,email,password_hash) VALUES(?,?,?,?,?)').run(now,now,name,email,`scrypt$${salt}$${hash}`);
 const t=token(); customerSessions.set(t,{customerId:Number(info.lastInsertRowid)}); setCustomerCookie(res,t); res.status(201).json({ok:true,customer:{id:info.lastInsertRowid,name,email}});
});
app.post('/api/customer/login',(req,res)=>{const email=String(req.body?.email||'').trim().toLowerCase(),password=String(req.body?.password||'');const a=db.prepare('SELECT * FROM customer_accounts WHERE email=?').get(email);if(!a||!verifyPassword(password,a.password_hash))return res.status(401).json({error:'Invalid email or password'});const t=token();customerSessions.set(t,{customerId:a.id});setCustomerCookie(res,t);res.json({ok:true,customer:{id:a.id,name:a.name,email:a.email}})});
app.post('/api/customer/logout',(req,res)=>{const m=(req.headers.cookie||'').match(/lankaora_customer=([^;]+)/);if(m)customerSessions.delete(m[1]);clearCustomerCookie(res);res.json({ok:true})});
app.get('/api/customer/me',requireCustomer,(req,res)=>{const c=db.prepare('SELECT id,name,email,created_at FROM customer_accounts WHERE id=?').get(req.customer.customerId);if(!c)return res.status(404).json({error:'Account not found'});res.json({customer:c})});
app.get('/api/customer/journeys',requireCustomer,(req,res)=>{const items=db.prepare('SELECT id,title,journey_json,created_at,updated_at FROM saved_journeys WHERE customer_id=? ORDER BY updated_at DESC').all(req.customer.customerId).map(x=>({...x,journey:JSON.parse(x.journey_json)}));res.json({items})});
app.post('/api/customer/journeys',requireCustomer,(req,res)=>{const b=req.body||{},title=String(b.title||'My Sri Lanka Journey').trim().slice(0,120),journey=JSON.stringify(b.journey||{});const now=new Date().toISOString();const info=db.prepare('INSERT INTO saved_journeys(customer_id,created_at,updated_at,title,journey_json) VALUES(?,?,?,?,?)').run(req.customer.customerId,now,now,title,journey);res.status(201).json({ok:true,id:info.lastInsertRowid})});
app.patch('/api/customer/journeys/:id',requireCustomer,(req,res)=>{const id=Number(req.params.id),b=req.body||{};const old=db.prepare('SELECT * FROM saved_journeys WHERE id=? AND customer_id=?').get(id,req.customer.customerId);if(!old)return res.status(404).json({error:'Journey not found'});const title=String(b.title||old.title).trim().slice(0,120),journey=JSON.stringify(b.journey??JSON.parse(old.journey_json));db.prepare('UPDATE saved_journeys SET title=?,journey_json=?,updated_at=? WHERE id=? AND customer_id=?').run(title,journey,new Date().toISOString(),id,req.customer.customerId);res.json({ok:true})});
app.delete('/api/customer/journeys/:id',requireCustomer,(req,res)=>{const info=db.prepare('DELETE FROM saved_journeys WHERE id=? AND customer_id=?').run(Number(req.params.id),req.customer.customerId);if(!info.changes)return res.status(404).json({error:'Journey not found'});res.json({ok:true})});
app.get('/api/customer/bookings',requireCustomer,(req,res)=>{const c=db.prepare('SELECT email FROM customer_accounts WHERE id=?').get(req.customer.customerId);const items=db.prepare(`SELECT b.id,b.created_at,b.updated_at,b.customer_name,b.customer_email,b.arrival,b.travellers,b.service,b.message,b.status,b.quoted_amount,b.currency,b.payment_status,b.payment_reference,s.business_name,s.destination FROM booking_requests b JOIN suppliers s ON s.id=b.supplier_id WHERE lower(b.customer_email)=? ORDER BY b.created_at DESC`).all(c.email);res.json({items})});

app.get('/api/inventory',(req,res)=>{
 const kind=String(req.query.kind||'all'), destination=String(req.query.destination||'all'), tier=String(req.query.tier||'all'), category=String(req.query.category||'all');
 let sql='SELECT * FROM inventory WHERE active=1', params=[];
 if(kind!=='all'){sql+=' AND kind=?';params.push(kind)}
 if(destination!=='all'){sql+=' AND (destination=? OR destination=\'Island-wide\' OR destination=\'Island routes\')';params.push(destination)}
 if(tier!=='all'){sql+=' AND tier=?';params.push(tier)}
 if(category!=='all'){sql+=' AND category=?';params.push(category)}
 res.json({items:db.prepare(sql+' ORDER BY kind, destination, price_from').all(...params)});
});
app.get('/api/inventory/admin',requireAuth,(req,res)=>res.json({items:db.prepare('SELECT * FROM inventory ORDER BY kind,destination,price_from').all()}));
app.post('/api/inventory',requireAuth,(req,res)=>{const b=req.body||{}; if(!b.kind||!b.name||!b.destination)return res.status(400).json({error:'kind, name and destination are required'}); const info=db.prepare('INSERT INTO inventory(kind,name,destination,tier,description,price_from,price_to,unit,active) VALUES(?,?,?,?,?,?,?,?,1)').run(b.kind,b.name,b.destination,b.tier||'',b.description||'',Number(b.price_from)||0,Number(b.price_to)||0,b.unit||''); res.status(201).json({ok:true,id:info.lastInsertRowid});});
app.patch('/api/inventory/:id',requireAuth,(req,res)=>{const b=req.body||{};const info=db.prepare('UPDATE inventory SET name=?,destination=?,tier=?,description=?,price_from=?,price_to=?,unit=?,active=? WHERE id=?').run(b.name,b.destination,b.tier||'',b.description||'',Number(b.price_from)||0,Number(b.price_to)||0,b.unit||'',b.active?1:0,Number(req.params.id));if(!info.changes)return res.status(404).json({error:'Item not found'});res.json({ok:true});});


app.get('/api/suppliers',(req,res)=>{const kind=String(req.query.kind||'all'),destination=String(req.query.destination||'all'),status=String(req.query.status||'Verified');let sql="SELECT id,business_name,kind,destination,registration_no,licence_no,licence_valid_until,website,description,status FROM suppliers WHERE active=1",params=[];if(status!=='all'){sql+=' AND status=?';params.push(status)}if(kind!=='all'){sql+=' AND kind=?';params.push(kind)}if(destination!=='all'){sql+=' AND destination=?';params.push(destination)}res.json({items:db.prepare(sql+' ORDER BY business_name').all(...params)});});
app.get('/api/suppliers/admin',requireAuth,(req,res)=>res.json({items:db.prepare('SELECT * FROM suppliers ORDER BY created_at DESC').all()}));
app.post('/api/suppliers',requireAuth,(req,res)=>{const b=req.body||{};if(!b.business_name||!b.kind||!b.destination)return res.status(400).json({error:'business_name, kind and destination are required'});const now=new Date().toISOString();const info=db.prepare('INSERT INTO suppliers(created_at,updated_at,business_name,kind,destination,registration_no,licence_no,licence_valid_until,contact_email,website,description,status) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)').run(now,now,b.business_name,b.kind,b.destination,b.registration_no||'',b.licence_no||'',b.licence_valid_until||'',b.contact_email||'',b.website||'',b.description||'','Pending');res.status(201).json({ok:true,id:info.lastInsertRowid});});
app.patch('/api/suppliers/:id',requireAuth,(req,res)=>{const b=req.body||{},id=Number(req.params.id);const info=db.prepare('UPDATE suppliers SET business_name=?,kind=?,destination=?,registration_no=?,licence_no=?,licence_valid_until=?,contact_email=?,website=?,description=?,status=?,active=?,updated_at=? WHERE id=?').run(b.business_name,b.kind,b.destination,b.registration_no||'',b.licence_no||'',b.licence_valid_until||'',b.contact_email||'',b.website||'',b.description||'',b.status||'Pending',b.active===false?0:1,new Date().toISOString(),id);if(!info.changes)return res.status(404).json({error:'Supplier not found'});res.json({ok:true});});

app.get('/api/health',(req,res)=>res.json({ok:true,service:'lankaora-api'}));
app.listen(port,()=>console.log(`Lankaora V11 running at http://localhost:${port}`));
