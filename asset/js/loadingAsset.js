export function addZIndexBackground() {
  const header = document.querySelector('.search-bar__wrap');
  header.style.display = "none"
}

export function removeZIndexBackground() {
  const header = document.querySelector('.search-bar__wrap');
  header.style.display = "flex"
}