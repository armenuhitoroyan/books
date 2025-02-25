import { createAsyncAction } from "typesafe-actions"
import type { IBook } from "./types"
import { InputBook } from "./book.slice"

export const loadBooksAction = createAsyncAction(
  "book/getAll/pending",
  "book/getAll/fulfilled",
  "book/getAll/rejected",
)<void, IBook[], void>()

export const addBookAction = createAsyncAction(
  "book/add/pending",
  "book/add/fulfilled",
  "book/add/rejected",
)<InputBook, IBook, void>()
