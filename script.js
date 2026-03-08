const fromCurrency = document.getElementById("fromCurrency")
const toCurrency = document.getElementById("toCurrency")

const countryList = {
USD:"US",
INR:"IN",
EUR:"EU",
GBP:"GB",
JPY:"JP",
AUD:"AU",
CAD:"CA",
CNY:"CN",
BRL:"BR",
RUB:"RU",
KRW:"KR",
SGD:"SG",
CHF:"CH",
ZAR:"ZA",
NZD:"NZ",
SEK:"SE",
NOK:"NO",
MXN:"MX",
AED:"AE",
SAR:"SA",
THB:"TH",
IDR:"ID",
MYR:"MY",
PHP:"PH",
TRY:"TR",
EGP:"EG",
PKR:"PK",
BDT:"BD",
LKR:"LK"
}

async function loadCurrencies(){

let url="https://api.exchangerate-api.com/v4/latest/USD"

let response = await fetch(url)

let data = await response.json()

let currencies = Object.keys(data.rates)

currencies.forEach(currency=>{

let option1 = document.createElement("option")
option1.value=currency
option1.text=currency
fromCurrency.appendChild(option1)

let option2 = document.createElement("option")
option2.value=currency
option2.text=currency
toCurrency.appendChild(option2)

})

fromCurrency.value="USD"
toCurrency.value="INR"

updateFlags()

}

async function convertCurrency(){

let amount=document.getElementById("amount").value
let from=fromCurrency.value
let to=toCurrency.value

let url=`https://api.exchangerate-api.com/v4/latest/${from}`

let response=await fetch(url)

let data=await response.json()

let rate=data.rates[to]

let result=amount*rate

document.getElementById("result").value=result.toFixed(2)

updateFlags()

}

function swapCurrency(){

let temp=fromCurrency.value
fromCurrency.value=toCurrency.value
toCurrency.value=temp

convertCurrency()

}

function updateFlags(){

let from=fromCurrency.value
let to=toCurrency.value

let fromCountry=countryList[from]
let toCountry=countryList[to]

if(fromCountry){
document.getElementById("fromFlag").src=
`https://flagsapi.com/${fromCountry}/flat/64.png`
}

if(toCountry){
document.getElementById("toFlag").src=
`https://flagsapi.com/${toCountry}/flat/64.png`
}

}

fromCurrency.addEventListener("change",updateFlags)
toCurrency.addEventListener("change",updateFlags)

loadCurrencies()