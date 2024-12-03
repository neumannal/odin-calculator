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

function displayNumber () {
    if (numberRight) {
        display.textContent = Math.round(numberRight*1000)/1000;
    } else {
        display.textContent = Math.round(numberLeft*1000)/1000;
    }
}

function addItemToNumber (number) {
    if (numberRight || operatorSign) {
        numberRight += number;
    } else {
        numberLeft += number;
    }
}

function addDotToNumber () {
    if ((numberRight) && (!numberRight.includes("."))) {
        numberRight += ".";
    } else if ((!numberRight) && (operatorSign)) {
        numberRight = "0.";
    } else if ((!operatorSign) && (!numberLeft.includes("."))) {
        numberLeft += ".";
    } else if (!numberLeft && !operatorSign) {
        numberLeft = "0.";
    }
}

function buttonClick (event) {
    let target = event.target;

    switch (target.className) {
        case "number":
            addItemToNumber(target.textContent);
            break;
        case "operator":
            if (numberRight){
                numberLeft = operate(operatorSign, numberLeft, numberRight);
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
                    break;
                case ".":
                    console.log(".");
                    addDotToNumber();
            }
            break;
    }

    console.log(`${numberLeft} ${operatorSign} ${numberRight}`);
    displayNumber();
}

const display = document.querySelector(".display");
const buttonContainer = document.querySelector(".buttons");
buttonContainer.addEventListener("click", buttonClick);