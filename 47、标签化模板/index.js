const user = {
  name: 'deng',
  age: 28
}

const hi = 'my name is ' + user.name + ", I'm " + user.age;

const hi2 = tag`my name is ${user.name}, I'm ${user.age}`;

console.log(hi, hi2);

function tag() {
  console.log(arguments);
  return tag;
}