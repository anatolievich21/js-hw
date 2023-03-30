//Number: age
let age = prompt("Скільки Вам років?");
let year = 2022;
let yearOfBirth = year - age;

alert(`Рік народження: ${yearOfBirth}`);

console.log(`Рік народження: ${yearOfBirth}`);


//Number: temperature
let temperature = prompt("Яка температура?");
let fahrenheit = temperature * 9 / 5 + 32;
let celsius = (fahrenheit - 32) * 5 / 9;

alert(`Температура в фарангейтах: ${fahrenheit}°F.`);
alert(`Температура в цельсіях: ${celsius}°C.`);

console.log(`Температура в фарангейтах: ${fahrenheit}°F.`);
console.log(`Температура в цельсіях: ${celsius}°C.`);


//Number: divide
let firstValue = 21;
let secondValue = 5;
let divide = Math.floor(firstValue / secondValue);

console.log(`Ділення націло: ${firstValue} - ${secondValue} = ${divide}`);


//Number: currency
const rate = 0.027;
let uah = prompt("Конвертер гривні(UAH) до долара(USD). Кількість одиниць валюти UAH: ");
let usd = uah * rate;

alert(`Кількість одиниць валюти USD: ${usd.toFixed(2)}`);

console.log(`Кількість одиниць валюти USD: ${usd.toFixed(2)}`);


//Number: RGB
const red = +prompt('Введіть значення для red: '),
    green = +prompt('Введіть значення для green: '),
    blue = +prompt('Введіть значення для blue: ');

let minValue = 10,
    maxValue = 'ff';

let hexRed = red.toString(16),
    hexGreen = green.toString(16),
    hexBlue = blue.toString(16);

if (red < 16) hexRed = minValue;
if (green < 16) hexGreen = minValue;
if (blue < 16) hexBlue = minValue;

if (red > 255) hexRed = maxValue;
if (green > 255) hexGreen = maxValue;
if (blue > 255) hexBlue = maxValue;

console.log(`#${hexRed}${hexGreen}${hexBlue}`);
alert(`#${hexRed}${hexGreen}${hexBlue}`);


//Number: flats
let srcFlat = prompt('Квартира: '),
    flat = prompt('Квартир на поверсі: '),
    floor = prompt("Поверхів: "),
    entrance = prompt("Під'їздів: "),
    flats = flat * floor * entrance;

let srcFloor = Math.ceil(srcFlat / flat) % floor;

if (srcFloor == 0) srcFloor = floor;

let srcEntrance = Math.ceil((srcFlat / flat) / floor);

if (srcFlat <= flats) alert(`Квартира знаходиться на ${srcFloor} поверсі, в ${srcEntrance} підз'їді`);
else if (srcFlat > flats) alert("Квартира відсутня");


