(() => {
  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector(".site-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  const albumGrid = document.querySelector("[data-album-grid]");
  if (!albumGrid) return;

  const search = document.querySelector("[data-album-search]");
  const yearFilter = document.querySelector("[data-year-filter]");

  fetch("data/albums.json")
    .then(response => {
      if (!response.ok) throw new Error("Album catalog failed to load.");
      return response.json();
    })
    .then(albums => {
      const years = [...new Set(albums.map(item => item.year))].sort().reverse();

      years.forEach(year => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
      });

      const render = () => {
        const keyword = (search.value || "").trim().toLowerCase();
        const selectedYear = yearFilter.value;

        const filtered = albums.filter(album => {
          const matchesKeyword =
            !keyword ||
            album.title.toLowerCase().includes(keyword) ||
            album.sourceFile.toLowerCase().includes(keyword);

          const matchesYear =
            !selectedYear ||
            album.year === selectedYear;

          return matchesKeyword && matchesYear;
        });

        albumGrid.innerHTML = "";

        if (!filtered.length) {
          albumGrid.innerHTML =
            '<div class="empty-state">No matching album was found.</div>';
          return;
        }

        filtered.forEach(album => {
          const article = document.createElement("article");
          article.className = "album-card";
          article.innerHTML = `
            <div class="album-cover">
              <span class="album-year">${escapeHtml(album.year)}</span>
            </div>
            <div class="album-body">
              <span class="badge">Public-safe catalog</span>
              <h3>${escapeHtml(album.title)}</h3>
              <div class="meta">
                <span>${Number(album.imageCount).toLocaleString()} image references</span>
              </div>
            </div>
          `;
          albumGrid.appendChild(article);
        });
      };

      search.addEventListener("input", render);
      yearFilter.addEventListener("change", render);
      render();
    })
    .catch(error => {
      albumGrid.innerHTML =
        `<div class="empty-state">${escapeHtml(error.message)}</div>`;
    });

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();
