function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return Math.round((a * b) * 100) / 100;
}

function divide(a, b) {
    if (b == 0) {
        return 'Math error';
    } else {
        return Math.round((a / b) * 100) / 100;
    }
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
let display = '0';
let count = 0;
let tempSecondOperand = null;
let tempFirstOperator = null;


const displayValue = document.querySelector('.display');
function updateDisplay() {
    displayValue.textContent = display;
}


const btn = document.querySelectorAll('button');
for(let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', () => {
        if (btn[i].classList.contains('operand')) {
            setOperand(btn[i].value);
        } else if (btn[i].classList.contains('operator')) {
            setOperator(btn[i].value);
        } else if (btn[i].classList.contains('equal')) {
            equalSign();
        } else if (btn[i].classList.contains('clear')) {
            clear();
        } else if(btn[i].classList.contains('decimal')) {
            setDecimal();
        } else if (btn[i].classList.contains('pos-neg')) {
            setPositiveNegative();
        }
    })
}

function setOperand(operand) {
    if(firstOperand == null) {
        if(display === '0' || display === '-0') {
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
        tempFirstOperator = null;
        tempSecondOperand = null;
        secondOperand = null;
        firstOperator = operator;
        firstOperand = display;
        count = 0;
        updateDisplay();
    } if (firstOperator != operator) {
        firstOperator = operator;
    }
}

function equalSign() {
    if (firstOperand == null) {
        if (tempFirstOperator && tempSecondOperand) {
            firstOperand = displayValue.textContent;
            display = operate(firstOperand, tempFirstOperator, tempSecondOperand);
            firstOperand = null;
            updateDisplay();
            display = '0';
        } else {
            display = display;
        }
    } else if (firstOperand && firstOperator && !secondOperand) {
        alert('Invalid format');
    } else if(firstOperand && 
                firstOperator && 
                secondOperand) {
        display = operate(firstOperand, firstOperator, secondOperand);
        tempFirstOperator = firstOperator;
        tempSecondOperand = secondOperand;
        secondOperand = null;
        firstOperand = null;
        firstOperator = null;
        updateDisplay();
        display = '0';
    }

}


function clear() {
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    tempFirstOperator = null;
    tempSecondOperand = null;
    display = '0';
    count = 0;
    updateDisplay();
}

function setDecimal() {
    if (!firstOperand && !display.includes('.')) {
        display += '.';
        updateDisplay();
    } 
    else if (firstOperand && firstOperator) {
        if(!secondOperand) {
            display = '0';
            display += '.'
            updateDisplay();
            secondOperand = display;
        } else {
            if (!display.includes('.')) {
                display += '.';
                updateDisplay()
                secondOperand = display;
            }
        }
    }
}

function setPositiveNegative() {
    if (!firstOperand || secondOperand) {
        if (!display.includes('-')) {
            display = '-' + display;
        } else {
            display = display.substring(1);
        }
    } else if (firstOperand && firstOperator && !secondOperand) {
        if (!display.includes('-')) {
            display = '-' + display;
        } else {
            display = display.substring(1);
        }
        firstOperand = display;
    }
    updateDisplay();
}