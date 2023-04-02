//temperature
const conversionToCelsius = (temp) => (temp - 32) * 5 / 9; //варіант без блок коду
const conversionToFahrenheit = (temp) => {
    let fahrenheit = temp * 9 / 5 + 32;
    return `${fahrenheit}°F` // варіант з блок кодом
}

//RGB
const colorConversion = (red, green, blue) => {
    const minValue = 10;
    const maxValue = 'ff';

    let hexRed = red.toString(16);
    let hexGreen = green.toString(16);
    let hexBlue = blue.toString(16);

    if (red < 16) hexRed = minValue;
    if (green < 16) hexGreen = minValue;
    if (blue < 16) hexBlue = minValue;

    if (red > 255) hexRed = maxValue;
    if (green > 255) hexGreen = maxValue;
    if (blue > 255) hexBlue = maxValue;

    return `#${hexRed}${hexGreen}${hexBlue}`
}

//flats
const flatsFinder = (srcFlat, flatsInFloor, floors, entrances) => {
    const flats = flatsInFloor * floors * entrances;

    let srcFloor = Math.ceil(srcFlat / flatsInFloor) % floors;

    if (srcFloor === 0) srcFloor = floors;

    let srcEntrance = Math.ceil((srcFlat / flatsInFloor) / floors);

    const obj = {
        entrance: srcEntrance,
        floor: srcFloor,
        flat: srcFlat
    }

    if (srcFlat > flats) return "Квартира відсутня";
    return obj;
}

//new line ////!!!!!!!!!!!!!!!////
let strNewLine = "Hello\nMy name Anonim\nHow are u?"
const newLine = (str) => alert(str.split('\\n').join('\n'));

//credentials
const credentialsCollector = () => {

    let surname = prompt("Прізвище: ", "anon").trim(),
        name = prompt("Ім'я: ", "anon").trim(),
        fatherName = prompt("По батькові: ", "anon").trim();

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    surname = capitalize(surname);
    name = capitalize(name);
    fatherName = capitalize(fatherName);

    const dataCred = {
        name: name,
        surname: surname,
        fatherName: fatherName,
        fullName: `${surname} ${name} ${fatherName}`
    };
    return dataCred;
}

//Prompt: or
const promptOr = (age, defValue='2023') => defValue - prompt(age) || defValue; //погано зрозумів завдання
const promptOr2 = (str, defValue="2023") => prompt(str) || defValue

//Login and password
const checker = (log, pass) => {
    let userLogin = prompt('Введіть будь ласка ваш логін');

    if (userLogin === log) {
        let userPassword = prompt('Введіть будь ласка ваш пароль')
        if (userPassword !== pass) {
            return  alert('error')
        }
        return alert('Ви залогінились!')
    }
    return alert('error')
}

//For Table
const arr = [
    [0, 0, 0, 0, 0],
    [0, 1, 2, 3, 4],
    [0, 2, 4, 6, 8],
    [0, 3, 6, 9, 12],
    [0, 5, 10, 15, 20],
    [0, 6, 12, 18, 24],
    [0, 7, 14, 21, 28],
];

const tableCreator = (arr) => {
    document.write('<table style="color: black">');

    arr.forEach((row, index) => {
        document.write('<tr style="height: 50px;">');

        const bgColor = index % 2 === 0 ? 'SlateGray' : 'Silver';

        for (const cell of row) {
            document.write(`<td style="text-align: center;width: 50px; background-color:${bgColor}">${cell}</td>`);
        }

        document.write('</tr>');
    });

    document.write('</table>');
}

const tableCreator2 = (arr) => {
    let str = '<table style="color: black">';
    let rowIndex = 0;

    for(let row of arr){
        let tr = '<tr style="height: 50px;">';
        let bgColor = rowIndex % 2 === 0 ? 'SlateGray' : 'Silver';

        for (let cell of row) {
            tr += `<td style="text-align: center;width: 50px; border: 1px solid; background-color:${bgColor}">${cell}</td>`;
        }
        rowIndex++;
        tr += "</tr>";
        str += tr;
    }
    str += "</table>";
    return document.write(str);
}

//Filter Lexics
let str2 = 'привіт бляха муха як справи? пляшка'
const arr2 = ['бляха', 'муха', "пляшка", "шабля"];
const filterLexics = (str, arr) => str.split(' ').filter(el => !arr.includes(el)).join(' ');

//Currency Table
const currencyTable = () => {
    const currencies = ['USD', 'EUR', 'UAH', 'PLN'];
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `<th></th>${currencies.map(currency => `<th>${currency}</th>`).join('')}`;
    table.appendChild(headerRow);
    currencies.forEach(fromCurrency => {
        const row = document.createElement('tr');
        row.innerHTML = `<th>${fromCurrency}</th>`;
        currencies.forEach(toCurrency => {
            fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`)
                .then(res => res.json())
                .then(data => {
                    const rate = data.rates[toCurrency];
                    const cell = document.createElement('td');
                    cell.textContent = rate.toFixed(2);
                    row.appendChild(cell);
                });
        });
        table.appendChild(row);
    });
    document.body.appendChild(table);
}

//Form
const car = {
    "Name":"chevrolet chevelle malibu",
    "Cylinders":8,
    "Displacement":307,
    "Horsepower":130,
    "Weight_in_lbs":3504,
    "Origin":"USA",
    "in_production": false
}

const formCreator = (obj) => {
    document.write("<form>");

    for (const key in obj) {
        document.write(`<label style="display:flex">${key}: 
            <input type="${typeof obj[key] === 'boolean' ? 'checkbox' : typeof obj[key] === 'string' ? 'text' : typeof obj[key]}" 
            value="${obj[key]}"/></label><br>`);
    }

    document.write("</form>");
};

//Array of objects sort
const persons = [
    {name: "Яків", age: 12},
    {name: "Іван", age: 17},
    {name: "Олексій", age: 73},
    {name: "Влад", age: 22},
    {name: "Катя", age: 16},
    {name: "Андрій", age: 55},

]

const sort = (arr, key, up = true) => {
    arr.sort((a, b)=> {
        if(!up){
            return b[key] > a[key] ? 1 : -1
        }
        return b[key] > a[key] ? -1 : 1
    });
    return arr;
};

// sort(persons, "age"); //сортує за віком за зростанням
// sort(persons, "name", false); //сортує на ім'я за спаданням

//Table
const persons2 = [
    {
        name: 'Марія',
        fatherName: 'Іванівна',
        surname: 'Іванова',
        sex: 'female'
    },
    {
        name: 'Миколай',
        fatherName: 'Іванович',
        surname: 'Іванов',
        age: 15
    },
    {
        name: 'Петро',
        fatherName: 'Іванович',
        surname: 'Іванов',
        married: true
    },
]

const car2 = [
    {
        "Name":"chevrolet chevelle malibu",
        "Cylinders":8,
        "Displacement":307,
        "Horsepower":130,
        "Weight_in_lbs":3504,
        "Origin":"USA"
    },
    {
        "Name":"buick skylark 320",
        "Miles_per_Gallon":15,
        "Cylinders":8,
        "Displacement":350,
        "Horsepower":165,
        "Weight_in_lbs":3693,
        "Acceleration":11.5,
        "Year":"1970-01-01",
    },
    {
        "Miles_per_Gallon":18,
        "Cylinders":8,
        "Displacement":318,
        "Horsepower":150,
        "Weight_in_lbs":3436,
        "Year":"1970-01-01",
        "Origin":"USA"
    },
    {
        "Name":"amc rebel sst",
        "Miles_per_Gallon":16,
        "Cylinders":8,
        "Displacement":304,
        "Horsepower":150,
        "Year":"1970-01-01",
        "Origin":"USA"
    },
];

const tableCreatorFromArrayOfObjects = (arr, toSort, sortOrder= true) => {
    const newArr = [...arr];
    const columns = [];


    newArr.sort((a, b)=> {
        if(!sortOrder){
            return b[toSort] > a[toSort] ? 1 : -1
        }
        return b[toSort] > a[toSort] ? -1 : 1
    });

    newArr.forEach(person => {
        for (const key in person) {
            if (!columns.includes(key)) {
                columns.push(key);
            }
        }
    });

    newArr.forEach(person => {
        const row = {};
        columns.forEach(column => {
            row[column] = person[column];
        });

    });

    const tableFunc = () => {
        let table = '<table style="background-color: #323232; font-family: system-ui, serif;"><tr style="height: 40px">';

        columns.forEach(col => {
            table += `<th style="min-width: 100px;border: 1px solid rgb(255,255,255); background-color: #7a5242; color: white; padding: 0 5px;">${col}</th>`;
        });

        table += '</tr>';

        newArr.forEach(person => {
            table += '<tr style="height: 47px;">';
            columns.forEach(col => {
                table += `<td style="border: 1px solid rgb(255,255,255); text-align:center; background-color: #424242; color: white; padding: 0 5px">${person[col] === undefined ? '' : person[col]}</td>`;
            });
            table += '</tr>';
        });

        table += '</table>';
        document.write(table);
    };

    tableFunc()

}

//Divide

const divide = () => {
    document.write(`
        <input type='number' id='firstNumber' />
        <input type='number' id='secondNumber' />
        <div id='divisionResult'>
            Текст у div
        </div>
        <script>
            const division = (a, b) => {
                return Math.floor(a / b);
            }
        
            const updateResult = () => {
                const first = parseInt(document.getElementById('firstNumber').value, 10);
                const second = parseInt(document.getElementById('secondNumber').value, 10);
                const result = division(first, second);
                document.getElementById('divisionResult').innerHTML = \`Результат: \${result}\`;
            };
       
            const firstNumber = document.getElementById('firstNumber');
            const secondNumber = document.getElementById('secondNumber');
            firstNumber.oninput = secondNumber.oninput = updateResult;
        </script>
    `);
}

//Calc Func&&Live
const calcLive = () => {
    document.write(`
        <input type='number' id='firstNumber' />
        <input type='number' id='secondNumber' />
        <div id='divisionResult'>
            Текст у div
        </div>
            <script>
                const calc = (a = 1, b = 1) => {
                
                const addition = a + b;
                const subtraction = a - b;
                const multiplication = a * b;
                const division = a / b;
            
                return {
                    addition: addition.toFixed(2),
                    subtraction: subtraction.toFixed(2),
                    multiplication: multiplication.toFixed(2),
                    division: division.toFixed(2),
                }
            }
        
            const updateResult = () => {
                const first = Number(document.getElementById('firstNumber').value);
                const second = Number(document.getElementById('secondNumber').value);
                const result = calc(first, second);
                
                const div = document.getElementById("divisionResult");

                while (div.firstChild) {
                    div.removeChild(div.firstChild);
                }
              
                const additionParagraph = document.createElement("p");
                additionParagraph.textContent = "addition: " + result.addition;
                
                const subtractionParagraph = document.createElement("p");
                subtractionParagraph.textContent = "subtraction: " + result.subtraction;
                
                const multiplicationParagraph = document.createElement("p");
                multiplicationParagraph.textContent = "multiplication: " + result.multiplication;
                
                const divisionParagraph = document.createElement("p");
                divisionParagraph.textContent = "division: " + result.division;
               
                div.appendChild(additionParagraph);
                div.appendChild(subtractionParagraph);
                div.appendChild(multiplicationParagraph);
                div.appendChild(divisionParagraph);
            };
       
            const firstNumber = document.getElementById('firstNumber');
            const secondNumber = document.getElementById('secondNumber');
            firstNumber.oninput = secondNumber.oninput = updateResult;
        </script>
    `);
}