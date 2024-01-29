import axios from "axios";
import { useState } from "react";
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authReducer';
import AuthAction from "../../action/authAction";

const Register = ()=>{
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(false);

    const submitRegisterForm = async(e)=>{
        e.preventDefault();
        if(firstName === '' || firstName === null || firstName.length <= 0){
            toast.error('First Name field must be required.');
        }else if(lastName === '' || lastName === null || lastName.length <= 0){
            toast.error('Last Name field must be required.');
        }else if(email === '' || email === null || email.length <= 0){
            toast.error('Email field must be required.');
        }else if(password === '' || password === null || password.length <= 0){
            toast.error('Password field must be required.');
        }else{
            try{
                setDisabled(true);
                const {data, message} = await AuthAction.register({
                    first_name:firstName,
                    last_name:lastName,
                    email,
                    password
                });
                setDisabled(false);
                toast.success(message);
                dispatch(login({data}));
            }catch(error){
                setDisabled(false);
                if(typeof error.response != "undefined" && 
                typeof error.response.data != "undefined" && 
                typeof error.response.data.message != "undefined"){
                    toast.error(error.response.data.message);
                }else{
                    toast.error(error.message);
                }
            }
        }
    }








    return (
        <>
            <form>
                <h1>Create Account</h1>
                <div className="social-icons">
                    <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
                </div>
                <span>or use your email for registeration</span>
                <input onChange={(e)=> setFirstName(e.target.value)} type="text" placeholder="First Name" />
                <input onChange={(e)=> setLastName(e.target.value)} type="text" placeholder="Last Name" />
                <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" />
                <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
                <button 
                    disabled={disabled} 
                    onClick={submitRegisterForm}>
                    {
                        disabled &&
                        <div className='loader-warpper'> 
                            <div className='loading'></div> 
                        </div> 
                    }
                    Sign Up
                </button>
            </form>
        </>
    );
}

export default Register;