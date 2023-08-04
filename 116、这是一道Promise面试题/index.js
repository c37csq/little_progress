async function asy1() {
  console.log(1);
  await asy2();
  console.log(2);
}
asy2 = async () => {
  await setTimeout((_) => {
    Promise.resolve().then((_) => {
      console.log(3);
    });
    console.log(4);
  }, 0)
}
asy3 = async () => {
  Promise.resolve().then((_) => {
    console.log(6);
  })
}

asy1();
console.log(7);
asy3();

// 1 7 6 2 4 3