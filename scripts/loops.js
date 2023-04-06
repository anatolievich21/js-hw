//while confirm
const whileConfirm = () => {
    let count = 0;

    while (!confirm('Не набридло?')){
        count++
    };

    alert(`Вам не набридло ${count} разів`);
};



//array fill
const arrayFill = () => {
    const arr = [];
    let text;

    while (text = prompt('Введіть щось: ')){
        if (!text){
            break;
        }
        arr.push(text);
    };

    console.log(arr)
}



//array fill nopush
const arrayFillNoPush = () => {
    const arr = [];
    let text;
    let i = 0;

    while (text = prompt('Введіть щось: ')){
        if (!text){
            break;
        }

        arr[i] = text;
        i++;
    };

    console.log(arr);
}



//infinite probability
const infiniteProbability = () => {
    let count = 0;

    while (true) {
        count++;

        if (Math.random() > 0.9) {
            break;
        };
    };

    alert(`Кількість ітерацій: ${count}`);
};



//empty loop
const emptyLoop = () => {
    while (true) {
        const text = prompt('Введіть щось:');

        if (!text) {
            continue;
        }

        alert(`Ви ввели: ${text}`);
        break;
    }
}



//progression sum
const progressionSum = (num) => {
    let sum = 0;

    for (let i = 1; i <= num; i += 3) {
        sum += i;
    }

    console.log(sum);
}



//chess one line
const chessOneLine = (length) =>{
    let result = '';

    for (let i = 0; i < length; i++){
        result += (i % 2 === 0) ? '#' : ' ';
    }

    console.log(result)
}

//numbers
const numbers = (num) =>{
    let result = '';

    for (let i = 0; i < num; i++){
        for (let j = 0; j < num; j++) {
            result += j;

        }

        result += '\n';
    }

    console.log(result);
}



//chess
const chess = (row, cell) =>{
    let result = '';
    let hex = '#';

    for (let i = 0; i < row; i++){
        if (cell % 2 === 0) {
            hex = (hex === '#') ? '.' : '#';
        };

        for (let j = 0; j < cell; j++) {
            result += hex;
            hex = (hex === '#') ? '.' : '#';
        };

        result += '\n';
    }

    console.log(result);
}



//cubes
const cubes = () => {
    const num = +prompt('Введіть кількість елементів в масиві:');
    const arr = [];

    for (let i = 0; i < num; i++) {
        arr.push(i ** 3);
    }

    console.log(arr);
}



//multiply table
const multiplyTable = () => {
    const arr = [];

    for (let i = 0; i < 10; i++){
        arr[i] = [];

        for (let j = 0; j < 10; j++) {
            arr[i][j] = (i + 1) * (j + 1);
        }
    }

    console.log(arr)
}



//read array of objects
const readArrayOfObjects = () => {
    const arr = [];

    while (true){
        const obj = {};

        while (true){
            const key = prompt(`Введіть ключ:`);

            if(!key){
                break;
            }

            const value = prompt(`Введіть значення:`);
            obj[key] = value;
        }

        arr.push(obj);

        const more = confirm("Хочете продовжити введення об'єктів?");

        if (!more){
            break;
        }
    }

    return arr;
}



//rhomb



//DOM: multiply table
const multiplyTableDOM = () => {
    const table = document.createElement('table');

    for (let i = 0; i < 10; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < 10; j++) {
            const cell = document.createElement('td');
            const result = (i + 1) * (j + 1);

            cell.style.cssText = `
                padding: 10px;
                border: 1px solid black;
            `;

            row.appendChild(cell);
            cell.innerText = `${result}`;

            cell.addEventListener('mouseover', () => {
                for (let k = 0; k < 10; k++) {
                    table.rows[k].cells[j].style.backgroundColor = 'darkgrey';
                };

                row.style.backgroundColor = 'darkgrey';
                cell.style.backgroundColor = 'red';
            });

            cell.addEventListener('mouseout', () => {
                for (let k = 0; k < 10; k++) {
                    table.rows[k].cells[j].style.backgroundColor = '';
                };

                cell.style.backgroundColor = '';
                row.style.backgroundColor = '';
            });
        }

        table.appendChild(row);
    }

    document.body.appendChild(table);
};
