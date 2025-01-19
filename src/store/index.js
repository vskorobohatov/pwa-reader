import { configureStore } from '@reduxjs/toolkit'
import booksListReducer from './reducers/booksList'
import uiReducer from './reducers/ui'

export default configureStore({
  reducer: {
    ui: uiReducer,
    booksList: booksListReducer
  },
})