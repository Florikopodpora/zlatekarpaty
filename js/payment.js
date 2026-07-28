// Payment Simulation Logic

let activeCheckoutData = null;

function openPaymentModal(checkoutData) {
  activeCheckoutData = checkoutData;
  const modal = document.getElementById("payment-modal");
  const body = document.getElementById("payment-modal-body");

  body.innerHTML = `
    <div class="space-y-4 p-5">
      <div class="text-center space-y-1">
        <span class="inline-block px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 text-[10px] font-bold uppercase">
          Záloha na výzvu
        </span>
        <h3 class="text-xl font-bold text-white">Platba ${checkoutData.depositPaid} Kč</h3>
        <p class="text-gray-400 text-xs">${checkoutData.challengeTitle}</p>
      </div>

      <div class="space-y-2.5">
        <!-- Apple Pay Simulator -->
        <button type="button" onclick="executePayment('Apple Pay')" class="w-full py-3.5 px-4 rounded-xl bg-white text-black font-bold flex items-center justify-between hover:bg-gray-100 transition-all">
          <span class="text-sm flex items-center gap-2"><i class="fa-brands fa-apple text-xl"></i> Apple Pay</span>
          <i class="fa-solid fa-chevron-right text-gray-400 text-xs"></i>
        </button>

        <!-- Google Pay Simulator -->
        <button type="button" onclick="executePayment('Google Pay')" class="w-full py-3.5 px-4 rounded-xl bg-black border border-white/20 text-white font-bold flex items-center justify-between hover:bg-white/5 transition-all">
          <span class="text-sm flex items-center gap-2"><i class="fa-brands fa-google text-lg text-yellow-400"></i> Google Pay</span>
          <i class="fa-solid fa-chevron-right text-gray-400 text-xs"></i>
        </button>

        <!-- Credit Card Switcher -->
        <button type="button" onclick="showCardForm()" class="w-full py-3.5 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold flex items-center justify-between hover:bg-white/10 transition-all">
          <span class="text-sm flex items-center gap-2"><i class="fa-solid fa-credit-card text-lg text-gray-300"></i> Platební Karta</span>
          <i class="fa-solid fa-chevron-right text-gray-400 text-xs"></i>
        </button>
      </div>

      <!-- Hidden Card Form -->
      <div id="card-form-container" class="hidden space-y-3 pt-3 border-t border-white/5">
        <div>
          <label class="text-[10px] text-gray-400 block mb-1">Číslo karty</label>
          <input type="text" value="4242 4242 4242 4242" class="bitesight-input" />
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="text-[10px] text-gray-400 block mb-1">Platnost</label>
            <input type="text" value="08/28" class="bitesight-input" />
          </div>
          <div>
            <label class="text-[10px] text-gray-400 block mb-1">CVC</label>
            <input type="text" value="789" class="bitesight-input" />
          </div>
        </div>
        <button type="button" onclick="executePayment('Platební Karta')" class="bitesight-btn-primary w-full py-3 mt-1">
          Zaplatit ${checkoutData.depositPaid} Kč
        </button>
      </div>
    </div>
  `;

  modal.classList.add("open");
}

function showCardForm() {
  const form = document.getElementById("card-form-container");
  if (form) form.classList.toggle("hidden");
}

function executePayment(methodName) {
  if (!activeCheckoutData) return;

  const body = document.getElementById("payment-modal-body");
  
  body.innerHTML = `
    <div class="py-10 text-center space-y-3">
      <div class="w-12 h-12 rounded-full border-2 border-white/20 border-t-white animate-spin mx-auto"></div>
      <h3 class="text-sm font-bold text-white">Zpracovávám platbu ${activeCheckoutData.depositPaid} Kč...</h3>
      <p class="text-[11px] text-gray-500">Bezpečné spojení...</p>
    </div>
  `;

  setTimeout(() => {
    const randomId = "REZ-" + Math.floor(10000 + Math.random() * 90000);
    const newReservation = {
      id: randomId,
      challengeId: activeCheckoutData.challengeId,
      challengeTitle: activeCheckoutData.challengeTitle,
      date: activeCheckoutData.date,
      time: activeCheckoutData.time,
      customerName: activeCheckoutData.customerName,
      phone: activeCheckoutData.phone,
      depositPaid: activeCheckoutData.depositPaid,
      status: "Potvrzeno",
      paidVia: methodName,
      qrCodeData: `BATRYNSTAV-${randomId}`,
      createdAt: new Date().toISOString().split('T')[0]
    };

    saveReservation(newReservation);

    body.innerHTML = `
      <div class="py-6 text-center space-y-4 p-4">
        <div class="w-12 h-12 rounded-full bg-green-500/10 border border-green-500 text-green-400 mx-auto flex items-center justify-center text-xl">
          ✓
        </div>
        <h3 class="text-base font-bold text-white">Platba proběhla úspěšně!</h3>
        
        <div class="bg-black/55 p-3 rounded-lg text-left text-xs space-y-1.5 text-gray-300">
          <div>Kód: <strong class="text-white">${randomId}</strong></div>
          <div>Výzva: <span>${activeCheckoutData.challengeTitle}</span></div>
          <div>Termín: <span>${formatCzechDate(activeCheckoutData.date)} v ${activeCheckoutData.time}</span></div>
        </div>

        <button onclick="finishCheckoutAndGoToBookings('${randomId}')" class="bitesight-btn-primary w-full py-3 text-xs">
          Zobrazit Rezervace & Lístek
        </button>
      </div>
    `;
  }, 1500);
}

function finishCheckoutAndGoToBookings(ticketId) {
  closeModal('payment-modal');
  switchTab('my-bookings');
  setTimeout(() => {
    showTicketModal(ticketId);
  }, 250);
}
