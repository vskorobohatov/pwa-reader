import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'

import booksListReducer from './reducers/booksList'
import uiReducer from './reducers/ui'
import settingsReducer from './reducers/settings'

import booksListSaga from './sagas/booksList'

const sagaMiddleware = createSagaMiddleware()

export default configureStore({
  reducer: {
    ui: uiReducer,
    booksList: booksListReducer,
    settings: settingsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(booksListSaga);