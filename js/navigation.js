const burgerBtn = document.getElementById("burgerBtn");
const navMenu = document.getElementById("navMenu");

burgerBtn.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  burgerBtn.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("#navMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    burgerBtn.setAttribute("aria-expanded", "false");
  });
});
