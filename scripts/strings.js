//String: greeting
let user = prompt("Ваше ім'я: ");

alert(`Welcome ${user}`);


//String: gopni4ek
let strMess = prompt("Message: ");
let bonus = strMess.split(',') .join(' блин, ');

alert(bonus);
console.log(bonus);


//String: capitalize
let strCap = "cANBerRa";
let resultCap = strCap.charAt(0).toUpperCase() + strCap.slice(1).toLowerCase();

console.log(resultCap);


//String: word count
let strInput = prompt("Введіть будь-яку кількість слів:").replace(/\s+/g, ' ').trim()

let target = strInput.split(' ');

if (target <= 1){
    alert(`В рядку 0 слів`);
}
else{
    let counter = target.length;
    alert(`В рядку слів: ${counter}`);
}


//String: credentials
let surname = prompt("Прізвище: ").trim(),
    name = prompt("Ім'я: ").trim(),
    middleName = prompt("По батькові: ").trim();

let capSurname = surname.charAt(0).toUpperCase() + surname.slice(1).toLowerCase(),
    capName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
    capMiddleName = middleName.charAt(0).toUpperCase() + middleName.slice(1).toLowerCase()

let fullName = `${capSurname} ${capName} ${capMiddleName}`;

console.log(fullName);


//String: beer
let strBeer = "Было жарко. Василий пил пиво вприкуску с креветками";

let resultBeer = strBeer.split('пиво') .join('чай');

console.log(resultBeer);


//String: no tag
let str = "какой-то текст в котором есть один тэг <br /> и всякое другое";

let startTag = str.indexOf('<'),
    endTag = str.indexOf('>');

let newStrBefore = str.slice(0, startTag),
    newStrAfter = str.slice(++endTag),
    resultNoTag = newStrBefore + newStrAfter;

console.log(resultNoTag);


//String: big tag
// let str = "какой-то текст в котором есть один тэг <br /> и всякое другое"
//
// let startTag = str.indexOf('<'),
//     endTag = str.indexOf('>');
//
// let newStrBefore = str.slice(0, startTag),
//     newStrAfter = str.slice(++endTag),
//     upperTag = str.slice(startTag, endTag).toUpperCase();
//     resultUpperTag = newStrBefore + upperTag + newStrAfter;
//
// console.log(resultUpperTag);


//String: new line
let userString = prompt('Введіть будь-який текст, в якості переходу ' +
    'на новий рядок використайте маркер "\\n": ');

let lines = userString.split('\\n').join('\n');

console.log(lines);

//String: youtube