import { put, call, takeLatest } from "redux-saga/effects";
import axios from "axios";
import config from "../../../config";
import { setContext } from "../../../storage";
import { login, loginFail, loginQuery, loginSuccess } from "../actions/login";

interface IaddUser {
  payload: payloadWithUser;
}
type payloadWithUser = {
  username: string;
  password: string;
  code: string;
};
const sendUserToServer = async (payload: payloadWithUser) => {
  await axios.get("/", {
    auth: { ...payload },
    baseURL: config.baseURL,
  });
};

function* workerAddUser({ payload }: IaddUser) {
  try {
    yield put(loginQuery());
    yield call(sendUserToServer, payload);
    yield put(loginSuccess());
    setContext(payload);
  } catch (error) {
    console.log(error);
    yield put(loginFail(error));
  }
}

export function* watchAddUser() {
  yield takeLatest(login, workerAddUser);
}
