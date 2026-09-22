const KEY='ruben-muscle-v3-1';
const PLAN={
A:[['Leg press',3,'8–12'],['Chest press',3,'8–12'],['Seated row',3,'8–12'],['Leg extension',2,'10–15'],['Lat pulldown',3,'8–12'],['Lateral raise machine',2,'12–15'],['Biceps curl',2,'10–15'],['Ab crunch',2,'10–15']],
B:[['Hack squat / pendulum squat',3,'8–12'],['Incline chest press',3,'8–12'],['Seated leg curl',3,'10–15'],['Shoulder press',3,'8–12'],['Seated row',2,'8–12'],['Peck deck',2,'10–15'],['Triceps pushdown',2,'10–15'],['Calf raise',3,'10–15']],
C:[['Leg press',3,'10–15'],['Lat pulldown',3,'8–12'],['Chest press',3,'8–12'],['Leg curl',3,'10–15'],['Rear delt machine',2,'12–15'],['Lateral raise machine',2,'12–15'],['Biceps curl',2,'10–15'],['Triceps pushdown',2,'10–15'],['Ab crunch',2,'10–15'],['Calf raise',2,'10–15']]};
const DEFAULTS={'Chest press':30,'Peck deck':45,'Shoulder press':32.5,'Seated row':57,'Triceps pushdown':60,'Biceps curl':35,'Ab crunch':30};
const BASE={week:1,lastWorkout:'A',weight:[],logs:[],history:{},food:{},settings:{goal:'Spiermassa',kcal:2550,protein:140}};
let db=load();
function load(){try{const x=JSON.parse(localStorage.getItem(KEY)||'null');return {...BASE,...x,settings:{...BASE.settings,...(x?.settings||{})}}}catch(e){return structuredClone(BASE)}}
function save(){localStorage.setItem(KEY,JSON.stringify(db))}
function dateKey(d=new Date()){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function today(){return dateKey()}
function toast(t){let e=document.querySelector('.toast');if(!e){e=document.createElement('div');e.className='toast';document.body.appendChild(e)}e.textContent=t;setTimeout(()=>e.remove(),1800)}
function topRange(r){return +(String(r).split('–')[1]||12)}
function lastExercise(name){const h=db.history[name]||[];return h[h.length-1]||null}
function suggestion(name,range){const l=lastExercise(name);if(!l)return DEFAULTS[name]||'';return l.reps.length&&l.reps.every(r=>r>=topRange(range))?+(l.weight+2.5).toFixed(1):l.weight}
function rir(){return db.week===7?3:db.week<=1?3:db.week<=3?2:1}
function workouts(){return [...new Set(db.logs.map(x=>x.date))].length}
function allVolume(){return db.logs.reduce((s,x)=>s+x.weight*x.reps.reduce((a,b)=>a+b,0),0)}
function prCount(){let n=0;Object.values(db.history).forEach(h=>{let best=0;h.forEach(x=>x.reps.forEach(r=>{if(r>best){best=r;n++}}))});return n}
function exportJSON(){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(db,null,2)],{type:'application/json'}));a.download='ruben-muscle-backup.json';a.click()}
function resetAll(){if(confirm('Alle trainingsgegevens wissen?')){localStorage.removeItem(KEY);location.href='index.html'}}
