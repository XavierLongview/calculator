const display = document.querySelector('.display')
const numKeys = document.querySelectorAll('.numKey');
const opKeys = document.querySelectorAll('.opKey');
const enter = document.querySelector('.enter');
const clear = document.querySelector('.clear');

let displayValue = ''
let previousValue = ''
let op = ''

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num2 - num1;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    if (operator === '+') {
        return add(num1, num2);
    } else if (operator === '-') {
        return subtract(num1, num2);
    } else if (operator === '*') {
        return multiply(num1, num2);
    } else if (operator === '/') {
        return divide(num1, num2);
    }
}

function popDisplay(text) {
    //if 1st click after click an operator, replace text with new text
    if (display.innerText === '0'|| previousValue) {
        display.innerText = text
    } else {
        display.innerText += text;
    }
    currentValue = +display.innerText
}



numKeys.forEach( (numKey) => {
    numKey.addEventListener('click', () => {
        popDisplay(+numKey.innerText);
    })
})

opKeys.forEach( (opKey) => {
    opKey.addEventListener('click', () => {
        // save operator
        // save prev value
        if (op) {
            popDisplay(operate(op, currentValue, previousValue))
        }
        op = opKey.innerText;
        previousValue = +display.innerText;
    })
})

enter.addEventListener('click', () => {
    // run operation using opKey, display value & previous value
    display.innerText = operate(op, +display.innerText, previousValue)
    displayValue = '';
    previousValue = '';
    op = '';
})

clear.addEventListener('click', () => {
    // clear display, opkey and prev value
    display.innerText = '0';
    displayValue = '';
    previousValue = '';
    op = '';
})