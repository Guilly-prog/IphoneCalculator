class Calc {


    constructor(topDisplayText, bottondisplayText) {
        this.topDisplayText = topDisplayText
        this.bottondisplayText = bottondisplayText
        this.ac()
    }

    appendNumber(number) {
        if (this.bottondisplay == 0) this.bottondisplay = ''
        if (number === ',' && this.bottondisplay.includes(',')) return
        this.bottondisplay = this.bottondisplay.toString() + number.toString()
    }
    ac() {
        this.bottondisplay = ''
        this.topDisplay = ''
        this.operation = ''
    }
    negative() {
        this.bottondisplay = this.bottondisplay * -1
    }
    percent() {
        this.bottondisplay = this.bottondisplay / 100
    }
    pickOperation(operation) {
        if (this.bottonScreen === '') return
        if (this.topScreen !== '') {
            this.equals()
        }
        this.operation = operation
        this.topDisplay = this.bottondisplay
        this.bottondisplay = ''
    }
    equals() {
        let result
        let first = parseFloat(this.topDisplay)
        let second = parseFloat(this.bottondisplay)
        if (isNaN(first) || isNaN(second)) return
        switch (this.operation) {
            case '÷':
                result = first / second
                break
            case '×':
                result = first * second
                break
            case '+':
                result = first + second
                break
            case '-':
                result = first - second
                break
            default:
                return
        }
        this.bottondisplay = result
        this.topDisplayText.innerText = ''
        this.operation = undefined
    }
    
    updateDisplay() {
        this.bottondisplayText.innerText = this.bottondisplay
        if (this.operation != null) {
            this.topDisplayText.innerText = `${this.topDisplay} ${this.operation}`
        }
    }
}

let topDisplayText = document.querySelector('[data-topDisplay]')
let bottondisplayText = document.querySelector('[data-bottondisplay]')

let acBtn = document.querySelector('[data-ac]')
let negativeBtn = document.querySelector('[data-negative]')
let percentBtn = document.querySelector('[data-percent]')
let operationBtn = document.querySelectorAll('[data-operation]')
let operationBtnEquals = document.querySelector('[data-operationEqual]')
let numberBtn = document.querySelectorAll('[data-numbers]')

let calc = new Calc(topDisplayText, bottondisplayText)

numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        calc.appendNumber(button.innerText)
        calc.updateDisplay()
    })
})

acBtn.addEventListener('click', () => {
    calc.ac()
    calc.updateDisplay()
})
percentBtn.addEventListener('click', () => {
    calc.percent()
    calc.updateDisplay()
})
operationBtn.forEach(button => {
    button.addEventListener('click', () => {
        calc.pickOperation(button.innerHTML)
        calc.updateDisplay()
    })
})
operationBtnEquals.addEventListener('click', () => {
    calc.equals()
    calc.updateDisplay()
})
negativeBtn.addEventListener('click', () => {
    calc.negative()
    calc.updateDisplay()
})

