import { createSlice } from '@reduxjs/toolkit'
import cookie from 'react-cookies';
import { userDeviceId } from '../hooks/userDeviceId';
import AuthAction from '../action/authAction';
const maxAge = 60*60*24*365;

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user:cookie.load('chat_app_user') || {},
    auth:(cookie.load('chat_app_user')&&cookie.load('chat_app_token'))?true:false,
    uuid:userDeviceId(),
  },
  reducers: {
    login:(state, action)=>{
      const {data} = action.payload;
      cookie.save('chat_app_user', JSON.stringify(data), { path: '/', maxAge:maxAge });
      cookie.save('chat_app_token', data.token, { path: '/', maxAge:maxAge });
      window.location.reload(true);
    },
    logout:async(state)=>{
      try{
        await AuthAction.logout();
      }catch(error){
      }
      cookie.remove('chat_app_user', { path: '/', maxAge:maxAge });
      cookie.remove('chat_app_token', { path: '/', maxAge:maxAge });
      window.location.reload(true);
    },
  },
});



// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer