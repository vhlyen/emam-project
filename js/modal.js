const modal = document.getElementById("videoModal");
const modalTitle = document.getElementById("modalTitle");
const videoContainer = document.getElementById("videoContainer");
const closeModalBtn = document.getElementById("closeModalBtn");

function openModal(material) {
  modalTitle.textContent = `Hướng dẫn: ${material}`;

  const videoUrl = videoLinks[material];

  if (videoUrl) {
    videoContainer.innerHTML = `
      <iframe
        src="${videoUrl}"
        title="Video hướng dẫn ${material}"
        width="100%"
        height="300"
        frameborder="0"
        allowfullscreen
      ></iframe>
    `;
  } else {
    videoContainer.innerHTML = "🎬";
  }

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  videoContainer.innerHTML = "🎬";
}

document.querySelectorAll(".video-btn").forEach((button) => {
  button.addEventListener("click", () => {
    openModal(button.dataset.material);
  });
});

closeModalBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("show")) {
    closeModal();
  }
});
