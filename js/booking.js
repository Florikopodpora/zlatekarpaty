// Booking & Reservation Logic

let selectedChallengeId = null;
let selectedTimeSlot = "14:30";

function initBookingForm(challengeId = null) {
  selectedChallengeId = challengeId || APP_DATA.challenges[0].id;
  renderChallengeSelector();
  setupDateSlots();
}

function renderChallengeSelector() {
  const selectEl = document.getElementById("booking-challenge-select");
  if (!selectEl) return;

  selectEl.innerHTML = APP_DATA.challenges.map(c => `
    <option value="${c.id}" ${c.id === selectedChallengeId ? 'selected' : ''}>
      ${c.title} — ${c.failFee} Kč záloha / ${c.prize.toLocaleString()} Kč Výhra
    </option>
  `).join('');

  selectEl.addEventListener("change", (e) => {
    selectedChallengeId = e.target.value;
    updateSelectedChallengeSummary();
  });

  updateSelectedChallengeSummary();
}

function updateSelectedChallengeSummary() {
  const challenge = APP_DATA.challenges.find(c => c.id === selectedChallengeId);
  const summaryEl = document.getElementById("booking-challenge-summary");
  if (!summaryEl || !challenge) return;

  summaryEl.innerHTML = `
    <div class="bitesight-card flex items-center gap-3 p-3 bg-white/5 mb-3">
      <img src="${challenge.image}" alt="${challenge.title}" class="w-12 h-12 rounded object-cover" />
      <div class="flex-1">
        <h4 class="font-bold text-sm text-white">${challenge.title}</h4>
        <p class="text-[11px] text-gray-400">Limit: ${challenge.timeLimit} min | Tým: ${challenge.peopleCount} ${challenge.peopleCount > 1 ? 'lidé' : 'člověk'}</p>
        <div class="text-[11px] text-green-400 font-bold">Výhra: ${challenge.prize.toLocaleString()} Kč</div>
      </div>
    </div>
  `;

  const feeEl = document.getElementById("booking-total-price");
  if (feeEl) {
    feeEl.innerText = `${challenge.failFee} Kč`;
  }
}

function setupDateSlots() {
  const dateInput = document.getElementById("booking-date");
  if (!dateInput) return;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  dateInput.min = tomorrow.toISOString().split('T')[0];
  dateInput.value = tomorrow.toISOString().split('T')[0];

  const times = ["11:30", "13:00", "14:30", "16:00", "17:30", "19:00", "20:30"];
  const timeContainer = document.getElementById("time-slots-container");
  if (timeContainer) {
    timeContainer.innerHTML = times.map((t, idx) => `
      <button type="button" class="time-slot-btn bitesight-btn-secondary py-1.5 px-2 text-[11px] font-semibold rounded ${idx === 2 ? 'bg-red-500 border-red-500 text-white' : ''}" onclick="selectTimeSlot(this, '${t}')">
        ${t}
      </button>
    `).join('');
  }
}

function selectTimeSlot(btn, timeStr) {
  document.querySelectorAll(".time-slot-btn").forEach(b => {
    b.classList.remove("bg-red-500", "border-red-500", "text-white");
  });
  btn.classList.add("bg-red-500", "border-red-500", "text-white");
  selectedTimeSlot = timeStr;
}

function proceedToPayment(e) {
  if (e) e.preventDefault();

  const name = document.getElementById("booking-name")?.value.trim();
  const phone = document.getElementById("booking-phone")?.value.trim();
  const date = document.getElementById("booking-date")?.value;

  if (!name || !phone || !date) {
    showToast("Prosím vyplň své jméno, telefon a datum.");
    return;
  }

  const challenge = APP_DATA.challenges.find(c => c.id === selectedChallengeId);
  if (!challenge) return;

  openPaymentModal({
    challengeId: challenge.id,
    challengeTitle: challenge.title,
    depositPaid: challenge.failFee,
    date: date,
    time: selectedTimeSlot,
    customerName: name,
    phone: phone
  });
}
