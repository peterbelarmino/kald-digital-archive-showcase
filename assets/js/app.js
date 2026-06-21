(() => {
  document.querySelectorAll('a[href*="view=login"]').forEach(link => {
    link.addEventListener("click", () => {
      link.setAttribute("aria-busy", "true");
    });
  });
})();
