import * as React from "react";
import {createBrowserRouter} from "react-router-dom";
import Login from "../views/auth/login";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Login/>
  },
]);

export default router;