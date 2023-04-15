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
    const [load, setLoad] = useState(false)
    const [error, setError] = useState(false)
    const [errMessage, setErrMessage] = useState("")
    const navigate = useNavigate()
    
    useEffect(() => {

    }, [error]);
    
    
  
    const registerUser = async (name, email, password, confirmPassword) => {
        console.log(name)
        console.log(email)
        console.log(password)
        var bodyFormData = new FormData();
        if(name&&email&&password&&confirmPassword &&(password===confirmPassword)){
            if(!/[^a-z]/i.test(name)){
                if(email.includes("@")){
                    if(password.length >=6){
 
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
                            setError(false)
                            setLoad(true)
                            setTimeout(()=>{navigate("/")}, 1700);
                        
                            
                
                        }, (error) => {
                            console.log(error);
                            console.log("user already exists")
                            setError(true)
                            setErrMessage("User already exists")
                        });
                    }
                    else{
                        setError(true)
                        setErrMessage("Password too short")
                    }
                }
                else{
                    
                    setError(true)
                    setErrMessage("Not a valid email")
                }
              }
              else{
                console.log(!/[^a-z]/i.test(name))
                setError(true)
                console.log("special char")
                setErrMessage("Name contains special characters")

              }
           
        }
        else{
            
            setError(true)
            console.log("missing field or password does not match")
            setErrMessage("Missing field or password does not match")
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
                                {errMessage}
                            </div>)}
                            {load && (<div className='checkAnim'>
                                <Lottie className='check' animationData={check} loop={false} />
                            </div>)}
          

                            
                        
            </div>
        </div>
      );
    
    
}

export default Register
