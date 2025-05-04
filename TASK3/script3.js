const display = document.getElementById('display');
let current = '';
let operator = '';
let firstNum = '';
let resultDisplayed = false;

const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.getAttribute('data-value');

    if (value === 'C') {
      current = '';
      operator = '';
      firstNum = '';
      updateDisplay('0');
      return;
    }

    if (value === 'DEL') {
      current = current.slice(0, -1);
      updateDisplay(current || '0');
      return;
    }

    if (['+', '-', '*', '/'].includes(value)) {
      if (current === '') return;
      operator = value;
      firstNum = current;
      current = '';
      updateDisplay(value);
      return;
    }

    if (value === '=') {
      if (firstNum && current && operator) {
        const num1 = parseFloat(firstNum);
        const num2 = parseFloat(current);
        let result = 0;
        if (operator === '+') result = num1 + num2;
        else if (operator === '-') result = num1 - num2;
        else if (operator === '*') result = num1 * num2;
        else if (operator === '/') result = num2 !== 0 ? num1 / num2 : 'Error';
        updateDisplay(result);
        current = result.toString();
        operator = '';
        firstNum = '';
        resultDisplayed = true;
      }
      return;
    }

    if (resultDisplayed) {
      current = value;
      resultDisplayed = false;
    } else {
      current += value;
    }

    updateDisplay(current);
  });
});

function updateDisplay(value) {
  display.textContent = value;
}
