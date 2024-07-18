export interface PartVisitor {
  _id: string
  nickname: string
}

export interface Comment {
  _id: string
  authorId: PartVisitor
  content: string
  blogId: string // 标记是哪一条博客下的评论
  parentId?: { authorId: PartVisitor } // 标记回复的哪一条评论
  parantName?: string
  isOriginal: boolean // 标记是否本人
  createDate: string
  createTime: string
}

export interface Visitor {
  _id: string
  nickname: string
  uuid: string
  likes: string[]
}
