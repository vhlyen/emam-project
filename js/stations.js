const stationGrid = document.getElementById("stationGrid");
const searchInput = document.getElementById("searchInput");
const citySelect = document.getElementById("citySelect");

function renderStations() {
  const keyword = searchInput.value.trim().toLowerCase();
  const city = citySelect.value;

  const filtered = stations.filter((station) => {
    const matchCity = city === "all" || station.city === city;
    const matchKeyword = station.name.toLowerCase().includes(keyword);
    return matchCity && matchKeyword;
  });

  stationGrid.innerHTML = "";

  if (filtered.length === 0) {
    stationGrid.innerHTML =
      '<div class="empty-msg">Chưa tìm thấy trạm cứu hộ phù hợp 🐾</div>';
    return;
  }

  filtered.forEach((station) => {
    const card = document.createElement("div");
    card.className = "station-card";

    card.innerHTML = `
      <div class="paw-icon">🐾</div>
      <div>
        <h4>${escapeHtml(station.name)}</h4>
        <p>📍 ${escapeHtml(station.address)}</p>
        <p>📞 ${escapeHtml(station.phone)}</p>
        <a
          class="btn-small map-btn"
          href="${station.mapUrl}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Xem bản đồ
        </a>
      </div>
    `;

    stationGrid.appendChild(card);
  });
}

// Basic protection when rendering data into HTML.
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

searchInput.addEventListener("input", renderStations);
citySelect.addEventListener("change", renderStations);
