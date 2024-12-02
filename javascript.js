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
    if (b == 0) {
        return "don't do that!"
    }
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
            if (number2 == 0) {
                window.alert("You tried to divide by zero, stop that! We've set the answer to 42.");
                return 42;
            }
            return divide(+number1, +number2);
   }
}

function buttonClick (event) {
    let target = event.target;

    switch (target.className) {
        case "number":
            if (numberLeft && operatorSign) {
                numberRight = target.textContent;
                display.textContent = numberRight;
            } else {
                numberLeft = target.textContent;
                display.textContent = numberLeft;
            }
            break;
        case "operator":
            if (numberRight){
                numberLeft = operate(operatorSign, numberLeft, numberRight);
                display.textContent = Math.round(numberLeft*1000) / 1000;
                operatorSign = "";
                numberRight = "";
            }
            if (target.id != "equal") {
                operatorSign = target.textContent;
            }
            break;
        case "supplemental":
            switch (target.id) {
                case "ac":
                    numberLeft = "";
                    operatorSign = "";
                    numberRight = "";
                    display.textContent = "";
            }
            break;
    }

    console.log(`${numberLeft} ${operatorSign} ${numberRight}`);

}

const display = document.querySelector(".display");
const buttonContainer = document.querySelector(".buttons");
buttonContainer.addEventListener("click", buttonClick);