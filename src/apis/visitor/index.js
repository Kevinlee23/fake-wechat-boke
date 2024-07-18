import request from '@/utils/request'

export function getVisitorInfo() {
  return request({
    method: 'get',
    url: 'visitor/info',
  })
}

export function likeOperate(blogId, cal) {
  return request({
    method: 'post',
    url: 'blog/like',
    data: { blogId, cal },
  })
}

export function updateNickname(nickname) {
  return request({
    method: 'post',
    url: 'visitor/updateNickname',
    data: { nickname },
  })
}
