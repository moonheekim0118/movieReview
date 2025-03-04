import { all, fork, takeLatest, put, call } from 'redux-saga/effects';
import * as type from '../actions/review';
import axios from 'axios';

function loadMyReivewsAPI(lastId) {
  return axios.get(`/review/myReviews?lastId=${lastId}`);
}

function loadSingleReviewAPI(data) {
  return axios.get(`/review/${data}`);
}

function addMyReivewAPI(data) {
  return axios.post('/review', data);
}

function removeMyReviewAPI(id) {
  return axios.delete(`/review/${id}`);
}

function updateMyReviewAPI(data) {
  return axios.put('/review', data);
}

function* loadMyReivews(action) {
  try {
    const result = yield call(loadMyReivewsAPI, action.data);
    yield put({
      type: type.LOAD_MY_REVIEWS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: type.LOAD_MY_REVIEWS_FAIL,
      error: err.response.data || '다시 시도해주세요.',
    });
  }
}

function* loadSingleReivew(action) {
  try {
    const result = yield call(loadSingleReviewAPI, action.data);
    yield put({
      type: type.LOAD_SINGLE_REVIEW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: type.LOAD_SINGLE_REVIEW_FAIL,
      error: err.response.data || '다시 시도해주세요.',
    });
  }
}

function* addMyReivew(action) {
  try {
    const result = yield call(addMyReivewAPI, action.data);
    yield put({
      type: type.ADD_MY_REVIEW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: type.ADD_MY_REVIEW_FAIL,
      error: err.response.data || '다시 시도해주세요.',
    });
  }
}

function* removeMyReview(action) {
  try {
    const result = yield call(removeMyReviewAPI, action.data);
    yield put({
      type: type.REMOVE_MY_REVIEW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: type.REMOVE_MY_REVIEW_FAIL,
      error: err.response.data || '다시 시도해주세요.',
    });
  }
}

function* updateMyReivew(action) {
  try {
    const result = yield call(updateMyReviewAPI, action.data);
    yield put({
      type: type.UPDATE_MY_REVIEW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: type.UPDATE_MY_REVIEW_FAIL,
      error: err || '다시 시도해주세요.',
    });
  }
}

function* watchLoadMyReview() {
  yield takeLatest(type.LOAD_MY_REVIEWS_REQUEST, loadMyReivews);
}

function* watchLoadSingleReview() {
  yield takeLatest(type.LOAD_SINGLE_REVIEW_REQUEST, loadSingleReivew);
}

function* watchAddMyReview() {
  yield takeLatest(type.ADD_MY_REVIEW_REQUEST, addMyReivew);
}

function* watchRemoveMyReview() {
  yield takeLatest(type.REMOVE_MY_REVIEW_REQUEST, removeMyReview);
}

function* watchUpdateMyReview() {
  yield takeLatest(type.UPDATE_MY_REVIEW_REQUEST, updateMyReivew);
}

export default function* movieSaga() {
  yield all([
    fork(watchLoadMyReview),
    fork(watchLoadSingleReview),
    fork(watchAddMyReview),
    fork(watchRemoveMyReview),
    fork(watchUpdateMyReview),
  ]);
}
