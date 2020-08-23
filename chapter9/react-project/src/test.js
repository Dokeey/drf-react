const object_test = () => {
  const g = {};
  g.hi = 10;

  console.log(g);
};

const reg_test = () => {
  const str = '안녕하세요. abcd, hello world';
  const pattern = /(l)/g;
  //   const str2 = 'aa bb';
  //   const pattern2 = /(a)a\sb(b)/;

  const result = pattern.exec(str);
  const match_result = str.match(pattern);
  const replace_result = str.replace(pattern, '2:$2 1:$1');
  //   const match_result2 = str2.match(pattern2);
  //   const q1_replace_result = str2.replace(pattern2, '$2 $1');

  console.log(result);
  console.log(match_result);
  console.log(replace_result);
  //   console.log(match_result2);
  //   console.log(q1_replace_result);
};

// object_test();
// reg_test();

const range_test = () => {
  var i = 5;

  const a = () => {
    var i = 10;
    b();
  };
  const b = () => {
    console.log(i);
  };
  a();
};

const callback_test = () => {
  const process = [
    (input) => input + 10,
    (input) => input + input,
    (input) => input / 2,
  ];
  let input = 1;
  for (let i = 0; i < process.length; i++) {
    input = process[i](input);
    console.log(input);
  }

  console.log(input);
};

const closure_test = () => {
  const arr = [];
  for (let i = 0; i < 5; i++) {
    arr[i] = function () {
      return i;
    };
  }

  console.log(arr);
  for (const index in arr) {
    // console.log(index);
    console.log(arr[index]());
  }
};

const sum_test = (...args) => {
  for (let i = 0; i < args.length; i++) {
    console.log(i);
  }
};

// sum_test(1, 2, 3, 4);

function func() {
  console.log(this);
}

// console.log(Math.random());
// func();
// new func();
// range_test();
// callback_test();
// closure_test();

Object.prototype.contain = function (neddle) {
  for (var name in this) {
    console.log(this);
    if (this[name] === neddle) {
      return true;
    }
  }
  return false;
};

var o = { name: 'ee' };
console.log(o.contain('ee'));
var p = ['ee', 'bb'];
console.log(p.contain('ee'));
