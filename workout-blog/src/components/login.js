import { logDOM } from '@testing-library/react';
import './login.css';
import React,{Fragment}  from 'react';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import {
  useNavigate,
} from "react-router-dom";
import Lottie from "lottie-react";
import check from "./lotties/check.json"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login(props) {
  const navigate = useNavigate()
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

    
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
          console.log(response);
          sessionStorage.setItem("id", response.data[0])
          sessionStorage.setItem("name", response.data[2])
          setTimeout(()=>{navigate("/")}, 1700);
          toast.success('Welcome Back!', {
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
          toast.error("User does not exist or wrong password", {
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
}


return (
  <div class="bgL">
      <div class='home' onClick={() => navigate("/")}/>   
      
      <div class="accountwrap">
          <div class="log">Sign in</div>
             
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
             
              
              <div className="submitbox">
                  
                      <button 
                      class="signin"
                      onClick={() => loginUser(email,password)}
                      >Sign in
                      </button>
                  
              </div>
                  <div class="col">
                      <div class="row">Not a user? <button className="signup" onClick={() => navigate("/register")}>Register</button></div>
                  </div>
       
      </div>
   
      <ToastContainer />
  </div>
  );
}

  




export default Login;