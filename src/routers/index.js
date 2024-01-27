import * as React from "react";
import {createBrowserRouter} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Chat from '../views/chat/index';
import ChatBox from "../components/ChatBox";

const router = createBrowserRouter([
  {
    element:<PrivateRoute/>,
    children:[
      {
        path:'/',
        element:<Chat/>,
        children:[
          {
            path: ":username",
            element:<ChatBox/>,
          }
        ]
      },
      
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