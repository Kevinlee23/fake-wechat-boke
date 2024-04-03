export interface Blog {
  id: string,
  content: string,
  audioSrc?: string,
  imgSrcList?: string[],
  address?: string,
  likeNum: number,
  createDate: string,
  createTime: string
}