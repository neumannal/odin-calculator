let numberLeft = "";
let operatorSign = "";
let numberRight = "";

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, number1, number2) {
    switch (operator) {
        case "+":
            return add(+number1, +number2);
        case "-":
            return subtract(+number1, +number2);
        case "*":
            return multiply(+number1, +number2);
        case "/":
            return divide(+number1, +number2);
   }
}

function buttonClick (event) {
    let target = event.target;

    switch (target.className) {
        case "number":
            if (numberLeft) {
                numberRight = target.textContent;
                display.textContent = numberRight;
            } else {
                numberLeft = target.textContent;
                display.textContent = numberRight
            }
            break;
        case "operator":
            display.textContent = "operator"
            break;
        case "supplemental":
            display.textContent = "supp";
            break;
    }

}

const display = document.querySelector(".display");
const buttonContainer = document.querySelector(".buttons");
buttonContainer.addEventListener("click", buttonClick);