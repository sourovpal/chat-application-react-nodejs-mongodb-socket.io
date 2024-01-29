import Login from "../views/auth/login";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const PrivateRoute = ()=>{
    const dispatch = useDispatch();
    const auth = useSelector((state)=>state.auth.auth);
    const user = useSelector((state)=>state.auth.user);
    

    
    return (
        <>
            {
                (user && auth)?<Outlet/>:<Login/>
            }
        </>
    );

}

export default PrivateRoute;