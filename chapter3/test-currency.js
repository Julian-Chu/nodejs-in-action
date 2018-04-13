var Currency = require('./currency2');
var currency = new Currency(0.91);
console.log(Currency);
console.log(currency);
console.log('50 Canadia dollars equals this amount of US dollers:');
console.log(currency.canadianToUS(50));

console.log('30 US dollars equals this amount of Canadian dollars');
console.log(currency.USToCanadian(30));