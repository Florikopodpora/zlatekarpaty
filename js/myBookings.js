// My Bookings Tab Logic

let _inMemoryReservations = null;

function getReservations() {
  try {
    const stored = localStorage.getItem("batrynstav_reservations");
    if (!stored) {
      localStorage.setItem("batrynstav_reservations", JSON.stringify(APP_DATA.sampleReservations));
      return APP_DATA.sampleReservations;
    }
    return JSON.parse(stored);
  } catch (e) {
    console.warn("LocalStorage error, fallback to memory:", e);
    if (!_inMemoryReservations) {
      _inMemoryReservations = [...APP_DATA.sampleReservations];
    }
    return _inMemoryReservations;
  }
}

function saveReservation(newBooking) {
  try {
    const current = getReservations();
    current.unshift(newBooking);
    localStorage.setItem("batrynstav_reservations", JSON.stringify(current));
  } catch (e) {
    console.warn("LocalStorage save error, fallback to memory:", e);
    if (!_inMemoryReservations) {
      _inMemoryReservations = [...APP_DATA.sampleReservations];
    }
    _inMemoryReservations.unshift(newBooking);
  }
}

function renderMyBookings() {
  const container = document.getElementById("my-bookings-list");
  if (!container) return;

  const list = getReservations();

  if (list.length === 0) {
    container.innerHTML = `
      <div class="bitesight-card text-center p-6 space-y-3">
        <h3 class="font-bold text-base">Zatím nemáš žádnou rezervaci</h3>
        <p class="text-xs text-gray-400">Vyber si výzvu a ukaž, co v tobě je! Vyhraj až 20 000 Kč.</p>
        <button onclick="switchTab('challenges')" class="bitesight-btn-primary py-2 px-4 text-xs">
          Prohlédnout Výzvy
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(res => `
    <div class="bitesight-card space-y-3">
      <div class="flex items-center justify-between border-b border-white/5 pb-2">
        <span class="text-xs text-green-400 font-bold flex items-center gap-1">
          ✓ ${res.status || 'Potvrzeno'}
        </span>
        <span class="text-[10px] text-gray-400">Kód: ${res.id}</span>
      </div>

      <div class="space-y-1 text-xs">
        <h4 class="font-bold text-sm text-white">${res.challengeTitle}</h4>
        <div class="text-gray-300">
          <div>📅 Termín: <strong class="text-white">${formatCzechDate(res.date)} o ${res.time} hod</strong></div>
          <div>📍 ${APP_DATA.restaurant.name}, ${APP_DATA.restaurant.address}</div>
          <div>👤 Účastník: ${res.customerName} (${res.phone})</div>
        </div>
      </div>

      <div class="flex justify-between items-center pt-2 border-t border-white/5">
        <button onclick="showTicketModal('${res.id}')" class="bitesight-btn-primary py-1.5 px-3 text-[11px]">
          Zobrazit QR Lístek
        </button>
        <button onclick="cancelReservation('${res.id}')" class="text-[11px] text-red-400">
          Stornovat
        </button>
      </div>
    </div>
  `).join('');
}

function formatCzechDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("cs-CZ", { weekday: 'short', day: 'numeric', month: 'long' });
}

function showTicketModal(resId) {
  const list = getReservations();
  const res = list.find(r => r.id === resId);
  if (!res) return;

  const modal = document.getElementById("ticket-modal");
  const body = document.getElementById("ticket-modal-body");

  body.innerHTML = `
    <div class="ticket-card p-5 text-center space-y-4">
      <div class="text-xs text-yellow-400 font-bold uppercase tracking-wider">
        Vstupenka na Gastro Výzvu
      </div>

      <h3 class="text-lg font-bold text-white">${res.challengeTitle}</h3>
      
      <div class="bg-black/50 p-3 rounded-lg text-left text-xs space-y-1.5 text-gray-300">
        <div>Místo: <strong>${APP_DATA.restaurant.name}</strong></div>
        <div>Adresa: <span>${APP_DATA.restaurant.address}, Ústí n. L.</span></div>
        <div>Termín: <strong class="text-yellow-400">${formatCzechDate(res.date)} v ${res.time}</strong></div>
        <div>Účastník: <span>${res.customerName}</span></div>
        <div>Záloha: <strong class="text-green-400">${res.depositPaid} Kč (${res.paidVia})</strong></div>
      </div>

      <div class="bg-white p-3 rounded-xl inline-block">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(res.qrCodeData || res.id)}" alt="QR Code" class="w-32 h-32 mx-auto" />
      </div>
      <p class="text-[10px] text-gray-500 font-mono">Ukaž tento QR kód obsluze na restauraci.</p>

      <button onclick="closeModal('ticket-modal')" class="bitesight-btn-secondary w-full py-2.5 text-xs">Zavřít</button>
    </div>
  `;

  modal.classList.add("open");
}

function cancelReservation(resId) {
  if (confirm("Opravdu si přeješ zrušit tuto rezervaci?")) {
    let list = getReservations();
    list = list.filter(r => r.id !== resId);
    try {
      localStorage.setItem("batrynstav_reservations", JSON.stringify(list));
    } catch(e) {
      _inMemoryReservations = list;
    }
    renderMyBookings();
    showToast("Rezervace byla stornována.");
  }
}
