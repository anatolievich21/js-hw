//blocks

let a = 10
{
    let b = 20
    {
        let c = 30
        b++
        a *= 10
        //a = 100, b = 21, c = 30, !d
        // console.log(a, b, c)
    }
    {
        let c = 50

        b += 500
        //a = 100, b = 521, c = 50, !d
        // console.log(a, b, c)

    }
    {
        const a = 100500
        const d = "value"
        //a = 100500, b = 521, !c, d = "value"
        // console.log(a, b, d)

        {
            let a = -50
            b     = 1000
            //a = -50, b = 1000, !c, d = "value"
            // console.log(a, b, d)

        }
        //a = 100500, b = 1000, !c, d = "value"
        // console.log(a, b, d)

    }
    //a = 100, b = 1000, !c, !d
    // console.log(a, b)

}
//a = 100, !b, !c, !d
// console.log(a)




//comparison if
const comprasionIf = () => {

    const age = + prompt ("Скільки вам років?", "");

    if (age < 0){
        alert("можливо ви навіть не в планах)");
    }
    else if (age > 0 && age < 18) {
        alert("школяр");
    }
    else if (age >= 18 && age < 30){
        alert("молодь");
    }
    else if (age >= 30 && age < 45){
        alert("зрілість");
    }
    else if (age >= 45 && age < 60){
        alert("захід сонця");
    }
    else if (age >= 60) {
        alert("як пенсія?");
    }
    else {
        alert("чи кіборг, чи KERNESS");
    }
}



//Comparison: sizes
const comparsionSizes = () => {

    const size = +prompt('Size:')

    switch (size) {
        case 40:
            alert("Your size: S");
            break;
        case 42:
            alert("Your size: 8 (M)");
            break;
        case 44:
            alert("Your size: 10");
            break;
        case 46:
            alert("Your size: 12 (L)");
            break;
        case 48:
            alert("Your size: 14");
            break;
        case 50:
            alert("Your size: 16 (XL)");
            break;
        case 52:
            alert("Your size: 18");
            break;
        case 54:
            alert("Your size: 20 (XXL)");
            break;
        default:
            alert("Nothing found");
    }
}



//switch: if
const switchIf = () => {

    let color = prompt("Введіть колір","");

    if (color === "red") {
        document.write("<div style='background-color: red;'>червоний</div>");
        document.write("<div style='background-color: black; color: white;'>чорний</div>");
    }
    else if(color === "black"){
        document.write("<div style='background-color: black; color: white;'>чорний</div>");
    }
    else if(color === "blue") {
        document.write("<div style='background-color: blue;'>синій</div>");
        document.write("<div style='background-color: green;'>зелений</div>");
    }
    else if(color === "green"){
        document.write("<div style='background-color: green;'>зелений</div>");
    }
    else{
        document.write("<div style='background-color: gray;'>Я не зрозумів</div>");
    }
}



/////////////
//noswitch//
////////////
const cases = {
    "воду": () =>{
        console.log('Найздоровіший вибір!');
    },
    "чай": () => {
        console.log('Смачна та корисна штука. Не перестарайтеся з цукром');
    },
    "пиво": () => {
        console.log('Добре влітку, та в міру');
    },
    "віскі": () => {
        console.log('Та ви, батечку, естет! Не забудьте лід і сигару');
    },
    default: () => {
        console.log('шото я не зрозумів')
    },
};

const noSwitch = (key, cases, defaultKey='default') => {
    if(key in cases){
        return cases[key]();
    } else {
        // return cases.default();
        return cases[defaultKey]();
    }
};

//const drink = prompt("Що ви любите пити");
// noSwitch(drink, cases);



//closure calc
const closureCacl = () => {
fetch('https://open.er-api.com/v6/latest/USD')
    .then(res => res.json())
    .then(data => {
        document.write('<div style="display:flex; flex-wrap: wrap; padding: 20px 100px" id="container"></div>')

        const div = document.getElementById('container');
        for (const currency in data.rates) {
            const button = document.createElement('button');
            button.style.flex = "1 0 12%";
            button.innerText = currency;
            button.onclick = () => {
                const amount = prompt(`Enter amount in USD`);
                const rate = data.rates[currency];
                const convertedAmount = amount * rate;
                alert(`${amount} USD  is equal to ${convertedAmount} ${currency}`);
            };
            div.appendChild(button);
        }
    });
}



//closure calc 2
const closureCalc2 = () => {
    document.write(`
        <select id="from"></select>>
        <select id="to"></select>
        <div id="rate"></div>
        <input type="number" id="amount" />
        <div id="result"></div>
        `)

    const fromSelect = document.getElementById('from');
    const toSelect = document.getElementById('to');
    const rateDiv = document.getElementById('rate');
    const amountInput = document.getElementById('amount');
    const resultDiv = document.getElementById('result');
    let rates;

    fetch('https://open.er-api.com/v6/latest/USD')
        .then(res => res.json())
        .then(data => {
            rates = data.rates;
            for (const currency in rates) {
                const option = document.createElement('option');
                option.innerText = currency;
                fromSelect.appendChild(option);

                const option2 = document.createElement('option');
                option2.innerText = currency;
                toSelect.appendChild(option2);
            }
            updateRate();
            updateResult();
        });

    const updateRate = () => {
        const fromCurrency = fromSelect.value;
        const toCurrency = toSelect.value;
        const rate = rates[toCurrency] / rates[fromCurrency];
        rateDiv.innerText = `1 ${fromCurrency} = ${rate} ${toCurrency}`;
        updateResult();
    }

    const updateResult = () => {
        const fromCurrency = fromSelect.value;
        const toCurrency = toSelect.value;
        const rate = rates[toCurrency] / rates[fromCurrency];
        const amount = amountInput.value;
        const result = amount * rate;
        resultDiv.innerText = `${result} ${toCurrency}`;
    }

    fromSelect.onchange = updateRate;
    toSelect.onchange = updateRate;
    amountInput.oninput = updateResult;
}



//countries and cities
const searcher = () => {
    document.write(`
        <select id="countries"></select>
        <select id="cities"></select>
        <div id="countryResult"></div>
        <div id="cityResult"></div>
        `)

    const countriesSelect = document.getElementById("countries");
    const citiesSelect = document.getElementById("cities");
    const countryResult = document.getElementById("countryResult");
    const cityResult = document.getElementById("cityResult");

    fetch('https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/master/countries.min.json')
        .then(res => res.json())
        .then(data => {

            for (let country in data) {
                const option = document.createElement("option");
                option.innerText = country;
                countriesSelect.appendChild(option);
            }

            countriesSelect.onchange = () => {

                citiesSelect.innerHTML = "";
                cityResult.innerText = "";

                const selectedCountry = countriesSelect.value;
                const cities = data[selectedCountry];

                for (let city of cities) {
                    const option = document.createElement("option");
                    option.innerText = city;
                    citiesSelect.appendChild(option);
                }

                countryResult.innerText = `Обрано країну: ${selectedCountry}`;
            }

            citiesSelect.onchange = () => {

                const selectedCity = citiesSelect.value;
                cityResult.innerText = `Обрано місто: ${selectedCity}`;
            }
        });
}
searcher();