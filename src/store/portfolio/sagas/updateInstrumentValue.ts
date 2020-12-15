import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import config from '../../../config';
import { getContext } from '../../../storage';
import { Iauth } from '../../../types/index';
import { updateInstrumentValue, updateInstrumentValueFail, updateInstrumentValueSuccess } from '../actions/updateValue';

interface IupdatedInstrument {
  symbol: string,
  value: number
}
const updateInstrument = async (instrument: IupdatedInstrument) => {
  const authData: Iauth | null = getContext();
  if (!authData) {
    throw new Error('User undefined!');
  }
  await axios.post(`/portfolio/update`,
  {
    username: authData.username,
    symbol: instrument.symbol,
    value: instrument.value
  },
  {
    auth: authData,
    baseURL: config.baseURL,
  });
}
interface updatePayload {
  payload: IupdatedInstrument
}
function* workerUpdateInstrumentValue ({ payload }: updatePayload) {
  try {
    yield call(updateInstrument, payload);
    yield put(updateInstrumentValueSuccess());
  } catch (error) {
    yield put(updateInstrumentValueFail(error));
  };
}

export function* watchUpdateInstrumentValue () {
  yield takeLatest(updateInstrumentValue, workerUpdateInstrumentValue);
}