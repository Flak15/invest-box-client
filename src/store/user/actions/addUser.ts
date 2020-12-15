import { createAction } from '@reduxjs/toolkit';

export const addUser = createAction<any>('ADD_USER'); // TODO set valid interface
export const addUserQuery = createAction('ADD_USER_QUERY');
export const addUserSuccess = createAction('ADD_USER_SUCCESS');
export const addUserFail = createAction<Error>('ADD_USER_FAIL');
