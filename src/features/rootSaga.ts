import { all } from "redux-saga/effects"
import bookSaga from "./books/book.saga"

export default function* rootSaga() {
  yield all([bookSaga()])
}
