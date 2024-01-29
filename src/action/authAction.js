import axios from "axios";


const login = async(payload)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            await axios.post(`/user/auth/login`, payload).then((res)=>{
                return resolve(res.data);
            }).catch((error)=>{
                return reject(error);
            });
        }catch(error){
            return error;
        }
    });
}


const register = async(payload)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            await axios.post(`/user/auth/register`, payload).then((res)=>{
                return resolve(res.data);
            }).catch((error)=>{
                return reject(error);
            });
        }catch(error){
            return error;
        }
    });
}


const logout = async()=>{
    return new Promise(async(resolve, reject)=>{
        try{
            await axios.post(`/user/auth/logout`).then((res)=>{
                return resolve(res.data);
            }).catch((error)=>{
                return reject(error);
            });
        }catch(error){
            return error;
        }
    });
}

const AuthAction = {
    login,
    register,
    logout
}

export default AuthAction;