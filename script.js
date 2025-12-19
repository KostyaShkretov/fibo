let buttonText;
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".prizes__btn").addEventListener("click", function () {
    document
      .querySelector(".prizes__info")
      .classList.toggle("prizes__info--active");
    buttonText = this.textContent;
    this.textContent = this.dataset.text;
    this.dataset.text = buttonText;
  });

  let menu = [
    "Пицца",
    "Паста",
    "Супы",
    "Салаты",
    "Напитки",
    "Десерты",
    "Бакалея",
    "Антипасти",
    "Акции",
    "Комбо",
    "Контакты",
  ];

  const groupMenu = document.querySelector(".menu__ul");
  if (groupMenu) {
    let menuList = "";
    for (let i = 0; i < menu.length; i++) {
      menuList += `<li>${menu[i]} </li>`;
    }
    groupMenu.innerHTML = menuList;
  }

  let sausesList = [
    {
      icon: "cheese",
      title: "Сырный соус",
      price: "от 120 ₽",
    },
    {
      icon: "barbecue",
      title: "Барбекю",
      price: "от 120 ₽",
    },
    {
      icon: "ranch",
      title: "Ранч",
      price: "от 120 ₽",
    },
    {
      icon: "condensedmilk",
      title: "Сгущёнка",
      price: "от 120 ₽",
    },
    {
      icon: "raspberryjam",
      title: "Малиновое варенье",
      price: "от 120 ₽",
    },
    {
      icon: "cheese",
      title: "Сырный соус",
      price: "от 120 ₽",
    },
  ];

  let sausesCategory = document.querySelector(".sauses__selector");
  if (sausesCategory) {
    let sausesHtml = "";
    sausesList.forEach(function (category) {
      sausesHtml += `<li class = "click">
                           <a href="#"">
                            <img src="images/${category.icon}.svg" alt="">
                            <h3>${category.title}</h3>
                            <p>${category.price}</p>
                           </a> 
                    </li> `;
    });
    sausesCategory.innerHTML = sausesHtml;
  }

  // Попап под корзину
  const cartPopupShow = document.querySelector("popup-cart");
  const menuBtn = document.querySelector(".menu__btn");
  if (cartPopupShow) {
    if (menuBtn) {
      menuBtn.addEventListener("click", function () {
        if (cartPopupShow) {
          cartPopupShow.classList.add();
        }
      });
    }
  }

  let cartItems = [
    {
      image: "pizza",
      name: "С креветками и трюфелями",
      desc: `Домашнаяя паста феттуччине, сливочный соус, креветки, трюфельное масло, черный перец, пармезан.350 г
`,
      price: "100",
      quantity: "0",
    },
    {
      image: "set",
      name: "С креветками и трюфелями",
      desc: `Домашнаяя паста феттуччине, сливочный соус, креветки, трюфельное масло, черный перец, пармезан.350 г
`,
      price: "200",
      quantity: "0",
    },
  ];

  //  fetch("https://example.shaklein.dev/cart/")
  //     .then(function (responce) {
  //       return responce.json();
  //     })
  //     .then(function (data) {
  //       cartItems = data.cartItems;
  //       pizzaListAdd();
  //     });

  pizzaListAdd();
  function pizzaListAdd() {
    const cartItemsCategory = document.querySelector(".popup-cart__items");
    if (cartItemsCategory) {
      let cartItemsHtml = "";
      cartItems.forEach(function (e) {
        cartItemsHtml += `<div class="popup-cart__body">
                    <div class="popup-cart__image">
                        <img src="images/${e.image}.jpg" alt="">
                    </div>
                    <div class="popup-cart__list">
                        <div class="popup-cart__about">
                            <h4>${e.name}</h4>
                            <p>${e.desc}
                            </p>
                        </div>
                        <div class="popup-cart__summ">
                            ${e.price} ₽
                        </div>
                        <div class="popup-cart__calc">
                            <button class="popup-cart__minus">-</button>
                            <input type="text" value="${e.quantity}" class="popup-cart__quantity">
                            <button class="popup-cart__plus">+</button>
                        </div>
                    </div>
                    <div class="popup-cart__delete">
                        <img src="images/close-popup.svg" alt="">
                    </div>
                </div>`;
      });
      cartItemsCategory.innerHTML = cartItemsHtml;
    }
  }

  // Увеличение и уменьшение количества товаров
  const btnPlus = document.querySelector(".popup-cart__plus");
  const cartInput = document.querySelector(".popup-cart__quantity");
  if (cartInput) {
    if (btnPlus) {
      btnPlus.addEventListener("click", function () {
        if (+cartInput.value < 999) {
          cartInput.value = +cartInput.value + 1;
          // cartInput.value++;
        }
      });
    }
    const btnMinus = document.querySelector(".popup-cart__minus");
    if (btnMinus) {
      btnMinus.addEventListener("click", function () {
        if (+cartInput.value > 0) {
          cartInput.value--;
        }
      });
    }
  }

  const popupShow = document.querySelector(".popup-order");
  const popupBtn = document.querySelector(".order__btn");
  if (popupShow) {
    if (popupBtn) {
      popupBtn.addEventListener("click", function () {
        if (popupShow) {
          document.body.classList.add("no__scroll");
          popupShow.classList.add("popup-order--show");
          setTimeout(function () {
            popupShow.classList.add("popup-order--active");
          }, 100);
        }
      });
    }

    const popupClose = document.querySelector(".popup-order__head__btn");
    if (popupClose) {
      popupClose.addEventListener("click", function () {
        popupShow.classList.remove("popup-order--active");
        setTimeout(function () {
          popupShow.classList.remove("popup-order--show");
          document.body.classList.remove("no__scroll");
        }, 300);
      });
    }
  }
});
