export type Post = {
  id: string
  author: string
  initials: string
  avatarClass: string
  time: string
  body: string
  hasImage?: boolean
  imagePlaceholder?: string
  likes: number
  comments: number
  liked?: boolean
  isSharonPost?: boolean
}

export type Comment = {
  id: string
  author: string
  initials: string
  avatarClass: string
  text: string
  time: string
}

export type Notification = {
  id: string
  actorName: string
  actorInitials: string
  avatarClass: string
  type: "like" | "comment"
  text: string
  time: string
  unread: boolean
}

export type View = "home" | "notifications" | "profile"