export interface Comment {
  _id: string,
  authorName: string,
  authorEmail: string,
  content: string,
  blogId: string, // 标记是哪一条博客下的评论
  parentId?: string, // 标记回复的哪一条评论
  parantName?: string,
  isOriginal: boolean, // 标记是否本人
  createDate: string,
  createTime: string
}