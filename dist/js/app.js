(() => {
    "use strict";
    function burger() {
        const burger = document.querySelector("#burger");
        if (burger) {
            const btnToggle = document.querySelector("#burger-toggle");
            document.body.addEventListener("click", handleClose);
            window.addEventListener("resize", changeHeight);
            burger.addEventListener("click", e => {
                if (!e.target.hasAttribute("data-fancybox")) e.stopPropagation();
            });
            btnToggle.addEventListener("click", e => {
                e.stopPropagation();
                if (burger.classList.contains("_open")) handleClose(); else handleOpen();
            });
            function handleOpen() {
                document.body.classList.add("body-hidden");
                burger.classList.add("_open");
                btnToggle.classList.add("_active");
                changeHeight();
            }
            function handleClose() {
                document.body.classList.remove("body-hidden");
                burger.classList.remove("_open");
                btnToggle.classList.remove("_active");
            }
            function changeHeight() {
                const headerHeight = document.querySelector(".header").clientHeight;
                const maxHeight = window.innerHeight - headerHeight;
                burger.style.maxHeight = `${maxHeight}px`;
            }
        }
    }
    function buttonsNote() {
        const butons = document.querySelectorAll("[data-btn-note]");
        if (butons.length) butons.forEach(btn => {
            btn.addEventListener("click", () => {
                const selectorTarget = btn.dataset.targetNote;
                const target = document.querySelector(selectorTarget);
                const value = btn.dataset.btnNote;
                if (target) target.value = value;
            });
        });
    }
    function copy() {
        const buttons = document.querySelectorAll("[data-copy]");
        if (buttons.length) buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const value = btn.dataset.copy;
                const tooltip = tippy(btn, {
                    content: "Скопировано",
                    trigger: "manual"
                });
                tooltip.show();
                setTimeout(() => {
                    tooltip.hide();
                }, 1e3);
                navigator.clipboard.writeText(value).then(() => {
                    tooltip.show();
                    setTimeout(() => {
                        tooltip.hide();
                    }, 1e3);
                });
            });
        });
    }
    function createScript(url, type) {
        if (!url) return;
        return new Promise((resolve, reject) => {
            const script = document.querySelector(`script[src="${url}"]`);
            if (script) resolve(script); else {
                const htmlScript = document.createElement("script");
                htmlScript.src = url;
                if (type) htmlScript.type = type;
                htmlScript.onload = () => {
                    resolve(htmlScript);
                };
                htmlScript.onerror = () => {
                    reject(new Error(`Не удалось загрузить скрипт: ${url}`));
                };
                document.head.appendChild(htmlScript);
            }
        });
    }
    function slideUp(target, duration = 500, showmore = 0) {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout(() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty("height") : null;
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                !showmore ? target.style.removeProperty("overflow") : null;
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }, duration);
        }
    }
    function slideDown(target, duration = 500, showmore = 0) {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty("height") : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            window.setTimeout(() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }, duration);
        }
    }
    function filtersToggle() {
        const filters = document.querySelector(".s-shop__filters");
        if (filters) {
            const btn = document.querySelector(".s-shop__filters-btn");
            const overlay = document.querySelector(".s-shop__filters-overlay");
            const filtersWrapper = document.querySelector(".s-shop__filters-wrapper");
            const btnClose = document.querySelector(".s-shop__filters-close");
            overlay.addEventListener("click", handlerClose);
            btnClose.addEventListener("click", handlerClose);
            btn.addEventListener("click", () => {
                if (window.matchMedia("(min-width: 575px)").matches) if (filtersWrapper.hasAttribute("hidden")) slideDown(filtersWrapper); else slideUp(filtersWrapper); else if (filters.classList.contains("_open")) handlerClose(); else handlerOpen();
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
    function headerScroll() {
        const header = document.querySelector(".header");
        if (header) {
            let lastScrollTop = 0;
            window.addEventListener("scroll", () => {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > lastScrollTop && scrollTop > header.clientHeight) header.classList.add("_scroll"); else header.classList.remove("_scroll");
                lastScrollTop = scrollTop;
            });
        }
    }
    function inputBtnContent() {
        const buttons = document.querySelectorAll("[data-input-target]");
        if (buttons.length) buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const value = btn.dataset.inputContent;
                const input = document.querySelector(btn.dataset.inputTarget);
                if (input) input.value = value;
            });
        });
    }
    function inputFile() {
        const controls = document.querySelectorAll(".input-control-file");
        if (controls.length) controls.forEach(control => {
            const input = control.querySelector(".input-file");
            const label = control.querySelector(".label-file");
            const labelText = label.querySelector("span");
            input.addEventListener("change", e => {
                if (e.target.files[0]) labelText.textContent = e.target.files[0].name;
            });
        });
    }
    function inputmask() {
        const inputs = document.querySelectorAll('input[type="tel"]');
        const im = new Inputmask("+7 (999) 999-99-99");
        im.mask(inputs);
    }
    function location_location() {
        const map = document.querySelector("#location-map");
        if (map) {
            let yaMap = null;
            const buttons = document.querySelectorAll("[data-location-btn]");
            const btnAll = document.querySelector("[data-location-all-btn]");
            const arrCoords = [];
            buttons.forEach(btn => {
                const coord = JSON.parse(btn.dataset.locationBtn);
                arrCoords.push(coord);
                btn.addEventListener("click", () => {
                    yaMap.destroy();
                    btnAll.classList.remove("_active");
                    buttons.forEach(b => b.classList.remove("_active"));
                    btn.classList.add("_active");
                    handlerCreateMap(map, [ coord ], 16);
                });
            });
            btnAll.addEventListener("click", () => {
                yaMap.destroy();
                buttons.forEach(b => b.classList.remove("_active"));
                btnAll.classList.add("_active");
                handlerCreateMap(map, arrCoords);
            });
            const options = {
                root: null,
                rootMargin: "0px",
                scrollMargin: "0px",
                threshold: .01
            };
            const observer = new IntersectionObserver(callback, options);
            observer.observe(map);
            function callback(entries, observer) {
                entries.forEach(entry => {
                    const target = entry.target;
                    if (entry.isIntersecting) {
                        createScript("https://api-maps.yandex.ru/2.1/?apikey=b46e9249-4925-4460-b11c-3aaf76ad0115&lang=ru_RU", "text/javascript").then(() => handlerCreateMap(target, arrCoords));
                        observer.unobserve(target);
                    }
                });
            }
            function handlerCreateMap(map, coords, zoomArg) {
                const zoom = Number(map.dataset.zoom);
                const iconHref = map.dataset.icon;
                let objectMark = {};
                if (iconHref) objectMark = {
                    iconLayout: "default#image",
                    iconImageHref: iconHref,
                    iconImageSize: [ 60, 75 ],
                    iconImageOffset: [ -30, -70 ]
                };
                function init() {
                    yaMap = new ymaps.Map(map, {
                        center: coords[0],
                        zoom: zoomArg || zoom
                    });
                    coords?.forEach(coord => {
                        const placemark = new ymaps.Placemark(coord, {}, objectMark);
                        yaMap.geoObjects.add(placemark);
                    });
                    yaMap.controls.remove("geolocationControl");
                    yaMap.controls.remove("searchControl");
                    yaMap.controls.remove("trafficControl");
                    yaMap.controls.remove("typeSelector");
                    yaMap.controls.remove("fullscreenControl");
                    yaMap.controls.remove("rulerControl");
                }
                ymaps.ready(init);
            }
        }
    }
    function map() {
        const maps = document.querySelectorAll(".map");
        if (maps.length) {
            maps.forEach(map => {
                const options = {
                    root: null,
                    rootMargin: "0px",
                    scrollMargin: "0px",
                    threshold: .01
                };
                function callback(entries, observer) {
                    entries.forEach(entry => {
                        const target = entry.target;
                        if (entry.isIntersecting) {
                            createScript("https://api-maps.yandex.ru/2.1/?apikey=b46e9249-4925-4460-b11c-3aaf76ad0115&lang=ru_RU", "text/javascript").then(() => handlerCreateMap(target));
                            observer.unobserve(target);
                        }
                    });
                }
                const observer = new IntersectionObserver(callback, options);
                observer.observe(map);
            });
            function handlerCreateMap(map) {
                const center = JSON.parse(map.dataset.center);
                const zoom = Number(map.dataset.zoom);
                const iconHref = map.dataset.icon;
                let objectMark = {};
                if (iconHref) objectMark = {
                    iconLayout: "default#image",
                    iconImageHref: iconHref,
                    iconImageSize: [ 60, 75 ],
                    iconImageOffset: [ -30, -70 ]
                };
                function init() {
                    const htmlMap = new ymaps.Map(map, {
                        center,
                        zoom
                    });
                    const placemark = new ymaps.Placemark(center, {}, objectMark);
                    htmlMap.geoObjects.add(placemark);
                    htmlMap.controls.remove("geolocationControl");
                    htmlMap.controls.remove("searchControl");
                    htmlMap.controls.remove("trafficControl");
                    htmlMap.controls.remove("typeSelector");
                    htmlMap.controls.remove("fullscreenControl");
                    htmlMap.controls.remove("rulerControl");
                }
                ymaps.ready(init);
            }
        }
    }
    class Scrollable {
        constructor(selector, options) {
            let defaultOptions = {
                wheelScrolling: false
            };
            this.container = null;
            if (typeof selector === "string") this.container = document.querySelector(selector); else this.container = selector;
            this.options = Object.assign(defaultOptions, options);
            if (!this.container) return;
            this.childrensSize = Array.from(this.container.children).reduce((sum, item) => sum + item.offsetWidth, 0);
            this.isGrab = this.container.clientWidth < this.childrensSize;
            this.container.classList.add("_scrollable");
            if (this.isGrab) this.container.style = "cursor: grab";
            this.isDragging = false;
            this.startX = null;
            this.scrollLeft = null;
            this.events();
        }
        events() {
            if (this.container) {
                this.container.addEventListener("mousedown", e => {
                    this.isDragging = true;
                    this.startX = e.pageX - this.container.offsetLeft;
                    this.scrollLeft = this.container.scrollLeft;
                    if (this.isGrab) this.container.style = "cursor: grabbing";
                });
                this.container.addEventListener("mouseup", e => {
                    this.isDragging = false;
                    if (this.isGrab) this.container.style = "cursor: grab";
                });
                this.container.addEventListener("mousemove", e => {
                    if (!this.isDragging) return;
                    const x = e.pageX - this.container.offsetLeft;
                    const walkX = (x - this.startX) * 1;
                    this.container.scrollLeft = this.scrollLeft - walkX;
                });
                this.container.addEventListener("mouseleave", e => {
                    if (this.isDragging) this.isDragging = false;
                    if (this.isGrab) this.container.style = "cursor: grab";
                });
                if (this.options.wheelScrolling) this.container.addEventListener("mousewheel", e => {
                    e.preventDefault();
                    this.container.scrollLeft += e.deltaY;
                });
            }
        }
    }
    function scroallable() {
        const navigations = document.querySelectorAll(".s-nav");
        if (navigations.length) navigations.forEach(n => {
            new Scrollable(n, {
                wheelScrolling: true
            });
        });
    }
    function sliders() {
        const heroSlider = document.querySelector(".s-hero__slider");
        if (heroSlider) {
            new Swiper(heroSlider, {
                speed: 900,
                effect: "fade",
                autoplay: {
                    delay: 4500
                },
                navigation: {
                    prevEl: ".s-hero .slider-arrow._prev",
                    nextEl: ".s-hero .slider-arrow._next"
                },
                pagination: {
                    el: ".s-hero .slider-pagination",
                    clickable: true
                }
            });
        }
        const whySlider = document.querySelector(".s-why__slider");
        if (whySlider) {
            new Swiper(whySlider, {
                speed: 900,
                slidesPerView: 1,
                spaceBetween: 25,
                autoplay: {
                    delay: 5e3
                },
                navigation: {
                    prevEl: ".s-why .slider-arrow._prev",
                    nextEl: ".s-why .slider-arrow._next"
                },
                pagination: {
                    el: ".s-why .slider-pagination",
                    clickable: true
                },
                breakpoints: {
                    1400: {
                        slidesPerView: 4,
                        spaceBetween: 0
                    },
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 0
                    },
                    576: {
                        slidesPerView: 2,
                        spaceBetween: 0
                    }
                }
            });
        }
        const objectsSliders = document.querySelectorAll(".s-objects__slider");
        if (objectsSliders.length) objectsSliders.forEach(slider => {
            new Swiper(slider, {
                slidesPerView: "auto",
                spaceBetween: 15,
                speed: 900,
                autoplay: {
                    delay: 4500
                },
                navigation: {
                    prevEl: slider.closest(".slider-wrapper").querySelector(".slider-arrow._prev"),
                    nextEl: slider.closest(".slider-wrapper").querySelector(".slider-arrow._next")
                },
                pagination: {
                    el: slider.closest(".slider-wrapper").nextElementSibling,
                    clickable: true
                },
                breakpoints: {
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 20
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    }
                }
            });
        });
        const housesSliders = document.querySelectorAll(".s-houses__slider");
        if (housesSliders.length) housesSliders.forEach(slider => {
            new Swiper(slider, {
                slidesPerView: "auto",
                spaceBetween: 15,
                speed: 900,
                autoplay: {
                    delay: 5500
                },
                navigation: {
                    prevEl: slider.closest(".slider-wrapper").querySelector(".slider-arrow._prev"),
                    nextEl: slider.closest(".slider-wrapper").querySelector(".slider-arrow._next")
                },
                pagination: {
                    el: slider.closest(".slider-wrapper").nextElementSibling,
                    clickable: true
                },
                breakpoints: {
                    1366: {
                        slidesPerView: 3,
                        spaceBetween: 40
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    768: {
                        slidesPerView: "auto",
                        spaceBetween: 20
                    }
                },
                on: {
                    touchStart: function(swiper, event) {
                        const isProductSlider = event.target.closest(".card-product__gallery-slider");
                        if (isProductSlider) swiper.allowTouchMove = false;
                    },
                    touchEnd: function(swiper) {
                        swiper.allowTouchMove = true;
                    }
                }
            });
        });
        const productsGallerySliders = document.querySelectorAll(".card-product__gallery-slider");
        if (productsGallerySliders.length) productsGallerySliders.forEach(slider => {
            new Swiper(slider, {
                speed: 800,
                spaceBetween: 10,
                navigation: {
                    prevEl: slider.querySelector(".slider-arrow._prev"),
                    nextEl: slider.querySelector(".slider-arrow._next")
                },
                pagination: {
                    el: slider.querySelector(".slider-pagination"),
                    clickable: true
                }
            });
        });
        const offerSlider = document.querySelector(".s-offer__slider");
        if (offerSlider) {
            new Swiper(offerSlider, {
                speed: 900,
                spaceBetween: 15,
                slidesPerView: "auto",
                autoplay: {
                    delay: 4500
                },
                navigation: {
                    prevEl: ".s-offer .slider-arrow._prev",
                    nextEl: ".s-offer .slider-arrow._next"
                },
                pagination: {
                    el: ".s-offer .slider-pagination",
                    clickable: true
                },
                breakpoints: {
                    1200: {
                        spaceBetween: 20,
                        slidesPerView: 4
                    },
                    992: {
                        spaceBetween: 20,
                        slidesPerView: 3
                    }
                }
            });
        }
        const vlogSlider = document.querySelector(".s-vlog__slider");
        if (vlogSlider) {
            new Swiper(vlogSlider, {
                speed: 900,
                spaceBetween: 15,
                slidesPerView: "auto",
                navigation: {
                    prevEl: ".s-vlog .slider-arrow._prev",
                    nextEl: ".s-vlog .slider-arrow._next"
                },
                autoplay: {
                    delay: 5e3
                },
                pagination: {
                    el: ".s-vlog .slider-pagination",
                    clickable: true
                },
                breakpoints: {
                    992: {
                        spaceBetween: 20,
                        slidesPerView: 3
                    },
                    768: {
                        spaceBetween: 20,
                        slidesPerView: "auto"
                    }
                }
            });
        }
        const aboutSlider = document.querySelector(".s-about__slider");
        if (aboutSlider) {
            new Swiper(aboutSlider, {
                speed: 900,
                spaceBetween: 20,
                slidesPerView: "auto",
                autoplay: {
                    delay: 4500
                },
                navigation: {
                    prevEl: ".s-about .slider-arrow._prev",
                    nextEl: ".s-about .slider-arrow._next"
                },
                pagination: {
                    el: ".s-about .slider-pagination",
                    clickable: true
                },
                breakpoints: {
                    1366: {
                        spaceBetween: 20,
                        slidesPerView: 3
                    }
                }
            });
        }
        const purchaseMethodsSlider = document.querySelector(".s-purchase-methods__slider");
        if (purchaseMethodsSlider) {
            new Swiper(purchaseMethodsSlider, {
                speed: 900,
                spaceBetween: 20,
                slidesPerView: "auto",
                navigation: {
                    prevEl: ".s-purchase-methods .slider-arrow._prev",
                    nextEl: ".s-purchase-methods .slider-arrow._next"
                },
                pagination: {
                    el: ".s-purchase-methods .slider-pagination",
                    clickable: true
                },
                breakpoints: {
                    1366: {
                        spaceBetween: 20,
                        slidesPerView: 4
                    },
                    992: {
                        spaceBetween: 20,
                        slidesPerView: 3
                    }
                }
            });
        }
        const productSlider = document.querySelector(".s-product__slider");
        if (productSlider) {
            const thumbSwiper = new Swiper(".s-product__thumb-slider", {
                speed: 900,
                spaceBetween: 10,
                slidesPerView: "auto",
                direction: "horizontal",
                breakpoints: {
                    768: {
                        spaceBetween: 10,
                        slidesPerView: "auto",
                        direction: "vertical"
                    }
                }
            });
            new Swiper(productSlider, {
                speed: 900,
                spaceBetween: 20,
                navigation: {
                    prevEl: productSlider.querySelector(".slider-arrow._prev"),
                    nextEl: productSlider.querySelector(".slider-arrow._next")
                },
                thumbs: {
                    swiper: thumbSwiper
                },
                breakpoints: {}
            });
        }
        const gallerySliders = document.querySelectorAll(".s-gallery__slider");
        if (gallerySliders.length) gallerySliders.forEach(slider => {
            new Swiper(slider, {
                speed: 900,
                spaceBetween: 15,
                slidesPerView: "auto",
                navigation: {
                    prevEl: slider.closest(".slider-wrapper").querySelector(".slider-arrow._prev"),
                    nextEl: slider.closest(".slider-wrapper").querySelector(".slider-arrow._next")
                },
                pagination: {
                    el: slider.closest(".s-gallery").querySelector(".slider-pagination"),
                    clickable: true
                },
                breakpoints: {
                    768: {
                        spaceBetween: 20,
                        slidesPerView: "auto"
                    }
                }
            });
        });
        const layoutSlider = document.querySelector(".s-layout__slider");
        if (layoutSlider) {
            new Swiper(layoutSlider, {
                speed: 900,
                spaceBetween: 20,
                slidesPerView: "auto",
                navigation: {
                    prevEl: ".s-layout .slider-arrow._prev",
                    nextEl: ".s-layout .slider-arrow._next"
                },
                pagination: {
                    el: ".s-layout .slider-pagination",
                    clickable: true
                }
            });
        }
        const builtSlider = document.querySelector(".s-built__slider");
        if (builtSlider) {
            new Swiper(builtSlider, {
                speed: 900,
                spaceBetween: 20,
                slidesPerView: 1,
                autoplay: {
                    delay: 6e3
                },
                navigation: {
                    prevEl: ".s-built .slider-arrow._prev",
                    nextEl: ".s-built .slider-arrow._next"
                },
                pagination: {
                    el: ".s-built .slider-pagination",
                    clickable: true
                },
                on: {
                    touchStart: function(swiper, event) {
                        const isChild = event.target.closest(".s-built__gallery");
                        if (isChild) swiper.allowTouchMove = false;
                    },
                    touchEnd: function(swiper) {
                        swiper.allowTouchMove = true;
                    }
                }
            });
        }
        const builtGallerySliders = document.querySelectorAll(".s-built__gallery-slider");
        if (builtGallerySliders.length) builtGallerySliders.forEach(slider => {
            const thumbSwiper = new Swiper(slider.nextElementSibling, {
                speed: 900,
                spaceBetween: 10,
                slidesPerView: "auto"
            });
            new Swiper(slider, {
                speed: 900,
                spaceBetween: 20,
                slidesPerView: 1,
                thumbs: {
                    swiper: thumbSwiper
                },
                navigation: {
                    prevEl: slider.closest(".slider-wrapper").querySelector(".slider-arrow-rect._prev"),
                    nextEl: slider.closest(".slider-wrapper").querySelector(".slider-arrow-rect._next")
                }
            });
        });
        const mortgageSlider = document.querySelector(".s-mortgage__slider");
        if (mortgageSlider) {
            new Swiper(mortgageSlider, {
                speed: 900,
                spaceBetween: 15,
                slidesPerView: "auto",
                navigation: {
                    prevEl: ".s-mortgage .slider-arrow._prev",
                    nextEl: ".s-mortgage .slider-arrow._next"
                },
                pagination: {
                    el: ".s-mortgage .slider-pagination",
                    clickable: true
                },
                breakpoints: {
                    992: {
                        spaceBetween: 20,
                        slidesPerView: 3
                    },
                    768: {
                        spaceBetween: 20,
                        slidesPerView: "auto"
                    }
                }
            });
        }
        const teamSlider = document.querySelector(".s-team__slider");
        if (teamSlider) {
            new Swiper(teamSlider, {
                speed: 900,
                spaceBetween: 15,
                slidesPerView: "auto",
                navigation: {
                    prevEl: ".s-team .slider-arrow._prev",
                    nextEl: ".s-team .slider-arrow._next"
                },
                pagination: {
                    el: ".s-team .slider-pagination",
                    clickable: true
                },
                breakpoints: {
                    1200: {
                        spaceBetween: 20,
                        slidesPerView: 4
                    },
                    992: {
                        spaceBetween: 20,
                        slidesPerView: 3
                    },
                    768: {
                        spaceBetween: 20,
                        slidesPerView: "auto"
                    }
                }
            });
        }
        const certificatesSlider = document.querySelector(".s-certificates__slider");
        if (certificatesSlider) {
            new Swiper(certificatesSlider, {
                speed: 900,
                spaceBetween: 15,
                slidesPerView: "auto",
                navigation: {
                    prevEl: ".s-certificates .slider-arrow._prev",
                    nextEl: ".s-certificates .slider-arrow._next"
                },
                pagination: {
                    el: ".s-certificates .slider-pagination",
                    clickable: true
                },
                breakpoints: {
                    1200: {
                        spaceBetween: 20,
                        slidesPerView: 4
                    },
                    992: {
                        spaceBetween: 20,
                        slidesPerView: 3
                    },
                    768: {
                        spaceBetween: 20,
                        slidesPerView: "auto"
                    }
                }
            });
        }
        const banksSlider = document.querySelector(".s-banks__slider");
        if (banksSlider) {
            new Swiper(banksSlider, {
                speed: 900,
                spaceBetween: 15,
                slidesPerView: "auto",
                navigation: {
                    prevEl: ".s-banks .slider-arrow._prev",
                    nextEl: ".s-banks .slider-arrow._next"
                },
                pagination: {
                    el: ".s-banks .slider-pagination",
                    clickable: true
                },
                breakpoints: {
                    1200: {
                        spaceBetween: 20,
                        slidesPerView: 4
                    },
                    992: {
                        spaceBetween: 20,
                        slidesPerView: 3
                    },
                    768: {
                        spaceBetween: 20,
                        slidesPerView: "auto"
                    }
                }
            });
        }
    }
    function spoller() {
        const spollersArray = document.querySelectorAll("[data-spollers]");
        if (spollersArray.length > 0) {
            const spollersRegular = Array.from(spollersArray).filter(function(item, index, self) {
                return !item.dataset.spollers.split(",")[0];
            });
            if (spollersRegular.length) initSpollers(spollersRegular);
            let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach(mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", function() {
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                });
                initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
            function initSpollers(spollersArray, matchMedia = false) {
                spollersArray.forEach(spollersBlock => {
                    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spollersBlock.classList.add("_spoller-init");
                        initSpollerBody(spollersBlock);
                        spollersBlock.addEventListener("click", setSpollerAction);
                    } else {
                        spollersBlock.classList.remove("_spoller-init");
                        initSpollerBody(spollersBlock, false);
                        spollersBlock.removeEventListener("click", setSpollerAction);
                    }
                });
            }
            function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                if (spollerTitles.length) {
                    spollerTitles = Array.from(spollerTitles).filter(item => item.closest("[data-spollers]") === spollersBlock);
                    spollerTitles.forEach(spollerTitle => {
                        if (hideSpollerBody) {
                            spollerTitle.removeAttribute("tabindex");
                            if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
                        } else {
                            spollerTitle.setAttribute("tabindex", "-1");
                            spollerTitle.nextElementSibling.hidden = false;
                        }
                    });
                }
            }
            function setSpollerAction(e) {
                const el = e.target;
                if (el.closest("[data-spoller]")) {
                    const spollerTitle = el.closest("[data-spoller]");
                    const spollersBlock = spollerTitle.closest("[data-spollers]");
                    const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (!spollersBlock.querySelectorAll("._slide").length) {
                        if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                        spollerTitle.classList.toggle("_spoller-active");
                        _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                    }
                    e.preventDefault();
                }
            }
            function hideSpollersBody(spollersBlock) {
                const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                    spollerActiveTitle.classList.remove("_spoller-active");
                    _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                }
            }
            const spollersClose = document.querySelectorAll("[data-spoller-close]");
            if (spollersClose.length) document.addEventListener("click", function(e) {
                const el = e.target;
                if (!el.closest("[data-spollers]")) spollersClose.forEach(spollerClose => {
                    const spollersBlock = spollerClose.closest("[data-spollers]");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    spollerClose.classList.remove("_spoller-active");
                    _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                });
            });
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter(function(item, index, self) {
                if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
            });
            if (media.length) {
                const breakpointsArray = [];
                media.forEach(item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                });
                let mdQueries = breakpointsArray.map(function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                });
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach(breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter(function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                        });
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    });
                    return mdQueriesArray;
                }
            }
        }
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout(() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }, duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout(() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }, duration);
            }
        };
        let _slideToggle = (target, duration = 500) => {
            if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
        };
        function uniqArray(array) {
            return array.filter(function(item, index, self) {
                return self.indexOf(item) === index;
            });
        }
    }
    function tab() {
        const buttons = document.querySelectorAll("[data-tab-btn]");
        if (buttons.length) buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const container = btn.closest(".tabs");
                const tabId = btn.dataset.tabBtn;
                const allButtons = container.querySelector(".tabs-nav").querySelectorAll("[data-tab-btn]");
                const allTabs = Array.from(container.querySelector(".tabs-content").children).filter(child => child.hasAttribute("data-tab"));
                const currentTab = container.querySelector(`[data-tab="${tabId}"]`);
                allTabs.forEach(t => {
                    t.classList.remove("_show");
                    t.classList.remove("_active");
                });
                currentTab.classList.add("_active");
                setTimeout(() => {
                    currentTab.classList.add("_show");
                }, 150);
                allButtons.forEach(b => b.classList.remove("_active"));
                btn.classList.add("_active");
            });
        });
    }
    document.addEventListener("DOMContentLoaded", () => {
        spoller();
        burger();
        inputmask();
        sliders();
        inputBtnContent();
        scroallable();
        tab();
        location_location();
        map();
        buttonsNote();
        filtersToggle();
        inputFile();
        headerScroll();
        copy();
        Fancybox.bind("[data-fancybox]", {});
    });
})();