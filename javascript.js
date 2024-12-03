let numberLeft = "0";
let operatorSign = "";
let numberRight = "";
const MAXLENGTH = 8;

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

function round(number) {
    digitsAfterDot = MAXLENGTH - 2;
    rounderValue = 10 ** digitsAfterDot
    return Math.round( number * rounderValue ) / rounderValue;
}

function displayNumber () {
    let numberToDisplay = "";
    if (numberRight) {
        numberToDisplay = numberRight;
    } else {
        numberToDisplay = numberLeft;
    }
    display.textContent = numberToDisplay;
}

function fixLeadingZero(number) {
    if (
        (number.charAt(0) == "0") &&
        (number.charAt(1) != ".")
    ) {
        return number.slice(1);
    } else {
        return number;
    }
}

function addItemToNumber (number) {
    if (numberRight || operatorSign) {
        if ( numberRight.length < MAXLENGTH ) {
            numberRight += number;
            numberRight = fixLeadingZero(numberRight);    
        }
    } else {
        if ( numberLeft.length < MAXLENGTH ) {
            numberLeft += number;
            numberLeft = fixLeadingZero(numberLeft);    
        }
    }
}

function addDotToNumber () {
    if ((numberRight) && (!numberRight.includes("."))) {
        numberRight += ".";
    } else if ((!numberRight) && (operatorSign)) {
        numberRight = "0.";
    } else if ((!operatorSign) && (!numberLeft.includes("."))) {
        numberLeft += ".";
    } else if ((numberLeft == 0) && (!operatorSign)) {
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
                numberLeft = round( operate(operatorSign, numberLeft, numberRight) ).toString();
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
                    numberLeft = "0";
                    operatorSign = "";
                    numberRight = "";
                    display.textContent = "";
                    break;
                case "dot":
                    addDotToNumber();
            }
            break;
    }

    displayNumber();
}

const display = document.querySelector(".display");
const buttonContainer = document.querySelector(".buttons");
buttonContainer.addEventListener("click", buttonClick);