import React,{Fragment}  from 'react';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './Register.css'



const Register = (props) =>{

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')



    
    
  
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
                url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/register2.php",
                headers: {}, 
                data: bodyFormData
            })
            console.log("done")
        }
        else{
            console.log("missing field or password does not match")
        }

    };



    return (
        <div class="bg">
            
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
                    
                    <div>
                        <button 
                        class="signup"
                        onClick={() => registerUser(name,email,password,confirmPassword)}
                        >Sign Up
                        </button>
                    </div>
                    <div class="col">
                       <div class="row">Already have an account? <button className="signin" onClick={() => props.onFormSwitch('login')}>Sign In
                   </button>
                       </div>
                    </div>
                    
            </div>
        </div>
      );
    
    
}

export default Register
