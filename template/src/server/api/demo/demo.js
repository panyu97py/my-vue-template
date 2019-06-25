import request from '@/server/utils/request'
/**
 * 登陆
 * @param username 用户名
 * @param password 密码
 */
export default data => {
  return request({
    url: '/:demo/demo',
    method: 'post',
    data: data
  })
}
