import { createScript } from "./helpFunctions.js";

export default function location() {
  const map = document.querySelector("#location-map");

  if (map) {
    let yaMap = null;
    const buttons = document.querySelectorAll("[data-location-btn]");
    const btnAll = document.querySelector("[data-location-all-btn]");
    const arrCoords = [];

    buttons.forEach((btn) => {
      const coord = JSON.parse(btn.dataset.locationBtn);
      arrCoords.push(coord);

      btn.addEventListener("click", () => {
        yaMap.destroy();

        btnAll.classList.remove("_active");
        buttons.forEach((b) => b.classList.remove("_active"));

        btn.classList.add("_active");
        handlerCreateMap(map, [coord], 16);
      });
    });

    btnAll.addEventListener("click", () => {
      yaMap.destroy();
      buttons.forEach((b) => b.classList.remove("_active"));
      btnAll.classList.add("_active");
      
      handlerCreateMap(map, arrCoords);
    });

    const options = {
      root: null,
      rootMargin: "0px",
      scrollMargin: "0px",
      threshold: 0.01,
    };

    const observer = new IntersectionObserver(callback, options);

    observer.observe(map);

    function callback(entries, observer) {
      entries.forEach((entry) => {
        const target = entry.target;

        if (entry.isIntersecting) {
          createScript(
            "https://api-maps.yandex.ru/2.1/?apikey=b46e9249-4925-4460-b11c-3aaf76ad0115&lang=ru_RU",
            "text/javascript",
          ).then(() => handlerCreateMap(target, arrCoords));

          observer.unobserve(target);
        }
      });
    }
    function handlerCreateMap(map, coords, zoomArg) {
      const zoom = Number(map.dataset.zoom);
      const iconHref = map.dataset.icon;

      let objectMark = {};

      if (iconHref) {
        objectMark = {
          iconLayout: "default#image",
          iconImageHref: iconHref,
          iconImageSize: [60, 75],
          iconImageOffset: [-30, -70],
        };
      }

      function init() {
        yaMap = new ymaps.Map(map, {
          center: coords[0],
          zoom: zoomArg || zoom,
        });

        coords?.forEach((coord) => {
          const placemark = new ymaps.Placemark(coord, {}, objectMark);
          yaMap.geoObjects.add(placemark);
        });

        yaMap.controls.remove("geolocationControl"); // удаляем геолокацию
        yaMap.controls.remove("searchControl"); // удаляем поиск
        yaMap.controls.remove("trafficControl"); // удаляем контроль трафика
        yaMap.controls.remove("typeSelector"); // удаляем тип
        yaMap.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
        // yaMap.controls.remove("zoomControl"); // удаляем контрол зуммирования
        yaMap.controls.remove("rulerControl"); // удаляем контрол правил
      }

      ymaps.ready(init);
    }
  }
}
