//Number: odd
let number = +prompt("Введіть будь-яке число:");

if (number ?? 'string'){
    alert('Good job')
}
else{alert('error')}

if (number % 2 === 0) {alert("Це парне число")}
else {alert("Це непарне число")}


//String: lexics
let lorem = "Текст для прикладу лайка ЛAйка лайка";

let lexic1 = lorem.indexOf("лайка"),
    lexic2 = lorem.indexOf("Лайка"),
    lexic3 = lorem.includes("лайка"),
    lexic4 = lorem.includes("Лайка");

console.log(`[${lexic1}, ${lexic2}, ${lexic3}, ${lexic4}]`);

let lexics = lorem.split('лайка').join('***');

console.log(lexics);


//Boolean && Boolean: if
let ageNew = confirm("Вам є 18 років?");

if (ageNew) {
    alert("Ласкаво просимо!");
}
else {
    alert("Забирайся геть, маленький розбійник)");
}

//Comparison: sizes
let size = +prompt('Size:')

if (size) {
    if (size === 40) {
        alert("Your size: S");
    } else if (size === 42) {
        alert("Your size: 8 (M)");
    } else if (size === 44) {
        alert("Your size: 10");
    } else if (size === 46) {
        alert("Your size: 12 (L)");
    } else if (size === 48) {
        alert("Your size: 14");
    } else if (size === 50) {
        alert("Your size: 16 (XL)");
    } else if (size === 52) {
        alert("Your size: 18");
    } else if (size === 54) {
        alert("Your size: 20 (XXL)");
    } else if (size < 40 || size > 54) {
        alert("Invalid value");
    }
}else {alert("Nothing found")}


//Ternary
let sex = confirm("Ваша стать - чоловік?");

alert(sex ? 'Ви чоловік!': 'Ви жінка!');


//Prompt: or
let age = prompt("Скільки Вам років?")|| alert("error");
let year = 2022;
let yearOfBirth = year - age;

alert(`Рік народження: ${yearOfBirth}`);

console.log(`Рік народження: ${yearOfBirth}`);


//Confirm: or this days
confirm("Шопінг?") || alert("ты - бяка");


//Confirm: if this days
let question = confirm("Шопінг?");

if (question){
    alert('Welcome!');
}
else{
    alert("Tы - бяка");
}


//Default: or
let nameOr = prompt("Name:") || "Тарас",
    surName = prompt("Surname:") || "Шевченко";

alert(`${nameOr} ${surName}`);


//Default: if
let name = prompt("Ім'я:");
surName = prompt("Прізвище:");

if (name){
    if (surName){
        alert(`${name} ${surName}`);
    }
    else {
        surName = 'Шевченко';
        alert(`${name} ${surName}`);
    }
}
else {
    name = 'Тарас';
    if (surName){
        alert(`${name} ${surName}`);
    }
    else {
        surName = 'Шевченко';
        alert(`${name} ${surName}`);
    }
}


//Login and password
let login = prompt('Введіть будь ласка ваш логін');
if (login === 'admin') {
    let password = prompt('Введіть будь ласка ваш пароль')
        if (password !== 'qwerty') {
            alert('Ви ввели некоректно логін або пароль')
        }
        else {
            alert('Ви залогінились!')
        }
}
else {
    alert('error')
}


//Currency exchange
let currency = prompt("Найменування валюти:");

if (currency){
    let exchange = confirm("BUY or SELL?"),
        value = prompt("Кількість валюти:"),
        rate;

    if (currency.toUpperCase() === 'USD'){
        rate = exchange ? 39.75 : 0.027
        let size = exchange ? value * rate : value / rate;
        alert(`Кількість ${size.toFixed(2)} UAH`);
    }

    else if (currency.toUpperCase() === 'EUR'){
        rate = exchange ? 41 : 0.0257
        let size = exchange ? value * rate : value / rate;
        alert(`Кількість ${size.toFixed(2)} UAH`);
    }
}
else{
    alert("Оберіть USD або EUR");
}


//Scissors