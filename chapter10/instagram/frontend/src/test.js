function getData(callback) {
  let value;
  setTimeout(function () {
    value = 5;
  }, 1000);
  callback(value);
}

getData((num) => {
  console.log(num);
});

console.log("task1");
console.log("task2");
console.log("task3");

function f() {
  for (var i = 0; i < 3; i++) {
    setTimeout(function () {
      console.log(i);
    }, 1000);
  }
}
f();
