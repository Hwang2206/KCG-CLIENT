import { combineReducers } from '@reduxjs/toolkit';
import accountReducer from './accountReducer';

const reducers = combineReducers({
  account: accountReducer
});

export default reducers;
