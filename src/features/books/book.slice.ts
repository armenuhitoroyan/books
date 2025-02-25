import {
  type PayloadAction,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit"
import type { IBook, IState } from "./types"
import { getBooks, postBook } from "../api"

const initialState: IState = {
  books: [],
}

export type InputBook = { id?: string } & Omit<IBook, "id">

export const loadBooks = createAsyncThunk("getAllBooks", async () => {
  return await getBooks()
})

export const addNewBook = createAsyncThunk(
  "addBook",
  async (book: InputBook) => {
    return await postBook(book)
  },
)

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
    /*  addBook: (state: IState, action: PayloadAction<InputBook>) => {
      action.payload.id = Date.now().toString()

      // input-ից վերցված արժեքն այնուամենայնիվ տեքստային է,
      // ուստի rating-ի տիպը փոխենք թվային

      action.payload.rating = +action.payload.rating
      state.books.push(action.payload as IBook)
    },  */
  },
  extraReducers: builder => {
    builder.addCase(
      loadBooks.fulfilled,
      (state: IState, action: PayloadAction<IBook[]>) => {
        state.books = action.payload
      },
    )

    builder.addCase(
      addNewBook.fulfilled,
      (state: IState, action: PayloadAction<IBook>) => {
        state.books.push(action.payload)
      },
    )
  },
})

export const bookReducer = BookSlice.reducer
export const { likeBook /*  addBook  */ } = BookSlice.actions
