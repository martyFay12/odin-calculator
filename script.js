let operandFlag = true;
let operand1 = "";
let operand2 = "";
let operationSaved = "";

// SELECT BUTTONS
const digits = document.querySelectorAll(".digit");
const operations = document.querySelectorAll(".operation");
const decimalButton = document.querySelector(".decimal-digit");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const plusMinusButton = document.querySelector(".plus-minus");
const percentButton = document.querySelector(".percent");
const displaySection1 = document.querySelector(".operand1");
const displaySection2 = document.querySelector(".operation-selected");
const displaySection3 = document.querySelector(".screen-bottom");

// ADD EVENT LISTENERS
digits.forEach((digit) => digit.addEventListener("click", recordDigit));
operations.forEach((operation) =>
  operation.addEventListener("click", recordOperation)
);
equalsButton.addEventListener("click", equalsPress);
reset();
clearButton.addEventListener("click", reset);
plusMinusButton.addEventListener("click", plusMinus);
percentButton.addEventListener("click", percentage);

function display() {
  operand1.length > 9
    ? writeSmaller(1)
    : (displaySection1.textContent = operand1);
  operand2.length > 9
    ? writeSmaller(2)
    : (displaySection3.textContent = operand2);
  displaySection2.textContent = operationSaved;
}

function writeSmaller(selector) {
  selector === 1
    ? (displaySection1.textContent = shortScientific(operand1))
    : (displaySection3.textContent = shortScientific(operand2));
}

function shortScientific(string) {
  const num = Number(string);
  const numInSciNot = {};
  [numInSciNot.coefficient, numInSciNot.exponent] = num
    .toExponential()
    .split("e")
    .map((item) => Number(item));
  let smallCoeff = Math.round(numInSciNot.coefficient * 100000000) / 100000000;
  return `${smallCoeff}e${numInSciNot.exponent}`;
}

function percentage() {
  operandFlag
    ? (operand1 = Number(operand1) / 100)
    : (operand2 = Number(operand2) / 100);
  display();
}

function plusMinus() {
  if (operandFlag) {
    if (operand1[0] === "-") {
      operand1 = operand1.slice(1);
    } else {
      operand1 = "-" + operand1;
    }
  } else {
    if (operand2[0] === "-") {
      operand2 = operand2.slice(1);
    } else {
      operand2 = "-" + operand2;
    }
  }
  display();
}

function equalsPress() {
  operandFlag = !doMath();
  addListenerToDecimal();
  display();
}

function reset() {
  operandFlag = true;
  operand1 = "";
  operand2 = "";
  operationSaved = "";
  addListenerToDecimal();
  display();
}

function addListenerToDecimal() {
  decimalButton.addEventListener("click", recordDigit);
}

function removeListenerFromDecimal() {
  decimalButton.removeEventListener("click", recordDigit);
}

function recordDigit() {
  const digit = this.textContent;
  operandFlag ? (operand1 += digit) : (operand2 += digit);
  display();
  if (digit === ".") removeListenerFromDecimal();
}

function recordOperation() {
  if (operationSaved) {
    // already an operation saved
    if (doMath()) {
      operandFlag = !operandFlag;
    } else return;
  }
  operationSaved = this.textContent;
  operandFlag = false;
  display();
  addListenerToDecimal();
}

function operandsAccepted() {
  if (!operand1 || !operand2) return false; // one is an empty string.
  if (operand1 === "." || operand2 === ".") return false;
  return true;
}

function doMath() {
  if (!operandsAccepted()) return false;
  switch (operationSaved) {
    case "+":
      return mathAdd(operand1, operand2);
    case "-":
      return mathSub(operand1, operand2);
    case "*":
      return mathMult(operand1, operand2);
    case "/":
      return mathDiv(operand1, operand2);
  }
}

function mathAdd() {
  operand1 = (Number(operand1) + Number(operand2)).toString();
  operand2 = "";
  operationSaved = "";
  return true;
}

function mathSub() {
  operand1 = (Number(operand1) - Number(operand2)).toString();
  operand2 = "";
  operationSaved = "";
  return true;
}

function mathMult() {
  operand1 = (Number(operand1) * Number(operand2)).toString();
  operand2 = "";
  operationSaved = "";
  return true;
}

function mathDiv() {
  if (Number(operand2) === 0) return divisionByZero();
  operand1 = (Number(operand1) / Number(operand2)).toString();
  operand2 = "";
  operationSaved = "";
  return true;
}

function divisionByZero() {
  alert("you really are a moron...");
  reset();
  return false;
}
