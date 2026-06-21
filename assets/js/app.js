(() => {
  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector(".site-nav");
  const links = [...document.querySelectorAll(".tab-link")];
  const panels = [...document.querySelectorAll(".tab-panel")];
  const viewer = document.querySelector("#imageViewer");
  const viewerImage = document.querySelector("#viewerImage");
  const viewerCaption = document.querySelector("#viewerCaption");
  const viewerClose = document.querySelector(".viewer-close");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => nav.classList.toggle("open"));
  }

  function openTab(name) {
    panels.forEach(panel => panel.classList.toggle("active", panel.id === name));
    links.forEach(link => link.classList.toggle("active", link.dataset.tab === name));
    if (nav) nav.classList.remove("open");
    window.scrollTo({top:0,behavior:"smooth"});
  }

  links.forEach(link => {
    link.addEventListener("click", () => {
      if (link.dataset.tab) openTab(link.dataset.tab);
    });
  });

  document.querySelectorAll(".presentation-search").forEach(input => {
    input.addEventListener("input", () => {
      const grid = document.getElementById(input.dataset.target || "");
      if (!grid) return;
      const query = input.value.trim().toLowerCase();
      grid.querySelectorAll(".searchable-card").forEach(card => {
        card.hidden = query && !(card.dataset.search || "").includes(query);
      });
    });
  });

  document.querySelectorAll(".preview-button").forEach(button => {
    button.addEventListener("click", () => {
      if (!viewer || !viewerImage || !viewerCaption) return;
      viewerImage.src = button.dataset.image || "";
      viewerImage.alt = button.dataset.title || "";
      viewerCaption.textContent = button.dataset.title || "";
      viewer.showModal();
    });
  });

  if (viewerClose && viewer) {
    viewerClose.addEventListener("click", () => viewer.close());
    viewer.addEventListener("click", event => {
      if (event.target === viewer) viewer.close();
    });
  }
})();
