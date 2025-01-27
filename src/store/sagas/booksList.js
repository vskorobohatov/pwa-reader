import { takeLatest, put, call } from 'redux-saga/effects';
import { User } from 'services/User';
import { setBooks, setBooksLoading } from 'store/reducers/booksList';

export const getBooksList = () => ({
  type: 'GET_BOOKS_LIST'
});

function* fetchDataWorkerSaga() {
  yield put(setBooksLoading(true));
  try {
    const data = yield call(User.getBooks);
    yield put(setBooks(data.books));
  } catch (e) {
    console.log(e)
  } finally {
    yield put(setBooksLoading(false));
  }
}

export default function* rootSaga() {
  yield takeLatest("GET_BOOKS_LIST", fetchDataWorkerSaga);
}
