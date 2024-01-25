import { useState } from "react";
import Login from "../views/auth/login";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


const PrivateRoute = ()=>{
    const auth = useSelector((state)=>state.auth.auth);
    const user = useSelector((state)=>state.auth.user);

    return (
        <>
            {
                auth?<Outlet/>:<Login/>
            }
        </>
    );

}

export default PrivateRoute;