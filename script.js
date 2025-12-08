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
    price: "120 ₽",
    isActive: false,
  },
  {
    icon: "barbecue",
    title: "Барбекю",
    price: "120 ₽",
    isActive: false,
  },
  {
    icon: "ranch",
    title: "Ранч",
    price: "120 ₽",
    isActive: false,
  },
  {
    icon: "condensedmilk",
    title: "Сгущёнка",
    price: "120 ₽",
    isActive: true,
  },
  {
    icon: "raspberryjam",
    title: "Малиновое варенье",
    price: "120 ₽",
    isActive: false,
  },
  {
    icon: "cheese",
    title: "Сырный соус",
    price: "120 ₽",
    isActive: false,
  },
];

let sausesCategory = document.querySelector(".sauses__selector");
if (sausesCategory) {
  let sausesHtml = "";
  sausesList.forEach(function (category) {
    sausesHtml += `<li>
                           <a href="#" class="${category.isActive ? "active": ""}">
                            <img src="images/${category.icon}.svg" alt="">
                            <h3>${category.title}</h3>
                            <p>${category.price}</p>
                           </a> 
                    </li> `;
  });
  sausesCategory.innerHTML = sausesHtml;
}
