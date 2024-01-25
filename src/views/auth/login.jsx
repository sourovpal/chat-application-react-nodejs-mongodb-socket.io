
import { useState } from 'react';
import './auth.style.css';
import Register from './register';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const Login = ()=>{


    const [formStatus, setFormStatus]  = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(false);

    const submitLoginForm = async(e)=>{
        e.preventDefault();
        if(email === '' || email === null || email.length <= 0){
            toast.error('Email field must be required.');
        }else if(password === '' || password === null || password.length <= 0){
            toast.error('Password field must be required.');
        }else{
            setDisabled(true);
            axios.post('/user/auth/login', {
                email,
                password
            }).then((res)=>{
                setDisabled(false);
                console.log(res);
            }).catch((error)=>{
                setDisabled(false);
                if(typeof error.response.data.message != undefined){
                    toast.error(error.response.data.message);
                }else{
                    toast.error(error.message);
                }
            });
        }
    }

    return(
        <>
            <Toaster position="bottom-center" reverseOrder={false} />
            <div className={`container ${formStatus?'active':''}`} id="container">
                <div className="form-container sign-up">
                    <Register/>
                </div>
                <div className="form-container sign-in">
                    <form>
                        <h1>Sign In</h1>
                        <div className="social-icons">
                            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email password</span>
                        <input onChange={(e)=>setEmail(e.target.value)} value={email} autoComplete='off' type="email" placeholder="Email" />
                        <input onChange={(e)=>setPassword(e.target.value)} value={password} autoComplete='off' type="password" placeholder="Password" />
                        <a href="#">→ Forget Your Password? ←</a>
                        <button 
                            disabled={disabled} 
                            onClick={submitLoginForm}>
                            {
                                disabled &&
                                <div className='loader-warpper'> 
                                    <div className='loading'></div> 
                                </div> 
                            }
                            Sign In
                        </button>
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button className="hidden" id="login" onClick={()=>setFormStatus(false)}>Sign In</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <button className="hidden" id="register" onClick={()=>setFormStatus(true)}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;