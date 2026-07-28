// TikTok & Leaderboard Logic

function renderTikTokTab() {
  const container = document.getElementById("tiktok-content-container");
  if (!container) return;

  container.innerHTML = `
    <!-- Bitesight TikTok Header Card -->
    <div class="bitesight-card text-center p-6 space-y-3 relative overflow-hidden">
      <div class="w-12 h-12 rounded-full bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-xl text-white">
        <i class="fa-brands fa-tiktok"></i>
      </div>
      <div>
        <h3 class="font-bold text-base text-white">@batrynstav2</h3>
        <p class="text-xs text-gray-400">Oficiální gastro výzvy Restaurace Zlaté Karpaty</p>
      </div>
      <a href="${APP_DATA.restaurant.tiktokUrl}" target="_blank" class="bitesight-btn-primary py-2 px-6 inline-flex text-xs">
        Sledovat na TikToku
      </a>
    </div>

    <!-- Leaderboard -->
    <div class="space-y-3 mb-6">
      <h4 class="text-sm font-bold text-gray-300 uppercase tracking-wider">Síň Slávy (Nejlepší výkony)</h4>
      
      <div class="space-y-2">
        ${APP_DATA.leaderboard.map((item, idx) => `
          <div class="bitesight-card p-3 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="font-bold text-xs text-gray-400">#${idx + 1}</span>
              <div>
                <h5 class="font-bold text-xs text-white">${item.name}</h5>
                <p class="text-[10px] text-gray-400">${item.challenge} • ${item.time}</p>
              </div>
            </div>
            <div class="text-right">
              <span class="text-[11px] font-bold ${item.result.includes('VÝHRA') ? 'text-green-400' : 'text-red-400'}">
                ${item.result}
              </span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Video Grid -->
    <div class="space-y-3">
      <h4 class="text-sm font-bold text-gray-300 uppercase tracking-wider">Populární Videa</h4>
      
      <div class="grid grid-cols-2 gap-2">
        <div class="bitesight-card p-2 cursor-pointer" onclick="window.open('${APP_DATA.restaurant.tiktokUrl}', '_blank')">
          <div class="relative aspect-[9/14] rounded-lg overflow-hidden bg-black mb-2">
            <img src="assets/tower.png" class="w-full h-full object-cover opacity-80" />
            <div class="absolute bottom-2 left-2 text-[10px] text-white bg-black/60 px-1.5 py-0.5 rounded flex items-center gap-1">
              <i class="fa-solid fa-play"></i> 142K
            </div>
          </div>
          <p class="text-[10px] font-bold text-gray-200 line-clamp-2">5-patrová věž pro dva! Pokus za 26 minut 🗼</p>
        </div>

        <div class="bitesight-card p-2 cursor-pointer" onclick="window.open('${APP_DATA.restaurant.tiktokUrl}', '_blank')">
          <div class="relative aspect-[9/14] rounded-lg overflow-hidden bg-black mb-2">
            <img src="assets/burger.png" class="w-full h-full object-cover opacity-80" />
            <div class="absolute bottom-2 left-2 text-[10px] text-white bg-black/60 px-1.5 py-0.5 rounded flex items-center gap-1">
              <i class="fa-solid fa-play"></i> 98K
            </div>
          </div>
          <p class="text-[10px] font-bold text-gray-200 line-clamp-2">Obří Monster Burger výzva! Snědeno za 22:15 🍔</p>
        </div>
      </div>
    </div>
  `;
}
