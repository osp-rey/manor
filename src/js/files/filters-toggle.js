import { slideDown, slideUp } from "./helpFunctions.js";

export default function filtersToggle() {
  const filters = document.querySelector(".s-shop__filters");

  if (filters) {
    const btn = document.querySelector(".s-shop__filters-btn");
    const overlay = document.querySelector(".s-shop__filters-overlay");
    const filtersWrapper = document.querySelector(".s-shop__filters-wrapper");
    const btnClose = document.querySelector(".s-shop__filters-close");

    overlay.addEventListener("click", handlerClose);
    btnClose.addEventListener("click", handlerClose);

    btn.addEventListener("click", () => {
      if (window.matchMedia("(min-width: 575px)").matches) {
        if (filtersWrapper.hasAttribute("hidden")) {
          slideDown(filtersWrapper);
        } else {
          slideUp(filtersWrapper);
        }
      } else {
        if (filters.classList.contains("_open")) {
          handlerClose();
        } else {
          handlerOpen();
        }
      }
    });

    function handlerOpen() {
      overlay.classList.add("_active");
      filters.classList.add("_open");
      document.body.classList.add("body-hidden");
    }

    function handlerClose() {
      overlay.classList.remove("_active");
      filters.classList.remove("_open");
      document.body.classList.remove("body-hidden");
    }
  }
}
