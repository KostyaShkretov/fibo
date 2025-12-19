let buttonText;
let totalCart = 0;
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
                           <a href="#">
                            <img src="images/${category.icon}.svg" alt="">
                            <h3>${category.title}</h3>
                            <p>${category.price}</p>
                           </a> 
                    </li> `;
    });
    sausesCategory.innerHTML = sausesHtml;
  }

  let cartItems = [
    //     {
    //       image: "pizza",
    //       name: "С креветками и трюфелями",
    //       desc: `Домашнаяя паста феттуччине, сливочный соус, креветки, трюфельное масло, черный перец, пармезан.350 г
    // `,
    //       price: "100",
    //       quantity: 0,
    //     },
    //     {
    //       image: "set",
    //       name: "С креветками и трюфелями",
    //       desc: `Домашнаяя паста феттуччине, сливочный соус, креветки, трюфельное масло, черный перец, пармезан.350 г
    // `,
    //       price: "200",
    //       quantity: 0,
    //     },
  ];

  fetch("https://example.shaklein.dev/cart/")
    .then(function (responce) {
      return responce.json();
    })
    .then(function (data) {
      cartItems = data.cartItems;
      pizzaListAdd();
    });

  function pizzaListAdd() {
    const cartItemsCategory = document.querySelector(".popup-cart__items");
    if (cartItemsCategory) {
      let cartItemsHtml = "";
      cartItems.forEach(function (e, index) {
        cartItemsHtml += `<div class="popup-cart__body"> 
                        <img src="images/${
                          e.image
                        }.jpg" class="popup-cart__img" alt=""> 
                    <div class="popup-cart__list">
                        <div class="popup-cart__about">
                            <h4>${e.name}</h4>
                            <p>${e.desc}
                            </p>
                        </div>  
                        <div class="popup-cart__summ">
                            ${e.price * e.quantity} ₽
                        </div>
                        <div class="popup-cart__calc">
                            <button class="popup-cart__minus" data-index = "${index}">-</button>
                            <input type="text" data-index = "${index}" value="${
          e.quantity
        }" class="popup-cart__quantity">
                            <button class="popup-cart__plus" data-index = "${index}">+</button>
                        </div> 
                    </div>
                    <div class="popup-cart__delete">
                        <img src="images/close-popup.svg" alt="">
                    </div>
                </div>`;
      });
      renderTotalPrice(cartItems);
      cartItemsCategory.innerHTML = cartItemsHtml;

      let cartInputs = document.querySelectorAll(".popup-cart__quantity");
      if (cartInputs.length) {
        cartInputs.forEach(function (element) {
          element.addEventListener("input", function () {
            this.value = this.value.replace(/\D/g, "");
            if (this.value > 999) this.value = 999;
            this.value = +this.value;
            const quantityIndex = this.dataset.index;
            cartItems[quantityIndex].quantity = this.value;

            const cartItem = cartItems[quantityIndex];
            const total = cartItem.price * cartItem.quantity;

            const container = this.closest(".popup-cart__body");
            const summHtml = container.querySelector(".popup-cart__summ");
            if (summHtml) {
              summHtml.textContent = total.toLocaleString() + " ₽";
            }
            renderTotalPrice(cartItems);
          });
        });
      }
    }
  }

  // Увеличение и уменьшение количества товаров
  let cartDawnload = document.querySelector(".popup-cart__items");
  if (cartDawnload) {
    cartDawnload.addEventListener("click", function (event) {
      const btnPlus = event.target.closest(".popup-cart__plus");
      if (btnPlus) {
        const itemIndex = btnPlus.dataset.index;
        const cartItem = cartItems[itemIndex];
        const parentContainer = event.target.closest(".popup-cart__body");
        const cartInput = parentContainer.querySelector(
          ".popup-cart__quantity"
        );
        if (+cartInput.value < 999) {
          cartInput.value++;
          cartItems[itemIndex].quantity = cartInput.value;
          renderTotalPrice(cartItems);
        }
        const total = +cartInput.value * cartItem.price;
        parentContainer.querySelector(".popup-cart__summ").textContent =
          total.toLocaleString() + " ₽";
      }

      let btnMinus = event.target.closest(".popup-cart__minus");
      if (btnMinus) {
        const itemIndex = btnMinus.dataset.index;
        const cartItem = cartItems[itemIndex];
        const parentContainer = event.target.closest(".popup-cart__body");
        const cartInput = parentContainer.querySelector(
          ".popup-cart__quantity"
        );
        if (+cartInput.value > 0) {
          cartInput.value--;
          cartItems[itemIndex].quantity = cartInput.value;
          renderTotalPrice(cartItems);
        }
        const total = +cartInput.value * cartItem.price;
        parentContainer.querySelector(".popup-cart__summ").textContent =
          total.toLocaleString() + " ₽";
      }
    });
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

  const checkOutButton = document.querySelector(".checkout-footer__btn--order");
  if (checkOutButton) {
    checkOutButton.addEventListener("click", function () {
      fetch("https://example.shaklein.dev/cart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          name: document.querySelector("#name").value,
          phone: document.querySelector("#number").value,
          email: document.querySelector("#email").value, 
          promocode: document.querySelector("#promocode").value,
          cartItems: [
            {
              name: "Пицца Пепперони",
              price: 569,
              quantity: 2,
            },
          ],
        }),
      })
        .then(function (responce) {
          return responce.json();
        })
        .then(function (data) {});
    });
  }
});

const cartTotalHtml = document.querySelector(".promocode__summ span");

function renderTotalPrice(items) {
  totalCart = 0;
  items.forEach(function (item) {
    totalCart += item.price * item.quantity;
  });
  if (cartTotalHtml) {
    cartTotalHtml.textContent = totalCart.toLocaleString();
  }
}
