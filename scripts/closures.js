//makeProfileTimer
function makeProfileTimer() {
    const start = performance.now();

    return function () {
        const end = performance.now();

        return end - start;
    }
}



//makeSaver
function makeSaver(func) {
    let result;
    let called = false;

    return function () {
        if (!called) {
            result = func();
            called = true;
        }

        return result;
    };
}



//myBind
function myBind(func, context, defaultArgs) {
    return function (...args) {

        for (let i = 0; i < defaultArgs.length; i++) {

            if (defaultArgs[i] === undefined) {
                defaultArgs[i] = args.shift();
            }

            if (args.length === 0) {
                break;
            }
        }

        console.log(defaultArgs)

        return func.apply(context, defaultArgs);
    }
}



//checkResult
// function checkResult(original, validator) {
//    function wrapper(...params) {
//       let result;
//       do {
//          result = original.apply(this, params);
//       } while (!validator(result));
//       return result;
//    }
//    return wrapper;
// }
//
// const RandomHigh = checkResult(
//    () => Math.random() * 0.5 + 0.5,
//    x => typeof x === 'number' && x >= 0.5 && x <= 1
// );
//
//
// const AlwaysSayYes = checkResult(
//    () => confirm("Do you agree?"),
//    x => x === true
// );
//
//
// const respectMe = checkResult(
//    () => prompt("Please enter some text"),
//    x => typeof x === 'string' && x.trim().length > 0
// );
// const random = RandomHigh();
// const agreed = AlwaysSayYes();
// const text = respectMe();