// Defining variables
const addBtn = document.querySelector(".addBtn");
const addCardPage = document.querySelector(".cards");
const cancelBtn = document.querySelector(".cancelBtn");
const okBtn = document.querySelector(".okBtn");
const type = document.querySelector("#type");
const date = document.querySelector("#date");
const moneyAdded = document.querySelector("#money_added");
const use = document.querySelector("#use");
const totalIncome = document.querySelector("#totalIncome");
const totalExpenses = document.querySelector("#totalExpenses");
const popup = document.querySelector(".add_card");
const resetBtn = document.querySelector(".resetBtn");

// data object definition
class cardData {
  constructor(type, date, amount, income, expenses) {
    this.type = type;
    this.date = date;
    this.amount = amount;
    this.income = income;
    this.expenses = expenses;
  }

  updateTotals() {
    if (this.type === "earned") {
      totalIncome.innerHTML = +this.amount + +totalIncome.innerHTML;
      this.income = this.income + this.amount;
    } else {
      totalExpenses.innerHTML = +this.amount + +totalExpenses.innerHTML;
      this.expenses = this.expenses + this.amount;
    }
  }
}

// load data from local storage
let data = [];
let localData = JSON.parse(localStorage.getItem("data"));
data = localData == null ? data : localData;
let incomeSum = 0;
let expenseSum = 0;
data.forEach((card) => {
  addCard(card);
  incomeSum = +totalIncome.innerHTML + card.income;
  expenseSum = +totalExpenses.innerHTML + +card.expenses;
});

totalIncome.innerHTML = +incomeSum;
totalExpenses.innerHTML = +expenseSum;

// Add card to page
function addCard(card) {
  const html = `
      <div class="card">
        <p class="name">${card.use}</p>
        <p class="date">${card.date}</p>
        <p class="amount">${
          (card.type === "earned" ? "+ " : "- ") + card.amount
        }</p>
      </div>
  `;
  addCardPage.insertAdjacentHTML("beforeend", html);
}

// Add card to page through button
addBtn.addEventListener("click", function () {
  popup.classList.remove("hidden");
});

// add item
okBtn.addEventListener("click", function () {
  if (moneyAdded.value == "") {
    alert("Please enter the amount");
  } else if (use.value == "") {
    alert("Please enter the use");
  } else {
    const info = new cardData();
    info.date = date.value === "" ? currentDate() : date.value;
    info.amount = +moneyAdded.value;
    info.type = type.value;
    info.use = use.value;
    info.income = +totalIncome.innerHTML;
    info.expenses = +totalExpenses.innerHTML;
    info.updateTotals();
    data.push(info);
    const stringfyied = JSON.stringify(data);
    localStorage.setItem("data", stringfyied);
    addCard(info);
    closePopup();
  }
});

// close popup and clear data
cancelBtn.addEventListener("click", function () {});

// Get current date
const currentDate = function () {
  const today = new Date();
  const dd = String(today.getDate());
  const mm = String(today.getMonth() + 1);
  const yyyy = today.getFullYear();
  return yyyy + "-" + mm + "-" + dd;
};

// close popup
function closePopup() {
  date.value = "";
  moneyAdded.value = "";
  use.value = "";
  popup.classList.add("hidden");
}

resetBtn.addEventListener("click", function () {
  localStorage.removeItem("data");
});
