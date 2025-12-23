let buttonText;
let totalCart = 0;
let hasDiscount = false; 
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
];

fetch("https://example.shaklein.dev/cart/")
  .then(function (responce) {
    return responce.json();
  })
  .then(function (data) {
    cartItems = data.cartItems;
    pizzaListAdd(cartItems);
  });

sendOrder(cartItems);
downLoadCart();


// применение промокода
const applyPromocode = document.querySelector(".promocode__btn");
if (applyPromocode) {
  applyPromocode.addEventListener("click", function () {
    const promocodeInput = document.querySelector('input[name="promocode"]');
    hasDiscount = false;
    if (promocodeInput.value.trim() === "777") {
      hasDiscount = true;
      alert("Промокод применен");
    } else {
      alert("Неверный промокд");
    }
    renderTotalPrice(cartItems);
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

//функции

function pizzaListAdd(cartItems) {
  const cartItemsCategory = document.querySelector(".popup-cart__items");
  if (cartItemsCategory) {
    let cartItemsHtml = "";
    cartItems.forEach(function (e) {
      cartItemsHtml += `<div class="popup-cart__body" data-id="${e.id}"> 
                        <img src="${e.image}" class="popup-cart__img" alt=""> 
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
                            <button class="popup-cart__minus" >-</button>
                            <input type="text" value="${
                              e.quantity
                            }" class="popup-cart__quantity">
                            <button class="popup-cart__plus"  >+</button>
                        </div> 
                    </div>
                    <div class="popup-cart__delete">
                        <img src="images/close-popup.svg" alt="">
                    </div>
                </div>`;
    });

    cartItemsCategory.innerHTML = cartItemsHtml;
    renderTotalPrice(cartItems);
    handleQuantityInput();
  }
}

// Изменение количества товаров
function downLoadCart() {
  let cartDownload = document.querySelector(".popup-cart__items");
  if (cartDownload) {
    cartDownload.addEventListener("click", function (event) {
      const btnPlus = event.target.closest(".popup-cart__plus");
      //Увеличение
      if (btnPlus) {
        const parentContainer = event.target.closest(".popup-cart__body");
        const productId = parentContainer.dataset.id;
        cartItems = increaseProductQuantity(cartItems, productId);
      }

      const btnMinus = event.target.closest(".popup-cart__minus");
      // Уменьшение
      if (btnMinus) {
        const parentContainer = event.target.closest(".popup-cart__body");
        const productId = parentContainer.dataset.id;
        cartItems = decreaseProductQuantity(cartItems, productId);
      }

      //Удаление 
      const btnDelete = event.target.closest(".popup-cart__delete");
      if(btnDelete){
         const parentContainer = event.target.closest(".popup-cart__body");
         if(parentContainer){
           const productId = parentContainer.dataset.id;
           cartItems = removeProductFromCart(cartItems,productId);
         } 
      }
    });
  }
}

//Ограничение ввода
function handleQuantityInput() {
  const cartInputs = document.querySelectorAll(".popup-cart__quantity");
  if (cartInputs.length) {
    cartInputs.forEach(function (element) {
      element.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "");
        if (this.value > 999) this.value = 999;
        if (this.value === "") this.value = 0;

        const parentContainer = this.closest(".popup-cart__body");
        const productId = parentContainer.dataset.id;
        cartItems = updateProductQuantity(cartItems, productId, this.value);

        const cartItem = cartItems.find((item) => item.id == productId);
        if (cartItem) {
          const sumElement = parentContainer.querySelector(".popup-cart__summ");
          if (sumElement) {
            sumElement.textContent =
              (cartItem.price * cartItem.quantity).toLocaleString() + " ₽";
          }
        } 
        renderTotalPrice(cartItems);
      });
    });
  }
}


//получение индекса товара по айди
function getProductIndexbyId(cartItems, id) {
  const productIndex = cartItems.findIndex(function (cartItem) {
    return cartItem.id == id;
  });
  return productIndex;
}

//Увеличение количества товаров
function increaseProductQuantity(cartItems, id) {
  const productIndex = getProductIndexbyId(cartItems, id);
  const cartItem = cartItems[productIndex];
  cartItems = updateProductQuantity(cartItems, id, cartItem.quantity + 1);
  return cartItems;
}

// Уменьшение количества товаров
function decreaseProductQuantity(cartItems, id) {
  const productIndex = getProductIndexbyId(cartItems, id);
  const cartItem = cartItems[productIndex];
  cartItems = updateProductQuantity(cartItems, id, cartItem.quantity - 1);
  return cartItems;
}

// Обновление количества товаров
function updateProductQuantity(cartItems, id, quantity) {
  const productIndex = getProductIndexbyId(cartItems, id); 
  quantity = parseInt(quantity);
  if (quantity > 999) quantity = 999;
  if (quantity < 0 )  quantity = 0;
  cartItems[productIndex].quantity = quantity;

  renderCartItem(cartItems, id);
  renderTotalPrice(cartItems);

  return cartItems;
}
//удаление товара из корзины
function removeProductFromCart(cartItems, id) {
  const productIndex = getProductIndexbyId(cartItems, id);
  cartItems.splice(productIndex, 1);
  pizzaListAdd(cartItems);
  return cartItems;
}
// отрисовка суммы конкретного товара
function renderCartItem(cartItems, id) {
  const container = document.querySelector(
    `.popup-cart__body[data-id="${id}"]`
  );
  const productIndex = getProductIndexbyId(cartItems, id);
  const cartItem = cartItems[productIndex];

  const productInput = container.querySelector(".popup-cart__quantity");
  productInput.value = cartItem.quantity;

  const sum = (cartItem.quantity * cartItem.price).toLocaleString();
  container.querySelector(".popup-cart__summ").textContent = sum + " ₽";
}

//  общие суммы корзины
function renderTotalPrice(items) {
  const cartTotalHtml = document.querySelectorAll(".total__summ");
  totalCart = 0;
  items.forEach(function (item) {
    totalCart += item.price * item.quantity;
  });
  if (hasDiscount) {
    totalCart = totalCart * 0.9;
  }
  if (cartTotalHtml.length) {
    cartTotalHtml.forEach(function (e) {
      e.textContent = totalCart.toLocaleString();
    });
  }
}

// отправка заказа на сервер
function sendOrder(cartItems) {
  const checkOutButton = document.querySelector(".checkout-footer__btn--order");
  if (checkOutButton) {
    checkOutButton.addEventListener("click", function () {
      const nameInput = document.querySelector('input[name="name"]');
      const phoneInput = document.querySelector('input[name="number"]');
      const emailInput = document.querySelector('input[name="email"]');
      const promocodeInput = document.querySelector('input[name="promocode"]');
      fetch("https://example.shaklein.dev/cart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameInput.value,
          phone: phoneInput.value,
          email: emailInput.value,
          promocode: promocodeInput.value,
          cartItems: cartItems,
        }),
      })
        .then(function (responce) {
          return responce.json();
        })
        .then(function (data) {
          alert("Заказ успешно оформлен!");
          console.log(data);
        });
    });
  }
}
