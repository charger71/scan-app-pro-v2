async function queue(item){await put("queue",item);}

async function sync(){
if(!navigator.onLine) return;

let q=await getAll("queue");

for(let item of q){

const {data:cloud}=await supabase.from("records").select("*").eq("id",item.id).maybeSingle();

if(!cloud){
await supabase.from("records").insert({...item,user_id:currentUser,updated_at:Date.now(),version:1});
await del("queue",item.id);
continue;
}

if(item.updatedAt > cloud.updated_at){
await supabase.from("records").update({
text:item.text,
notes:item.notes,
tags:item.tags,
updated_at:Date.now(),
version:(cloud.version||1)+1
}).eq("id",item.id);
}

await del("queue",item.id);
}
}

window.addEventListener("online",sync);
