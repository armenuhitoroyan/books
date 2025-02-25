import { all } from "redux-saga/effects"
import bookSaga from "./book.saga"

export default function* rootSaga() {
  yield all([bookSaga()])
}
