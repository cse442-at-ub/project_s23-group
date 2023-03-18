import { logDOM } from '@testing-library/react';
import './login.css';
import downloadImage from './Signin.png';
import React,{Fragment}  from 'react';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

function Login(props) {
  
  const [email,setEmail] = useState('');
  const [password,setPass] = useState('');
    
  const loginUser = async (email, password) => {
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
        }, (error) => {
          console.log(error);
        });
        
  }
}


  function forgotPass() {
    window.location.href = "https://ublearns.buffalo.edu/?new_loc=%2Fultra%2Finstitution-page";
  }// temp link


  

  return (
    <div className="Login">
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
        <a href="#" class="log_but"onClick={() => loginUser(email,password)}>Sign in</a>  

        <div class="login-box"> 
  <a href="#" class="forgotpass" onClick={forgotPass}>Forgot your password?</a>  
  <label for="remember-me-checkbox" class="remember-me-label">
    <input type="checkbox" id="remember-me-checkbox" class="remember-me-checkbox"/>
    <span class="checkmark"></span>
    Remember me
  </label>
  </div>
        <a href="#" class="create_account">
        <span class="noAccount">Not yet registered? <a href="#" class="signUp" onClick={() => props.onFormSwitch('register')}>Create an account</a></span>
        </a>
      </div> {/* close "Sign in" div here */}
    </div>
  );
}


export default Login;






