class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.previousOperandTextElement.innerText = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return;
         this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return;
        if(this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        console.log(this.operation);
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) && isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break
            case '-':
                computation = prev - current;
                break
            case 'x':
                computation = prev * current;
                break
            case '÷':
                computation = prev / current;
                break
            default:
                return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperandTextElement.innerText = '';
        console.log(this.currentOperand);
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if(this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        }
        console.log(this.currentOperand);
    }
}

const numberButtons = document.getElementsByClassName('number');
const operationButtons = document.getElementsByClassName('operation');
const equalsButton = document.getElementsByClassName('equals')[0];
const deleteButton = document.getElementsByClassName('delete')[0];
const allClearButton = document.getElementsByClassName('all-clear')[0];
const previousOperandTextElement = document.getElementsByClassName('previous-op')[0];
const currentOperandTextElement = document.getElementsByClassName('current-op')[0];

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

Array.prototype.forEach.call(numberButtons, button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

Array.prototype.forEach.call(operationButtons, button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})
