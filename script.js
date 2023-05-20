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



//promiseReducer

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
//
// store.subscribe(() => console.log(store.getState())) //має запускатися 6 разів
//
// const delay = (ms) => new Promise((ok) => setTimeout(ok, ms));
//
// store.dispatch(actionPromise('delay', delay(1000)))
// store.dispatch(actionPromise('luke', fetch("https://swapi.dev/api/people/1").then(res => res.json())))
// store.dispatch(actionPromise('tatooine', fetch("https://swapi.dev/api/planets/1").then(res => res.json())))



//authReducer

async function jwtDecode (token) {
    try {
        const arr = token.split('.')
        const encodedData = arr[1];
        const decodedData = atob(encodedData);
        return await JSON.parse(decodedData);

    } catch (error){
        return undefined;
    }
}

function authReducer (state = {}, {type, token}) {
    if (type === 'AUTH_LOGIN'){
        if (token){
            const decodedData = jwtDecode(token);

            if (decodedData){
                return {
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



const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2Mzc3ZTEzM2I3NGUxZjVmMmVjMWMxMjUiLCJsb2dpbiI6InRlc3Q1IiwiYWNsIjpbIjYzNzdlMTMzYjc0ZTFmNWYyZWMxYzEyNSIsInVzZXIiXX0sImlhdCI6MTY2ODgxMjQ1OH0.t1eQlRwkcP7v9JxUPMo3dcGKprH-uy8ujukNI7xE3A0"

const store = createStore(authReducer)
store.subscribe(() => console.log(store.getState()))

store.dispatch(actionAuthLogin(token))
/*{
    token: "eyJhbGc.....",
    payload: {
      "sub": {
        "id": "6377e133b74e1f5f2ec1c125",
        "login": "test5",
        "acl": [
          "6377e133b74e1f5f2ec1c125",
          "user"
        ]
      },
      "iat": 1668812458
    }
}*/
store.dispatch(actionAuthLogout()) // {}

const actionAuthLogin  = (token) => ({type: 'AUTH_LOGIN', token})
const actionAuthLogout = () => ({type: 'AUTH_LOGOUT'})



//cartReducer











