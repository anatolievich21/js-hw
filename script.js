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



