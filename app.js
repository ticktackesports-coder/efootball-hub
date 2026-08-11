alert("APP.JS IS RUNNING");
// ======================================================
// eFOOTBALL HUB - app.js
// CLEAN VERSION
// ======================================================


// ======================================================
// 1. SUPABASE
// ======================================================

const SUPABASE_URL =
  "https://gpmdnxicldslvjlqqsha.supabase.co";

const SUPABASE_KEY =
  sb_publishable_yzLgfz-sU4h1mou_1rpUfw_u1fjSU_w

const supabaseClient = window.supabase
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;
async function testSupabase() {
  console.log("Testing Supabase...");

  if (!supabaseClient) {
    console.error("Supabase client NOT created");
    return;
  }

  const { data, error } = await supabaseClient
    .from("tournaments")
    .select("*");

  if (error) {
    console.error("SUPABASE ERROR:", error);
    alert("Supabase error: " + error.message);
    return;
  }

  console.log("SUPABASE DATA:", data);
  alert("Supabase connected! Tournaments: " + data.length);
}

testSupabase();


// ======================================================
// 2. FALLBACK DATA
// ======================================================

let news = [
  {
    tag: "UPDATE",
    title: "eFootball Hub launches for Sabah players",
    text: "A new home for local news, rankings and tournaments.",
    date: "08 Aug 2026"
  },
  {
    tag: "TOURNAMENT",
    title: "Road to Selangor: final preparations",
    text: "Players are getting ready for the August competitive schedule.",
    date: "07 Aug 2026"
  },
  {
    tag: "COMMUNITY",
    title: "eFootball Hub Super League returns",
    text: "Registration and fixtures will be published in the tournament centre.",
    date: "05 Aug 2026"
  }
];


let players = [
  {
    name: "Mark'o",
    team: "eFootball Hub",
    points: 1245,
    region: "Sabah",
    wins: 24
  },
  {
    name: "Player Alpha",
    team: "Sabah EFC",
    points: 1180,
    region: "Sabah",
    wins: 22
  },
  {
    name: "Player Bravo",
    team: "eFootball Hub",
    points: 1120,
    region: "Sabah",
    wins: 20
  },
  {
    name: "Player Charlie",
    team: "Kota Kinabalu FC",
    points: 1055,
    region: "Malaysia",
    wins: 18
  },
  {
    name: "Player Delta",
    team: "Sandakan Esports",
    points: 990,
    region: "Sabah",
    wins: 17
  },
  {
    name: "Player Echo",
    team: "eFootball Hub",
    points: 935,
    region: "Malaysia",
    wins: 16
  }
];


let tournaments = [
  {
    name: "eFootball Hub Super League",
    date: "20 Aug 2026",
    place: "Kota Kinabalu",
    status: "REGISTRATION OPEN"
  },
  {
    name: "Road to Selangor Cup",
    date: "19 Aug 2026",
    place: "Selangor",
    status: "UPCOMING"
  },
  {
    name: "Merdeka eFootball Fiesta",
    date: "31 Aug 2026",
    place: "Sabah",
    status: "UPCOMING"
  }
];


let matches = [];


// ======================================================
// 3. SAFE DOM HELPERS
// ======================================================

function getElement(selector) {
  return document.querySelector(selector);
}


function setHTML(selector, html) {

  const element = getElement(selector);

  if (element) {
    element.innerHTML = html;
  }

}


// ======================================================
// 4. NEWS CARD
// ======================================================

function newsCard(n) {

  return `
    <article class="news-card">
      <span class="tag">${n.tag || "NEWS"}</span>

      <h3>${n.title || "Untitled"}</h3>

      <p>${n.text || ""}</p>

      <time>${n.date || ""}</time>
    </article>
  `;

}


// ======================================================
// 5. RANKING ROW
// ======================================================

function rankRow(p, i) {

  const position =
    i === 0
      ? "🥇"
      : i === 1
      ? "🥈"
      : i === 2
      ? "🥉"
      : "#" + (i + 1);

  return `
    <div class="rank-row">

      <div class="rank-no">
        ${position}
      </div>

      <div class="player">
        ${p.name || "Player"}

        <small>
          ${p.team || ""}
          ·
          ${p.wins || 0} wins
        </small>
      </div>

      <div class="pts">
        ${p.points || 0}
        <small>PTS</small>
      </div>

    </div>
  `;

}


// ======================================================
// 6. TOURNAMENT CARD
// ======================================================

function tourCard(t) {

  return `
    <div class="tour-card">

      <span class="tag">
        ${t.status || "UPCOMING"}
      </span>

      <b>
        ${t.name || "Tournament"}
      </b>

      <p>
        📅 ${t.date || ""}
        <br>
        📍 ${t.place || ""}
      </p>

    </div>
  `;

}


// ======================================================
// 7. MATCH CARD
// ======================================================

function matchCard(m) {

  return `
    <div class="tour-card">

      <span class="tag">
        ${m.status || "MATCH"}
      </span>

      <b>
        ${m.player1 || "Player 1"}
        ${m.score1 ?? "-"}
        -
        ${m.score2 ?? "-"}
        ${m.player2 || "Player 2"}
      </b>

      <p>
        ⚽ Match Result
      </p>

    </div>
  `;

}


// ======================================================
// 8. RENDER APP
// ======================================================

function render() {

  // HOME NEWS

  setHTML(
    "#homeNews",
    news
      .slice(0, 3)
      .map(newsCard)
      .join("")
  );


  // FULL NEWS PAGE

  setHTML(
    "#newsList",
    news
      .map(newsCard)
      .join("")
  );


  // HOME RANKING

  setHTML(
    "#homeRanking",
    players
      .slice(0, 3)
      .map(rankRow)
      .join("")
  );


  // FULL RANKING

  setHTML(
    "#rankingList",
    players
      .map(rankRow)
      .join("")
  );


  // HOME TOURNAMENTS

  setHTML(
    "#homeTournaments",
    tournaments
      .slice(0, 3)
      .map(tourCard)
      .join("")
  );


  // TOURNAMENT PAGE

  setHTML(
    "#tournamentList",
    tournaments
      .map(tourCard)
      .join("")
  );


  // MATCHES

  setHTML(
    "#matchList",
    matches
      .map(matchCard)
      .join("")
  );

}


// 
==========================================
// 9. PAGE NAVIGATION
// ==========================================

function showPage(id) {
  if (!id) return;

  const targetPage = document.getElementById(id);

  if (!targetPage) {
    console.error("Page not found:", id);
    return;
  }

  // Hide all pages
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  // Show selected page
  targetPage.classList.add("active");

  // Update bottom navigation
  document.querySelectorAll(".nav").forEach(nav => {
    nav.classList.toggle(
      "active",
      nav.dataset.page === id
    );
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ==========================================
// 10. NAV BUTTON EVENTS
// ==========================================

function setupNavigation() {

  document.querySelectorAll("[data-page]").forEach(button => {

    button.addEventListener("click", function(event) {

      event.preventDefault();

      const pageId = this.dataset.page;

      if (pageId) {
        showPage(pageId);
      }

    });

  });

}


// ======================================================
// 11. RANKING FILTERS
// ======================================================

function setupFilters() {

  document
    .querySelectorAll(".filter")
    .forEach((button) => {

      button.addEventListener("click", () => {

        document
          .querySelectorAll(".filter")
          .forEach((b) => {

            b.classList.remove("active");

          });


        button.classList.add("active");


        const filter =
          button.dataset.filter;


        let list = players;


        if (filter === "eFootball Hub") {

          list = players.filter((player) =>

            (player.team || "")
              .includes("eFootball Hub")

          );

        }


        else if (filter === "Malaysia") {

          list = players;

        }


        else if (filter === "Sabah") {

          list = players.filter(
            (player) =>
              player.region === "Sabah"
          );

        }


        setHTML(
          "#rankingList",
          list
            .map(rankRow)
            .join("")
        );

      });

    });

}


// ======================================================
// 12. LOAD DATA FROM SUPABASE
// ======================================================

async function loadSupabaseData() {

  if (!supabaseClient) {
    console.warn("Supabase client not available");
    render();
    return;
  }

  try {

    // PLAYERS
    const { data: playerData, error: playerError } =
      await supabaseClient
        .from("players")
        .select("*");

    if (playerError) {
      console.error("PLAYER ERROR:", playerError);
    } else if (playerData && playerData.length > 0) {
      players = playerData;
    }


    // TOURNAMENTS
    const { data: tournamentData, error: tournamentError } =
      await supabaseClient
        .from("tournaments")
        .select("*");

    if (tournamentError) {
      console.error("TOURNAMENT ERROR:", tournamentError);
    } else if (tournamentData && tournamentData.length > 0) {
      tournaments = tournamentData;
    }


    // MATCHES
    const { data: matchData, error: matchError } =
      await supabaseClient
        .from("matches")
        .select("*");

    if (matchError) {
      console.error("MATCH ERROR:", matchError);
    } else if (matchData && matchData.length > 0) {
      matches = matchData;
    }


    // NEWS
    const { data: newsData, error: newsError } =
      await supabaseClient
        .from("news")
        .select("*");

    if (newsError) {
      console.error("NEWS ERROR:", newsError);
    } else if (newsData && newsData.length > 0) {

      news = newsData.map(n => ({
        tag: n.tag || "NEWS",
        title: n.title || "Untitled",
        text: n.content || n.text || "",
        date: n.created_at
          ? new Date(n.created_at).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric"
            })
          : n.date || ""
      }));

    }

  } catch (error) {

    console.error("SUPABASE LOAD ERROR:", error);

  }

  render();
}


// ======================================================
// 13. PWA INSTALL BUTTON
// ======================================================

let deferredPrompt = null;


window.addEventListener(
  "beforeinstallprompt",
  (event) => {

    event.preventDefault();

    deferredPrompt = event;


    const installBtn =
      document.querySelector("#installBtn")


    if (installBtn) {

      installBtn.classList.remove(
        "hidden"
      );

    }

  }
);


function setupInstallButton() {

  const installBtn =
    document.querySelector("#installBtn");


  if (!installBtn) {
    return;
  }


  installBtn.addEventListener(
    "click",
    async () => {

      if (!deferredPrompt) {

        console.log(
          "Install prompt is not available."
        );

        return;

      }


      deferredPrompt.prompt();


      try {

        await deferredPrompt.userChoice;

      }

      catch (error) {

        console.error(
          "INSTALL ERROR:",
          error
        );

      }


      deferredPrompt = null;

      installBtn.classList.add(
        "hidden"
      );

    }
  );

}


window.addEventListener(
  "appinstalled",
  () => {

    deferredPrompt = null;


    const installBtn =
      getElement("#installBtn");


    if (installBtn) {

      installBtn.classList.add(
        "hidden"
      );

    }

  }
);


// ======================================================
// 14. SERVICE WORKER
// ======================================================

if ("serviceWorker" in navigator) {

  window.addEventListener(
    "load",
    () => {

      navigator.serviceWorker
        .register("./sw.js")

        .then(() => {

          console.log(
            "Service worker registered."
          );

        })

        .catch((error) => {

          console.error(
            "SERVICE WORKER ERROR:",
            error
          );

        });

    }
  );

}


// ======================================================
// 15. START APP
// ======================================================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    // Activate navigation FIRST
setupNavigation();

// Activate ranking filters
setupFilters();

// Activate install button
setupInstallButton();

// Render fallback data AFTER buttons are activated
render();
    const activePage =
      document.querySelector(
        ".page.active"
      );

    if (!activePage) {

      const homePage =
        document.querySelector(
          "#home"
        );

      if (homePage) {

        showPage("home");

      }

    }

    // Load live Supabase data
    loadSupabaseData();

  }
);
// ========================================
// EDIT PLAYER PROFILE
// ========================================

document.addEventListener("DOMContentLoaded", () => {

  const editBtn = document.querySelector("#editProfileBtn");

  if (!editBtn) return;


  // Load saved profile
  const savedProfile = JSON.parse(
    localStorage.getItem("efootballProfile") || "{}"
  );

  function updateProfile(profile) {

    const nameEl = document.querySelector("#profileName");
    const teamEl = document.querySelector("#profileTeam");
    const ratingEl = document.querySelector("#profileRating");
    const matchesEl = document.querySelector("#profileMatches");
    const winsEl = document.querySelector("#profileWins");
    const winRateEl = document.querySelector("#profileWinRate");

    if (nameEl && profile.name) {
      nameEl.textContent = profile.name;
    }

    if (teamEl && profile.team) {
      teamEl.textContent = profile.team;
    }

    if (ratingEl && profile.rating !== undefined) {
      ratingEl.textContent = profile.rating;
    }

    if (matchesEl && profile.matches !== undefined) {
      matchesEl.textContent = profile.matches;
    }

    if (winsEl && profile.wins !== undefined) {
      winsEl.textContent = profile.wins;
    }

    if (
      winRateEl &&
      profile.matches > 0
    ) {
      const rate =
        (profile.wins / profile.matches) * 100;

      winRateEl.textContent =
        rate.toFixed(1) + "%";
    }
  }


  // Load existing saved data
  updateProfile(savedProfile);


  // Edit button
  editBtn.addEventListener("click", () => {

    const currentName =
      document.querySelector("#profileName")?.textContent || "";

    const currentTeam =
      document.querySelector("#profileTeam")?.textContent || "";

    const currentRating =
      document.querySelector("#profileRating")?.textContent || "0";

    const currentMatches =
      document.querySelector("#profileMatches")?.textContent || "0";

    const currentWins =
      document.querySelector("#profileWins")?.textContent || "0";


    const name = prompt(
      "Player Name:",
      currentName
    );

    if (name === null) return;


    const team = prompt(
      "Team Name:",
      currentTeam
    );

    if (team === null) return;


    const rating = prompt(
      "Ranking Points:",
      currentRating
    );

    if (rating === null) return;


    const matches = prompt(
      "Matches Played:",
      currentMatches
    );

    if (matches === null) return;


    const wins = prompt(
      "Wins:",
      currentWins
    );

    if (wins === null) return;


    const profile = {
      name: name.trim() || "Player",
      team: team.trim() || "No Team",
      rating: Number(rating) || 0,
      matches: Number(matches) || 0,
      wins: Number(wins) || 0
    };


    localStorage.setItem(
      "efootballProfile",
      JSON.stringify(profile)
    );

    updateProfile(profile);

    alert("✅ Profile saved!");

  });

});