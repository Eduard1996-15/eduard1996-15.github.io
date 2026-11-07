document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-navigation");
  const themeToggle = document.querySelector(".theme-toggle");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const year = document.querySelector("[data-current-year]");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (themeToggle) {
    const savedTheme = localStorage.getItem("portfolio-theme");
    const initialTheme = savedTheme === "dark" ? "dark" : "light";
    const themeLabel = themeToggle.querySelector("span");
    const themeIcon = themeToggle.querySelector("i");

    const setTheme = (theme) => {
      const isDark = theme === "dark";
      document.documentElement.dataset.theme = theme;
      themeColor.content = isDark ? "#101a2d" : "#eef2f6";
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute("aria-label", `Activar tema ${isDark ? "claro" : "oscuro"}`);
      themeLabel.textContent = `Tema ${isDark ? "claro" : "oscuro"}`;
      themeIcon.className = `fa-solid ${isDark ? "fa-sun" : "fa-moon"}`;
    };

    setTheme(initialTheme);
    themeToggle.addEventListener("click", () => {
      const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      setTheme(nextTheme);
      localStorage.setItem("portfolio-theme", nextTheme);
    });
  }

  if (!menuToggle || !navigation) {
    return;
  }

  const closeMenu = () => {
    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    navigation.classList.toggle("is-open", !isOpen);
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
    menuToggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-bars" aria-hidden="true"></i>'
      : '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
  });

  navigation.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.matchMedia("(min-width: 701px)").addEventListener("change", closeMenu);
});
