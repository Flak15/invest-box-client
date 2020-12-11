import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import config from '../../../config';
import { getContext } from '../../../storage';
import { Iauth } from '../../../types/index';
import { REMOVE_INSTRUMENT, REMOVE_INSTRUMENT_FAIL, REMOVE_INSTRUMENT_SUCCESS } from '../actions/removeInstrument';

// interface IremoveInstrument {
//   symbol: string,
// }
const updateInstrument = async (symbol: string) => {
  const authData: Iauth | null = getContext();
  if (!authData) {
    throw new Error('user undefined!');
  }
  await axios.post(`/portfolio/remove`,
  {
    username: authData.username,
    symbol,
  },
  {
    auth: authData,
    baseURL: config.baseURL,
  });
}
interface removePayload {
  payload: string
}
function* workerRemoveInstrument({ payload }: removePayload) {
  try {
    yield call(updateInstrument, payload);
    yield put(REMOVE_INSTRUMENT_SUCCESS());
  } catch (error) {
    yield put(REMOVE_INSTRUMENT_FAIL(error));
  };
}

export function* watchRemoveInstrument() {
  yield takeLatest(REMOVE_INSTRUMENT, workerRemoveInstrument);
}