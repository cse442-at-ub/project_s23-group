import React from "react";
import Popup from 'reactjs-popup';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "./coach.css"


import {
    useNavigate,
    useParams,
    Link,
    Navigate,
  } from "react-router-dom";

const Coachpage = () => {
    const navigate = useNavigate()
    const id = sessionStorage.getItem("id")
    const [pfp,setPfp] = useState([])
    const [numberOfPosts,setNumberOfPosts] = useState([])
    const [coach,setCoach] = useState([])
    const signOut = () => {
        sessionStorage.clear();
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
        })
        .catch(error => {
        console.log(error);
        });
    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light col-12">
                <div class="navbar-brand" onClick={() =>navigate("/")}>Gym Blog</div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse col-11" id="navbarNavAltMarkup">
                    <div class="navbar-nav ml-auto">
                    {(id && (<Link class="nav-item nav-link" to ={`profile/${id}`}>Profile</Link>))}
                    <Link class="nav-item nav-link" to = 'coaches'>Coaching</Link>
                    {(id && (<Link class="nav-item nav-link" to ={`posts`}>Posts</Link>))}
                    {(id && (<Link onClick={()=>signOut()} class="nav-item nav-link" >Sign Out</Link>))}
                    {(!id && (<Link class="nav-item nav-link" to ="register">Sign Up</Link>)) } 
                    {(!id && (<Link class="nav-item nav-link" to ="login">Sign In</Link>)) }
                    </div>
                </div>
            </nav>
            <div class="coach-container">
                <div className="coach-title"><strong>Coaching Center</strong></div>
                <div className="coach-list">Coach List:</div>
                {coach.slice().map(c => (
                    <div class="coach-item">
                        <div class="inline coach-name-item">
                            <p className="coach-name">{c.username}</p>
                        </div>
                        <div class="inline reach-out-btn">
                            <button class ="coach-connect" onClick={()=>navigate(`../../profile/${c.id}`)}>Reach Out</button>
                        </div>
                    </div>
                    
                ))}
            </div> 
        </div>
        
    );  
        

}


export default Coachpage;