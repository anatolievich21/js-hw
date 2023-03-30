let taskSearch = prompt("ВВЕДІТЬ НАЗВУ ЗАВДАННЯ:").trim()

if(taskSearch) {

    let exercise = taskSearch;

    if (exercise === 'Number: age') {

        let ageTest = prompt("Скільки Вам років?");
        let yearTest = 2022;
        let yearOfBirth = yearTest - ageTest;

        alert(`Рік народження: ${yearOfBirth}`);

        console.log(`Рік народження: ${yearOfBirth}`);
    }

    if (exercise === 'Number: temperature') {

        let temperature = prompt("Яка температура?");
        let fahrenheit = temperature * 9 / 5 + 32;
        let celsius = (fahrenheit - 32) * 5 / 9;

        alert(`Температура в фарангейтах: ${fahrenheit}°F.`);
        alert(`Температура в цельсіях: ${celsius}°C.`);

        console.log(`Температура в фарангейтах: ${fahrenheit}°F.`);
        console.log(`Температура в цельсіях: ${celsius}°C.`);
    }

    if (exercise === 'Number: divide') {

        let firstValue = 21;
        let secondValue = 5;
        let divide = Math.floor(firstValue / secondValue);

        console.log(`Ділення націло: ${firstValue} - ${secondValue} = ${divide}`);
    }

    if (exercise === 'Number: currency') {

        const rate = 0.027;
        let uah = prompt("Конвертер гривні(UAH) до долара(USD). Кількість одиниць валюти UAH: ");
        let usd = uah * rate;

        alert(`Кількість одиниць валюти USD: ${usd.toFixed(2)}`);

        console.log(`Кількість одиниць валюти USD: ${usd.toFixed(2)}`);
    }

    if (exercise === 'Number: RGB') {

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
    }

    if (exercise === 'Number: flats') {

        let srcFlat = prompt('Квартира: '),
            flat = prompt('Квартир на поверсі: '),
            floor = prompt("Поверхів: "),
            entrance = prompt("Під'їздів: "),
            flats = flat * floor * entrance;

        let srcFloor = Math.ceil(srcFlat / flat) % floor;

        if (srcFloor === 0) srcFloor = floor;

        let srcEntrance = Math.ceil((srcFlat / flat) / floor);

        if (srcFlat <= flats) alert(`Квартира знаходиться на ${srcFloor} поверсі, в ${srcEntrance} підз'їді`);
        else if (srcFlat > flats) alert("Квартира відсутня");
    }

    if (exercise === 'String: greeting') {

        let userGreeting = prompt("Ваше ім'я: ");

        alert(`Welcome ${userGreeting}`);
    }

    if (exercise === 'String: gopni4ek') {

        let strMess = prompt("Message: ");
        let bonus = strMess.split(',').join(' блин, ');

        alert(bonus);
        console.log(bonus);
    }

    if (exercise === 'String: capitalize') {

        let strCap = "cANBerRa";
        let resultCap = strCap.charAt(0).toUpperCase() + strCap.slice(1).toLowerCase();

        console.log(resultCap);
    }

    if (exercise === 'String: word count') {

        let strInput = prompt("Введіть будь-яку кількість слів:").replace(/\s+/g, ' ').trim()

        let target = strInput.split(' ');

        if (target <= 1) {
            alert(`В рядку 0 слів`);
        } else {
            let counter = target.length;
            alert(`В рядку слів: ${counter}`);
        }
    }

    if (exercise === 'String: credentials') {

        let surname = prompt("Прізвище: ").trim(),
            nameEx = prompt("Ім'я: ").trim(),
            middleName = prompt("По батькові: ").trim();

        let capSurname = surname.charAt(0).toUpperCase() + surname.slice(1).toLowerCase(),
            capName = nameEx.charAt(0).toUpperCase() + nameEx.slice(1).toLowerCase(),
            capMiddleName = middleName.charAt(0).toUpperCase() + middleName.slice(1).toLowerCase()

        let fullName = `${capSurname} ${capName} ${capMiddleName}`;

        console.log(fullName);
    }

    if (exercise === 'String: beer') {

        let strBeer = "Было жарко. Василий пил пиво вприкуску с креветками";

        let resultBeer = strBeer.split('пиво').join('чай');

        console.log(resultBeer);
    }

    if (exercise === 'String: no tag') {

        let str = "какой-то текст в котором есть один тэг <br /> и всякое другое";

        let startTag = str.indexOf('<'),
            endTag = str.indexOf('>');

        let newStrBefore = str.slice(0, startTag),
            newStrAfter = str.slice(++endTag),
            resultNoTag = newStrBefore + newStrAfter;

        console.log(resultNoTag);
    }

    if (exercise === 'String: big tag') {

        let strBig = "какой-то текст в котором есть один тэг <br /> и всякое другое"

        let startTag = strBig.indexOf('<'),
            endTag = strBig.indexOf('>');

        let newStrBefore = strBig.slice(0, startTag),
            newStrAfter = strBig.slice(++endTag),
            upperTag = strBig.slice(startTag, endTag).toUpperCase();
        resultUpperTag = newStrBefore + upperTag + newStrAfter;

        console.log(resultUpperTag);
    }

    if (exercise === 'String: new line') {

        let userString = prompt('Введіть будь-який текст, в якості переходу ' +
            'на новий рядок використайте маркер "\\n": ');

        let lines = userString.split('\\n').join('\n');

        console.log(lines);
    }
    //String: youtube

    if (exercise === 'Number: odd') {

        let numberOdd = +prompt("Введіть будь-яке число:");

        if (numberOdd ?? 'string') {
            alert('Good job')
        } else {
            alert('error')
        }

        if (numberOdd % 2 === 0) {
            alert("Це парне число")
        } else {
            alert("Це непарне число")
        }
    }

    if (exercise === 'String: lexics') {

        let lorem = "Текст для прикладу лайка ЛAйка лайка";

        let lexic1 = lorem.indexOf("лайка"),
            lexic2 = lorem.indexOf("Лайка"),
            lexic3 = lorem.includes("лайка"),
            lexic4 = lorem.includes("Лайка");

        console.log(`[${lexic1}, ${lexic2}, ${lexic3}, ${lexic4}]`);

        let lexics = lorem.split('лайка').join('***');

        console.log(lexics);
    }

    if (exercise === 'Boolean') {

        let ageNew = confirm("Вам є 18 років?");

        if (ageNew) {
            alert("Ласкаво просимо!");
        } else {
            alert("Забирайся геть, маленький розбійник)");
        }
    }

    if (exercise === 'Comparison: sizes') {

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
        } else {
            alert("Nothing found")
        }
    }

    if (exercise === 'Ternary') {

        let sex = confirm("Ваша стать - чоловік?");

        alert(sex ? 'Ви чоловік!' : 'Ви жінка!');
    }

    if (exercise === 'Prompt: or') {

        let ageOr = prompt("Скільки Вам років?") || alert("error");
        let yearOr = 2022;
        let yearOfBirth = yearOr - ageOr;

        alert(`Рік народження: ${yearOfBirth}`);

        console.log(`Рік народження: ${yearOfBirth}`);
    }

    if (exercise === 'Confirm: or this days') {

        confirm("Шопінг?") || alert("ты - бяка");
    }

    if (exercise === 'Confirm: if this days') {

        let question = confirm("Шопінг?");

        if (question) {
            alert('Welcome!');
        } else {
            alert("Tы - бяка");
        }
    }

    if (exercise === 'Default: or') {

        let nameOr = prompt("Name:") || "Тарас",
            surName = prompt("Surname:") || "Шевченко";

        alert(`${nameOr} ${surName}`);
    }

    if (exercise === 'Default: if') {

        let nameIf = prompt("Ім'я:");
        surNameIf = prompt("Прізвище:");

        if (nameIf) {
            if (surNameIf) {
                alert(`${nameIf} ${surNameIf}`);
            } else {
                surNameIf = 'Шевченко';
                alert(`${nameIf} ${surNameIf}`);
            }
        } else {
            nameIf = 'Тарас';
            if (surNameIf) {
                alert(`${nameIf} ${surNameIf}`);
            } else {
                surNameIf = 'Шевченко';
                alert(`${nameIf} ${surNameIf}`);
            }
        }
    }

    if (exercise === 'Login and password') {

        let login = prompt('Введіть будь ласка ваш логін');

        if (login === 'admin') {
            let password = prompt('Введіть будь ласка ваш пароль')
            if (password !== 'qwerty') {
                alert('Ви ввели некоректно логін або пароль')
            } else {
                alert('Ви залогінились!')
            }
        } else {
            alert('error')
        }
    }

    if (exercise === 'Currency exchange') {

        let currency = prompt("Найменування валюти:");

        if (currency) {
            let exchange = confirm("BUY or SELL?"),
                value = prompt("Кількість валюти:"),
                rate;

            if (currency.toUpperCase() === 'USD') {
                rate = exchange ? 39.75 : 0.027
                let size = exchange ? value * rate : value / rate;
                alert(`Кількість ${size.toFixed(2)} UAH`);
            } else if (currency.toUpperCase() === 'EUR') {
                rate = exchange ? 41 : 0.0257
                let size = exchange ? value * rate : value / rate;
                alert(`Кількість ${size.toFixed(2)} UAH`);
            }
        } else {
            alert("Оберіть USD або EUR");
        }
    }

    //Scissors

}
else{alert("Спробуй ще, в тебе вийде!")}