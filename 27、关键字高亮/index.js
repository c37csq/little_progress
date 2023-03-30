let name = 'c37csq';
let key = 'c';
var reg = new RegExp(key, 'g');
if (reg) {
  name = name.replace(reg, function (key) {
    return `<em>${key}</em>`
  })
}