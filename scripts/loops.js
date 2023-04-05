//while confirm
const whileConfirm = () => {
    let count = 0;

    while (!confirm('Не набридло?')){
        count++
    };

    alert(`Вам не набридло ${count} разів`);
};



//array fill
const arrayFill = () => {
    const arr = [];
    let text;

    while (text = prompt('Введіть щось: ')){
        if (!text){
            break;
        }
        arr.push(text);
    };

    console.log(arr)
}



//array fill nopush
const arrayFillNoPush = () => {
    const arr = [];
    let text;
    let i = 0;

    while (text = prompt('Введіть щось: ')){
        if (!text){
            break;
        }

        arr[i] = text;
        i++;
    };

    console.log(arr);
}



//infinite probability
const infiniteProbability = () => {
    let count = 0;

    while (true) {
        count++;

        if (Math.random() > 0.9) {
            break;
        };
    };

    alert(`Кількість ітерацій: ${count}`);
};



//empty loop
const emptyLoop = () => {
    while (true) {
        const text = prompt('Введіть щось:');

        if (!text) {
            continue;
        }

        alert(`Ви ввели: ${text}`);
        break;
    }
}



//progression sum
const progressionSum = (num) => {
    let sum = 0;

    for (let i = 1; i <= num; i += 3) {
        sum += i;
    }

    console.log(sum);
}