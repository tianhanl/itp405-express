const timeout = (milliseconds) => {
    return new Promise((resolve, reject) => {
        if (milliseconds > 2000) reject('too long')
        setTimeout(resolve('sup'), milliseconds);
    });
};

console.log(1);
timeout(1500).then(
    function () {
        console.log("sup");
    },
    function () {
        console.log("too long");
    }
);
console.log(2);