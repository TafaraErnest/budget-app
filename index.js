// Defining variables
const addBtn = document.querySelector(".add__btn");
const addCardPage = document.querySelector(".add_card");
const cancelBtn = document.querySelector(".cancelBtn");
const okBtn = document.querySelector(".okBtn");
const type = document.querySelector("#type");
const date = document.querySelector("#date");
const moneyAdded = document.querySelector("#money_added");
const use = document.querySelector("#use");
const totalIncome = document.querySelector("#totalIncome");
const totalExpenses = document.querySelector("#totalExpenses");
const cards = document.querySelector(".cards");
const saveBtn = document.querySelector(".add__btn-1");
const resetBtn = document.querySelector(".add__btn-2");

// saving data on local storage
let dataArray = [];

// object definition
/////////////////////////////////////////////////////////////////////////
class Info {
  constructor(inputType, inputDate, inputVal, inputUse, income, expense) {
    this.inputType = inputType;
    this.inputDate = inputDate;
    this.inputVal = inputVal;
    this.inputUse = inputUse;
    this.income = income;
    this.expense = expense;
  }
  // changing the value of total income
  addIncome() {
    totalIncome.innerHTML = this.income + this.inputVal;
  }
  // changing the value of total expenses
  addExpense() {
    totalExpenses.innerHTML = this.expense + this.inputVal;
  }
  // Adding a card to the page
  addCard() {
    const html = `
      <div class="card">
        <p class="name">${this.inputUse}</p>
        <p class="date">${this.inputDate}</p>
        <p class="amount">${
          (this.inputType == "spent" ? "- " : "+ ") + this.inputVal
        }</p>
      </div>
    `;
    // adding card at the beginning of the section
    cards.insertAdjacentHTML("afterbegin", html);
  }
}

// Bring up add new item
addBtn.addEventListener("click", function () {
  addCardPage.classList.remove("hidden");
});

// Close the add new card
cancelBtn.addEventListener("click", function () {
  cleanUp();
});

// Add item on page
okBtn.addEventListener("click", function () {
  // set date to current day if not added
  const inputDate = date.value === "" ? currentDate() : date.value;
  // check if amount and name are avail, then create the object
  if (!moneyAdded.value == "" && !use.value == "") {
    const data = new Info(
      type.value,
      inputDate,
      +moneyAdded.value,
      use.value,
      +totalIncome.innerHTML,
      +totalExpenses.innerHTML
    );

    dataArray.push(data);

    // call function to update vals
    if (data.inputType === "spent") {
      data.addExpense();
    } else if (data.inputType === "earned") {
      data.addIncome();
    }
    // call function to create the card
    data.addCard();
  } else alert("Please input all infomation!");
  // reset all values on closing
  cleanUp();
});

//Clean up all values
function cleanUp() {
  type.value = "";
  date.value = "";
  moneyAdded.value = "";
  use.value = "";
  addCardPage.classList.add("hidden");
}

// Get current date
const currentDate = function () {
  const today = new Date();
  const dd = String(today.getDate());
  const mm = String(today.getMonth() + 1);
  const yyyy = today.getFullYear();
  return dd + "/" + mm + "/" + yyyy;
};

// save data function
saveBtn.addEventListener("click", function () {
  dataArray = JSON.stringify(dataArray);
  localStorage.setItem("data", dataArray);
});

// deleting info
resetBtn.addEventListener("click", function () {
  localStorage.removeItem("data");
});

// Loading information
let newData = localStorage.getItem("data");
newData = JSON.parse(newData);
if (newData.length > 0) {
  newData.forEach((item) => {
    item = new Info(
      item.inputType,
      item.inputDate,
      item.inputVal,
      item.inputUse,
      item.income,
      item.expense
    );
    item.addCard();
  });
}
