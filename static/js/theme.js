// Set the theme before the page is rendered to avoid flash.
//
// This script is loaded without `defer`, so it blocks the rest of the page until
// it has run, meaning that the correct color theme will be applied before the
// user can see it. It must be included after the theme-color meta tag.
// We currently only have dark and light themes.
(() => {
  const saved = localStorage.getItem("theme");
  const theme = saved === "dark" || saved === "light"
    ? saved
    : (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content =
    theme === "dark" ? "#0a0a0a" : "#ffffff";
})();

function toggleTheme() {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  document.querySelector('meta[name="theme-color"]').content =
    next === 'dark' ? '#0a0a0a' : '#ffffff';
  localStorage.setItem('theme', next);
}
