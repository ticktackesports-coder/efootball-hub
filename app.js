const SUPABASE_URL = "https://gpmdnxicldslvjlqqsha.supabase.co";
const SUPABASE_KEY = "sb_publishable_yzLgfz-sU4h1mou_1rpUfw_u1fjSU_w";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


let news=[
 {tag:"UPDATE",title:"eFootball Hub launches for Sabah players",text:"A new home for local news, rankings and tournaments.",date:"08 Aug 2026"},
 {tag:"TOURNAMENT",title:"Road to Selangor: final preparations",text:"Players are getting ready for the August competitive schedule.",date:"07 Aug 2026"},
 {tag:"COMMUNITY",title:"eFootball Hub Super League returns",text:"Registration and fixtures will be published in the tournament centre.",date:"05 Aug 2026"}];
let players=[
 {name:"Mark'o",team:"eFootball Hub",points:1245,region:"Sabah",wins:24},
 {name:"Player Alpha",team:"Sabah EFC",points:1180,region:"Sabah",wins:22},
 {name:"Player Bravo",team:"eFootball Hub",points:1120,region:"Sabah",wins:20},
 {name:"Player Charlie",team:"Kota Kinabalu FC",points:1055,region:"Malaysia",wins:18},
 {name:"Player Delta",team:"Sandakan Esports",points:990,region:"Sabah",wins:17},
 {name:"Player Echo",team:"eFootball Hub",points:935,region:"Malaysia",wins:16}];
let tournaments=[
 {name:"eFootball Hub Super League",date:"20 Aug 2026",place:"Kota Kinabalu",status:"REGISTRATION OPEN"},
 {name:"Road to Selangor Cup",date:"19 Aug 2026",place:"Selangor",status:"UPCOMING"},
 {name:"Merdeka eFootball Fiesta",date:"31 Aug 2026",place:"Sabah",status:"UPCOMING"}];
let matches = [];
function newsCard(n){return `<article class="news-card"><span class="tag">${n.tag}</span><h3>${n.title}</h3><p>${n.text}</p><time>${n.date}</time></article>`}
function rankRow(p,i){return `<div class="rank-row"><div class="rank-no">${i<3?["🥇","🥈","🥉"][i]:"#"+(i+1)}</div><div class="player">${p.name}<small>${p.team} · ${p.wins} wins</small></div><div class="pts">${p.points} <small>PTS</small></div></div>`}
function tourCard(t){return `<div class="tour-card"><span class="tag">${t.status}</span><b>${t.name}</b><p>📅 ${t.date}<br>📍 ${t.place}</p></div>`}
function matchCard(m) {
  return `
    <div class="tour-card">
      <span class="tag">${m.status || "MATCH"}</span>
      <b>${m.player1} ${m.score1 ?? "-"} - ${m.score2 ?? "-"} ${m.player2}</b>
      <p>⚽ Match Result</p>
    </div>
  `;
}
function render(){
 document.querySelector("#homeNews").innerHTML=news.slice(0,3).map(newsCard).join("");
 document.querySelector("#newsList").innerHTML=news.map(newsCard).join("");
 document.querySelector("#homeRanking").innerHTML=players.slice(0,3).map(rankRow).join("");
 document.querySelector("#rankingList").innerHTML=players.map(rankRow).join("");
 document.querySelector("#homeTournaments").innerHTML=tournaments.map(tourCard).join("");
 document.querySelector("#tournamentList").innerHTML=tournaments.map(t=>`<div class="tour-item"><div><b>${t.name}</b><p>${t.date} · ${t.place}</p></div><span class="status">${t.status}</span></div>`).join("");
const matchList = document.querySelector("#matchList")
if (matchList) {
  matchList.innerHTML = matches.map(matchCard).join("");
}

}   

function showPage(id){
 document.querySelectorAll(".page").forEach(x=>x.classList.toggle("active",x.id===id));
 document.querySelectorAll(".nav").forEach(x=>x.classList.toggle("active",x.dataset.page===id));
 scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll(".nav").forEach(n=>n.onclick=()=>showPage(n.dataset.page));
document.querySelectorAll(".filter").forEach(btn=>btn.onclick=()=>{
 document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
 const f=btn.dataset.filter;
 const list=f==="eFootball Hub"?players.filter(p=>p.team.includes("eFootball Hub")):f==="Malaysia"?players:players.filter(p=>p.region==="Sabah");
 document.querySelector("#rankingList").innerHTML=list.map(rankRow).join("");
});
let deferredPrompt;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;document.querySelector("#installBtn").classList.remove("hidden")});
document.querySelector("#installBtn").onclick=async()=>{if(deferredPrompt){deferredPrompt.prompt();deferredPrompt=null}};
if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js");
async function loadSupabaseData() {
  // LOAD PLAYERS
  const { data: playerData, error: playerError } =
    await supabaseClient
      .from("players")
      .select("*")
      .order("points", { ascending: false });

  if (playerError) {
    console.error("PLAYER ERROR:", playerError);
  } else if (playerData && playerData.length > 0) {
    players = playerData;
  }

  // LOAD TOURNAMENTS
  const { data: tournamentData, error: tournamentError } =
    await supabaseClient
      .from("tournaments")
      .select("*")
      .order("date", { ascending: true });

  if (tournamentError) {
    console.error("TOURNAMENT ERROR:", tournamentError);
  } else if (tournamentData && tournamentData.length > 0) {
    tournaments = tournamentData;
  }
// LOAD MATCHES
const { data: matchData, error: matchError } =
  await supabaseClient
    .from("matches")
    .select("*")
    .order("match_date", { ascending: false });

if (matchError) {
  console.error("MATCH ERROR:", matchError);
} else if (matchData && matchData.length > 0) {
  matches = matchData;
}
// LOAD NEWS
const { data: newsData, error: newsError } =
  await supabaseClient
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

if (newsError) {
  console.error("NEWS ERROR:", newsError);
} else if (newsData && newsData.length > 0) {
  news = newsData.map(n => ({
    tag: n.tag || "NEWS",
    title: n.title || "Untitled",
    text: n.content || "",
    date: n.created_at
      ? new Date(n.created_at).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })
      : ""
  }));
}
  render();
}
loadSupabaseData();
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;

  const installBtn = document.querySelector("#installBtn");

  if (installBtn) {
    installBtn.classList.remove("hidden");
  }
});

document.querySelector("#installBtn")?.addEventListener("click", async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  await deferredPrompt.userChoice;

  deferredPrompt = null;

  const installBtn = document.querySelector("#installBtn");

  if (installBtn) {
    installBtn.classList.add("hidden");
  }
});

window.addEventListener("appinstalled", () => {
  const installBtn = document.querySelector("#installBtn");

  if (installBtn) {
    installBtn.classList.add("hidden");
  }
});
