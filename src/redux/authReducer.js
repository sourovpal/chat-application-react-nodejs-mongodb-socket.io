import { createSlice } from '@reduxjs/toolkit'
import cookie from 'react-cookies';
import { userDeviceId } from '../hooks/userDeviceId';


export const authSlice = createSlice({
  name: 'counter',
  initialState: {
    user:cookie.load('chat_app_user')||Object,
    auth:(cookie.load('chat_app_user')&&cookie.load('chat_app_token'))?true:false,
    uuid:userDeviceId(),
  },
  reducers: {
    login:(state, action)=>{
      const {data} = action.payload;
      state.user = data;
      state.auth = true;
      cookie.save('chat_app_user', JSON.stringify(data), { path: '/', maxAge:60*60*24*365 });
      cookie.save('chat_app_token', data.token, { path: '/', maxAge:60*60*24*365 });
    },
    logout:(state)=>{
      state.user = Object;
      state.auth = false;
      cookie.remove('chat_app_user', { path: '/', maxAge:60*60*24*365 });
      cookie.remove('chat_app_token', { path: '/', maxAge:60*60*24*365 });
    }
  }
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer