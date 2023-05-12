//Chat

function jsonPost(url, data)
{
    return new Promise((resolve, reject) => {
        var x = new XMLHttpRequest();
        x.onerror = () => reject(new Error('jsonPost failed'))
        //x.setRequestHeader('Content-Type', 'application/json');
        x.open("POST", url, true);
        x.send(JSON.stringify(data))

        x.onreadystatechange = () => {
            if (x.readyState == XMLHttpRequest.DONE && x.status == 200){
                resolve(JSON.parse(x.responseText))
            }
            else if (x.status != 200){
                reject(new Error('status is not 200'))
            }
        }
    })
}

//Stage 6

// function jsonPost(url, data) {
//     return fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data),
//     })
//         .then(res => {
//             if (!res.ok){
//                 throw new Error(`jsonPost problem. Status: ${res.status}`)
//             }
//             return res.json()
//         })
// }


////Stage 0

// const funcStage0 = async () => {
//     const res = await jsonPost("http://students.a-level.com.ua:10012",
//         { func: 'addMessage', nick: "Vlad", message: 'Hello world!' });
//     console.log(res)
// }
//
// funcStage0();



//Stage 1

// const messageInput = document.createElement('input');
// const nickInput = document.createElement('input');
// const sendButton = document.createElement('button');
//
// sendButton.innerText = 'Відправити';
//
// sendButton.addEventListener('click', async () => {
//     const res = await jsonPost("http://students.a-level.com.ua:10012", {
//         func: 'addMessage',
//         nick: nickInput.value,
//         message: messageInput.value,
//     });
//
//     const nextMessageId = res.nextMessageId;
//
//     messageInput.value = '';
//
//     console.log(res);
//     // console.log(nextMessageId);
// });
//
// document.body.appendChild(nickInput);
// document.body.appendChild(messageInput);
// document.body.appendChild(sendButton);



////Stage 2-4
// const container = document.createElement('div')
//
// let nextMessageId = 0; //Stage 3
//
// const showMessages = async () => {
//     ;
//
//     const res = await jsonPost('http://students.a-level.com.ua:10012', {
//         func: 'getMessages',
//         messageId: nextMessageId,
//     });
//
//     const messages = res.data.reverse();
//
//     nextMessageId = res.nextMessageId;//Stage 3
//
//     if(nextMessageId > 0){
//         container.innerHTML = '';
//     }
//
//     messages.forEach(message => {
//         const messageDiv = document.createElement('div');
//         const nickSpan = document.createElement('span');
//         const timeSpan = document.createElement('span');
//         const messageTextDiv = document.createElement('div');
//
//         nickSpan.innerText = `${message.nick}: `;
//         timeSpan.innerText = new Date(message.timestamp).toLocaleTimeString();
//         messageTextDiv.innerText = message.message;
//
//         nickSpan.style.cssText = `
//             color: purple;
//         `;
//
//         messageDiv.appendChild(nickSpan);
//         messageDiv.appendChild(timeSpan);
//         messageDiv.appendChild(messageTextDiv);
//
//         container.appendChild(messageDiv);
//     })
//
//
// }
// document.body.appendChild(container);
// showMessages();
//
// setInterval(showMessages, 5000);//Stage 4



//Stage 5

const messageInput = document.createElement('input');
const nickInput = document.createElement('input');
const sendButton = document.createElement('button');
const container = document.createElement('div')
const checkbox = document.createElement('input');

sendButton.innerText = 'Відправити';
checkbox.type = 'checkbox';

let nextMessageId = 0;

const sendMessage = async (nick, message) => {
    const res = await jsonPost("http://students.a-level.com.ua:10012", {
        func: 'addMessage',
        nick: nick,
        message: message,
    });

    return res;
};

const getMessages = async () => {
    const res = await jsonPost('http://students.a-level.com.ua:10012', {
        func: 'getMessages',
        messageId: nextMessageId,
    });

    const messages = res.data.reverse();

    nextMessageId = res.nextMessageId;

    if (nextMessageId > 0) {
        container.innerHTML = '';
    }

    messages.forEach((message) => {
        const messageDiv = document.createElement('div');
        const nickSpan = document.createElement('span');
        const timeSpan = document.createElement('span');
        const messageTextDiv = document.createElement('div');

        nickSpan.innerText = `${message.nick}: `;
        timeSpan.innerText = new Date(message.timestamp).toLocaleTimeString();
        messageTextDiv.innerText = message.message;

        nickSpan.style.cssText = `
      color: purple;
    `;

        messageDiv.appendChild(nickSpan);
        messageDiv.appendChild(timeSpan);
        messageDiv.appendChild(messageTextDiv);

        container.appendChild(messageDiv);
    });
};

const sendAndCheck = async () => {
    await sendMessage(nickInput.value, messageInput.value);
    await getMessages();
    messageInput.value = '';
};

const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const checkLoop = async () => {
    if (true){
        await getMessages();
        await delay(5000);
    }
};

checkbox.addEventListener('change', async () => {
    if (checkbox.checked) {
        await checkLoop();
    }
});
sendButton.addEventListener('click', sendAndCheck);

document.body.appendChild(nickInput);
document.body.appendChild(messageInput);
document.body.appendChild(sendButton);
document.body.appendChild(checkbox);
document.body.appendChild(container);
