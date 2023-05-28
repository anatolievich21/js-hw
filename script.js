function createStore(reducer){
    let state       = reducer(undefined, {})
    let cbs         = []

    const getState  = () => state
    const subscribe = cb => (cbs.push(cb),
        () => cbs = cbs.filter(c => c !== cb))
    const dispatch  = action => {
        if (typeof action === 'function'){
            return action(dispatch, getState)
        }
        const newState = reducer(state, action)
        if (newState !== state){
            state = newState
            for (let cb of cbs)  cb()
        }
    }

    return {
        getState,
        dispatch,
        subscribe
    }
}


////////////////
//promiseReducer
////////////////
function promiseReducer(state= {}, {type, promiseName, status, payload, error}){
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
        dispatch(actionPending(promiseName))
        try{
            const payload = await promise
            dispatch(actionFulfilled(promiseName, payload))
            return payload
        }
        catch (error){
            dispatch(actionRejected(promiseName, error))
        }
    }

// const store = createStore(promiseReducer)

// store.subscribe(() => console.log(store.getState())) //має запускатися 6 разів
//
// const delay = (ms) => new Promise((ok) => setTimeout(ok, ms));
//
// store.dispatch(actionPromise('delay', delay(1000)))
// store.dispatch(actionPromise('luke', fetch("https://swapi.dev/api/people/1").then(res => res.json())))
// store.dispatch(actionPromise('tatooine', fetch("https://swapi.dev/api/planets/1").then(res => res.json())))


////////////////
//authReducer
////////////////
function jwtDecode (token) {
    try {
        const arr = token.split('.')
        const encodedData = arr[1];
        const decodedData = atob(encodedData);
        return JSON.parse(decodedData);

    } catch (error){
        return undefined;
    }
}

function authReducer (state = {}, {type, token}) {
    if (type === 'AUTH_LOGIN'){
        if (token){
            const decodedData = jwtDecode(token);

            localStorage.authToken = token;

            if (decodedData){
                return {
                    ...state,
                    token,
                    payload: decodedData,
                }
            }
        }

        return {};
    }
    if (type === 'AUTH_LOGOUT'){
        return {};
    }

    return state
}

const actionAuthLogin  = (token) => ({type: 'AUTH_LOGIN', token})
const actionAuthLogout = () => ({type: 'AUTH_LOGOUT'})


// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2Mzc3ZTEzM2I3NGUxZjVmMmVjMWMxMjUiLCJsb2dpbiI6InRlc3Q1IiwiYWNsIjpbIjYzNzdlMTMzYjc0ZTFmNWYyZWMxYzEyNSIsInVzZXIiXX0sImlhdCI6MTY2ODgxMjQ1OH0.t1eQlRwkcP7v9JxUPMo3dcGKprH-uy8ujukNI7xE3A0"
//
// const store = createStore(authReducer)
// store.subscribe(() => console.log(store.getState()))
//
// store.dispatch(actionAuthLogin(token))
// /*{
//     token: "eyJhbGc.....",
//     payload: {
//       "sub": {
//         "id": "6377e133b74e1f5f2ec1c125",
//         "login": "test5",
//         "acl": [
//           "6377e133b74e1f5f2ec1c125",
//           "user"
//         ]
//       },
//       "iat": 1668812458
//     }
// }*/
// store.dispatch(actionAuthLogout()) // {}


////////////////
//cartReducer
////////////////
function cartReducer(state = {}, {type, count, good}) {

    if (type === 'CART_ADD') {
        const {_id} = good;

        if (state[_id]) {

            return {
                ...state,
                [_id]: {...state[_id], count: state[_id].count + count},
            }
        }

        return {
            ...state,
            [_id]: {count, good},
        }
    }

    if (type === 'CART_SUB') {
        const {_id} = good;
        if (state[_id]) {
            const updatedCount = state[_id].count - count;

            if (updatedCount <= 0) {
                const updatedState = {...state};
                delete updatedState[_id];

                return updatedState;
            }

            return {
                ...state,
                [_id]: {...state[_id], count: updatedCount},
            }
        }
    }

    if (type === 'CART_DEL') {
        const {_id} = good;
        if (state[_id]) {
            const updatedState = {...state};
            delete updatedState[_id];

            return updatedState;
        }
    }

    if (type === 'CART_SET') {
        const {_id} = good;
        if (count <= 0) {
            const updatedState = {...state};
            delete updatedState[_id];

            return updatedState;
        }

        if (state[_id]) {
            return {
                ...state,
                [_id]: {...state[_id], count},
            }
        }

        return {
            ...state,
            [_id]: {count, good},
        }
    }

    if (type === 'CART_CLEAR') {
        return {};
    }

    return state
}

const actionCartAdd = (good, count=1) => ({type: 'CART_ADD', count, good})
const actionCartSub = (good, count=1) => ({type: 'CART_SUB', count, good})
const actionCartDel = (good) => ({type: 'CART_DEL', good})
const actionCartSet = (good, count=1) => ({type: 'CART_SET', count, good})
const actionCartClear = () => ({type: 'CART_CLEAR'})


// const store = createStore(cartReducer)
//
// store.subscribe(() => console.log(store.getState())) //
//
// console.log(store.getState()) //{}
//
// store.dispatch(actionCartAdd({_id: 'пиво', price: 50}))
// // {пиво: {good: {_id: 'пиво', price: 50}, count: 1}}
// store.dispatch(actionCartAdd({_id: 'чіпси', price: 75}))
// // {
// // пиво: {good: {_id: 'пиво', price: 50}, count: 1},
// // чіпси: {good: {_id: 'чіпси', price: 75}, count: 1},
// //}
// store.dispatch(actionCartAdd({_id: 'пиво', price: 50}, 5))
// // {
// // пиво: {good: {_id: 'пиво', price: 50}, count: 6},
// // чіпси: {good: {_id: 'чіпси', price: 75}, count: 1},
// //}
// store.dispatch(actionCartSet({_id: 'чіпси', price: 75}, 2))
// // {
// // пиво: {good: {_id: 'пиво', price: 50}, count: 6},
// // чіпси: {good: {_id: 'чіпси', price: 75}, count: 2},
// //}
//
// store.dispatch(actionCartSub({_id: 'пиво', price: 50}, 4))
// // {
// // пиво: {good: {_id: 'пиво', price: 50}, count: 2},
// // чіпси: {good: {_id: 'чіпси', price: 75}, count: 2},
// //}
//
// store.dispatch(actionCartDel({_id: 'чіпси', price: 75}))
// // {
// // пиво: {good: {_id: 'пиво', price: 50}, count: 2},
// //}
//
// store.dispatch(actionCartClear()) // {}


////////////////
//localStoredReducer
////////////////
function localStoredReducer(originalReducer, localStorageKey) {
    let isFirstRun = true;

    return function wrapper(state, action) {
        if (isFirstRun) {
            isFirstRun = false;
            const storedState = JSON.parse(localStorage.getItem(localStorageKey));

            if (storedState) {
                return storedState;
            }
        }

        const newState = originalReducer(state, action);
        localStorage.setItem(localStorageKey, JSON.stringify(newState));
        return newState;
    };
}


////////////////
//GraphQL requests
////////////////
shopURL = 'http://shop-roles.node.ed.asmer.org.ua/graphql';

function getGQL (url = shopURL) {
    return async function gql (query, variables = {}){
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }

        if (localStorage.authToken) {
            headers.Authorization = "Bearer " + localStorage.authToken;
        }

        const request = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                query: query,
                variables: variables,
            }),
        });

        const data = await request.json();

        if (data.errors) {
            throw new Error(JSON.stringify(data.errors))
        }

        return Object.values(data)[0];
    }
}

gql = getGQL();


////////////////
//Запит на перелiк кореневих категорій
////////////////
const gqlRootCats = () =>
    gql(`query rootCats ($q: String){
    CategoryFind(query: $q){
        _id name
    }
}`, {
        "q": "[{\"parent\" : null}]"
    })

const actionRootCats = () =>
    actionPromise('rootCats', gqlRootCats())


////////////////
//Запит для отримання однієї категорії з товарами та картинками
////////////////
const gqlRootCatOne = (_id) =>
    gql(`query oneCatWithGoodsImgs($q: String){
   CategoryFindOne (query: $q){
    _id
    name
    image{
      url
    }
    goods{
      _id
      name
      images{
        url
      }
    }
  }
}`, {
        "q": JSON.stringify([{_id : _id}])
    })

const actionRootCatOne = (_id= "6262ca7dbf8b206433f5b3d1") =>
    actionPromise('rootCatOne', gqlRootCatOne(_id));


////////////////
//Запит на отримання товару з описом та картинками
////////////////
const gqlGoodOne = (_id) =>
    gql(`query goodFindOne ($q: String) {
  GoodFindOne(query: $q){
    _id
    images{
      url
    }
    name
    price
    description
  }
}`, {
        "q": JSON.stringify([{_id : _id}])
    });

const actionGoodOne = (_id = "62d3099ab74e1f5f2ec1a125") =>
    actionPromise('goodOne', gqlGoodOne(_id));


////////////////
//Запит на реєстрацію
////////////////
const gqlRegistration = (log, pass) =>
    gql(`mutation reg ($log: String, $pass: String){
  UserUpsert(user:{
    login:$log, password:$pass
  }){
    _id
    login
  }
}`, {
        "log": log,
        "pass": pass
    })

const actionRegistration = (log, pass) =>
    actionPromise('register', gqlRegistration(log, pass));


////////////////
//Запит на логін
////////////////
const gqlLogin = (log, pass) =>
    gql(`query login ($log:String, $pass:String) {
  login (login: $log, password: $pass)
}`, {
        "log": log,
        "pass": pass
    })

const actionLogin = (log, pass) =>
    actionPromise('login', gqlLogin(log, pass));


////////////////
//Запит історії замовлень
////////////////
const gqlHistory = () =>
    gql(`query history ($q:String) {
  OrderFind(query: $q){
    _id
    createdAt
    total
  }
}`,{
        "q": "[{}]"
    })

const actionHistory = () =>
    actionPromise('history', gqlHistory())


////////////////
//Запит оформлення замовлення
////////////////
const gqlOrder = (count, _id) =>
    gql(`mutation newOrder($goods: [OrderGoodInput]) {
      OrderUpsert(order: {orderGoods: $goods}) {
        _id 
        createdAt 
        total
      }
    }`,{
        "goods": [{"count": count, "good": { "_id": _id}}]
    })

const actionOrder = (count, _id) =>
    actionPromise('order', gqlOrder(count, _id))

const store = createStore(promiseReducer);
store.subscribe(() => console.log(store.getState()))

store.dispatch(actionOrder(4, '62d3099ab74e1f5f2ec1a125'));


