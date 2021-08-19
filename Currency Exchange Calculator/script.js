// get currency one and two
//get input one and two
// get rate div
const currencyOneEl = document.getElementById("currency-one");

const currencyTwoEl = document.getElementById("currency-two");

const currencyOneInputEl = document.getElementById("currency-one-input");

const currencyTwoInputEl = document.getElementById("currency-two-input");

const rateEl = document.getElementById("rate");

//take input 1 and call api and get conversion rate.
//multiply rate with input 2
function calculate() {
  const currencyOne = currencyOneEl.value;
  const currencyTwo = currencyTwoEl.value;

  let url = `https://api.exchangerate-api.com/v4/latest/${currencyOne}`;
  console.log(url);
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      //console.log(data);
      //rate prints 1 USD = 0.843 EUR
      // 1 currencyOne = rate

      rateEl.innerText = `1 ${currencyOne} = ${data.rates[currencyTwo]} ${currencyTwo}`;

      currencyTwoInputEl.value = (
        currencyOneInputEl.value * data.rates[currencyTwo]
      ).toFixed(2);
    });
}

//calculate();

function swapCurrencies() {
  let temp = currencyTwoEl.value;
  currencyTwoEl.value = currencyOneEl.value;
  currencyOneEl.value = temp;
  calculate();
}

currencyOneEl.addEventListener("change", calculate);
currencyOneInputEl.addEventListener("change", calculate);
currencyTwoEl.addEventListener("change", calculate);
currencyTwoInputEl.addEventListener("change", calculate);
document.getElementById("swap").addEventListener("click", swapCurrencies);
