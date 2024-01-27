import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import routers from './routers';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/index';

import 'mdb-ui-kit/css/mdb.min.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import './index.css';
import "primeicons/primeicons.css";
import { PrimeReactProvider } from 'primereact/api';
import { userDeviceId } from './hooks/userDeviceId';

axios.defaults.baseURL = "http://localhost:8080/api/v1";

const deviceId = userDeviceId();

axios.defaults.headers.common['_uuid'] = deviceId;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PrimeReactProvider>
      <RouterProvider router={routers}></RouterProvider>
    </PrimeReactProvider>
  </Provider>
  // </React.StrictMode>
);

