import { all } from "redux-saga/effects";
import todoSaga from "./todo/saga";
import UserSaga from "./user/saga";

export default function* rootSaga() {
  yield all([todoSaga(),
  UserSaga()]);
}
