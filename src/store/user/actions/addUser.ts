import { createAction } from '@reduxjs/toolkit';

export const ADD_USER = createAction<any>('ADD_USER'); // TODO set valid interface
export const ADD_USER_QUERY = createAction('ADD_USER_QUERY');
export const ADD_USER_SUCCESS = createAction('ADD_USER_SUCCESS');
export const ADD_USER_FAIL = createAction<Error>('ADD_USER_FAIL');
