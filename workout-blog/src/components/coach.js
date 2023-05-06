import React from "react";
import Popup from 'reactjs-popup';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "./coach.css"
import img from './images/logo-white.png';

import {
    useNavigate,
    useParams,
    Link,
    Navigate,
  } from "react-router-dom";

const Coachpage = () => {
    const navigate = useNavigate()
    const id = sessionStorage.getItem("id")
    const [coach,setCoach] = useState([])
    const signOut = () => {
        sessionStorage.clear();
    }
    const getinfo = () =>{
        console.log(coach)
    }
    useEffect(()=>{
        GetCoaches()
    },[])
    function GetCoaches(){
    axios({
        method: 'get',
        url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/getCoaches",
        })
        .then(response => {
        setCoach(response.data)
        // console.log(response.data)
        // getCoachData(response.data)
        })
        .catch(error => {
        console.log(error);
        });
    }
    //   const getCoachData = async (coachData) => {
    //     var userData = []
    //     coachData.map(coaches =>{
    //         const formData = new FormData();
    //         formData.append("userid", coaches.id);
    //         axios({
    //           method: 'post',
    //           url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/getUserInfo.php",
    //           headers: {},
    //           data: formData,
    //           })
    //           .then(response => {
    //             coaches['pfp'] = response.data.pfp
    //             userData.push(coaches)
    //           })
    //           .catch(error => {
    //           console.log(error);
    //           });
    //     })
    //     console.log(userData)
    //     setCoach(userData)
    //   };
    return (
        
         <div className="wrapper2">
        <div class="container 1">
            <nav class="navbar navbar-expand-lg navbar-dark col-12">
            <img class="navbar-brand" src={img} onClick={() =>navigate("/")} Gym Blog />
                
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse col-11" id="navbarNavAltMarkup">
               
                    <div class="navbar-nav ml-auto">
                    {(id && (<Link class="nav-item nav-link" to ={`../profile/${id}`}>Profile</Link>))}
                    {(id && (<Link class="nav-item nav-link" to ={`../posts`}>Posts</Link>))}
                    {(id && (<Link onClick={()=>signOut()} class="nav-item nav-link" >Sign Out</Link>))}
                    {(!id && (<Link class="nav-item nav-link" to ="../register">Sign Up</Link>)) } 
                    {(!id && (<Link class="nav-item nav-link" to ="../login">Sign In</Link>)) }
                    </div>
                </div>
            </nav>
            <div class="coach-container">
                <div className="coach-title"><strong>Coaching Center</strong></div>
                <div className="coach-list">Coach List:</div>
                {coach.slice().map(c => (
                    <div class="coach-item">
                        <div onClick={()=>navigate(`../../profile/${c.id}`)} class="inline coach-name-item">
                            <p className="coach-name">{c.username}</p>
                        </div>
                        <div className="inline coach-email">
                            <p>Email:{c.email}</p>
                        </div>

                    </div>
                    
                ))}
            </div> 
        </div>
        </div>
       
    );  
        

}


export default Coachpage;