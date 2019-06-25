export default (value, num) => {
  value = value === 'Infinity' ? '--' : parseFloat(value)
  if (!isNaN(value)) {
    return value.toFixed(num || 2)
  } else {
    return '--'
  }
}
