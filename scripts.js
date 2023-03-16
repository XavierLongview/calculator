const display = document.querySelector('.display')
const numKeys = document.querySelectorAll('.numKey');
const opKeys = document.querySelectorAll('.opKey');
const enter = document.querySelector('.enter');
const clear = document.querySelector('.clear');

let currentValue = ''
let previousValue = ''
let op = ''
let prevClick = ''
let currentClick = ''

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
    if (text !== '.') { text = +text}
    if (display.innerText === '0' || prevClick === 'op' || ((currentClick === 'op' & prevClick === 'num'))) {
        display.innerText = text
    } else  {
        display.innerText += text;
    }
    currentValue = +display.innerText
}



numKeys.forEach( (numKey) => {
    numKey.addEventListener('click', () => {
        currentClick = 'num'
        popDisplay(numKey.innerText);
        prevClick = 'num';
    })
})

opKeys.forEach( (opKey) => {
    opKey.addEventListener('click', () => {
        // save operator
        // save prev value
        currentClick = 'op'
        if (op) {
            popDisplay(operate(op, currentValue, previousValue))
        }
        op = opKey.innerText;
        previousValue = +display.innerText;
        prevClick = 'op';
    })
})

enter.addEventListener('click', () => {
    // run operation using opKey, display value & previous value
    currentClick = 'enter';
    display.innerText = operate(op, +display.innerText, previousValue)
    displayValue = '';
    previousValue = '';
    op = '';
    prevClick = 'enter';
})

clear.addEventListener('click', () => {
    // clear display, opkey and prev value
    currentClick = 'clear'
    display.innerText = '0';
    currentValue = '';
    previousValue = '';
    op = '';
    prevClick = 'clear'
})

// To do: 
// - Allow decimals to be entered
// - Disable enter button when no operator selected