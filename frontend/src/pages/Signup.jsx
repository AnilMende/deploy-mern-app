import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import { handleError, handleSuccess } from "../utils";

const Signup = () => {

    const [signupinfo, setSignupInfo] = useState({
        name:"",
        email:"",
        password:""
    })

    const navigate = useNavigate();


    const handleChange = (event) => {
        const {name, value} = event.target;
        // console.log(name, value);
        const copySignupInfo = { ...signupinfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }
    // console.log('loginInfo ->', signupinfo);

    const handleSignup = async (event) => {
        event.preventDefault();

        const {name, email, password} = signupinfo;
        if(!name || !email || !password){
            return handleError('name, email and password are required!');
        }

        try{

            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(signupinfo)
            })

            const result = await response.json();
            // console.log(result);
            const {success, message, error} = result;
            if(success){
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                },1000);
            }
            else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }
            else if(!success){
                handleError(message);
            }

            // console.log(result);

        }catch(error){
            handleError(error);
        }
    }
    return (
        <div className="container">
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="name"
                        autoFocus
                        placeholder="Enter your name.."
                        value={signupinfo.name}
                    />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handleChange}
                        type="email"
                        name="email"
                        placeholder="Enter your email.."
                        value={signupinfo.email}
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handleChange}
                        type="password"
                        name="password"
                        placeholder="Enter your password.."
                        value={signupinfo.password}
                    />
                </div>

                <button type="submit">SignUp</button>
                <span>
                    Already Have an Account ?
                     <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer/>
        </div>
    )
}

export default Signup;