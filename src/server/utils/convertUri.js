console.log('API_ENV', process.env.API_ENV)
var api = require(`../config/api.${process.env.API_ENV}`).default

/**
 * uri转url
 */
export default url => {
  for (const key in api) {
    const reg = new RegExp(`^/?:${key}`)
    if (reg.test(url)) {
      return url.replace(reg, api[key])
    }
  }
  return url
}
