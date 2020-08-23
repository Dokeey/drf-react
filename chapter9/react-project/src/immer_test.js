const { produce } = require('immer');

const fruits = ['오렌지', '사과', '바나나', '레몬'];

const newF = produce(fruits, (draft) => {
  draft.splice(1, 2, '딸기');
});

console.log(newF);

const baseState = [
  { todo: '배우자 ES6', done: true },
  { todo: '시도하자 immer', done: false },
];

// immer를 안쓸경우
const newState0 = [
  ...baseState.map((tweet, index) =>
    index === 1 ? { ...tweet, done: true } : tweet,
  ),
  { todo: 'Tweet about it' },
];

// immer를 쓸경우
const newState = produce(baseState, (draft) => {
  draft[1].done = true;
  draft.push({ todo: 'Tweet about it' });
});

console.log(newState0);
console.log(newState);
