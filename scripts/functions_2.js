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
        if (typeof newName === 'string'){
            name = newName.charAt(0).toUpperCase() + newName.slice(1);
        }

        return name;
    };
    // function setName(newName) {
    //     if (typeof newName === 'string'){
    //         name = newName.charAt(0).toUpperCase() + newName.slice(1);
    //     }
    //
    //     return name;
    // };
    function setSurname(newSurname) {
        if (typeof newSurname === 'string' && newSurname[0] === newSurname.charAt(0).toUpperCase()){
            surname = newSurname;
        }

        return surname;
    };
    function setFatherName(newFatherName) {
        if (typeof newFatherName === 'string' && newFatherName[0] === newFatherName.charAt(0).toUpperCase()){
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
        if (typeof newName === 'string' && newName[0] === newName.charAt(0).toUpperCase()){
            name = newName;
        }

        return name;
    };
    function setSurname(newSurname) {
        if (typeof newSurname === 'string' && newSurname[0] === newSurname.charAt(0).toUpperCase()){
            surname = newSurname;
        }

        return surname;
    };
    function setFatherName(newFatherName) {
        if (typeof newFatherName === 'string' && newFatherName[0] === newFatherName.charAt(0).toUpperCase()){
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



//personForm
function personForm (parent, person){
    const nameInput = document.createElement('input');
    const surnameInput = document.createElement('input');
    const fatherNameInput = document.createElement('input');
    const ageInput = document.createElement('input');
    const fullNameInput = document.createElement('input');

    nameInput.value = person.getName();
    surnameInput.value = person.getSurname();
    fatherNameInput.value = person.getFatherName();
    ageInput.value = person.getAge();
    fullNameInput.value = person.getFullName();

    parent.appendChild(nameInput);
    parent.appendChild(surnameInput);
    parent.appendChild(fatherNameInput);
    parent.appendChild(ageInput);
    parent.appendChild(fullNameInput);

    nameInput.oninput = (event) => {
        const newName = event.target.value;
        const updatedName = person.setName(newName);
        event.target.value = updatedName;
        fullNameInput.value = person.getFullName();
    };

    surnameInput.oninput = (event) => {
        const newSurname = event.target.value;
        const updatedSurname = person.setSurname(newSurname);
        event.target.value = updatedSurname;
        fullNameInput.value = person.getFullName();
    };

    fatherNameInput.oninput = (event) => {
        const newFatherName = event.target.value;
        const updatedFatherName = person.setFatherName(newFatherName);
        event.target.value = updatedFatherName;
        fullNameInput.value = person.getFullName();
    };

    ageInput.oninput = (event) => {
        const newAge = Number(event.target.value);
        const updatedAge = person.setAge(newAge);
        event.target.value = updatedAge;
    };

    fullNameInput.oninput = (event) => {
        const newFullName = event.target.value;
        const updatedFullName = person.setFullName(newFullName);
        event.target.value = updatedFullName;
        nameInput.value = person.getName();
        surnameInput.value = person.getSurname();
        fatherNameInput.value = person.getFatherName();
    };

}



// const div = document.createElement('div')
// document.body.appendChild(div)
// const b = createPersonClosure("Ганна", "Іванова")
// b.setAge(15)
// b.setFullName("Петрова Ганна Миколаївна")
