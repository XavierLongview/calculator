const display = document.querySelector('.display')
const numKeys = document.querySelectorAll('.numKey');
const opKeys = document.querySelectorAll('.opKey');
const enter = document.querySelector('.enter');
const clear = document.querySelector('.clear');
const point = document.querySelector('.point');
const buttons = document.querySelectorAll('button')
const del = document.querySelector('.del')

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
    return num2 / num1;
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

function numClick(event) {
    currentClick = 'num'
    popDisplay(event.currentTarget.innerText);
    prevClick = 'num';
}

function opClick(event) {
    currentClick = 'op'
    if (op) {
        popDisplay(operate(op, currentValue, previousValue));
    }
    op = event.currentTarget.innerText;
    previousValue = +display.innerText;
    prevClick = 'op';
}

function enterClick(event) {
    currentClick = 'enter';
    display.innerText = operate(op, +display.innerText, previousValue)
    displayValue = '';
    previousValue = '';
    op = '';
    prevClick = 'enter';
}

function clearClick(event) {
    currentClick = 'clear'
    display.innerText = '0';
    currentValue = '';
    previousValue = '';
    op = '';
    prevClick = 'clear'
}

function delClick(event) {
    currentClick = 'del'
    let deletedString = display.innerText.slice(0,-1)
    if (deletedString === '') {
        display.innerText = '0';
    } else {
        display.innerText = display.innerText.slice(0,-1);
    }
    prevClick = 'del'
}

numKeys.forEach( (numKey) => {
    numKey.addEventListener('click', numClick)
})
opKeys.forEach( (opKey) => {
    opKey.addEventListener('click', opClick)
})
enter.addEventListener('click', enterClick)
clear.addEventListener('click', clearClick)
del.addEventListener('click', delClick)

// Disable Enter and '.' as needed
buttons.forEach( (button) => {
    button.addEventListener('click', () => {
        display.innerText.includes(".") ? point.disabled = true : point.disabled = false;
        !op ? enter.disabled = true : enter.disabled = false;
    })
})
// Keyboard support
window.addEventListener('keydown', (e) => {
    document.getElementById(e.key).click();
})


// To do: 
// - Limit # of characters