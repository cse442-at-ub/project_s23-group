import React,{Fragment}  from 'react';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './Register.css'
import Lottie from "lottie-react";
import check from "./lotties/check.json"
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
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    
    useEffect(() => {

    }, [error]);
    
    
  
    const registerUser = async (name, email, password, confirmPassword) => {
        console.log(name)
        console.log(email)
        console.log(password)
        var bodyFormData = new FormData();
        if(name&&email&&password&&confirmPassword &&(password===confirmPassword)){
            
            bodyFormData.append("name", name)
            bodyFormData.append("email",email)
            bodyFormData.append("password",password)

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
                navigate("/CSE442-542/2023-Spring/cse-442w/test2/", { replace: true })
      
              }, (error) => {
                console.log(error);
              });
           
        }
        else{
            setError(true)
            console.log("missing field or password does not match")
        }

    };



    return (
        <div class="bg">
            <div class='home' onClick={() => navigate("/")}/>   
            
            <div class="accountwrap">
                <div class="sign">Sign Up</div>
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
                            onClick={() => registerUser(name,email,password,confirmPassword)}
                            >Sign Up
                            </button>
                        
                    </div>
                        <div class="col">
                            <div class="row">Already have an account? <button className="signin" onClick={() => navigate("/login")}>Sign In</button></div>
                        </div>
                        
                            {error && (<div class="row" id='error'>
                        Incomplete fields or password does not match.
                            </div>)}

                            
                        
            </div>
        </div>
      );
    
    
}

export default Register
