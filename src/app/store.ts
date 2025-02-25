import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"

import { BookSlice } from "../features/books/book.slice"

import createSagaMiddleware from "redux-saga"
import rootSaga from "../features/books/rootSaga"

const rootReducer = combineSlices(BookSlice)
const sagaMiddleware = createSagaMiddleware()

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(sagaMiddleware)
    },
  })

  return store
}

export const store = makeStore()
sagaMiddleware.run(rootSaga)

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
function sage() {
  throw new Error("Function not implemented.")
}
