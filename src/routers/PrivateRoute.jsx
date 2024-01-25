import Login from "../views/auth/login";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const PrivateRoute = ()=>{
    const auth = useSelector((state)=>state.auth.auth);
    const user = useSelector((state)=>state.auth.user);

    useEffect(()=>{

    }, []);


    return (
        <>
            {
                (user && auth)?<Outlet/>:<Login/>
            }
        </>
    );

}

export default PrivateRoute;