let buttonText; 
document.querySelector(".prizes__btn").addEventListener("click", function () {
  document.querySelector(".prizes__info").classList.toggle("prizes__info--active");
  buttonText = this.textContent;
  this.textContent = this.dataset.text;
  this.dataset.text = buttonText
});