import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'

import booksListReducer from './reducers/booksList'
import uiReducer from './reducers/ui'

import booksListSaga from './sagas/booksList'

const sagaMiddleware = createSagaMiddleware()

export default configureStore({
  reducer: {
    ui: uiReducer,
    booksList: booksListReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(booksListSaga);