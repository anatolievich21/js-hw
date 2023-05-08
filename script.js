//fetch basic

// const func1 = (DOM, JSON) => {
//     const table = document.createElement('table');
//     table.classList.add('json-table');
//
//     const tableHeaderRow = document.createElement('tr');
//     table.appendChild(tableHeaderRow);
//
//     for (const headerKey in JSON) {
//         const th = document.createElement('th');
//         th.innerText = headerKey;
//         tableHeaderRow.appendChild(th);
//     }
//
//     const tableBodyRow = document.createElement('tr');
//     table.appendChild(tableBodyRow);
//
//     for (const headerKey in JSON){
//         const td = document.createElement('td');
//         td.innerText = JSON[headerKey];
//         tableBodyRow.appendChild(td)
//     }
//
//     DOM.appendChild(table);
// }

const URL = 'https://swapi.dev/api/people/1/';

// fetch(URL)
//     .then(res => res.json())
//     .then(data => {
//         func1(document.body, data);
//     });



//fetch improved

const func2 = (DOM, data) => {
    const table = document.createElement('table');
    table.classList.add('json-table');

    const tableHeaderRow = document.createElement('tr');
    table.appendChild(tableHeaderRow);

    for (const headerKey in data) {
        const th = document.createElement('th');
        th.innerText = headerKey;
        tableHeaderRow.appendChild(th);
    }

    const tableBodyRow = document.createElement('tr');
    table.appendChild(tableBodyRow);

    for (const headerKey in data){
        const td = document.createElement('td');
        const value = data[headerKey];

        if (typeof value === 'string' && value.startsWith('https://swapi.dev/api/')) {
            const button = document.createElement('button');
            button.innerText = value;
            button.addEventListener('click', () => {
                fetch(value)
                    .then(res => res.json())
                    .then(newData => {
                        func2(td, newData);
                        button.disabled = true;
                    });
            });
            td.appendChild(button);
        } else if (Array.isArray(value) || typeof value === 'object') {
            func2(td, value);
        } else {
            td.innerText = value;
        }

        tableBodyRow.appendChild(td)
    }

    DOM.appendChild(table);
}

// fetch(URL)
//     .then(res => res.json())
//     .then(data => {
//         func2(document.body, data);
//     });



//race

// const myfetch = new Promise(resolve => {
//     setTimeout(() => {
//         resolve({ message: "Delay was faster" });
//     }, 1000); // підбираємо параметр delay
// });
//
// const apiFetch = fetch("https://swapi.dev/api/people/1/").then(res => res.json());
//
// Promise.race([myfetch, apiFetch])
//     .then(result => {
//         console.log(result);
//     })
//     .catch(error => {
//         console.error(error);
//     });



//Promisify: confirm

// function confirmPromise(text) {
//     return new Promise((resolve, reject) => {
//         const confirmed = confirm(text);
//         if (confirmed) {
//             resolve();
//         } else {
//             reject();
//         }
//     });
// }
//
// confirmPromise("Проміси це складно?")
//     .then(() => console.log("Не так вже й складно"))
//     .catch(() => console.log("Respect за посидючість і уважність"));



//Promisify: prompt

// function promptPromise(text) {
//     return new Promise((resolve, reject) => {
//         const result = prompt(text);
//         if (result !== null) {
//             resolve(result);
//         } else {
//             reject();
//         }
//     });
// }
//
// promptPromise("Як тебе звуть?").then(
//     (name) => console.log(`Тебе звуть ${name}`),
//     () => console.log("Ну навіщо морозитися, нормально ж спілкувалися")
// );



//Promisify: LoginForm

////Password

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

////LoginForm
function LoginForm(parent) {
    return new Promise((resolve, reject) => {
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
        };

        usernameInput.oninput = validateForm;
        password.onChange = validateForm;

        form.onsubmit = (e) => {
            e.preventDefault();
            resolve({ login: usernameInput.value, password: password.getValue() });
        };
    });
}

const loginFormPromise = LoginForm(document.body);

loginFormPromise.then(({ login, password }) =>
    console.log(`Ви ввели ${login} та ${password}`)
);



