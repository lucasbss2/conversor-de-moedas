function maskCurrency(value){
    var formater = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currencyTwo
    })
    return formater.format(value);
}