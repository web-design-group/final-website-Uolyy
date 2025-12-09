

// // Слайдер новинок (блок .news)
// document.addEventListener('DOMContentLoaded', function () {
//   const newsSection = document.querySelector('.news');
//   if (!newsSection) return;

//   // Все элементы слайдера
//   const items = [
//     {
//       img: 'images/Ягодка1.jpg',
//       title: 'Кольцо Ягодка',
//       price: '4900 ₽'
//     },
//     {
//       img: 'images/Терновник1.jpg',
//       title: 'Кольцо Терновник',
//       price: '5200 ₽'
//     },
//     {
//       img: 'images/Крылья феи1.jpg',
//       title: 'Серьги Крылья феи',
//       price: '6800 ₽'
//     },
//     // Добавляй сюда новые товары — они автоматически появятся в слайдере
//   ];

//   let currentIndex = 0;
//   const total = items.length;

//   // DOM-элементы
//   const centralFigure = newsSection.querySelector('figure:not(.min-img)'); // центральный товар
//   const centralImg     = centralFigure.querySelector('img');
//   const captionArticle = centralFigure.querySelector('figcaption article');
//   const titleLink      = captionArticle.querySelector('a');
//   const priceP         = captionArticle.querySelector('p');

//   const leftArrow  = newsSection.querySelector('.arrow-left')  || newsSection.querySelector('figcaption a:first-child img');
//   const rightArrow = newsSection.querySelector('.arrow-right') || newsSection.querySelector('figcaption a:last-child img');

//   const leftMini  = newsSection.querySelector('.min-img:first-of-type img');
//   const rightMini = newsSection.querySelector('.min-img:last-of-type img');

//   // Функция обновления слайда
//   function updateSlide() {
//     const prevIndex = (currentIndex - 1 + total) % total;
//     const nextIndex = (currentIndex + 1) % total;

//     // Центральный товар
//     centralImg.src = items[currentIndex].img;
//     centralImg.alt = items[currentIndex].title;
//     titleLink.textContent = items[currentIndex].title;
//     priceP.textContent = items[currentIndex].price;

//     // Миниатюры слева и справа (предыдущий и следующий)
//     if (leftMini)  leftMini.src  = items[prevIndex].img;
//     if (rightMini) rightMini.src = items[nextIndex].img;

//     // Плавное появление (используем CSS opacity из твоих стилей)
//     centralImg.style.opacity = '0';
//     titleLink.style.opacity = '0';
//     priceP.style.opacity = '0';

//     setTimeout(() => {
//       centralImg.style.opacity = '1';
//       titleLink.style.opacity = '1';
//       priceP.style.opacity = '1';
//     }, 50);
//   }

//   // Перелистывание
//   function goNext() {
//     currentIndex = (currentIndex + 1) % total;
//     updateSlide();
//   }

//   function goPrev() {
//     currentIndex = (currentIndex - 1 + total) % total;
//     updateSlide();
//   }

//   // Обработчики стрелок
//   if (leftArrow) {
//     leftArrow.closest('a').addEventListener('click', function (e) {
//       e.preventDefault();
//       goPrev();
//     });
//   }

//   if (rightArrow) {
//     rightArrow.closest('a').addEventListener('click', function (e) {
//       e.preventDefault();
//       goNext();
//     });
//   }


//   // Инициализация — подставляем первый слайд (если нужно переопределить то, что в HTML)
//   updateSlide();
// });


document.addEventListener("DOMContentLoaded", () => {
  const captionLink  = document.querySelector(".active-caption a");
  const captionPrice = document.querySelector(".active-caption p");
  const captionWrap  = document.querySelector(".active-caption");

  const swiper = new Swiper(".news-swiper", {
    loop: true,
    centeredSlides: true,
    slidesPerView: 3,
    spaceBetween: 30,
    speed: 700,

    navigation: {
      nextEl: ".news-controls .swiper-button-next",
      prevEl: ".news-controls .swiper-button-prev",
    },

    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 20 },
      901: { slidesPerView: 3, spaceBetween: 30 }
    },

    on: {
      // Главное — используем realIndex + ждём полной инициализации
      init: function () {
        // Принудительно ставим правильный текст для самого первого (центрального) слайда
        const firstActive = this.slides[this.activeIndex];
        captionLink.textContent = firstActive.dataset.title;
        captionPrice.textContent = firstActive.dataset.price;
        captionWrap.classList.add("visible");
      },

      slideChangeTransitionEnd: function () {
        const activeSlide = this.slides[this.activeIndex];
        const title = activeSlide.dataset.title;
        const price = activeSlide.dataset.price;

        captionWrap.classList.remove("visible");

        requestAnimationFrame(() => {
          captionLink.textContent = title;
          captionPrice.textContent = price;
          captionWrap.classList.add("visible");
        });
      }
    }
  });
});



document.addEventListener('DOMContentLoaded', () => {
  const leftBtn  = document.querySelector('.description .arrow-left');
  const rightBtn = document.querySelector('.description .arrow-right');
  
  const centerFigure = document.querySelector('.news .center-figure');
  const centerImg    = centerFigure.querySelector('img');
  const centerLink   = centerFigure.querySelector('a');

  const titleEl = document.querySelector('.description article a');
  const priceEl = document.querySelector('.description article p');

  const prevImg = document.querySelectorAll('.news .min-img img')[0];
  const nextImg = document.querySelectorAll('.news .min-img img')[1];

  const slides = [
    { img: 'images/Ягодка1.jpg',      title: 'Кольцо Ягодка',         price: '4900 ₽', alt: 'Кольцо Ягодка' },
    { img: 'images/Терновник1.jpg',   title: 'Кольцо Терновник',      price: '5200 ₽', alt: 'Кольцо Терновник' },
    { img: 'images/Крылья феи1.jpg',  title: 'Серьги Крылья феи',     price: '6800 ₽', alt: 'Серьги Крылья феи' },
    { img: 'images/Лабрадорит1.jpg',  title: 'Кольцо Лабрадорит',     price: '5900 ₽', alt: 'Кольцо с лабрадоритом' },
    { img: 'images/Суфле1.webp',      title: 'Браслет Суфле',         price: '4500 ₽', alt: 'Браслет Суфле' },
    { img: 'images/Ромашка2.webp',    title: 'Кольцо Ромашка',        price: '4200 ₽', alt: 'Кольцо Ромашка' }
    // добавляй сколько угодно
  ];

  let current = 0;

  function update() {
    const slide = slides[current];

    // Центральное изображение
    centerImg.style.opacity = 0;
    setTimeout(() => {
      centerImg.src = slide.img;
      centerImg.alt = slide.alt;
      centerLink.href = '#'; // потом можно поставить реальную ссылку
      centerImg.style.opacity = 1;
    }, 250);

    // Текст
    titleEl.textContent = slide.title;
    priceEl.textContent = slide.price;

    // Боковые превью
    const prevIndex = (current - 1 + slides.length) % slides.length;
    const nextIndex = (current + 1) % slides.length;

    prevImg.src = slides[prevIndex].img;
    prevImg.alt = slides[prevIndex].alt;
    nextImg.src = slides[nextIndex].img;
    nextImg.alt = slides[nextIndex].alt;
  }

  leftBtn.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    update();
  });

  rightBtn.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    update();
  });

  // Инициализация
  update();
});




document.addEventListener("DOMContentLoaded", () => {

  const slides = [
    {
      name: "Кольцо ромашка",
      desc: "Изящное кольцо с&nbsp;дизайном в&nbsp;виде цветка, выполненное из&nbsp;серебра. Центральный элемент украшен золотистым акцентом с&nbsp;текстурой. Легкая и&nbsp;воздушная конструкция с&nbsp;открытыми лепестками идеально подойдет для&nbsp;повседневного ношения или&nbsp;особого случая. Размер регулируемый.",
      currentPrice: "1800 ₽",
      oldPrice: "2400 ₽",
      img: "images/Ромашка2.webp"
    },
    {
      name: "Серьги Фраппе",
      desc: "Серьги - завитки из латуни с покрытием золотом с подвесками из плоского жемчуга, зеленого фианита (6 мм) и розового ювелирного стекла в огранке (8 мм) на Английском замке.Жемчуг может иметь неровности, каверны и пятнышки, каждая бусина является уникальной.",
      currentPrice: "3600 ₽",
      oldPrice: "4500 ₽",
      img: "images/Фраппе3.webp"
    },
    {
      name: "Серьги Крылья Феи",
      desc: "Уникальные серьги в форме крыльев, изготовленные из серебра с золотистым покрытием. Каждый аксессуар с изящным овальным камнем зеленого оттенка, подвешенным над ажурными крыльями. Легкие и элегантные, они идеально подойдут для создания загадочного и стильного образа.",
      currentPrice: "5600 ₽",
      oldPrice: "6500 ₽",
      img: "images/КрыльяФеи1.jpg"
    }
  ];

  let index = 0;

  const titleEl         = document.querySelector(".product-title");
  const descEl          = document.querySelector(".product-desc");
  const priceBlock      = document.querySelector(".price");
  const currentPriceEl  = document.querySelector(".current-price");
  const oldPriceEl      = document.querySelector(".old-price");
  const imgEl           = document.querySelector(".product-sales img");
  const pages           = document.querySelectorAll(".slider-pages .page");

  const btnLeft  = document.querySelector(".sales .arrow-left");
  const btnRight = document.querySelector(".sales .arrow-right");

  function goToSlide(newIndex) {
    if (newIndex === index) return;

    titleEl.style.opacity = 0;
    descEl.style.opacity  = 0;
    priceBlock.style.opacity = 0;
    imgEl.style.opacity   = 0;

    setTimeout(() => {
      index = newIndex;
      const item = slides[index];

      titleEl.textContent        = item.name;
      descEl.innerHTML           = item.desc;
      currentPriceEl.textContent = item.currentPrice;
      oldPriceEl.textContent     = item.oldPrice;
      imgEl.src                  = item.img;

      pages.forEach(p => p.classList.remove("active"));
      pages[index].classList.add("active");

      titleEl.style.opacity = 1;
      descEl.style.opacity  = 1;
      priceBlock.style.opacity = 1;
      imgEl.style.opacity   = 1;
    }, 380);
  }

  // Стрелки
  btnLeft.addEventListener("click", e => {
    e.preventDefault();
    const newIndex = (index - 1 + slides.length) % slides.length;
    goToSlide(newIndex);
  });

  btnRight.addEventListener("click", e => {
    e.preventDefault();
    const newIndex = (index + 1) % slides.length;
    goToSlide(newIndex);
  });

  // Точки
  pages.forEach(page => {
    page.addEventListener("click", e => {
      e.preventDefault();
      const newIndex = parseInt(page.dataset.index);
      goToSlide(newIndex);
    });
  });

  goToSlide(0);
});



document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".catalog figure img");

  items.forEach(img => {
    const figure = img.closest("figure");
    let pulseInterval = null;

    figure.addEventListener("mouseenter", () => {
      img.style.boxShadow = "0 0 24px 6px rgba(228, 164, 180, 0.5)";

      img.style.transform = "translateY(-6px) scale(1.02)";

      let intensity = 0.5;
      let growing = true;

      pulseInterval = setInterval(() => {
        if (growing) {
          intensity += 0.015;
          if (intensity >= 0.7) growing = false;
        } else {
          intensity -= 0.015;
          if (intensity <= 0.45) growing = true;
        }

        img.style.boxShadow = `
          0 0 28px 8px rgba(228, 164, 180, ${intensity}),
          0 0 50px 18px rgba(228, 164, 180, ${intensity * 0.5})
        `;
      }, 80);
    });

    figure.addEventListener("mouseleave", () => {
      clearInterval(pulseInterval);

      img.style.boxShadow = "none";
      img.style.transform = "translateY(0) scale(1)";
    });

    img.style.transition = "box-shadow 0.6s ease, transform 0.5s ease";
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.querySelector(".news figure:not(.min-img) img");

  if (!mainImage) return;

  const mainFigure = mainImage.closest("figure");
  let pulseInterval = null;

  mainFigure.addEventListener("mouseenter", () => {
    mainImage.style.boxShadow = "0 0 26px 7px rgba(228, 164, 180, 0.55)";

    mainImage.style.transform = "translateY(-7px) scale(1.03)";

    let intensity = 0.55;
    let growing = true;

    pulseInterval = setInterval(() => {
      if (growing) {
        intensity += 0.011;
        if (intensity >= 0.6) growing = false;
      } else {
        intensity -= 0.011;
        if (intensity <= 0.4) growing = true;
      }

      mainImage.style.boxShadow = `
        0 0 30px 9px rgba(228, 164, 180, ${intensity}),
        0 0 55px 22px rgba(228, 164, 180, ${intensity * 0.5})
      `;
    }, 100);
  });

  mainFigure.addEventListener("mouseleave", () => {
    clearInterval(pulseInterval);

    mainImage.style.boxShadow = "none";
    mainImage.style.transform = "translateY(0) scale(1)";
  });

  mainImage.style.transition = "box-shadow 0.7s ease, transform 0.55s ease";
});
