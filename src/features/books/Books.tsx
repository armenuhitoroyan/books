import { useAppSelector, useAppDispatch } from "../../app/hooks"
import Book from "./Book"
import styles from "./Books.module.css"
import { useEffect } from "react"
import { loadBooks } from "./book.slice"

const Books: React.FC = () => {
  const books = useAppSelector(state => state.books.books)
  console.log(books)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadBooks())
  }, [])

  return (
    <div className={styles.container}>
      <h3>Book List</h3>
      <div className={styles.list}>
        {books.map(book => (
          <Book key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}

export default Books
