//
function promiseReducer(state={}, {type, promiseName, status, payload, error}){
    if (type === 'PROMISE'){
        return {
            ...state,
            [promiseName]: {status, payload, error},
        };
    }

    return state;
}

const actionPending   = (promiseName)      => ({type: 'PROMISE', promiseName, status: 'PENDING'})
const actionFulfilled = (promiseName, payload) => ({type: 'PROMISE', promiseName, status: 'FULFILLED', payload})
const actionRejected  = (promiseName, error)   => ({type: 'PROMISE', promiseName, status: 'REJECTED',  error})
const actionPromise = (promiseName, promise) =>
    async dispatch => {
        dispatch(actionPending(promiseName)) //сигналізуємо redux, що проміс почався
        try{
            const payload = await promise //очікуємо промісу
            dispatch(actionFulfilled(promiseName, payload)) //сигналізуємо redux, що проміс успішно виконано
            return payload //у місці запуску store.dispatch з цим thunk можна також отримати результат промісу
        }
        catch (error){
            dispatch(actionRejected(promiseName, error)) //у разі помилки - сигналізуємо redux, що проміс не склався
        }
    }

function createStore(reducer){
    let state       = reducer(undefined, {}) //стартова ініціалізація стану, запуск редьюсера зі state === undefined
    let cbs         = []                     //масив передплатників

    const getState  = () => state            //функція, що повертає змінну із замикання
    const subscribe = cb => (cbs.push(cb),   //запам'ятовуємо передплатників у масиві
        () => cbs = cbs.filter(c => c !== cb)) //повертаємо функцію unsubscribe, яка видаляє передплатника зі списку

    const dispatch  = action => {
        if (typeof action === 'function'){ //якщо action – не об'єкт, а функція
            return action(dispatch, getState) //запускаємо цю функцію і даємо їй dispatch і getState для роботи
        }
        const newState = reducer(state, action) //пробуємо запустити редьюсер
        if (newState !== state){ //перевіряємо, чи зміг ред'юсер обробити action
            state = newState //якщо зміг, то оновлюємо state
            for (let cb of cbs)  cb() //та запускаємо передплатників
        }
    }

    return {
        getState, //додавання функції getState в результуючий об'єкт
        dispatch,
        subscribe //додавання subscribe в об'єкт
    }
}

const store = createStore(promiseReducer)

store.subscribe(() => console.log(store.getState())) //має запускатися 6 разів

const delay = (ms) => new Promise((ok) => setTimeout(ok, ms));

store.dispatch(actionPromise('delay', delay(1000)))
store.dispatch(actionPromise('luke', fetch("https://swapi.dev/api/people/1").then(res => res.json())))
store.dispatch(actionPromise('tatooine', fetch("https://swapi.dev/api/planets/1").then(res => res.json())))

//за підсумком повинен вийти якийсь такий state:
/*
{
     delay: {status: 'FULFILLED', payload: 1000, error: undefined},
     luke: {status: 'FULFILLED', payload: { ..... тралівали про люка}, error: undefined},
     tatooine: {status: 'FULFILLED', payload: { ..... тралювали про планету татуїн}, error: undefined},
}
*/