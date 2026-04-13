let currentUser=null;
let tags={};

function toggleTag(t){tags[t]=!tags[t];}

async function signUp(){
let {error}=await supabase.auth.signUp({email:email.value,password:password.value});
alert(error?error.message:"Check email");
}

async function signIn(){
let {data,error}=await supabase.auth.signInWithPassword({email:email.value,password:password.value});
if(error) return alert(error.message);
currentUser=data.user.id;
auth.hidden=true;
app.hidden=false;
load();
sync();
subscribe();
}

async function saveRecord(){

let rec={
id:crypto.randomUUID(),
user:currentUser,
text:textInput.value,
notes:notes.value,
tags,
updatedAt:Date.now(),
version:1
};

await put("records",rec);
await queue(rec);
await addHistory(rec);

textInput.value="";
notes.value="";
tags={};

load();
sync();
}

async function load(){
let items=await getAll("records");
list.innerHTML=items.map(i=>`<li class='card'>${i.text}</li>`).join("");
}

async function addHistory(r){
await put("history",{id:r.id,ts:Date.now(),data:r});
}

function subscribe(){
supabase.channel("records")
.on("postgres_changes",{event:"*",schema:"public"},payload=>{
document.getElementById("conflictBanner").classList.remove("hidden");
load();
})
.subscribe();
}
