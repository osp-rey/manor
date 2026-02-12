export default function sliders() {
  const heroSlider = document.querySelector(".s-hero__slider");

  if (heroSlider) {
    const swiper = new Swiper(heroSlider, {
      speed: 900,
      effect: "fade",
      autoplay: {
        delay: 4500,
      },
      navigation: {
        prevEl: ".s-hero .slider-arrow._prev",
        nextEl: ".s-hero .slider-arrow._next",
      },
      pagination: {
        el: ".s-hero .slider-pagination",
        clickable: true,
      },
    });
  }

  const whySlider = document.querySelector(".s-why__slider");

  if (whySlider) {
    const swiper = new Swiper(whySlider, {
      speed: 900,
      slidesPerView: 1,
      spaceBetween: 25,
      autoplay: {
        delay: 5000,
      },
      navigation: {
        prevEl: ".s-why .slider-arrow._prev",
        nextEl: ".s-why .slider-arrow._next",
      },
      pagination: {
        el: ".s-why .slider-pagination",
        clickable: true,
      },
      breakpoints: {
        1400: {
          slidesPerView: 4,
          spaceBetween: 0,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 0,
        },
      },
    });
  }

  const objectsSliders = document.querySelectorAll(".s-objects__slider");

  if (objectsSliders.length) {
    objectsSliders.forEach((slider) => {
      const swiper = new Swiper(slider, {
        slidesPerView: "auto",
        spaceBetween: 15,
        speed: 900,
        autoplay: {
          delay: 4500,
        },
        navigation: {
          prevEl: slider
            .closest(".slider-wrapper")
            .querySelector(".slider-arrow._prev"),
          nextEl: slider
            .closest(".slider-wrapper")
            .querySelector(".slider-arrow._next"),
        },
        pagination: {
          el: slider.closest(".slider-wrapper").nextElementSibling,
          clickable: true,
        },
        breakpoints: {
          1200: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        },
      });
    });
  }

  const housesSliders = document.querySelectorAll(".s-houses__slider");

  if (housesSliders.length) {
    housesSliders.forEach((slider) => {
      const swiper = new Swiper(slider, {
        slidesPerView: "auto",
        spaceBetween: 15,
        speed: 900,
        autoplay: {
          delay: 5500,
        },
        navigation: {
          prevEl: slider
            .closest(".slider-wrapper")
            .querySelector(".slider-arrow._prev"),
          nextEl: slider
            .closest(".slider-wrapper")
            .querySelector(".slider-arrow._next"),
        },
        pagination: {
          el: slider.closest(".slider-wrapper").nextElementSibling,
          clickable: true,
        },
        breakpoints: {
          1366: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: "auto",
            spaceBetween: 20,
          },
        },
        on: {
          touchStart: function (swiper, event) {
            const isProductSlider = event.target.closest(
              ".card-product__gallery-slider",
            );
            if (isProductSlider) {
              swiper.allowTouchMove = false;
            }
          },
          touchEnd: function (swiper) {
            swiper.allowTouchMove = true;
          },
        },
      });
    });
  }

  const productsGallerySliders = document.querySelectorAll(
    ".card-product__gallery-slider",
  );

  if (productsGallerySliders.length) {
    productsGallerySliders.forEach((slider) => {
      const swiper = new Swiper(slider, {
        speed: 800,
        spaceBetween: 10,
        navigation: {
          prevEl: slider.querySelector(".slider-arrow._prev"),
          nextEl: slider.querySelector(".slider-arrow._next"),
        },
        pagination: {
          el: slider.querySelector(".slider-pagination"),
          clickable: true,
        },
      });
    });
  }

  const offerSlider = document.querySelector(".s-offer__slider");

  if (offerSlider) {
    const swiper = new Swiper(offerSlider, {
      speed: 900,
      spaceBetween: 15,
      slidesPerView: "auto",
      autoplay: {
        delay: 4500,
      },
      navigation: {
        prevEl: ".s-offer .slider-arrow._prev",
        nextEl: ".s-offer .slider-arrow._next",
      },
      pagination: {
        el: ".s-offer .slider-pagination",
        clickable: true,
      },
      breakpoints: {
        1200: {
          spaceBetween: 20,
          slidesPerView: 4,
        },
        992: {
          spaceBetween: 20,
          slidesPerView: 3,
        },
      },
    });
  }

  const vlogSlider = document.querySelector(".s-vlog__slider");

  if (vlogSlider) {
    const swiper = new Swiper(vlogSlider, {
      speed: 900,
      spaceBetween: 15,
      slidesPerView: "auto",
      navigation: {
        prevEl: ".s-vlog .slider-arrow._prev",
        nextEl: ".s-vlog .slider-arrow._next",
      },
      autoplay: {
        delay: 5000,
      },
      pagination: {
        el: ".s-vlog .slider-pagination",
        clickable: true,
      },
      breakpoints: {
        992: {
          spaceBetween: 20,
          slidesPerView: 3,
        },
        768: {
          spaceBetween: 20,
          slidesPerView: "auto",
        },
      },
    });
  }

  const aboutSlider = document.querySelector(".s-about__slider");

  if (aboutSlider) {
    const swiper = new Swiper(aboutSlider, {
      speed: 900,
      spaceBetween: 20,
      slidesPerView: "auto",
      autoplay: {
        delay: 4500,
      },
      navigation: {
        prevEl: ".s-about .slider-arrow._prev",
        nextEl: ".s-about .slider-arrow._next",
      },
      pagination: {
        el: ".s-about .slider-pagination",
        clickable: true,
      },
      breakpoints: {
        1366: {
          spaceBetween: 20,
          slidesPerView: 3,
        },
      },
    });
  }

  const purchaseMethodsSlider = document.querySelector(
    ".s-purchase-methods__slider",
  );

  if (purchaseMethodsSlider) {
    const swiper = new Swiper(purchaseMethodsSlider, {
      speed: 900,
      spaceBetween: 20,
      slidesPerView: "auto",
      navigation: {
        prevEl: ".s-purchase-methods .slider-arrow._prev",
        nextEl: ".s-purchase-methods .slider-arrow._next",
      },
      pagination: {
        el: ".s-purchase-methods .slider-pagination",
        clickable: true,
      },
      breakpoints: {
        1366: {
          spaceBetween: 20,
          slidesPerView: 4,
        },
        992: {
          spaceBetween: 20,
          slidesPerView: 3,
        },
      },
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
          direction: "vertical",
        },
      },
    });

    const swiper = new Swiper(productSlider, {
      speed: 900,
      spaceBetween: 20,
      navigation: {
        prevEl: productSlider.querySelector(".slider-arrow._prev"),
        nextEl: productSlider.querySelector(".slider-arrow._next"),
      },
      thumbs: {
        swiper: thumbSwiper,
      },
      breakpoints: {},
    });
  }

  const gallerySliders = document.querySelectorAll(".s-gallery__slider");

  if (gallerySliders.length) {
    gallerySliders.forEach((slider) => {
      const swiper = new Swiper(slider, {
        speed: 900,
        spaceBetween: 15,
        slidesPerView: "auto",
        navigation: {
          prevEl: slider
            .closest(".slider-wrapper")
            .querySelector(".slider-arrow._prev"),
          nextEl: slider
            .closest(".slider-wrapper")
            .querySelector(".slider-arrow._next"),
        },
        pagination: {
          el: slider.closest(".s-gallery").querySelector(".slider-pagination"),
          clickable: true,
        },
        breakpoints: {
          768: {
            spaceBetween: 20,
            slidesPerView: "auto",
          },
        },
      });
    });
  }

  const layoutSlider = document.querySelector(".s-layout__slider");

  if (layoutSlider) {
    const swiper = new Swiper(layoutSlider, {
      speed: 900,
      spaceBetween: 20,
      slidesPerView: "auto",
      navigation: {
        prevEl: ".s-layout .slider-arrow._prev",
        nextEl: ".s-layout .slider-arrow._next",
      },
      pagination: {
        el: ".s-layout .slider-pagination",
        clickable: true,
      },
    });
  }
}
