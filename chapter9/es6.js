// var는 더이상 쓰지 않는다.
// 변수선언은 let
// 상수선언은 const

const tom = {
    name: "Tom",
    age: 10,
    region: "Seoul",
    num: 20,
};

// const { age: age, name: name, height: height } = tom;

// console.log(name);
// // 10


// const { num } = tom;
// console.log(num);

let [name, ...rest] = ["Tom", 10, "Seoul"];
console.log(name, rest);
