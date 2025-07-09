document.addEventListener("DOMContentLoaded", () => {
  const hamburguesa = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");

  if (hamburguesa && menu) {
    hamburguesa.addEventListener("click", () => {
      menu.classList.toggle("mostrar-menu");
    });
  }
});
