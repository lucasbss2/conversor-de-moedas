let currencyOne;
let currencyTwo;
let currencyAmount;
let currentDate = new Date();

function searchCurrency() {
    fetch(`https://economia.awesomeapi.com.br/last/${currencyOne}-${currencyTwo}`)
    .then(response => 
        { if (response.ok) {
            return (response.json() ) }
        alert('Ocorreu um erro interno. Por favor, tente novamente mais tarde.') } )
    .then(response => displayCurrency (response) )
}

document.getElementById('exchangeButton').addEventListener('click', ()=>{
    currencyOne = document.getElementById('listOfCurrencyOne').value;
    currencyTwo = document.getElementById('listOfCurrencyTwo').value;
    currencyAmount = document.getElementById('currencyAmount').value;
    if (currencyOne == currencyTwo) {
        alert('Por favor, selecione moedas diferentes.')
    } else if (currencyAmount=='') {
        alert('Por favor, digite algum valor para ser convertido.')
    } else if(currencyAmount <= 0) {
        alert('Não são aceitos números negativos ou 0.')
    } else { 
    searchCurrency();
}
})

function maskCurrency (value, currency){
    console.log (currency)
    var formatter = new Intl.NumberFormat (undefined, {
        style: 'currency',
        currency: `${currency}`
    })
    return formatter.format (value);
}

function displayCurrency (responseFromServer) {
    let exchangeCode = Object.keys (responseFromServer);
    let exchangeRate = responseFromServer[exchangeCode].ask;
    let exchangeResult = (exchangeRate * currencyAmount);

    var exchangeUnitNameSection = document.getElementById('exchangeUnitNameSection');
    var exchangeRateSection = document.getElementById('exchangeRateSection');
    var exchangeDate = document.getElementById('exchangeDate');
    var exchangeResultSection = document.getElementById('exchangeResultSection');

    exchangeUnitNameSection.innerHTML = responseFromServer[exchangeCode].name;
    exchangeDate.innerHTML = `Dados coletados no dia: ${currentDate.getDate()} / ${currentDate.getMonth() + 1} / ${currentDate.getFullYear()} às ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}. `
    exchangeRateSection.innerHTML = `A cotação atual é ${maskCurrency(1, currencyOne)} para ${maskCurrency(exchangeRate, currencyTwo)}.`;
    exchangeResultSection.innerHTML = `${maskCurrency(currencyAmount, currencyOne)} é o equivalente a: ${maskCurrency(exchangeResult, currencyTwo)}.`;
    toggleContainerVisibility ();
}

function toggleContainerVisibility () {
    const visibilityChange = document.getElementById('homeContainer');
    visibilityChange.style.visibility = 'hidden';
}

