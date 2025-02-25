import axios from "axios"
import { IBook } from "./types"
import { call, put, takeLatest } from "redux-saga/effects"
import { loadBooksAction, addBookAction } from "./book.actions"

const url = "http://localhost:3004/books"

function* loadBooks(): Generator {
  try {
    const response = (yield call(axios.get, url)) as {
      data: IBook[]
      status: number
    }

    if (response.status === 200) {
      const data: IBook[] = response.data
      yield put(loadBooksAction.success(data))
    } else {
      yield put(loadBooksAction.failure())
    }
  } catch {
    yield put(loadBooksAction.failure())
  }
}

function* addBook(action: ReturnType<typeof addBookAction.request>): Generator {
  try {
    const response = (yield call(axios.post, url, action.payload)) as {
      data: IBook
      status: number
    }

    if (response.status === 201) {
      // json-server-ը POST-ի դեպքում 201 status code-ով է ավարտվում

      yield put(addBookAction.success(response.data))
    } else {
      yield put(addBookAction.failure())
    }
  } catch {
    yield put(addBookAction.failure())
  }
}

export default function* bookSaga() {
  yield takeLatest(loadBooksAction.request, loadBooks)
  yield takeLatest(addBookAction.request, addBook)
}
