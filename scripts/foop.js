//Person Constructor

// function Person(name, surname){
//     this.name = name;
//     this.surname = surname;
//     this.getFullName = () => {
//         if(this.fatherName){
//             return this.name + ' ' + this.fatherName + ' ' + this.surname;
//         } else {
//             return this.name + ' ' + this.surname;
//         }
//     };
// }



//Person Prototype

function Person(name, surname){
    this.name = name;
    this.surname = surname;

    Person.prototype.getFullName = function () {
        if(this.fatherName){
            return this.name + ' ' + this.fatherName + ' ' + this.surname;
        } else {
            return this.name + ' ' + this.surname;
        }
    };
}



//Store



//Password

function Password(parent, open) {
    const inputPassword = document.createElement('input');
    inputPassword.type = 'password'
    inputPassword.placeholder = 'password';
    inputPassword.oninput = () => this.setValue(inputPassword.value);
    parent.appendChild(inputPassword);

    const checkVisible = document.createElement('input');
    checkVisible.type = 'checkbox';
    checkVisible.oninput = () => this.setOpen(checkVisible.checked);
    parent.appendChild(checkVisible);

    this.getValue = () => inputPassword.value;

    this.setValue = (newValue) => {
        inputPassword.value = newValue;

        if (typeof this.onChange === 'function') {
            this.onChange(inputPassword.value);
        }
    };

    this.getOpen = () => open;

    this.setOpen = (newOpen) => {
        open = newOpen;

        if (open) {
            inputPassword.type = 'text';
            checkVisible.checked = true;
        } else {
            inputPassword.type = 'password';
            checkVisible.checked = false;
        }

        if (typeof this.onOpenChange === 'function') {
            this.onOpenChange(open);
        }
    };

    this.setStyle = (newStyle) => {
        inputPassword.style.border = newStyle;
    };

    this.setOpen(open);
    this.setStyle('2px solid purple');
}

// let p = new Password(document.body, true)
// p.onChange = data => console.log(data)  //буде корисно при виконаннi LoginForm та Password Verify
// p.onOpenChange = open => console.log(open)
// p.setValue('qwerty')
// console.log(p.getValue())
// p.setOpen(false)
// console.log(p.getOpen())