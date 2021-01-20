import { put, call, takeLatest, take } from "redux-saga/effects";
import axios from "axios";
import config from "../../../config";
import { getContext } from "../../../storage";
import { Iauth } from "../../../types/index";
import {
  fetchPortfolio,
  fetchPortfolioSuccess,
  fetchPortfolioFail,
  requestPortfolio,
} from "../actions/requestPortfolio";
import { addPortfolioInstrumentSuccess } from "../actions/addPortfolioInstrument";
import { updateInstrumentValueSuccess } from "../actions/updateValue";
import { removeInstrumentSuccess } from "../actions/removeInstrument";
const getPortfolio = () => {
  const authData: Iauth | null = getContext();
  if (!authData) {
    throw new Error("User undefined!");
  }
  return axios.get(`/portfolio/${authData.username}`, {
    auth: authData,
    baseURL: config.baseURL,
  });
};
function* workerFetchPortfolio() {
  try {
    yield put(fetchPortfolio());
    const res = yield call(getPortfolio);
    yield put(fetchPortfolioSuccess(JSON.parse(res.data.p)));
  } catch (error) {
    yield put(fetchPortfolioFail(error));
  }
}

export function* watchUpdatePortfolio() {
  while (true) {
    yield take([
      addPortfolioInstrumentSuccess,
      updateInstrumentValueSuccess,
      removeInstrumentSuccess,
    ]);
    try {
      yield put(fetchPortfolio());
      const res = yield call(getPortfolio);
      yield put(fetchPortfolioSuccess(JSON.parse(res.data.p)));
    } catch (error) {
      yield put(fetchPortfolioFail(error));
    }
  }
}

export function* watchFetchPortfolio() {
  yield takeLatest(requestPortfolio, workerFetchPortfolio);
}
