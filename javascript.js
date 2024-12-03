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

function removeItemFromNumber () {
    if (numberRight) {
        numberRight = numberRight.slice(0, -1);
        if ( numberRight == "" ) {
            numberRight = "0";
        }
    } else {
        numberLeft = numberLeft.slice(0, -1);
        if ( numberLeft == "" ) {
            numberLeft = "0";
        }
    }
}

function operatorInput (operator, operatorText) {
    if (numberRight){
        numberLeft = round( operate(operatorSign, numberLeft, numberRight) ).toString();
        operatorSign = "";
        numberRight = "";
    }
    if (operator != "equal") {
        operatorSign = operatorText;
    }
}

function calculatePercent () {
    if (numberRight) {
        numberRight = round(numberRight/100);
    } else {
        numberLeft = round(numberLeft/100);
    }
}

function supplementalInput ( input ) {
    switch (input) {
        case "ac":
            numberLeft = "0";
            operatorSign = "";
            numberRight = "";
            display.textContent = "";
            break;
        case "dot":
            addDotToNumber();
            break;
        case "remove":
            removeItemFromNumber();
            break;
        case "percent":
            calculatePercent();
            break;
    }
}

function buttonClick (event) {
    let target = event.target;

    switch (target.className) {
        case "number":
            addItemToNumber(target.textContent);
            break;
        case "operator":
            operatorInput( target.id, target.textContent );
            break;
        case "supplemental":
            supplementalInput( target.id );
            break;
    }

    displayNumber();
}

function keypress (event) {
    switch (event.key) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
            addItemToNumber( event.key );
            break;
        case "Escape":
            supplementalInput( "ac" );
            break;
        case "Backspace":
            supplementalInput( "remove" );
            break;
        case ".":
            supplementalInput( "dot" );
            break;
        case "%":
            supplementalInput( "percent" );
        case "-":
            operatorInput( "subtract", event.key );
            break;
        case "+":
            operatorInput( "add", event.key );
            break;
        case "*":
            operatorInput( "multiply", event.key );
            break;
        case "/":
            operatorInput( "divide", event.key );
            break;
        case "Enter":
            operatorInput( "equal", "=" );
            break;
    }

    displayNumber();
}

const display = document.querySelector(".display");
const buttonContainer = document.querySelector(".buttons");

// listeners
buttonContainer.addEventListener("click", buttonClick);
document.addEventListener("keydown", keypress)