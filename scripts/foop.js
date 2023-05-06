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

function Password(parent, open){
    const inputPassword = document.createElement('input');
    inputPassword.type = 'password';
    inputPassword.placeholder = 'password';
    inputPassword.oninput = () => this.setValue(inputPassword.value);
    inputPassword.style.cssText = `
        display: block;
        max-width: 300px;
    `;
    parent.appendChild(inputPassword);

    const checkVisible = document.createElement('input');
    checkVisible.type = 'checkbox';
    checkVisible.oninput = () => this.setOpen(checkVisible.checked);
    checkVisible.style.cssText = `
        display: block;
        max-width: 300px;
    `;
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
    this.setStyle('2px solid grey');
}



//LoginForm

function LoginForm(parent) {
    const form = document.createElement('form');
    form.style.display = 'flex';
    form.style.flexDirection = 'column';
    parent.appendChild(form);

    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.placeholder = 'username';
    usernameInput.style.cssText = `
        display: block;
        max-width: 300px;
        border: 2px solid grey;
    `;
    form.appendChild(usernameInput);

    const password = new Password(form, false);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.disabled = true;
    submitButton.style.cssText = `
        display: block;
        max-width: 300px;
        border: 2px solid grey;
    `;
    submitButton.textContent = 'Log In';
    form.appendChild(submitButton);

    const validateForm = () => {
        submitButton.disabled = usernameInput.value === '' || password.getValue() === '';
    }

    usernameInput.oninput = validateForm;
    password.onChange = validateForm;

    form.onsubmit = (e) => {
        e.preventDefault();
        console.log(`Login: ${usernameInput.value}; Password: ${password.getValue()}`);
    }
}

const loginForm = new LoginForm(document.body);



//LoginForm Constructor

// function LoginForm(parent, open) {
//   const inputLogin = document.createElement("input");
//   inputLogin.placeholder = "Login";
//   inputLogin.oninput = () => {
//     this.setLogin(inputLogin.value);
//     this.disabledButton();
//   };
//   parent.appendChild(inputLogin);

//   const inputPass = new Password(parent, open);
//   inputPass.onChange = () => {
//     this.disabledButton();
//   };

//   const submitButton = document.createElement("input");
//   submitButton.type = "submit";
//   submitButton.value = "Відправити";
//   submitButton.onclick = () => {
//     console.log(
//       `Sending login and password: ${this.getLogin()}, ${inputPass.getValue()}`
//     );
//     this.setLogin("");
//     inputPass.setValue("");
//     this.disabledButton();
//   };
//   container.appendChild(submitButton);

//   this.getLogin = () => inputLogin.value;

//   this.setLogin = (newLogin) => {
//     inputLogin.value = newLogin;
//   };

//   this.disabledButton = () => {
//     if (this.getLogin().length < 1 || inputPass.getValue().length < 1) {
//       submitButton.disabled = true;
//     } else {
//       submitButton.disabled = false;
//     }
//   };
//   this.disabledButton();
// }

// const container = document.getElementById("loginForm");
// const formnew = new LoginForm(container, false);



//Password Verify

// const passwordContainer = document.getElementById("password-container");

// const password1 = new Password(passwordContainer, false);
// const password2 = new Password(passwordContainer, false);

// password1.onChange = (value) => {
//   if (value !== password2.getValue()) {
//     password2.setStyle("2px solid red");
//   } else {
//     password2.setStyle("");
//   }
// };

// password1.onOpenChange = (open) => {
//   if (open) {
//     if (password2.getOpen() === true) {
//       password2.setOpen(false);
//     }
//   } else {
//     if (password2.getOpen() === false) {
//       password2.setOpen(true);
//     }
//   }
// };

// password2.onChange = (value) => {
//   if (value !== password1.getValue()) {
//     password2.setStyle("2px solid red");
//   } else {
//     password2.setStyle("");
//   }
// };

// password2.onOpenChange = (open) => {
//   if (open) {
//     if (password1.getOpen() === true) {
//       password1.setOpen(false);
//     }
//   } else {
//     if (password1.getOpen() === false) {
//       password1.setOpen(true);
//     }
//   }
// };