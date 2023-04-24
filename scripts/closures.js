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
        const mergedArgs = [];
        let defaultArgsIndex = 0;

        for (let i = 0; i < args.length; i++) {

            if (args[i] !== undefined) {
                mergedArgs.push(args[i]);
            } else {

                if (defaultArgs[defaultArgsIndex] !== undefined) {
                    mergedArgs.push(defaultArgs[defaultArgsIndex]);
                }
            }
            defaultArgsIndex++;
        }

        if (defaultArgsIndex < defaultArgs.length) {
            mergedArgs.push(...defaultArgs.slice(defaultArgsIndex));
        }

        const filteredMergedArgs = mergedArgs.filter(item => item !== undefined);
        // console.log(filteredMergedArgs)

        return func.apply(context, filteredMergedArgs);
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