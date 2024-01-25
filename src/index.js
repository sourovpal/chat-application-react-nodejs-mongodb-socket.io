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

axios.defaults.baseURL = "http://localhost:8080/api/v1";

var navigator_info = window.navigator;
var screen_info = window.screen;
var uid = navigator_info.mimeTypes.length;
uid += navigator_info.userAgent.replace(/\D+/g, '');
uid += navigator_info.plugins.length;
uid += screen_info.height || '';
uid += screen_info.width || '';
uid += screen_info.pixelDepth || '';

axios.defaults.headers.common['_uuid'] = uid;


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

