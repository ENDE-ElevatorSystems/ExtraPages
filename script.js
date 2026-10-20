(function () {
  const MRL_SURCHARGE = 2000;

  // Machine-room-less toggle: adds the surcharge to every package price
  const toggle = document.getElementById("mrl-toggle");
  const prices = document.querySelectorAll(".price[data-base]");
  const fmt = (n) => "$" + n.toLocaleString("en-US");

  toggle.addEventListener("change", () => {
    prices.forEach((el) => {
      const base = Number(el.dataset.base);
      el.textContent = fmt(toggle.checked ? base + MRL_SURCHARGE : base);
      el.classList.toggle("bumped", toggle.checked);
    });
  });

  // Top bar border on scroll
  const topbar = document.querySelector(".topbar");
  const onScroll = () => topbar.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (!("IntersectionObserver" in window)) return;

  // Highlight the nav link of the section in view
  const navLinks = document.querySelectorAll(".nav a");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  document.querySelectorAll("section[id]").forEach((s) => sectionObserver.observe(s));

  // Fade-in on scroll
  const revealTargets = document.querySelectorAll(
    ".card, .stat, .steps li, .package, .callout, .timeline-item"
  );
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );
  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });
})();
