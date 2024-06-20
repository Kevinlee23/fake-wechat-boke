import request from '@/utils/request'

export const getBlogList = () => {
  return request({
    url: 'blog/list',
    method: 'get',
  })
}