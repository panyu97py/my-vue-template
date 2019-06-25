/** 对象的除法 (除数可以时对象也可以是数字) */
const objDivision = (dividend, divisor) => {
  let obj = {}
  for (let key in dividend) {
    obj[key] = dividend[key] / (divisor[key] || divisor) || 'objDivisionErr'
  }
  return obj
}
export default objDivision
