import type { IAudioItem } from 'cplayer/lib/interfaces';

export interface Blog {
  _id: string,
  content: string,
  address?: string,
  imageList?: string[],
  musicList?: IAudioItem[],
  likeNum: number,
  createDate: string,
  createTime: string,
  commentIds: string[]
}