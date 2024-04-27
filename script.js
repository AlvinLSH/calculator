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

function operate(a, operator, b) {
    switch (operator) {
        case '+':
            return add(parseFloat(a), parseFloat(b));
        case '-':
            return subtract(parseFloat(a), parseFloat(b));
        case '*':
            return multiply(parseFloat(a), parseFloat(b));
        case '/':
            return divide(parseFloat(a), parseFloat(b));
    }
}

let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOpetor = null;
let display = '0';
let count = 0;
let tempSecondOperand = null;
let tempFirstOperator = null;


const displayValue = document.querySelector('input');
function updateDisplay() {
    displayValue.value = display;
}


const btn = document.querySelectorAll('button');
for(let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', () => {
        if(btn[i].classList.contains('operand')) {
            setOperand(btn[i].value);
        }
        if(btn[i].classList.contains('operator')) {
            setOperator(btn[i].value);
        }
    })
}

function setOperand(operand) {
    if(firstOperand == null) {
        if(display === '0') {
            display = operand;
        }
        else {
            display += operand;
        }
        updateDisplay();
    } else if (firstOperand != null && 
        firstOperator != null) {
        if(firstOperand === display && count == 0) {
            display = operand;
            count++;
        } else if (secondOperand == null || display == '0') {
            display = operand;
        } else {
            display += operand;
        }
        updateDisplay();
        secondOperand = display;
    } 
}

function setOperator(operator) {
    if(firstOperator == null) {
        firstOperator = operator;
        firstOperand = display;
    } else if (secondOperand != null) {
        display = operate(firstOperand, firstOperator,secondOperand);
        console.log(display);
        tempFirstOperator = firstOperator;
        tempSecondOperand = secondOperand;
        secondOperand = null;
        firstOperator = operator;
        firstOperand = display;
        count = 0;
        updateDisplay();
    } if (firstOperator != operator) {
        firstOperator = operator;
    }
}