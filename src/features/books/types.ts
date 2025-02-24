export interface IBook {
  id: string
  title: string
  author: string
  rating: number
  photo: string
  isLiked?: boolean
}

export interface IState {
  books: IBook[]
}
