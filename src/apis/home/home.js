import request from '@/utils/request'

export function getBlogList(data) {
  return request({
    url: 'blog/list',
    method: 'post',
    data,
  })
}
