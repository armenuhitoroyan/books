import { type PayloadAction, createSlice } from "@reduxjs/toolkit"
import type { IBook, IState } from "./types"

const initialState: IState = {
  books: [
    {
      id: "1ab",
      title: "JS professional",
      author: "Marjinyan",
      rating: 5,
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMcXWAXVbeNXDEHNqYyy46uDNqDaGMgMBYgA&s",
      isLiked: true,
    },
    {
      id: "2cd",
      title: "Scope and closure",
      author: "Kyle Simpson",
      rating: 5,
      photo: "https://m.media-amazon.com/images/I/81zWsOMWE4L.jpg",
    },
    {
      id: "3ef",
      title: "Eloquent JS",
      author: "Haverbeke",
      rating: 4,
      photo: "https://m.media-amazon.com/images/I/81+8sluiHiL.jpg",
    },
    {
      id: "4gh",
      title: "JS definitive guide",
      author: "Flangan",
      rating: 4,
      photo:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1590609961i/53501866.jpg",
      isLiked: true,
    },
    {
      id: "5ij",
      title: "JS for kids",
      author: "Morgan",
      rating: 5,
      photo: "https://m.media-amazon.com/images/I/719senbxlBL.jpg",
    },
  ],
}

export type InputBook = { id?: string } & Omit<IBook, "id">

export const BookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    likeBook: (state: IState, action: PayloadAction<string>) => {
      let book = state.books.find(book => book.id === action.payload)
      if (book) {
        book.isLiked = !book.isLiked
      }
    },
    addBook: (state: IState, action: PayloadAction<InputBook>) => {
      action.payload.id = Date.now().toString()

      // input-ից վերցված արժեքն այնուամենայնիվ տեքստային է,
      // ուստի rating-ի տիպը փոխենք թվային

      action.payload.rating = +action.payload.rating
      state.books.push(action.payload as IBook)
    },
  },
})

export const bookReducer = BookSlice.reducer
export const { likeBook, addBook } = BookSlice.actions
