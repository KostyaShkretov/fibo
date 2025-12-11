let buttonText;
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
//  ждем полной загрузки страницы
document.addEventListener("DOMContentLoaded", function () {
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
