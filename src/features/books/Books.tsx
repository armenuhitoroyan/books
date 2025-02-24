import { useAppSelector } from "../../app/hooks"
import Book from "./Book"
import styles from "./Books.module.css"

const Books: React.FC = () => {
  const books = useAppSelector(state => state.books.books)
  console.log(books)

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
