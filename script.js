//redux Homework

const defaultState =  {
    beer: {
        quantity: 300,
        price: 60,
    },
    chips: {
        quantity: 500,
        price: 50,
    },
    cigi: {
        quantity: 100,
        price: 100,
    },

    casa: 0,
};

const BUY = 'buy';

function reducer(state = defaultState, {type, what, amount, money}){

    if (type === BUY){
        const info = document.getElementById('info');

        const quantity = state[what].quantity;
        const price = state[what].price;

        if (amount > quantity) {
            info.innerHTML = `Вибачте, у нас недостатньо товару`;
            return state;
        } else if (money < amount * price) {
            info.innerHTML = `Недостатньо коштів!`;
            return state;
        } else if (!quantity) {
            info.innerHTML = `Вибачте, товар тимчасово відсутній`;
            return state;
        } else if (money >= amount * price){
            const total = amount * state[what].price;
            info.innerHTML = `Ви придбали ${amount} ${what} за ${total} грн. Ваша здача: ${money - total} грн`;

            money = amount * state[what].price;
            return {
                ...state,
                [what]: { quantity: quantity - amount, price: price },
                casa: state.casa + money,
            }
        } else {
            return state
        }
    }

    return state
}

function createStore(reducer) {
    let state = reducer(undefined, {});
    let cbs = [];

    const getState = () => state;
    const subscribe = (cb) => {
        cbs.push(cb);
        return () => (cbs) = cbs.filter((c) => c !== cb);
    };

    const dispatch = (action) => {
        const newState = reducer(state, action);
        if (newState !== state) {
            state = newState;
            for (let cb of cbs) cb();
        }
    };

    return {
        getState,
        dispatch,
        subscribe,
    };
}

const quantityOfGoods = document.getElementById('quantityOfGoods');
const moneyInput = document.getElementById('money');
const info = document.getElementById('info');
const goodsSelect = document.getElementById('goods');
const beerQuantity = document.getElementById('beerQuantity');
const chipsQuantity = document.getElementById('chipsQuantity');
const cigiQuantity = document.getElementById('cigiQuantity');
const beerPrice = document.getElementById('beerPrice');
const chipsPrice = document.getElementById('chipsPrice');
const cigiPrice = document.getElementById('cigiPrice');
const cash = document.getElementById('cash');

const store = createStore(reducer);

function update() {
    beerQuantity.textContent = store.getState().beer.quantity;
    chipsQuantity.textContent = store.getState().chips.quantity;
    cigiQuantity.textContent = store.getState().cigi.quantity;
    beerPrice.textContent = store.getState().beer.price;
    chipsPrice.textContent = store.getState().chips.price;
    cigiPrice.textContent = store.getState().cigi.price;
    cash.textContent = store.getState().casa;
    document.title = `Kaса: ${cash.textContent}`;
}

store.subscribe(update);

document.getElementById('buy').addEventListener('click', () => {
    const selectedGoods = goodsSelect.value;
    const amount = Number(quantityOfGoods.value);
    const money = Number(moneyInput.value);
    store.dispatch({ type: 'buy', what: selectedGoods, amount, money });

    quantityOfGoods.value = '';
    moneyInput.value = '';

    let timerId = setTimeout(() => {
        info.innerHTML = '';
    }, 3000);

    document.getElementById('buy').addEventListener('click', () => {
        clearTimeout(timerId);
    });
});

update();
goodsSelect.innerHTML = `
    <option value="beer">Пиво</option>
    <option value="chips">Чіпси</option>
    <option value="cigi">Цигарки</option>
`;

