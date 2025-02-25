import axios from "axios"
import type { IBook } from "./books/types"
import type { InputBook } from "./books/book.slice"

export const getBooks = async (): Promise<IBook[]> => {
  const response = await axios.get("http://localhost:3004/books")
  return response.data
}

export const postBook = async (book: InputBook): Promise<IBook> => {
  const response = await axios.post("http://localhost:3004/books", book)
  return response.data
}
