Promise.resolve().then(() => console.log(1));
queueMicrotask(() => console.log(2));
setTimeout(() => console.log(3), 0);
console.log(4);
new Promise(() => console.log(5));
(async () => console.log(6))();

function* count() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
}

for (const value of count()) {
  console.log(value);
}
