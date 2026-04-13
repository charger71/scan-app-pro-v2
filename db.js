const DB="scanv2";
function openDB(){return new Promise(r=>{let req=indexedDB.open(DB,1);req.onupgradeneeded=()=>{let db=req.result;db.createObjectStore("records",{keyPath:"id"});db.createObjectStore("queue",{keyPath:"id"});db.createObjectStore("history",{keyPath:"id"});};req.onsuccess=()=>r(req.result);});}
async function put(s,v){let db=await openDB();db.transaction(s,"readwrite").objectStore(s).put(v);}
async function getAll(s){let db=await openDB();return new Promise(r=>{let req=db.transaction(s).objectStore(s).getAll();req.onsuccess=()=>r(req.result);});}
async function del(s,id){let db=await openDB();db.transaction(s,"readwrite").objectStore(s).delete(id);}
