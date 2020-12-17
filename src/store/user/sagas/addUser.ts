import { put, call, takeLatest } from "redux-saga/effects";
import axios from "axios";
import config from "../../../config";

import {
  addUser,
  addUserSuccess,
  addUserFail,
  addUserQuery,
} from "../actions/addUser";

interface IaddUser {
  payload: payloadWithUser;
}
type payloadWithUser = {
  username: string;
  password: string;
  code: string;
};
const sendUserToServer = async (payload: payloadWithUser) => {
  await axios.post("/user", { ...payload }, { baseURL: config.baseURL });
};

function* workerAddUser({ payload }: IaddUser) {
  try {
    yield put(addUserQuery());
    yield call(sendUserToServer, payload);
    yield put(addUserSuccess());
  } catch (error) {
    console.log(error);
    yield put(addUserFail(error));
  }
}

export function* watchAddUser() {
  yield takeLatest(addUser, workerAddUser);
}
