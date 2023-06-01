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



/////////////////////////////////////////////////////////////
//combineReducer
/////////////////////////////////////////////////////////////
function combineReducers(reducers) {
    function totalReducer(totalState = {}, action) {
        const newTotalState = {}
        for (const [reducerName, childReducer] of Object.entries(reducers)) {
            const newState = childReducer(totalState[reducerName], action)
            if (newState !== totalState[reducerName]) {
                newTotalState[reducerName] = newState
            }
        }

        if (Object.values(newTotalState).length) {
            return { ...totalState, ...newTotalState }
        }
        return totalState
    }
    return totalReducer
}



/////////////////////////////////////////////////////////////
//promiseReducer
/////////////////////////////////////////////////////////////
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



/////////////////////////////////////////////////////////////
//cartReducer
/////////////////////////////////////////////////////////////
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



/////////////////////////////////////////////////////////////
//localStoredReducer
/////////////////////////////////////////////////////////////
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



/////////////////////////////////////////////////////////////
//GraphQL requests
/////////////////////////////////////////////////////////////
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



/////////////////////////////////////////////////////////////
//Запит на перелiк кореневих категорій
/////////////////////////////////////////////////////////////
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



/////////////////////////////////////////////////////////////
//Запит для отримання однієї категорії з товарами та картинками
/////////////////////////////////////////////////////////////
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
      price
      images{
        url
      }
    }
  }
}`, {
        "q": JSON.stringify([{_id : _id}])
    })

const actionRootCatOne = (_id) =>
    actionPromise('rootCatOne', gqlRootCatOne(_id));



/////////////////////////////////////////////////////////////
//Запит на отримання товару з описом та картинками
/////////////////////////////////////////////////////////////
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

const actionGoodOne = (_id) =>
    actionPromise('goodOne', gqlGoodOne(_id));



/////////////////////////////////////////////////////////////
//Запит на реєстрацію
/////////////////////////////////////////////////////////////
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



/////////////////////////////////////////////////////////////
//Запит на логін
/////////////////////////////////////////////////////////////
const gqlLogin = (log, pass) =>
    gql(`query login ($log:String, $pass:String) {
  login (login: $log, password: $pass)
}`, {
        "log": log,
        "pass": pass
    })

const actionLogin = (log, pass) =>
    actionPromise('login', gqlLogin(log, pass));



/////////////////////////////////////////////////////////////
//Запит історії замовлень
/////////////////////////////////////////////////////////////
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



/////////////////////////////////////////////////////////////
//Запит оформлення замовлення
/////////////////////////////////////////////////////////////
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



/////////////////////////////////////////////////////////////
//authReducer
/////////////////////////////////////////////////////////////
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
        delete localStorage.authToken;
        return {};
    }

    return state
}

const actionAuthLogin  = (token) => ({type: 'AUTH_LOGIN', token})
const actionAuthLogout = () => ({type: 'AUTH_LOGOUT'})


/////////////////////////////////////////////////////////////
//THUNK FullLogin && FullRegistration
/////////////////////////////////////////////////////////////
const actionFullLogin = (login, password) =>
    async dispatch => {
        const token = await dispatch(actionLogin(login, password))

        if (token && typeof token === 'string') {
            await dispatch(actionAuthLogin(token));
        }
    };

// const store = createStore(authReducer);
// store.subscribe(() => console.log(store.getState()));
// store.dispatch(actionFullLogin("vlad21", "test"))

// const actionFullRegistration = (login, password) =>
//     async dispatch => {
//     try {
//
//     }
//         const token = await dispatch(actionLogin(login, password))
//
//         if (token && typeof token === 'string') {
//             await dispatch(actionAuthLogin(token));
//         }
//     };



/////////////////////////////////////////////////////////////
//REDUCERS COMBINE
/////////////////////////////////////////////////////////////
const reducers = {
    promise: promiseReducer,
    auth: authReducer,
    cart: cartReducer,
};
// const store = createStore(combineReducers(reducers));


/////////////////////////////////////////////////////////////
////////////////////////////DOM//////////////////////////////
/////////////////////////////////////////////////////////////
//ASIDE
/////////////////////////////////////////////////////////////
const categoryList = document.getElementById('category-list');

const  store = createStore(promiseReducer)
store.dispatch(actionRootCats())
store.subscribe(() => {
    const rootCats = store.getState().rootCats;
    const rootCatsCategory = rootCats.payload.CategoryFind;

    categoryList.innerHTML = '';
    for (const cat of rootCatsCategory) {
        const li = document.createElement('li')
        const a = document.createElement('a');
        a.innerText = cat.name;
        a.href = `#/category/${cat._id}`;
        li.appendChild(a)
        categoryList.appendChild(li);
    }
})



/////////////////////////////////////////////////////////////
//oneCategories
/////////////////////////////////////////////////////////////
const content = document.getElementById('content');
const contentTitle = document.getElementById('content-title');

store.subscribe(() => {
    const rootCatOne = store.getState().rootCatOne;

    if (rootCatOne && rootCatOne.error) {
        console.log(rootCatOne.error);
    }
    if (
        rootCatOne &&
        rootCatOne.status === "FULFILLED"
    ) {
        const rootCatOneCategory = rootCatOne.payload.CategoryFindOne;

        content.innerHTML = '';

        contentTitle.innerText = rootCatOneCategory.name;
        for (let good of rootCatOneCategory.goods) {
            const cardsContainer = document.createElement("a");
            cardsContainer.href = `#/good/${good._id}`;
            const goodDiv = document.createElement("div");
            cardsContainer.classList.add("good-card");

            const goodPhoto = document.createElement("img");
            const imageURL = `http://shop-roles.node.ed.asmer.org.ua/` + good.images[0].url;
            goodPhoto.src = imageURL;
            goodDiv.appendChild(goodPhoto);

            const goodName = document.createElement("h5");
            goodName.innerText = good.name;
            goodDiv.appendChild(goodName);

            const goodPrice = document.createElement("p");
            goodPrice.innerText = `Ціна: ${good.price} грн`;
            goodDiv.appendChild(goodPrice);

            const addToCartBtn = document.createElement('button');
            addToCartBtn.innerText = 'Додати до кошика';
            addToCartBtn.classList.add('add-to-cart-btn');
            goodDiv.appendChild(addToCartBtn);

            cardsContainer.appendChild(goodDiv);
            content.appendChild(cardsContainer);
        }
    }
});


/////////////////////////////////////////////////////////////
//oneGood
/////////////////////////////////////////////////////////////
store.subscribe(() => {
    const goodOne  = store.getState().goodOne;

    if (goodOne && goodOne.error) {
        console.log(goodOne.error);
    }
    if (
        goodOne &&
        goodOne.status === "FULFILLED"
    ) {
        const goodOneData = goodOne.payload.GoodFindOne;
        content.innerHTML = '';

        const goodContainer = document.createElement("div");
        goodContainer.classList.add("good-description");

        for (let img of goodOneData.images) {
            let goodPhoto = document.createElement("img");
            goodPhoto.src = `http://shop-roles.node.ed.asmer.org.ua/${img.url}`;
            goodContainer.appendChild(goodPhoto);
        }

        const goodName = document.createElement("h2");
        goodName.innerText = goodOneData.name;
        goodContainer.appendChild(goodName);

        const goodDescription = document.createElement("div");
        goodDescription.innerText = goodOneData.description;
        goodContainer.appendChild(goodDescription);

        const test = document.createElement("div");
        test.classList.add('test');
        goodContainer.appendChild(test);

        const goodPrice = document.createElement("p");
        goodPrice.innerText = `Ціна: ${goodOneData.price} грн`;
        test.appendChild(goodPrice);

        const addToCartBtn = document.createElement('a');
        addToCartBtn.innerText = 'Додати до кошика';
        addToCartBtn.classList.add('add-to-cart-btn-in-good');
        addToCartBtn.href  = `#/good/${goodOneData._id}`;
        test.appendChild(addToCartBtn);

        content.appendChild(goodContainer);

        // addToCartBtn.onclick = () => {
        //     store.dispatch(actionCartAdd(goodOneData));
        // };

    }



});


/////////////////////////////////////////////////////////////
//onhashchange
/////////////////////////////////////////////////////////////
onhashchange = () => {
    console.log(window.location.hash);
    const name = window.location.hash.split("/")[1];
    const _id = window.location.hash.split("/")[2];
    if (name === "category") {
        store.dispatch(actionRootCatOne(_id));
    }
    if (name === "good") {
        store.dispatch(actionGoodOne(_id));
    }
    if (name === "history") {
    }
    if (name === "register") {
    }
    if (name === "login") {
    }
    if (name === "cart") {
    }
};




