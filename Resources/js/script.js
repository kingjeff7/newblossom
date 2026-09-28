document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: false,
    autoplay: {
      delay: 4000,
    },
  });

  const foodSwiper = new Swiper('.food-swiper', {
    direction: 'horizontal',
    spaceBetween: 16,
    navigation: {
      nextEl: '.swiper-button-next2',
      prevEl: '.swiper-button-prev2',
    },
    pagination: {
      el: '.swiper-pagination2',
      clickable: true,
    },
    autoplay: {
      delay: 2500,
    },
    breakpoints: {
      640: { slidesPerView: 1 },
      1024: { slidesPerView: 3 },
    },
  });
});
