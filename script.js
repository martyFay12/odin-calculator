let operandFlag = true;
let operand1 = "";
let operand2 = "";
let operation = "";

const digits = document.querySelectorAll(".digit");
digits.forEach((digit) => digit.addEventListener("click", recordDigit));

function recordDigit() {
  const digit = this.textContent;
  operandFlag ? operand1 + digit : operand2 + digit;
}
