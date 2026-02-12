import "../scss/style.scss";
import burger from "./files/burger.js";
import buttonsNote from "./files/buttonsNote.js";
import filtersToggle from "./files/filters-toggle.js";
import inputBtnContent from "./files/inputBtnContent.js";
import inputmask from "./files/inputmask.js";
import location from "./files/location.js";
import map from "./files/map.js";
import scroallable from "./files/scrollbable.js";
import sliders from "./files/sliders.js";
import spoller from "./files/spoller.js";
import tab from "./files/tab.js";

document.addEventListener("DOMContentLoaded", () => {
  spoller();
  burger();
  inputmask();
  sliders();
  inputBtnContent();
  scroallable();
  tab();
  location();
  map();
  buttonsNote();
  filtersToggle();

  Fancybox.bind("[data-fancybox]", {});
  // Fancybox.show([{ src: "#modal-feedback", type: "inline" }]);
});
