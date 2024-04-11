import { IAudioItem } from 'cplayer/lib/interfaces';

export interface Blog {
  id: string,
  content: string,
  imgSrcList?: string[],
  address?: string,
  likeNum: number,
  createDate: string,
  createTime: string,
  musicList?: IAudioItem[],
}