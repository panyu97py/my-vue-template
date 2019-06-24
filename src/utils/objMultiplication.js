/** 对象的乘法 (第一位乘数必须为对象 第二位乘数可以时对象也可以是数字) */
const objMultiplication = (a, b) => {
  let obj = {}
  for (let key in a) {
    obj[key] = a[key] * (b[key] || b) || 'objMultiplicationErr'
  }
  return obj
}
export default objMultiplication
