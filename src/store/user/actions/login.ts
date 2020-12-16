import { createAction } from '@reduxjs/toolkit';

export const login = createAction<any>('LOGIN'); // TODO set valid interface
export const loginQuery = createAction('LOGIN_QUERY');
export const loginSuccess = createAction('LOGIN_SUCCESS');
export const loginFail = createAction<Error>('LOGIN_FAIL');
