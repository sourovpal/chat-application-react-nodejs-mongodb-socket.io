import * as React from "react";
import {createBrowserRouter} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Chat from '../views/chat/index';

const router = createBrowserRouter([
  {
    path: "/",
    element:<PrivateRoute/>,
    children:[
      {
        index:true,
        path: "/",
        element:<Chat/>,
      }
    ]
  },
  // {
  //   path: "/forgot-password",
  //   element:<Login/>
  // },
  // {
  //   path: "/reset-password",
  //   element:<Login/>
  // },
]);

export default router;