const calculator = {
    displayNumber : '0',
    operator : null,
    firstNumber : null,
    isWaitForSecondNumber : false,
}

function updateDisplay(){
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function clearCalculator(){
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.isWaitForSecondNumber = false;
}

function inputDigit(digit){
    if (calculator.displayNumber === '0'){
        calculator.displayNumber = digit;
    }else{
        calculator.displayNumber += digit;
    }
}

function inverseNumber(){
    if (calculator.displayNumber === '0'){
        return
    }

    calculator.displayNumber = calculator.displayNumber * -1;
}

function handleOperator(operator){
    if (!calculator.isWaitForSecondNumber) {
        calculator.operator = operator;
        calculator.isWaitForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';
    }else{
        alert('Operator suda ditetapkan');
    }
}

function performCalculation(){

    if (calculator.firstNumber === null || calculator.operator === null){
        alert('Anda belum menetapkan operator!')
        return
    }

    let result = 0;
    if (calculator.operator === '+'){
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    }else if (calculator.operator === '-'){
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
    }else{
        result = parseInt(calculator.firstNumber) * parseInt(calculator.displayNumber);
    }

    // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}

const buttons = document.querySelectorAll('.button');

for (const button of buttons){
    button.addEventListener('click', function(event){
        // mendapatkan objek yang akan di klik
        const target = event.target;

        if (target.classList.contains('clear')){
            clearCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
          }
          if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
          }
          if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
          }
          if (target.classList.contains('multiplication')) {
            handleOperator(target.innerText);
            return;
          }

        inputDigit(target.innerText);
        updateDisplay()
    });
}



/*const firstName = prompt("Masukkan Nama Depan");
const lastName = prompt("Masukkan Nama Belakang");
const language = prompt("Ketik salah satu dari 3 bahasa berikut(English, Indonesia, Japansese)");

const user = {
    name: {
        first : firstName,
        last : lastName
    },
    language : language
}

if (user.language === "English"){
    alert(`Nice to meet you ${user.name.first} ${user.name.last} !`);
}else if (user.language === "Indonesia"){
    alert(`Senang berkenalan dengan anda ${user.name.first} ${user.name.last} !`);
}else if (user.language === "Japanese"){
    alert(`はじめまして ${user.name.first} ${user.name.last} !`);
}else{
    alert(`resep pendak sareng anjeun ${user.name.first} ${user.name.last} !`);
}*/