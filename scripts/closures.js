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