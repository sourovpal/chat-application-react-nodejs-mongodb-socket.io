import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';


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
    <App />
  // </React.StrictMode>
);

