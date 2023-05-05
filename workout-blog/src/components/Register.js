import React,{Fragment}  from 'react';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './Register.css'
import Lottie from "lottie-react";
import check from "./lotties/check.json"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Link,
    useNavigate,
    useLocation,
  } from "react-router-dom";




const Register = (props) =>{

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate()
    
    const handleChange = () => {
        setChecked(!checked);
      };

    useEffect(() => {
        
    }, []);
    

   

    
  
    const registerUser = async (name, email, password, confirmPassword, checked) => {
        console.log(name)
        console.log(email)
        console.log(password)
        console.log(checked)
        var bodyFormData = new FormData();
        if(name&&email&&password&&confirmPassword &&(password===confirmPassword)){
            
                if(email.includes("@")){
                    if(password.length >=6){
 
                        bodyFormData.append("name", name)
                        bodyFormData.append("email",email)
                        bodyFormData.append("password",password)
                        bodyFormData.append("check",+ checked)

                        axios({
                            method: 'post',
                            url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/register.php",
                            headers: {}, 
                            data: bodyFormData
                        })
                        .then((response) => {
                            console.log(response);
                            sessionStorage.setItem("id", response.data[0])
                            sessionStorage.setItem("name", response.data[2])
                            
                            // setLoad(true)
                            setTimeout(()=>{navigate("/")}, 1000);
                            toast.success('Welcome!', {
                                position: "bottom-center",
                                autoClose: 5000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                                });
                                
                                   
                
                        }, (error) => {
                           
                            toast.error("User already exists", {
                                position: "bottom-center",
                                autoClose: 5000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                                });
                        });
                    }
                    else{
                        
                        
                        toast.error("Password length must be greater than 6 characters", {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            });
                    }
                }
                else{

                    toast.error("Not a valid email", {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        });
                }
              
           
        }
        else{
            toast.error("Missing field or password does not match", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }

    };



    return (
        <div class="bg">
            <div class='home' onClick={() => navigate("/")}/>   
            
            <div class="accountwrap">
                <div class="sign">Sign up</div>
                    <div class='namebox'>
                        <input type="text"
                                    placeholder="Name"
                                    class="name" 
                                    onChange={event => {
                                    setName(event.target.value)
                                    }} required />
                    </div>
                    <div class='emailbox'>
                        <input type="text"
                                    placeholder="Email"
                                    class="email" 
                                    onChange={event => {
                                    setEmail(event.target.value)
                                    }} required />

                    </div>
                    <div class='passwordbox'>
                        <input type="password"
                                    placeholder="Password"
                                    class="password" 
                                    onChange={event => {
                                    setPassword(event.target.value)
                                    }} required />

                    </div>
                    <div class='cpasswordbox'>
                        <input type="password"
                                    placeholder="Confirm password"
                                    class="cpassword" 
                                    onChange={event => {
                                    setconfirmPassword(event.target.value)
                                    }} required />

                    </div>
                    
                    <div className="submitbox">
                        
                            <button 
                            class="signup"
                            onClick={() => registerUser(name,email,password,confirmPassword, checked)}
                            >Sign Up
                            </button>
                        
                    </div>
                    <div class='coachButton'>
                           
                                <input 
                                type="checkbox"
                                checked={checked}
                                onChange={()=>handleChange()}/>
                                Register as a coach?
                           
                    </div>
                        <div class="acc">
                            <div >Already have an account? <button className="signin" onClick={() => navigate("/login")}>Sign In</button></div>
                        </div>
                        
                            
                          
          

                            
                        
            </div>
            
            <ToastContainer />
        </div>
      );
    
    
}

export default Register