/** 不需要 Authorization 的接口列表 */
const apiList = [/oauth\/token/]
/** 判断是否需要携带 token */
export default url => {
  return apiList.every(item => {
    return !item.test(url)
  })
}
