import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import config from '../../../config';
import { getContext } from '../../../storage';
import { Iauth } from '../../../types/index';
import { UPDATE_INSTRUMENT_VALUE, UPDATE_INSTRUMENT_VALUE_FAIL, UPDATE_INSTRUMENT_VALUE_SUCCESS } from '../actions/updateValue';

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
    yield put(UPDATE_INSTRUMENT_VALUE_SUCCESS());
  } catch (error) {
    yield put(UPDATE_INSTRUMENT_VALUE_FAIL(error));
  };
}

export function* watchUpdateInstrumentValue () {
  yield takeLatest(UPDATE_INSTRUMENT_VALUE, workerUpdateInstrumentValue);
}