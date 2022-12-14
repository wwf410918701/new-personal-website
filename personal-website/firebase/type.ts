export type Summary = {
  author: string,
  id: string,
  posterImgUrl: string,
  summary: string,
  time: string,
  title: string,
}

export type Comment = {
  commentID: string,
  content: string,
  createAt: string,
  displayName: string,
  uid: string,
}

export type Blog = {
  id: string,
  comments: Comment[],
  title: string,
  content: string,
  author: string | null,
  createdAt: string | null,
}

export type UploadingStatus = "default" | "loading" | "success" | "failure";