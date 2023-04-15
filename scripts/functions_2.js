//Arrow to Functions
//***Filter Lexics
let str = 'привіт бляха муха як справи? пляшка'
const arr = ['бляха', 'муха', "пляшка", "шабля"];
function filterLexics (str, arr) {
   return  str.split(' ').filter(el => !arr.includes(el)).join(' ');
}




//createPerson
function createPerson (name, surname) {
    const person = {
        name: name,
        surname: surname,

        getFullName: function () {
            if (!this.fatherName){
                return `${this.name} ${this.surname}`;
            }

            return `${this.name} ${this.fatherName} ${this.surname}`;
        },
    }
    return person
}



//createPersonClosure
function createPersonClosure (name, surname) {
    let age = 0;
    let fatherName = '';

    function getName () {
        return name;
    };
    function getSurname () {
        return surname;
    };
    function getFatherName () {
        return fatherName;
    };
    function getAge () {
        return age;
    };
    function getFullName () {
        return `${surname} ${name} ${fatherName}`;
    };
    function setName(newName) {
        if (typeof newName === 'string' && newName[0] === newName[0].toUpperCase()){
            name = newName;
        }

        return name;
    };
    function setSurname(newSurname) {
        if (typeof newSurname === 'string' && newSurname[0] === newSurname[0].toUpperCase()){
            surname = newSurname;
        }

        return surname;
    };
    function setFatherName(newFatherName) {
        if (typeof newFatherName === 'string' && newFatherName[0] === newFatherName[0].toUpperCase()){
            fatherName = newFatherName;
        }

        return fatherName;
    };
    function setAge(newAge) {
        if (typeof newAge === 'number' && newAge >= 0 && newAge <= 100){
            age = newAge;
        }

        return age
    };
    function setFullName(newFullName) {
        const arr = newFullName.split(' ');

        if (arr.length === 3){
            surname = setSurname(arr[0]);
            name = setName(arr[1]);
            fatherName = setFatherName(arr[2]);
        }

        return `${surname} ${name} ${fatherName}`;
    };

    return {
        setName,
        setSurname,
        setFatherName,
        setAge,
        setFullName,
        getName,
        getSurname,
        getFatherName,
        getAge,
        getFullName
    };
}



//createPersonClosureDestruct
function createPersonClosureDestruct ({name = '', surname = '', age = 0, fatherName = ''}) {
    function getName () {
        return name;
    };
    function getSurname () {
        return surname;
    };
    function getFatherName () {
        return fatherName;
    };
    function getAge () {
        return age;
    };
    function getFullName () {
        return `${surname} ${name} ${fatherName}`;
    };
    function setName(newName) {
        if (typeof newName === 'string' && newName[0] === newName[0].toUpperCase()){
            name = newName;
        }

        return name;
    };
    function setSurname(newSurname) {
        if (typeof newSurname === 'string' && newSurname[0] === newSurname[0].toUpperCase()){
            surname = newSurname;
        }

        return surname;
    };
    function setFatherName(newFatherName) {
        if (typeof newFatherName === 'string' && newFatherName[0] === newFatherName[0].toUpperCase()){
            fatherName = newFatherName;
        }

        return fatherName;
    };
    function setAge(newAge) {
        if (typeof newAge === 'number' && newAge >= 0 && newAge <= 100){
            age = newAge;
        }

        return age
    };
    function setFullName(newFullName) {
        const arr = newFullName.split(' ');

        if (arr.length === 3){
            surname = setSurname(arr[0]);
            name = setName(arr[1]);
            fatherName = setFatherName(arr[2]);
        }

        return `${surname} ${name} ${fatherName}`;
    };

    return {
        setName,
        setSurname,
        setFatherName,
        setAge,
        setFullName,
        getName,
        getSurname,
        getFatherName,
        getAge,
        getFullName
    };
}



//isSorted
function isSorted (...arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (isNaN(arr[i]) || isNaN(arr[i + 1]) || typeof arr[i] !== 'number' || typeof arr[i + 1] !== 'number' || arr[i] >= arr[i + 1]) {
            return false;
        }
    }

    return true;
};



//Test isSorted
function arrayFill () {
    const numbers = [];

    while (true) {
        const input = prompt('Введіть число:');

        if (input === null) {
            break;
        }

        const number = Number(input);

        if (isNaN(number)) {
            numbers.push(NaN);
        }
        else{
            numbers.push(number);
        }

    }

    function isSorted (arr) {
        if (arr.length === 0){
            return false;
        };

        for (let i = 0; i < arr.length - 1; i++) {
            if (isNaN(arr[i]) || isNaN(arr[i + 1]) || typeof arr[i] !== 'number' || typeof arr[i + 1] !== 'number' || arr[i] >= arr[i + 1]) {
                return false;
            }
        };

        return true;
    };

    console.log(numbers)
    return isSorted(numbers);
}