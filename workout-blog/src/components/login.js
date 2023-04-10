import { logDOM } from '@testing-library/react';
import './login.css';
import downloadImage from './Signin.png';
import React,{Fragment}  from 'react';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import {
  useNavigate,
} from "react-router-dom";
import Lottie from "lottie-react";
import check from "./lotties/check.json"

function Login(props) {
  const navigate = useNavigate()
  const [email,setEmail] = useState('');
  const [password,setPass] = useState('');

    
  const loginUser =  (email, password) => {
    console.log(email)
    console.log(password)
    var bodyFormData = new FormData();
    if(email&&password){

        bodyFormData.append("email",email)
        bodyFormData.append("password",password)

        axios({
          method: 'post',
          url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/login.php",
          headers: {}, 
          data: bodyFormData
        })
        .then((response) => {
          console.log("shouldnt be error ")
          console.log(response);
          sessionStorage.setItem("id", response.data[0])
          sessionStorage.setItem("name", response.data[2])
          navigate("/")

        }, (error) => {
          console.log("error")
          console.log(error);
        });
        
  }
}




  

  return (
    <div className="Login">
    {/* <div class='home' onClick={() => props.onFormSwitch('home')}/>    */}

      <img id="myImage" src={downloadImage} alt="Login Image"/>
     
      <div className="Signin info">
      <h1>Sign in</h1>
        <div class='usernames'>
          <input type="text"
            placeholder='Username'
            class='username'
            onChange={event => {
              setEmail(event.target.value)
              }} required 
            />
        </div>
        <div class='passwords'>
          <input type="password"
            placeholder='Password'
            class='password'
            onChange={event => {
              setPass(event.target.value)
              }} required />
        </div>
        <div>
        </div> 
        <button  class="log_but"onClick={() => loginUser(email,password)}>Sign in</button>  

        <div class="login-box"> 
{/*  <a href="#" class="forgotpass" onClick={forgotPass}>Forgot your password?</a>  */}
  {/* <label for="remember-me-checkbox" class="remember-me-label">
    <input type="checkbox" id="remember-me-checkbox" class="remember-me-checkbox"/>
    <span class="checkmark"></span>
    Remember me
  </label> */}
  </div>
        
        <span >Not yet registered? <button class="noAccount" onClick={() => navigate("/register")}>Create an account</button></span>
        
      </div> {/* close "Sign in" div here */}


    </div>
  );
}


export default Login;
