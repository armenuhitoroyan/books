import type { IBook } from "./types"
import styles from "./Books.module.css"
import { likeBook } from "./book.slice"
import { useAppDispatch } from "../../app/hooks"

interface Props {
  book: IBook
}

const Book: React.FC<Props> = ({ book }) => {
  const dispatch = useAppDispatch()
  return (
    <div className={styles.book}>
      <img src={book.photo} alt="The book not found!" />
      <div>
        <h2>{book.title}</h2>
        <strong>{book.author}</strong>
        <div>
          {new Array(book.rating)
            .fill(
              "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/star-512.png",
            )
            .map((elm, i) => (
              <img className={styles.rate} key={i} src={elm} />
            ))}
        </div>
        <div>
          {book.isLiked ? (
            <img
              className={styles.rate}
              src="https://cdn4.iconfinder.com/data/icons/set-1/32/__1-256.png"
              alt="Image not found!"
              onClick={() => dispatch(likeBook(book.id))}
            />
          ) : (
            <img
              className={styles.rate}
              src="https://cdn0.iconfinder.com/data/icons/phosphor-regular-vol-3/256/heart-256.png"
              alt="Image not found!"
              onClick={() => dispatch(likeBook(book.id))}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Book
