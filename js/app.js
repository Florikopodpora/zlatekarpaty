// Application Controller & Navigation

let currentTab = "challenges";

document.addEventListener("DOMContentLoaded", () => {
  renderChallengesGrid();
  renderPosterTab();
  initBookingForm();
  renderMyBookings();
  renderTikTokTab();
  setupEventListeners();
});

function switchTab(tabId) {
  currentTab = tabId;

  document.querySelectorAll(".tab-view").forEach(view => {
    view.classList.add("hidden");
  });

  const activeView = document.getElementById(`view-${tabId}`);
  if (activeView) {
    activeView.classList.remove("hidden");
  }

  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.remove("active");
    if (item.dataset.tab === tabId) {
      item.classList.add("active");
    }
  });

  if (tabId === "my-bookings") {
    renderMyBookings();
  } else if (tabId === "tiktok") {
    renderTikTokTab();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderChallengesGrid() {
  const container = document.getElementById("challenges-grid");
  if (!container) return;

  container.innerHTML = APP_DATA.challenges.map(c => `
    <div class="card-minimal p-4 space-y-3">
      <!-- Image with uniform crop & subtle dark vignette -->
      <div class="challenge-img-wrapper">
        <img src="${c.image}" alt="${c.title}" />
        <div class="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/75 text-white border border-white/10 backdrop-blur-md uppercase tracking-wider">
          ${c.tag}
        </div>
        <div class="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-black/80 text-yellow-300 border border-yellow-400/20 backdrop-blur-md">
          ⏱️ ${c.timeLimit} min
        </div>
      </div>

      <div>
        <div class="flex items-baseline justify-between mb-1">
          <h3 class="text-lg font-bold text-white leading-tight">${c.title}</h3>
          <span class="text-xs text-gray-400">${c.peopleCount > 1 ? 'Pro 2 osoby' : '1 osoba'}</span>
        </div>
        <p class="text-xs text-gray-400 line-clamp-2 leading-relaxed">${c.description}</p>
      </div>

      <!-- Price Breakdown -->
      <div class="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-black/40 border border-white/5 text-xs">
        <div>
          <span class="text-[10px] text-gray-400 uppercase block">Výhra</span>
          <strong class="text-green-400 font-bold">${c.prize.toLocaleString()} Kč</strong>
        </div>
        <div class="border-l border-white/10 pl-2.5">
          <span class="text-[10px] text-gray-400 uppercase block">Při prohře</span>
          <strong class="text-red-400 font-bold">${c.failFee} Kč</strong>
        </div>
      </div>

      <!-- CTAs -->
      <div class="grid grid-cols-2 gap-2 pt-1">
        <button onclick="openChallengeDetail('${c.id}')" class="btn-secondary py-2.5 text-xs">
          Pravidla
        </button>
        <button onclick="startBookingFor('${c.id}')" class="btn-primary py-2.5 text-xs">
          Zarezervovat
        </button>
      </div>
    </div>
  `).join('');
}

function openChallengeDetail(challengeId) {
  const challenge = APP_DATA.challenges.find(c => c.id === challengeId);
  if (!challenge) return;

  const modal = document.getElementById("detail-modal");
  const body = document.getElementById("detail-modal-body");

  body.innerHTML = `
    <div class="space-y-4">
      <div class="challenge-img-wrapper">
        <img src="${challenge.image}" alt="${challenge.title}" />
        <div class="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-black/80 text-white border border-white/10">
          ${challenge.tag}
        </div>
      </div>

      <div>
        <h3 class="text-xl font-bold text-white mb-1">${challenge.title}</h3>
        <p class="text-xs text-yellow-400 font-medium mb-2">${challenge.subtitle}</p>
        <p class="text-xs text-gray-300 leading-relaxed">${challenge.description}</p>
      </div>

      <div class="grid grid-cols-2 gap-3 p-3 rounded-xl bg-black/50 border border-white/10 text-center">
        <div>
          <span class="text-[11px] text-gray-400 block">Odměna při výhře</span>
          <span class="text-lg font-bold text-green-400">${challenge.prize.toLocaleString()} Kč</span>
        </div>
        <div class="border-l border-white/10">
          <span class="text-[11px] text-gray-400 block">Záloha / Při prohře</span>
          <span class="text-lg font-bold text-red-400">${challenge.failFee} Kč</span>
        </div>
      </div>

      <div class="card-minimal p-4 space-y-2">
        <h4 class="text-xs font-bold text-white uppercase tracking-wider">Oficiální Pravidla:</h4>
        <ul class="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
          ${challenge.rules.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>

      <div class="flex gap-2 pt-2">
        <button onclick="closeModal('detail-modal')" class="btn-secondary flex-1 py-3">Zavřít</button>
        <button onclick="closeModal('detail-modal'); startBookingFor('${challenge.id}')" class="btn-primary flex-1 py-3">
          Chci zarezervovat
        </button>
      </div>
    </div>
  `;

  modal.classList.add("open");
}

function startBookingFor(challengeId) {
  switchTab('booking');
  initBookingForm(challengeId);
}

function renderPosterTab() {
  const container = document.getElementById("poster-view-container");
  if (!container) return;

  container.innerHTML = `
    <div class="card-minimal p-4 text-center space-y-3">
      <h3 class="text-lg font-bold text-white">Oficiální Plakát Akce</h3>
      <p class="text-xs text-gray-400">Restaurace Zlaté Karpaty (Ústí nad Labem)</p>
      
      <div class="rounded-xl overflow-hidden border border-white/10 shadow-2xl">
        <img src="assets/poster.jpg" alt="Oficiální Plakát Zlaté Karpaty" class="w-full h-auto object-contain" />
      </div>

      <div class="p-3 bg-black/40 rounded-xl text-left text-xs text-gray-300 space-y-1">
        <div class="font-bold text-yellow-400">Restaurace Zlaté Karpaty</div>
        <div>Adresa: Hornická 2511, Ústí nad Labem</div>
        <div>Rezervace v aplikaci nebo tel: <a href="tel:732781138" class="text-green-400 font-bold underline">732 781 138</a></div>
        <div>TikTok: <a href="${APP_DATA.restaurant.tiktokUrl}" target="_blank" class="text-yellow-400 font-bold underline">@batrynstav2</a></div>
      </div>
    </div>
  `;
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("open");
}

function showToast(message) {
  let toast = document.getElementById("app-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "app-toast";
    toast.className = "fixed top-5 left-1/2 -translate-x-1/2 z-[2000] bg-yellow-400 text-black font-bold px-5 py-2.5 rounded-full text-xs shadow-2xl transition-all duration-300 pointer-events-none opacity-0 translate-y-[-20px]";
    document.body.appendChild(toast);
  }
  toast.innerText = message;
  toast.classList.remove("opacity-0", "translate-y-[-20px]");
  toast.classList.add("opacity-100", "translate-y-0");

  setTimeout(() => {
    toast.classList.remove("opacity-100", "translate-y-0");
    toast.classList.add("opacity-0", "translate-y-[-20px]");
  }, 3000);
}

function setupEventListeners() {
  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => {
      switchTab(item.dataset.tab);
    });
  });
}
