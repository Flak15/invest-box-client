import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import config from '../../../config';
import { getContext } from '../../../storage';
import { Iauth } from '../../../types/index';
import { addPortfolioInstrument, addPortfolioInstrumentSuccess, addPortfolioInstrumentFail } from '../actions/addPortfolioInstrument';

interface IaddInstrument {
  symbol: string,
  value: number
}
const addInstrument = async ({ symbol, value }: IaddInstrument) => {

  const authData: Iauth | null = getContext();
  if (!authData) {
    throw new Error('User undefined!');
  }
  await axios.post(`/portfolio/add`, { username: authData.username, symbol, value }, { 
    auth: authData,
    baseURL: config.baseURL,
  });
}

function* workerAddPortfolioInstrument ({ payload }: any) {
  try {
    yield call(addInstrument, payload);
    yield put(addPortfolioInstrumentSuccess());
  } catch (error) {
    console.log(error);
    yield put(addPortfolioInstrumentFail(error));
  };
}

export function* watchAddPortfolioInstrument () {
  yield takeLatest(addPortfolioInstrument, workerAddPortfolioInstrument);
}