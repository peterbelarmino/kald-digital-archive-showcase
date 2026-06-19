(() => {
  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector(".site-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }
})();
