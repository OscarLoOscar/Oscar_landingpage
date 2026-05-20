(function () {
  const tabs = document.querySelectorAll(".course-tab");
  const panels = document.querySelectorAll(".course-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;

      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", String(active));
      });

      panels.forEach((panel) => {
        const active = panel.dataset.panel === target;
        panel.classList.toggle("is-active", active);
        panel.hidden = !active;
      });
    });
  });

  const techToggle = document.getElementById("tech-stack-toggle");
  const techPanel = document.getElementById("tech-stack-panel");

  if (techToggle && techPanel) {
    techToggle.addEventListener("click", () => {
      const expanded = techToggle.getAttribute("aria-expanded") === "true";
      techToggle.setAttribute("aria-expanded", String(!expanded));
      techPanel.hidden = expanded;
    });
  }
})();
