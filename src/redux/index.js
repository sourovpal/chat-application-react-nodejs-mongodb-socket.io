import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './authReducer';


const rootReducers = combineReducers({
    auth: authReducer,
})


export default configureStore({
  reducer:rootReducers,
})