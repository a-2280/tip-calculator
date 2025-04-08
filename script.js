const billInput = document.getElementById("bill");
const billErrorMessage = document.querySelector(".bill-error");
const buttons = document.querySelectorAll("button");
const customButton = document.querySelector(".custom-button");
const customTipInput = document.getElementById("tip");
const peopleInput = document.getElementById("people");
const peopleErrorMessage = document.querySelector(".people-error");
const form = document.getElementById("form");
const totalResult = document.querySelector(".total-result");
const tipResult = document.querySelector(".tip-result");
const resetButton = document.querySelector(".reset-button");

const calculateAndRender = () => {
  let currentBill;
  let currentPeople;
  const currentTip = getPercentNumber() / 100;

  if (!billInput.classList.contains("error")) {
    currentBill = parseFloat(billInput.value.replace(/[$,]/g, ""));
    resetButton.classList.remove("reset-active");
  }

  if (!peopleInput.classList.contains("error")) {
    currentPeople = parseInt(peopleInput.value);
    resetButton.classList.remove("reset-active");
  }

  if (billInput.value == "" || peopleInput.value == "") {
    totalResult.innerText = "$0.00";
    tipResult.innerText = "$0.00";
    resetButton.classList.remove("reset-active");
  }

  if (currentBill != null && currentPeople != null) {
    const tipAmount = currentBill * currentTip;
    const totalAmount = currentBill + tipAmount;

    totalResult.innerText = `$${(totalAmount / currentPeople).toFixed(2)}`;
    tipResult.innerText = `$${(tipAmount / currentPeople).toFixed(2)}`;
    resetButton.classList.add("reset-active");
  }
};

const getPercentNumber = () => {
  const five = document.getElementById("five-percent");
  const ten = document.getElementById("ten-percent");
  const fifteen = document.getElementById("fifteen-percent");
  const twentyFive = document.getElementById("twenty-five-percent");
  const fifty = document.getElementById("fifty-percent");
  const numbers = [five, ten, fifteen, twentyFive, fifty];
  let percentNumber = 0;

  numbers.forEach((number) => {
    if (number && number.classList.contains("active-button")) {
      if (number.id == "five-percent") {
        percentNumber = 5;
      } else if (number.id == "ten-percent") {
        percentNumber = 10;
      } else if (number.id == "fifteen-percent") {
        percentNumber = 15;
      } else if (number.id == "twenty-five-percent") {
        percentNumber = 25;
      } else if (number.id == "fifty-percent") {
        percentNumber = 50;
      }
    }
  });

  if (
    !customTipInput.classList.contains("hide") &&
    !customTipInput.classList.contains("error")
  ) {
    percentNumber = parseFloat(customTipInput.value);
  }

  return percentNumber;
};

billInput.addEventListener("input", () => {
  const currencyRegex = /^(?:\$)?(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d{2})?$/;
  const value = billInput.value;

  if (currencyRegex.test(value)) {
    billErrorMessage.classList.add("hide");
    billInput.classList.remove("error");
  }

  if (!value) {
    billErrorMessage.innerText = "Must add amount";
    billErrorMessage.classList.remove("hide");
    billInput.classList.add("error");
  } else if (!currencyRegex.test(value)) {
    billErrorMessage.innerText = "Must be number";
    billErrorMessage.classList.remove("hide");
    billInput.classList.add("error");
  } else if (value == 0) {
    billErrorMessage.innerText = "Can't be zero";
    billErrorMessage.classList.remove("hide");
    billInput.classList.add("error");
  }

  calculateAndRender();
});

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    customButton.classList.remove("hide");
    customTipInput.classList.add("hide");
    customTipInput.value = "";

    buttons.forEach((button) => {
      button.classList.remove("active-button");
    });

    if (button == customButton) {
      customButton.classList.add("hide");
      customTipInput.classList.add("error");
      customTipInput.classList.remove("hide");
      customTipInput.focus();
    } else {
      button.classList.add("active-button");
    }

    calculateAndRender();
  });
});

customTipInput.addEventListener("input", () => {
  const value = customTipInput.value;
  const percentRegex =
    /^(?:(?:[1-9]\d*)(?:\.\d{1,2})?|0\.(?:[1-9]\d?|0[1-9]))%?$/;

  if (percentRegex.test(value)) {
    customTipInput.classList.remove("error");
  }

  if (!value || value <= 0 || isNaN(value) || !percentRegex.test(value)) {
    customTipInput.classList.add("error");
  }

  calculateAndRender();
});

peopleInput.addEventListener("input", () => {
  const value = peopleInput.value;
  const peopleRegex = /^[1-9]\d*$/;

  if (peopleRegex.test(value)) {
    peopleInput.classList.remove("error");
    peopleErrorMessage.classList.add("hide");
  }

  if (!value) {
    peopleErrorMessage.innerText = "Must add amount";
    peopleErrorMessage.classList.remove("hide");
    peopleInput.classList.add("error");
  } else if (value == 0) {
    peopleErrorMessage.innerText = "Can't be zero";
    peopleErrorMessage.classList.remove("hide");
    peopleInput.classList.add("error");
  } else if (!peopleRegex.test(value)) {
    peopleErrorMessage.innerText = "Incorrect value";
    peopleErrorMessage.classList.remove("hide");
    peopleInput.classList.add("error");
  }

  calculateAndRender();
});

const removeErrorMessages = () => {
  if (!billInput.focus()) {
    billErrorMessage.classList.add("hide");
  }

  if (!peopleInput.focus()) {
    peopleErrorMessage.classList.add("hide");
  }
};

resetButton.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
});
